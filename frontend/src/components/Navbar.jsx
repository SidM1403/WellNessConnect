import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaUserCircle, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
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
      setIsScrolled(window.scrollY > 10);
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
      { to: '/medical-articles', label: 'Medical Articles' },
      { to: '/forum', label: 'Forum' },
      { to: '/contact', label: 'Contact' },
    ];
    
    if (user) {
      baseLinks.push(
        { to: '/dashboard', label: 'Dashboard' },
        { to: '/ai-assistant', label: 'AI Assistant', icon: <FaRobot /> }
      );
    }
    
    return baseLinks;
  };

  return (
    <motion.header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/5' 
          : 'bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-transparent backdrop-blur-md'
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="group flex items-center gap-2 rounded-lg p-1 transition-all hover:bg-white/5"
          >
            <motion.div 
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 shadow-lg shadow-cyan-500/30"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(34, 211, 238, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              <svg 
                viewBox="0 0 24 24" 
                className="h-5 w-5 text-white" 
                aria-hidden="true"
              >
                <path
                  d="M12.1 5.1C10.3 3.3 7.4 3.4 5.7 5.1C3.9 6.9 3.9 9.7 5.7 11.5L12 17.8L18.3 11.5C20.1 9.7 20.1 6.9 18.3 5.1C16.6 3.4 13.7 3.3 11.9 5.1L12 5.2L12.1 5.1Z"
                  fill="currentColor"
                />
              </svg>
            </motion.div>
            <div className="ml-1">
              <p className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-lg font-bold text-transparent">
                WellConnect
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 flex-1 justify-center">
            {getNavLinks().map((link) => (
              <NavLink key={link.to} to={link.to} isHighlighted={link.icon}>
                {link.icon && <span className="mr-1">{link.icon}</span>}
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right side - User info and logout */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <>
                <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                  <FaUserCircle className="h-5 w-5 text-cyan-400" />
                  <span className="text-sm font-medium text-slate-200">
                    {user.name || 'User'}
                  </span>
                </div>
                <motion.button
                  onClick={handleLogout}
                  className="flex items-center rounded-lg px-4 py-2 text-sm font-medium text-slate-200 transition-all hover:bg-red-500/20 hover:text-red-400 border border-white/10 hover:border-red-500/30"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaSignOutAlt className="mr-1.5" />
                  Logout
                </motion.button>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <NavLink to="/login">Log in</NavLink>
                <motion.div
                  className="relative overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 shadow-lg shadow-cyan-500/30"
                  whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(34, 211, 238, 0.4)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/signup"
                    className="block px-4 py-2 text-sm font-medium text-white"
                  >
                    Sign up free
                  </Link>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  />
                </motion.div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-200 hover:bg-white/10 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden glass border-t border-white/10"
          >
            <div className="space-y-1 px-4 pb-3 pt-2">
              {getNavLinks().map((link) => (
                <MobileNavLink key={link.to} to={link.to}>
                  {link.icon && <span className="mr-2">{link.icon}</span>}
                  {link.label}
                </MobileNavLink>
              ))}
              
              {user ? (
                <>
                  <div className="border-t border-white/10 my-2"></div>
                  <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/5">
                    <FaUserCircle className="h-5 w-5 text-cyan-400" />
                    <span className="text-sm font-medium text-slate-200">
                      {user.name || 'User'}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center rounded-lg px-3 py-2 text-left text-sm font-medium text-red-400 hover:bg-red-500/20 transition-colors"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <div className="border-t border-white/10 my-2"></div>
                  <MobileNavLink to="/login">Log in</MobileNavLink>
                  <Link
                    to="/signup"
                    className="block w-full rounded-lg bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 px-3 py-2 text-center text-sm font-medium text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all"
                  >
                    Sign up free
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

// Reusable NavLink component
export const NavLink = ({ to, children, isHighlighted = false, className = '' }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`relative mx-1 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
        isActive
          ? 'text-cyan-400 bg-white/5 shadow-lg shadow-cyan-500/20' 
          : isHighlighted
          ? 'text-white bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-400 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50'
          : 'text-slate-300 hover:bg-white/5 hover:text-cyan-400'
      } ${className}`}
    >
      {children}
      {isActive && (
        <motion.span
          className="absolute bottom-1 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
          layoutId="activeNavIndicator"
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
    </Link>
  );
};

// Mobile NavLink component
const MobileNavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`block rounded-lg px-3 py-2 text-sm font-medium transition-all ${
        isActive ? 'bg-white/10 text-cyan-400 shadow-lg shadow-cyan-500/20' : 'text-slate-300 hover:bg-white/5 hover:text-cyan-400'
      }`}
    >
      <div className="flex items-center">
        {children}
      </div>
    </Link>
  );
};

export default Navbar;