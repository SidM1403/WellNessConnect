import { useEffect, useRef } from 'react';
import { Renderer, Transform, Vec3, Color, Polyline } from 'ogl';
import './Ribbons.css';

const Ribbons = ({
    colors = ['#7c3aed', '#c084fc'], // Count: 2 (Violet & Lighter Violet)
    baseSpring = 0.05,
    baseFriction = 0.5,
    baseThickness = 20, // Thickness: 20
    offsetFactor = 0.05, // Slight separation for the 2 lines
    maxAge = 500, // Max Age: 500
    pointCount = 80,
    speedMultiplier = 0.5, // Speed: 0.5
    enableFade = false, // Enable Fade: OFF
    enableShaderEffect = true, // Enable Waves: ON
    effectAmplitude = 2.0, // Amplitude for the shader waves
    backgroundColor = [0, 0, 0, 0]
}) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Cleanup existing canvas if any (react strict mode double-mount fix)
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        const renderer = new Renderer({
            dpr: Math.min(window.devicePixelRatio, 2),
            alpha: true,
            depth: false
        });
        const gl = renderer.gl;

        gl.canvas.style.position = 'absolute';
        gl.canvas.style.top = '0';
        gl.canvas.style.left = '0';
        gl.canvas.style.width = '100%';
        gl.canvas.style.height = '100%';
        container.appendChild(gl.canvas);

        const scene = new Transform();
        const lines = [];

        const vertex = `
      precision highp float;
      attribute vec3 position;
      attribute vec3 next;
      attribute vec3 prev;
      attribute vec2 uv;
      attribute float side;
      
      uniform vec2 uResolution;
      uniform float uDPR;
      uniform float uThickness;
      uniform float uTime;
      uniform float uEnableShaderEffect;
      uniform float uEffectAmplitude;
      
      varying vec2 vUV;
      
      vec4 getPosition() {
          vec4 current = vec4(position, 1.0);
          vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
          vec2 nextScreen = next.xy * aspect;
          vec2 prevScreen = prev.xy * aspect;
          vec2 tangent = normalize(nextScreen - prevScreen);
          vec2 normal = vec2(-tangent.y, tangent.x);
          normal /= aspect;
          normal *= mix(1.0, 0.1, pow(abs(uv.y - 0.5) * 2.0, 2.0));
          float dist = length(nextScreen - prevScreen);
          normal *= smoothstep(0.0, 0.02, dist);
          float pixelWidthRatio = 1.0 / (uResolution.y / uDPR);
          float pixelWidth = current.w * pixelWidthRatio;
          normal *= pixelWidth * uThickness;
          current.xy -= normal * side;
          
          if(uEnableShaderEffect > 0.5) {
            current.xy += normal * sin(uTime + current.x * 10.0) * uEffectAmplitude;
          }
          
          return current;
      }
      
      void main() {
          vUV = uv;
          gl_Position = getPosition();
      }
    `;

        const fragment = `
      precision highp float;
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform float uEnableFade;
      varying vec2 vUV;
      void main() {
          float fade = 1.0;
          if (uEnableFade > 0.5) {
            fade = 1.0 - smoothstep(0.0, 1.0, vUV.y);
          }
          gl_FragColor = vec4(uColor, uOpacity * fade);
      }
    `;

        function resize() {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            lines.forEach(line => line.polyline.resize());
        }
        window.addEventListener('resize', resize);

        colors.forEach((color, index) => {
            const line = {
                spring: baseSpring,
                friction: baseFriction,
                mouseVelocity: new Vec3(),
                mouseOffset: new Vec3(
                    (index - (colors.length - 1) / 2) * offsetFactor,
                    0,
                    0
                )
            };

            const points = [];
            for (let i = 0; i < pointCount; i++) {
                points.push(new Vec3());
            }
            line.points = points;

            line.polyline = new Polyline(gl, {
                points,
                vertex,
                fragment,
                uniforms: {
                    uColor: { value: new Color(color) },
                    uThickness: { value: baseThickness },
                    uOpacity: { value: 1.0 },
                    uTime: { value: 0.0 },
                    uEnableShaderEffect: { value: enableShaderEffect ? 1.0 : 0.0 },
                    uEffectAmplitude: { value: effectAmplitude },
                    uEnableFade: { value: enableFade ? 1.0 : 0.0 }
                }
            });
            line.polyline.mesh.setParent(scene);
            lines.push(line);
        });

        resize();

        const mouse = new Vec3();
        mouse.set(-1, -1, 0);

        function updateMouse(e) {
            let x, y;
            if (e.changedTouches && e.changedTouches.length) {
                x = e.changedTouches[0].clientX;
                y = e.changedTouches[0].clientY;
            } else {
                x = e.clientX;
                y = e.clientY;
            }
            const width = window.innerWidth;
            const height = window.innerHeight;
            mouse.set((x / width) * 2 - 1, (y / height) * -2 + 1, 0);
        }

        window.addEventListener('mousemove', updateMouse);
        window.addEventListener('touchstart', updateMouse);
        window.addEventListener('touchmove', updateMouse);

        let frameId;
        const tmp = new Vec3();

        function update() {
            frameId = requestAnimationFrame(update);
            const time = performance.now() * 0.001;

            lines.forEach(line => {
                tmp.copy(mouse).add(line.mouseOffset).sub(line.points[0]).multiply(line.spring);
                line.mouseVelocity.add(tmp).multiply(line.friction);
                line.points[0].add(line.mouseVelocity);

                for (let i = 1; i < line.points.length; i++) {
                    // Use a simple lag for smooth following
                    line.points[i].lerp(line.points[i - 1], 0.9);
                }

                if (line.polyline.mesh.program.uniforms.uTime) {
                    line.polyline.mesh.program.uniforms.uTime.value = time;
                }
                line.polyline.updateGeometry();
            });

            renderer.render({ scene });
        }
        update();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', updateMouse);
            window.removeEventListener('touchstart', updateMouse);
            window.removeEventListener('touchmove', updateMouse);
            cancelAnimationFrame(frameId);
            if (gl.canvas && gl.canvas.parentNode === container) {
                container.removeChild(gl.canvas);
            }
        };
    }, [
        colors,
        baseSpring,
        baseFriction,
        baseThickness,
        offsetFactor,
        maxAge,
        pointCount,
        speedMultiplier,
        enableFade,
        enableShaderEffect,
        effectAmplitude
    ]);

    return <div ref={containerRef} className="ribbons-container" />;
};

export default Ribbons;
