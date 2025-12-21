import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaEnvelope, FaCommentDots } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../api/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get('success') === 'true') {
      toast.success('Your message has been submitted successfully!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await api.post('/contact', formData);
      toast.success('Message sent successfully!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

    } catch (error) {
      const errorMessage = error.response?.data?.errors?.[0]?.msg ||
        error.response?.data?.message ||
        'Failed to send message. Please try again.';
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-16 min-h-screen bg-surface-50">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100/50 text-primary-600 text-sm font-semibold tracking-wide uppercase">
            <FaEnvelope />
            <span>Get in Touch</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-text-primary">We'd love to hear from you.</h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Have questions about your wellness journey? Send us a message and our team will get back to you shortly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[2rem] p-8 md:p-12 shadow-card border border-surface-200 relative overflow-hidden"
        >
          {/* Decorative blurred blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 -z-0 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-50 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 -z-0 pointer-events-none" />

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-semibold text-text-primary ml-1">
                  Name <span className="text-coral-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 rounded-xl bg-surface-50 border border-surface-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-50 outline-none transition-all text-gray-900 placeholder:text-gray-400 font-medium"
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-text-primary ml-1">
                  Email <span className="text-coral-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 rounded-xl bg-surface-50 border border-surface-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-50 outline-none transition-all text-gray-900 placeholder:text-gray-400 font-medium"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="block text-sm font-semibold text-text-primary ml-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-5 py-3.5 rounded-xl bg-surface-50 border border-surface-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-50 outline-none transition-all text-gray-900 placeholder:text-gray-400 font-medium"
                placeholder="How can we help?"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-semibold text-text-primary ml-1">
                Message <span className="text-coral-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 rounded-xl bg-surface-50 border border-surface-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-50 outline-none transition-all text-gray-900 placeholder:text-gray-400 font-medium resize-none"
                  placeholder="Your message here..."
                ></textarea>
                <FaCommentDots className="absolute top-4 right-4 text-surface-300 pointer-events-none" />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 bg-gradient-to-r from-primary-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed transform-none' : ''
                  }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane /> <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
