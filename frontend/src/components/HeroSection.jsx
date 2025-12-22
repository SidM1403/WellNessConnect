import { motion } from 'framer-motion';
import AnimatedButton from './AnimatedButton.jsx';
import { Link } from 'react-router-dom';
import GlitchText from './GlitchText';

const HeroSection = () => {
  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -z-10 opacity-30">
        <svg width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="400" cy="400" r="400" fill="url(#paint0_radial_hero)" />
          <defs>
            <radialGradient id="paint0_radial_hero" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(400 400) rotate(90) scale(400)">
              <stop stopColor="#6366f1" stopOpacity="0.15" />
              <stop offset="1" stopColor="#6366f1" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 items-center">

          {/* Text Content */}
          <div className="space-y-8 max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-600 text-xs font-semibold tracking-wide uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75 animate-pulse" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-500" />
                </span>
                Reimagine Your Wellness
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary leading-[1.1] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <GlitchText
                speed={1}
                enableShadows={true}
                enableOnHover={true}
                className="inline-block text-gray-900 mb-2 glitch-ghost"
              >
                A calm space to
              </GlitchText>
              <div className="flex flex-col items-start mt-2">
                <GlitchText
                  speed={1}
                  enableShadows={true}
                  enableOnHover={true}
                  className="text-transparent bg-clip-text bg-gradient-primary leading-tight pb-2"
                >
                  track, share
                </GlitchText>
                <GlitchText
                  speed={1}
                  enableShadows={true}
                  enableOnHover={true}
                  className="text-transparent bg-clip-text bg-gradient-primary leading-tight pb-2"
                >
                  & heal
                </GlitchText>
              </div>
            </motion.h1>

            <motion.p
              className="text-base md:text-lg text-text-secondary leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              WellConnect brings your community API to life with living posts, activity-aware dashboards, and a resource library that updates as you do.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <AnimatedButton as="a" href="/signup">
                Start your journey
              </AnimatedButton>
              <Link
                to="/forum"
                className="px-6 py-3 rounded-xl text-text-secondary font-medium hover:text-primary-600 hover:bg-white/50 border border-transparent hover:border-surface-200 transition-all duration-300"
              >
                Explore Community
              </Link>
            </motion.div>
          </div>

          {/* Hero Visual/Illustration */}
          <motion.div
            className="relative lg:pl-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {/* Glass Card Visual */}
            <div className="relative z-10 bg-white/40 backdrop-blur-xl rounded-3xl border border-white/60 shadow-glass p-6 md:p-8 transform rotate-3 hover:rotate-0 transition-transform duration-700">
              <div className="absolute top-4 left-4 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-coral-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>

              <div className="mt-8 space-y-6">
                {/* Fake Chart / Stats */}
                <div className="flex items-end justify-between h-32 gap-2 px-2">
                  {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                    <motion.div
                      key={i}
                      className="w-full bg-gradient-to-t from-primary-200 to-primary-400 rounded-t-lg opacity-80"
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 0.6 + (i * 0.1), duration: 1, ease: "easeOut" }}
                    />
                  ))}
                </div>

                {/* Info Block */}
                <div className="flex gap-4 items-center bg-white/60 rounded-xl p-4 shadow-sm border border-white/50">
                  <div className="h-10 w-10 rounded-full bg-accent-100 flex items-center justify-center text-accent-600">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">Mood Tracker</p>
                    <p className="text-xs text-text-secondary">Your mood has improved by 15%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Blobs behind card */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary-300 rounded-full blur-[60px] opacity-60 -z-10 animate-float" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent-300 rounded-full blur-[60px] opacity-60 -z-10 animate-float" style={{ animationDelay: '2s' }} />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
