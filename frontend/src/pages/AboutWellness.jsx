import { motion } from 'framer-motion';
import { FaLeaf, FaBrain, FaHeart, FaUserMd, FaShieldAlt, FaComments } from 'react-icons/fa';

const AboutWellness = () => {
  return (
    <div className="pt-32 pb-20 space-y-24">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary-600 dark:text-dark-primary-600 font-bold tracking-wide uppercase text-sm bg-primary-50 dark:bg-dark-primary-100 px-3 py-1 rounded-full">Our Story</span>
            <h1 className="mt-6 text-4xl md:text-6xl font-display font-bold text-text-primary dark:text-dark-text-primary leading-tight">
              Wellness is a <span className="text-transparent bg-clip-text bg-gradient-primary">journey</span>, not a destination.
            </h1>
            <p className="mt-6 text-xl text-text-secondary dark:text-dark-text-secondary leading-relaxed">
              We started WellConnect with a simple belief: everyone deserves a safe, supportive space to prioritize their mental health. No stigma, no barriers—just connection.
            </p>
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-soft-xl border border-white/50 dark:border-dark-surface-200/50 aspect-[4/3] bg-surface-50 dark:bg-dark-surface-100">
              {/* Abstract clean visual representation */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-100/50 to-accent-100/50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-white/40 backdrop-blur-xl rounded-full flex items-center justify-center">
                  <div className="w-48 h-48 bg-white/60 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg shadow-primary-500/10">
                    <FaLeaf className="w-16 h-16 text-primary-400" />
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-12 right-12 p-4 bg-white dark:bg-dark-surface-200 rounded-2xl shadow-lg border border-surface-100 dark:border-dark-surface-200"
              >
                <FaHeart className="w-6 h-6 text-coral-400" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-12 left-12 p-4 bg-white dark:bg-dark-surface-200 rounded-2xl shadow-lg border border-surface-100 dark:border-dark-surface-200"
              >
                <FaBrain className="w-6 h-6 text-purple-400" />
              </motion.div>
            </div>

            {/* Background blobs */}
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-secondary-100 rounded-full blur-[80px] -z-10 opacity-60" />
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-accent-100 rounded-full blur-[80px] -z-10 opacity-60" />
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Grid */}
      <section className="bg-gradient-to-b from-white to-surface-50 dark:from-dark-surface-50 dark:to-dark-surface-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <FaShieldAlt />, title: "Safe Space", desc: "A moderated, judgment-free zone for all." },
              { icon: <FaUserMd />, title: "Expert Backed", desc: "Resources verified by mental health professionals." },
              { icon: <FaComments />, title: "Community First", desc: "Built on the power of shared experiences." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-dark-surface-100 p-8 rounded-3xl shadow-soft border border-surface-100 dark:border-dark-surface-200 hover:shadow-card hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center text-xl mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-3">{item.title}</h3>
                <p className="text-text-secondary dark:text-dark-text-secondary">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Split Panel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-primary-600 to-indigo-600 rounded-[3rem] p-8 md:p-20 text-white overflow-hidden relative">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Holistic Wellness at Your Fingertips</h2>
              <p className="text-indigo-100 text-lg mb-8 leading-relaxed max-w-lg">
                We combine AI-driven insights, professional resources, and community support to create a comprehensive wellness ecosystem.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  "Daily Mood Tracking & Analytics",
                  "AI-Powered Mental Health Chat",
                  "Guided Meditation Library",
                  "Anonymous Peer Support Forms"
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</div>
                    <span className="font-medium text-indigo-50">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 translate-y-8">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-lg">
                  <div className="h-2 w-20 bg-white/20 rounded-full mb-3" />
                  <div className="h-16 w-full bg-gradient-to-br from-white/10 to-transparent rounded-xl" />
                </div>
                <div className="bg-white/20 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-lg">
                  <div className="h-8 w-8 bg-emerald-400 rounded-full mb-3" />
                  <div className="h-2 w-24 bg-white/40 rounded-full" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white/20 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-lg">
                  <div className="h-8 w-8 bg-coral-400 rounded-full mb-3" />
                  <div className="h-2 w-24 bg-white/40 rounded-full text-white/80" />
                </div>
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-lg">
                  <div className="h-2 w-16 bg-white/20 rounded-full mb-3" />
                  <div className="h-20 w-full bg-gradient-to-br from-white/5 to-transparent rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutWellness;
