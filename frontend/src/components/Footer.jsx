import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSpa, FaInstagram, FaTwitter, FaLinkedin, FaYoutube, FaHeart, FaChevronRight } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; // Assuming newer icons, if not fallback to FaTwitter

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { name: 'Home', path: '/' },
      { name: 'About Us', path: '/about-wellness' },
      { name: 'Community Forum', path: '/forum' },
      { name: 'Medical Articles', path: '/medical-articles' },
      { name: 'Get in Touch', path: '/contact' },
    ],
    resources: [
      { name: 'Mental Health Resources', path: '/resources' },
      { name: 'Community Guidelines', path: '#' }, // Placeholder/Future
      { name: 'Help Center', path: '#' },
      { name: 'Privacy Policy', path: '#' },
      { name: 'Terms of Service', path: '#' },
    ]
  };

  const socialLinks = [
    { icon: <FaInstagram />, href: '#', label: 'Instagram', color: 'hover:text-pink-500' },
    { icon: <FaXTwitter />, href: '#', label: 'X (Twitter)', color: 'hover:text-black' },
    { icon: <FaLinkedin />, href: '#', label: 'LinkedIn', color: 'hover:text-blue-600' },
    { icon: <FaYoutube />, href: '#', label: 'YouTube', color: 'hover:text-red-500' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-surface-50 to-white dark:from-dark-surface-100 dark:to-dark-surface-50 pt-20 pb-10 overflow-hidden border-t border-surface-200/60 dark:border-dark-surface-200/60 rounded-t-[2.5rem] mt-auto">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-50/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white shadow-lg shadow-primary-500/20 group-hover:rotate-180 transition-transform duration-500">
                <FaSpa className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-xl text-text-primary dark:text-dark-text-primary tracking-tight">WellConnect</span>
            </Link>
            <p className="text-text-secondary dark:text-dark-text-secondary leading-relaxed max-w-xs">
              Supporting mental wellness through technology. Join our community to build healthier habits and find your balance.
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-100 dark:bg-dark-surface-200 border border-surface-200 dark:border-dark-surface-200 text-xs font-semibold text-primary-600 dark:text-dark-primary-600">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Systems Operational
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-text-primary dark:text-dark-text-primary mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-4">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-text-secondary dark:text-dark-text-secondary hover:text-primary-600 dark:hover:text-dark-primary-600 transition-colors flex items-center gap-2 group"
                  >
                    <FaChevronRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-primary-400" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-text-primary dark:text-dark-text-primary mb-6 text-lg">Resources</h3>
            <ul className="space-y-4">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-text-secondary dark:text-dark-text-secondary hover:text-primary-600 dark:hover:text-dark-primary-600 transition-colors flex items-center gap-2 group"
                  >
                    <FaChevronRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-primary-400" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h3 className="font-bold text-text-primary dark:text-dark-text-primary mb-6 text-lg">Connect With Us</h3>
            <p className="text-text-secondary dark:text-dark-text-secondary mb-6 text-sm">
              Follow us on social media for daily tips and community updates.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-full bg-white dark:bg-dark-surface-200 border border-surface-200 dark:border-dark-surface-200 flex items-center justify-center text-text-secondary dark:text-dark-text-secondary shadow-sm hover:shadow-md transition-all duration-300 ${social.color}`}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-surface-200/60 dark:border-dark-surface-200/60 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-light dark:text-dark-text-light">
          <p>© {currentYear} WellConnect. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <FaHeart className="text-coral-500 w-4 h-4 animate-pulse" />
            <span>for a better tomorrow</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
