import { motion } from 'framer-motion';
import { FaShieldAlt, FaUserMd, FaHeartbeat, FaUsers, FaLeaf, FaBrain } from 'react-icons/fa';
import PageHeader from '../components/PageHeader.jsx';
import SVGIllustration from '../components/SVGIllustration.jsx';

const values = [
  {
    icon: <FaShieldAlt className="w-6 h-6 text-blue-400" />,
    title: "Safety First",
    description: "Your safety is our top priority. We provide a secure environment for your wellness journey."
  },
  {
    icon: <FaUserMd className="w-6 h-6 text-green-400" />,
    title: "Professional Guidance",
    description: "Access resources created by healthcare professionals and wellness experts."
  },
  {
    icon: <FaHeartbeat className="w-6 h-6 text-pink-400" />,
    title: "Holistic Approach",
    description: "We address mental, emotional, and physical wellbeing for complete health."
  },
  {
    icon: <FaUsers className="w-6 h-6 text-purple-400" />,
    title: "Community Support",
    description: "Connect with others who understand and support your wellness journey."
  },
  {
    icon: <FaLeaf className="w-6 h-6 text-emerald-400" />,
    title: "Sustainable Habits",
    description: "Build lasting wellness habits that fit into your lifestyle."
  },
  {
    icon: <FaBrain className="w-6 h-6 text-yellow-400" />,
    title: "Mindfulness Focus",
    description: "Incorporate mindfulness practices into your daily routine for better mental health."
  }
];

const AboutWellness = () => {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-emerald-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10">
          <motion.h1 
            className="text-4xl md:text-5xl font-extrabold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About WellConnect
          </motion.h1>
          <motion.p 
            className="text-xl text-blue-100 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Empowering your wellness journey with compassion, science, and community support
          </motion.p>
        </div>
        <div className="absolute inset-0 opacity-20">
          <SVGIllustration variant="lotus" className="w-full h-full" />
        </div>
      </div>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="glass rounded-3xl p-8 md:p-12 space-y-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-4">
              Our Mission & Vision
            </h2>
            <p className="text-xl text-gray-300">
              At WellConnect, we believe that everyone deserves access to quality mental health and wellness resources, regardless of their background or circumstances.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">Our Mission</h3>
              <p className="text-gray-300">
                To create a world where mental health is prioritized, understood, and supported through accessible technology and compassionate community care.
              </p>
              <p className="text-gray-300">
                We're committed to breaking down barriers to mental health support by providing evidence-based tools, resources, and a supportive community—all in one place.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">Our Vision</h3>
              <p className="text-gray-300">
                We envision a future where mental health is treated with the same importance as physical health, and where seeking support is seen as a sign of strength.
              </p>
              <p className="text-gray-300">
                By combining technology with human connection, we aim to make mental health support more accessible, effective, and personalized for everyone.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Our Core Values
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-300">
            Guiding principles that shape everything we do
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="glass rounded-2xl p-6 transform transition-all duration-300 hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm">
                  {value.icon}
                </div>
                <h3 className="ml-3 text-lg font-medium text-white">{value.title}</h3>
              </div>
              <p className="mt-2 text-gray-300">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Safety Notice */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="bg-red-500/10 border border-red-500/30 rounded-3xl p-8 md:p-10 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <FaShieldAlt className="h-6 w-6 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-white">Important Safety Information</h3>
              <div className="mt-2 text-sm text-red-100">
                <p>
                  WellConnect is designed for general wellness and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                </p>
                <p className="mt-2 font-semibold">
                  If you are in crisis or think you may have an emergency, call your doctor or your local emergency number immediately.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Meet Our Team
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-300">
            Passionate individuals dedicated to your wellbeing
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Dr. Sarah Johnson",
              role: "Clinical Psychologist",
              bio: "Specializing in cognitive behavioral therapy and mindfulness-based stress reduction."
            },
            {
              name: "Michael Chen",
              role: "Lead Developer",
              bio: "Building technology that makes mental health support more accessible to everyone."
            },
            {
              name: "Elena Rodriguez",
              role: "Community Manager",
              bio: "Creating safe and supportive spaces for our community to connect and grow."
            }
          ].map((member, index) => (
            <motion.div
              key={index}
              className="glass rounded-2xl p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-blue-400 to-emerald-400 mb-4"></div>
              <h3 className="text-xl font-bold text-white">{member.name}</h3>
              <p className="text-emerald-300 mb-3">{member.role}</p>
              <p className="text-gray-300 text-sm">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutWellness;

