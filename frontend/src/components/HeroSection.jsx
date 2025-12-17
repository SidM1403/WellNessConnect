import { motion } from 'framer-motion';
import AnimatedButton from './AnimatedButton.jsx';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative pt-16 pb-10 md:pt-24 md:pb-16">
      <div className="absolute inset-x-0 -top-24 -bottom-10 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 520"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="heroWave" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
              <stop offset="35%" stopColor="#38bdf8" stopOpacity="0.35" />
              <stop offset="70%" stopColor="#a855f7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#fb7185" stopOpacity="0.28" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0 320L80 293.3C160 267 320 213 480 197.3C640 181 800 203 960 229.3C1120 256 1280 288 1360 304L1440 320L1440 520L0 520Z"
            fill="url(#heroWave)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, ease: 'easeInOut' }}
          />
        </svg>
      </div>

      <div className="relative z-10 grid gap-10 md:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)] items-center">
        <div className="space-y-6">
          <motion.p
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-200 backdrop-blur glass"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75 animate-pulse" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
            </span>
            Live wellness conversations · Powered by your API
          </motion.p>

          <motion.h1
            className="text-balance text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight gradient-text"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.6 }}
          >
            A calm space
            <br />
            to track, share & heal
          </motion.h1>

          <motion.p
            className="max-w-xl text-sm sm:text-base text-slate-200/90"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.55 }}
          >
            WellConnect brings your community API to life with living posts, activity-aware
            dashboards, and a resource library that updates as you do. No mock data—just your
            real wellness journeys.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-3 pt-1"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34 }}
          >
            <AnimatedButton as="a" href="/signup">
              Join the community
            </AnimatedButton>
            <Link
              to="/forum"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-cyan-200 border border-cyan-400/35 glass hover:border-cyan-400/50 transition-all"
            >
              <span className="h-5 w-5 rounded-full border border-cyan-400/60 flex items-center justify-center text-[10px]">
                ❥
              </span>
              Explore live discussions
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="relative aspect-[4/3] rounded-3xl glass shadow-soft-xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/20 via-sky-300/10 to-violet-400/20 mix-blend-screen" />
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 480 360">
            <defs>
              <linearGradient id="lotusStroke" x1="0" x2="1" y1="1" y2="0">
                <stop offset="0%" stopColor="#6ee7b7" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
            </defs>
            <motion.g
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              <path
                d="M80 260Q134 210 190 208T320 220Q368 244 400 260"
                fill="none"
                stroke="rgba(148,163,184,0.5)"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <motion.path
                d="M240 140C220 160 210 190 210 210C220 206 232 202 240 196C248 202 260 206 270 210C270 190 260 160 240 140Z"
                fill="rgba(34,197,94,0.12)"
                stroke="url(#lotusStroke)"
                strokeWidth="1.8"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.6, ease: 'easeInOut' }}
              />
              <path
                d="M240 136C226 154 220 173 218 190C225 184 233 180 240 176C247 180 255 184 262 190C260 173 254 154 240 136Z"
                fill="rgba(59,130,246,0.16)"
                stroke="rgba(56,189,248,0.7)"
                strokeWidth="1.4"
              />
              <path
                d="M240 128C230 144 226 160 225 174C230 170 235 166 240 164C245 166 250 170 255 174C254 160 250 144 240 128Z"
                fill="rgba(244,114,182,0.18)"
                stroke="rgba(244,114,182,0.8)"
                strokeWidth="1.2"
              />
            </motion.g>
          </svg>
          <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-slate-900/70 border border-white/10 px-4 py-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-emerald-200 uppercase tracking-wide">
                Live wellbeing snapshot
              </p>
              <p className="text-[11px] text-slate-300">
                Posts, likes and resources animate directly from your backend.
              </p>
            </div>
            <div className="flex gap-2 text-[10px] text-slate-200">
              <div className="px-2 py-1 rounded-full bg-emerald-500/20 border border-emerald-300/40">
                Calm focus
              </div>
              <div className="px-2 py-1 rounded-full bg-sky-500/15 border border-sky-300/40">
                Gentle motion
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;


