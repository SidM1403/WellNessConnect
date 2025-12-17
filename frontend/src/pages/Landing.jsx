import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkle, Users } from 'lucide-react';

const features = [
  'Community forum with real posts',
  'Track wellbeing activities',
  'Curated wellness resources',
  'Admin moderation controls'
];

const Landing = () => (
  <section className="py-10 space-y-8">
    <div className="text-center space-y-4">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold"
      >
        WellConnect — Your Health & Wellness Community
      </motion.h1>
      <p className="text-slate-300 max-w-2xl mx-auto">
        Join discussions, access resources, and track your wellbeing with peers and mentors.
      </p>
      <div className="flex gap-3 justify-center">
        <Link to="/signup" className="px-4 py-2 rounded bg-accent text-slate-900 font-semibold">
          Get Started
        </Link>
        <Link to="/forum" className="px-4 py-2 rounded glass">
          View Community
        </Link>
      </div>
    </div>
    <div className="grid md:grid-cols-2 gap-4">
      {features.map((f) => (
        <motion.div key={f} whileHover={{ y: -3 }} className="glass p-4 rounded-lg flex gap-3">
          <Sparkle className="text-accent mt-1" />
          <p className="text-left">{f}</p>
        </motion.div>
      ))}
    </div>
    <div className="glass p-6 rounded-lg flex items-center gap-3">
      <Users className="text-accent" />
      <div>
        <p className="font-semibold">Real-time data</p>
        <p className="text-slate-300 text-sm">
          All sections pull from the API: posts, resources, dashboards, and profiles.
        </p>
      </div>
    </div>
  </section>
);

export default Landing;

