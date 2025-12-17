import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection.jsx';
import { FaHeart, FaUsers, FaBrain, FaLeaf, FaChartLine, FaComments } from 'react-icons/fa';

const features = [
  {
    icon: <FaHeart className="w-6 h-6 text-pink-400" />,
    title: "Personalized Wellness",
    description: "Track your mood, habits, and progress with our intuitive tools designed for your mental and physical wellbeing.",
    color: "from-pink-500/20 to-rose-500/20",
    borderColor: "border-pink-500/30"
  },
  {
    icon: <FaUsers className="w-6 h-6 text-cyan-400" />,
    title: "Supportive Community",
    description: "Connect with others on similar wellness journeys in a safe, moderated environment.",
    color: "from-cyan-500/20 to-blue-500/20",
    borderColor: "border-cyan-500/30"
  },
  {
    icon: <FaBrain className="w-6 h-6 text-purple-400" />,
    title: "Mindfulness Resources",
    description: "Access guided meditations, breathing exercises, and mental health resources.",
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30"
  },
  {
    icon: <FaLeaf className="w-6 h-6 text-emerald-400" />,
    title: "Healthy Habits",
    description: "Build and track healthy habits with our guided programs and challenges.",
    color: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-500/30"
  },
  {
    icon: <FaChartLine className="w-6 h-6 text-yellow-400" />,
    title: "Progress Tracking",
    description: "Visualize your wellness journey with insightful analytics and progress reports.",
    color: "from-yellow-500/20 to-orange-500/20",
    borderColor: "border-yellow-500/30"
  },
  {
    icon: <FaComments className="w-6 h-6 text-teal-400" />,
    title: "24/7 AI Support",
    description: "Get instant support from our AI assistant whenever you need someone to talk to.",
    color: "from-teal-500/20 to-cyan-500/20",
    borderColor: "border-teal-500/30"
  }
];

const Home = () => {
  return (
    <div className="space-y-16 pb-16">
      <HeroSection />
      
      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gradient sm:text-4xl">
            Your Wellness Journey Starts Here
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-slate-300 sm:mt-4">
            Discover tools and resources to support your mental and physical health
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`glass glass-hover rounded-2xl p-6 border ${feature.borderColor} bg-gradient-to-br ${feature.color} transform transition-all duration-300`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, y: -5 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                  {feature.icon}
                </div>
                <h3 className="ml-3 text-lg font-medium text-slate-100">{feature.title}</h3>
              </div>
              <p className="mt-2 text-slate-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="glass glass-hover rounded-3xl p-8 md:p-12 space-y-6 border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-blue-500/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gradient sm:text-4xl">
              What is WellConnect?
            </h2>
            <p className="mt-3 text-xl text-slate-300">
              A holistic approach to your wellbeing journey
            </p>
          </div>
          
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <p className="text-lg text-slate-200">
                WellConnect is more than just an app—it's a supportive community and comprehensive toolkit designed to help you prioritize and enhance your mental and physical wellbeing.
              </p>
              <p className="text-slate-300">
                Our platform combines evidence-based practices with modern technology to provide you with personalized resources, community support, and professional guidance—all in one place.
              </p>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-xl border border-cyan-500/20">
                <h4 className="font-medium text-cyan-400">Our Mission</h4>
                <p className="mt-2 text-sm text-slate-300">
                  To make mental health and wellness support accessible, approachable, and effective for everyone, regardless of where they are in their journey.
                </p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-purple-500/20">
                <h4 className="font-medium text-purple-400">Our Approach</h4>
                <p className="mt-2 text-sm text-slate-300">
                  We combine evidence-based practices with modern technology to create a holistic wellness experience that adapts to your unique needs and goals.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-3xl p-8 md:p-12 text-center shadow-2xl shadow-cyan-500/30 border border-cyan-400/30"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-4">
            Ready to start your wellness journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of others who are taking control of their mental and physical health with WellConnect.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button 
              className="px-8 py-3 bg-white text-cyan-600 font-semibold rounded-full hover:bg-gray-100 transition-colors shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
            <motion.button 
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;

