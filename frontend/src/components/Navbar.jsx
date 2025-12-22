import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaUserCircle, FaSignOutAlt, FaBars, FaTimes, FaSpa } from 'react-icons/fa';
import { useState, useEffect } from 'react';


const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getNavLinks = () => {
    const baseLinks = [
      { to: '/', label: 'Home' },
      { to: '/about-wellness', label: 'About' },
      { to: '/medical-articles', label: 'Start Reading' },
      { to: '/games', label: 'Brain Games' },
      { to: '/forum', label: 'Forum' },
      { to: '/contact', label: 'Contact' },
    ];

    if (user) {
      if (user.role === 'admin') {
        baseLinks.push({ to: '/admin', label: 'Admin Panel', icon: <FaUserCircle /> });
      }
      baseLinks.push(
        { to: '/dashboard', label: 'Dashboard' },
        { to: '/ai-assistant', label: 'AI Assistant', icon: <FaRobot /> }
      );
    }

    return baseLinks;
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
        className={`fixed left-0 right-0 z-50 mx-auto w-[98%] transition-all duration-300 ${isScrolled ? 'top-4' : 'top-6'
          }`}
      >
        <div className={`backdrop-blur-xl rounded-full pl-5 pr-2 py-2.5 flex items-center justify-between shadow-soft-xl border border-white/60 transition-all duration-300 ${isScrolled ? 'bg-white/90 shadow-lg' : 'bg-white/70'}`}>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group mr-8">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center text-white shadow-lg shadow-primary-500/30"
            >
              <FaSpa className="w-5 h-5" />
            </motion.div>
            <span className="font-display font-bold text-lg text-text-primary tracking-tight group-hover:text-primary-600 transition-colors hidden sm:block">WellConnect</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
            <div className="flex items-center bg-surface-100/50 rounded-full p-1 border border-white/40">
              {getNavLinks().map((link) => (
                <NavLink key={link.to} to={link.to} isHighlighted={!!link.icon} isSpecial={link.isSpecial}>
                  {link.icon && <span className="mr-1.5">{link.icon}</span>}
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>



          {/* User / Auth */}
          <div className="hidden md:flex items-center gap-3 ml-2">
            {user ? (
              <div className="flex items-center gap-2 pl-4 border-l border-surface-200 h-8">
                <div className="flex items-center gap-2 pr-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ring-4 ring-emerald-400/20" />
                  <span className="text-sm font-semibold text-text-primary">{user.name?.split(' ')[0]}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-100 text-text-secondary hover:bg-primary-50 hover:text-primary-600 transition-colors border border-surface-200 font-semibold text-sm"
                  title="Logout"
                >
                  <FaSignOutAlt />
                  <span className="hidden lg:inline">Logout</span>
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="px-5 py-2 rounded-full text-sm font-semibold text-text-secondary hover:text-primary-600 hover:bg-surface-50 transition-colors">Login</Link>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/signup" className="btn-primary flex items-center !py-2.5 !px-6 text-sm !rounded-full shadow-lg shadow-primary-500/20">Sign Up</Link>
                </motion.div>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-3 rounded-full bg-surface-50 text-text-secondary hover:text-primary-600 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
            className="fixed top-24 left-4 right-4 z-40 md:hidden"
          >
            <div className="bg-white/90 backdrop-blur-2xl rounded-[2rem] shadow-glass border border-white/60 p-5 space-y-2">
              {getNavLinks().map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-4 px-4 py-3.5 rounded-2xl hover:bg-primary-50/50 text-text-secondary hover:text-primary-600 transition-all"
                >
                  {link.icon ? <span className="text-primary-400">{link.icon}</span> : <span className="w-2 h-2 rounded-full bg-primary-200" />}
                  <span className="font-semibold">{link.label}</span>
                </Link>
              ))}

              <div className="h-px bg-gradient-to-r from-transparent via-surface-200 to-transparent my-4" />

              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-2xl bg-coral-50/50 text-coral-600 font-semibold hover:bg-coral-100 transition-colors"
                >
                  <FaSignOutAlt />
                  <span>Sign Out</span>
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="py-3.5 text-center rounded-2xl bg-surface-100 font-bold text-text-secondary hover:bg-surface-200 transition-colors">Login</Link>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="py-3.5 text-center rounded-2xl bg-primary-500 text-white font-bold shadow-lg shadow-primary-500/30">Sign Up</Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// NavLink Component
const NavLink = ({ to, children, isHighlighted, isSpecial }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));

  if (isSpecial) {
    return (
      <Link to={to} className="relative px-4 py-1.5 ml-1 mr-1 group">
        <div className={`absolute inset-0 rounded-full transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-violet-500 to-fuchsia-600 shadow-md' : 'bg-gradient-to-r from-violet-100 to-fuchsia-100 group-hover:from-violet-200 group-hover:to-fuchsia-200'}`} />
        <span className={`relative z-10 text-sm font-bold flex items-center gap-1.5 transition-colors duration-300 ${isActive ? 'text-white' : 'text-violet-700'}`}>
          <span className="text-lg">🧠</span>
          {children}
        </span>
      </Link>
    );
  }

  return (
    <Link to={to} className="relative px-5 py-2 group">
      {isActive && (
        <motion.div
          layoutId="nav-pill"
          className="absolute inset-0 bg-white rounded-full shadow-sm shadow-black/5"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}
      <span className={`relative z-10 text-sm font-semibold transition-colors duration-300 ${isActive ? 'text-primary-600' : 'text-text-secondary group-hover:text-primary-600'}`}>
        {children}
      </span>
    </Link>
  );
};

export default Navbar;