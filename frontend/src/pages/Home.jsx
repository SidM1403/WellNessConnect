import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection.jsx';
import AssessmentSection from '../components/AssessmentSection.jsx';
import { FaHeart, FaUsers, FaBrain, FaLeaf, FaChartLine, FaComments } from 'react-icons/fa';


const features = [
  {
    icon: <FaHeart className="w-6 h-6 text-coral-500" />,
    title: "Personalized Wellness",
    description: "Track your mood, habits, and progress with our intuitive tools designed for your mental and physical wellbeing.",
    bg: "bg-coral-50",
    border: "border-coral-100"
  },
  {
    icon: <FaUsers className="w-6 h-6 text-primary-500" />,
    title: "Supportive Community",
    description: "Connect with others on similar wellness journeys in a safe, moderated environment.",
    bg: "bg-primary-50",
    border: "border-primary-100"
  },
  {
    icon: <FaBrain className="w-6 h-6 text-secondary-500" />,
    title: "Mindfulness Resources",
    description: "Access guided meditations, breathing exercises, and mental health resources.",
    bg: "bg-secondary-50",
    border: "border-secondary-100"
  },
  {
    icon: <FaLeaf className="w-6 h-6 text-accent-500" />,
    title: "Healthy Habits",
    description: "Build and track healthy habits with our guided programs and challenges.",
    bg: "bg-accent-50",
    border: "border-accent-100"
  },
  {
    icon: <FaChartLine className="w-6 h-6 text-amber-500" />,
    title: "Progress Tracking",
    description: "Visualize your wellness journey with insightful analytics and progress reports.",
    bg: "bg-amber-50",
    border: "border-amber-100"
  },
  {
    icon: <FaComments className="w-6 h-6 text-teal-500" />,
    title: "24/7 AI Support",
    description: "Get instant support from our AI assistant whenever you need someone to talk to.",
    bg: "bg-teal-50",
    border: "border-teal-100"
  }
];

const Home = () => {
  return (
    <div className="space-y-32 pb-24">
      <HeroSection />

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl font-bold font-display text-text-primary dark:text-dark-text-primary sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Your Wellness Journey Starts Here
          </motion.h2>
          <motion.p
            className="mt-4 max-w-2xl mx-auto text-lg text-text-secondary dark:text-dark-text-secondary"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Discover tools and resources to support your mental and physical health
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`p-8 rounded-3xl bg-white dark:bg-dark-surface-100 border border-surface-200 dark:border-dark-surface-200 shadow-soft hover:shadow-card transition-all duration-300 group`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`flex items-center justify-center w-14 h-14 rounded-2xl ${feature.bg} mb-6 transition-transform group-hover:scale-110`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-3">{feature.title}</h3>
              <p className="text-text-secondary dark:text-dark-text-secondary leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Wellness Assessments Section */}
      <AssessmentSection />

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="relative rounded-[2.5rem] p-8 md:p-16 overflow-hidden bg-surface-50 dark:bg-dark-surface-100 border border-surface-200 dark:border-dark-surface-200"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Decorative background blobs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-100/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary-100/50 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary dark:text-dark-text-primary">
                What is WellConnect?
              </h2>
              <p className="text-xl text-text-secondary dark:text-dark-text-secondary leading-relaxed">
                A holistic approach to your wellbeing journey. WellConnect is more than just an app—it's a supportive community and comprehensive toolkit designed to help you prioritize your well-being.
              </p>

              <div className="grid gap-6 mt-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white dark:bg-dark-surface-200 shadow-sm flex items-center justify-center text-accent-500">
                    <FaLeaf />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">Our Mission</h4>
                    <p className="text-text-secondary dark:text-dark-text-secondary">To make mental health and wellness support accessible and effective for everyone.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white dark:bg-dark-surface-200 shadow-sm flex items-center justify-center text-primary-500">
                    <FaBrain />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">Our Approach</h4>
                    <p className="text-text-secondary dark:text-dark-text-secondary">Combining evidence-based practices with modern technology for a personalized experience.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-white/80 to-white/40 border border-white/60 shadow-glass p-8 flex items-center justify-center">
                {/* Illustration placeholder or nice SVG */}
                <svg viewBox="0 0 200 200" className="w-full h-full text-primary-200">
                  <circle cx="100" cy="100" r="80" fill="currentColor" fillOpacity="0.2" />
                  <circle cx="100" cy="100" r="60" fill="currentColor" fillOpacity="0.4" />
                  <circle cx="100" cy="100" r="40" fill="currentColor" fillOpacity="0.6" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-primary-600 font-bold text-2xl">Holistic Wellness</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="relative rounded-[3rem] p-12 md:p-20 text-center overflow-hidden"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-primary" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold font-display text-white">
              Ready to start your wellness journey?
            </h2>
            <p className="text-xl text-indigo-100">
              Join thousands of others who are taking control of their mental and physical health with WellConnect.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <motion.button
                className="px-8 py-4 bg-white text-primary-600 font-bold rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Now
              </motion.button>
              <motion.button
                className="px-8 py-4 bg-primary-600/30 backdrop-blur-md border border-white/30 text-white font-semibold rounded-xl hover:bg-primary-600/40 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
