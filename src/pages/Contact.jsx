import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useSchool } from '../context/SchoolContext';
import { MapPin, Phone, Mail, Clock, Send, Loader2, LogIn } from 'lucide-react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  const { theme } = useTheme();
  const { user } = useSchool();

  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    setSubmitError('');

    try {
      const response = await axios.post(`${backendUrl}/api/users/contact`, formData);
      setSubmitMessage(response.data.message);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      setSubmitError(error.response?.data?.error || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-8 w-8" />,
      title: 'Visit Us',
      details: '123 Education Street\nLearning City, LC 12345'
    },
    {
      icon: <Phone className="h-8 w-8" />,
      title: 'Call Us',
      details: 'Main: (555) 123-4567\nAdmission: (555) 123-4568'
    },
    {
      icon: <Mail className="h-8 w-8" />,
      title: 'Email Us',
      details: 'info@brightvalley.edu\nadmissions@brightvalley.edu'
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: 'Office Hours',
      details: 'Mon-Fri: 8:00 AM - 4:00 PM\nSat: 9:00 AM - 12:00 PM'
    }
  ];

  const departments = [
    {
      title: "Principal's Office",
      name: 'Dr. Michael Johnson',
      phone: '(555) 123-4569',
      email: 'principal@brightvalley.edu',
      image: '/images/faculty-1.avif'
    },
    {
      title: 'Admissions Office',
      name: 'Sarah Williams',
      phone: '(555) 123-4568',
      email: 'admissions@brightvalley.edu',
      image: '/images/faculty-3.avif'
    },
    {
      title: 'Student Services',
      name: 'James Chen',
      phone: '(555) 123-4570',
      email: 'services@brightvalley.edu',
      image: '/images/faculty-2.avif'
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="/images/faculty-bg.avif"
            alt="Contact"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/60"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">Get in Touch</h1>
          <p className="text-xl md:text-2xl animate-fade-in-delay">We'd Love to Hear From You</p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in">
            {contactInfo.map((info, index) => (
              <div key={index} className={`bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-scale-in stagger-${index + 1}`}>
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-${theme.primaryLight} text-${theme.primary} rounded-full mb-4 animate-float`}>
                  {info.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{info.title}</h3>
                <p className="text-gray-600 whitespace-pre-line text-sm">{info.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-fade-in">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg animate-slide-in-left">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Message</h2>

              {user ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-${theme.ring} focus:border-transparent transition-all duration-200`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-${theme.ring} focus:border-transparent transition-all duration-200`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-${theme.ring} focus:border-transparent transition-all duration-200`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-${theme.ring} focus:border-transparent transition-all duration-200`}
                    >
                      <option value="">Select a topic</option>
                      <option value="admission">Admission Inquiry</option>
                      <option value="academics">Academic Programs</option>
                      <option value="facilities">Campus Tour</option>
                      <option value="general">General Question</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-${theme.ring} focus:border-transparent transition-all duration-200`}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-${theme.primary} hover:bg-${theme.primaryHover} text-white px-6 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>

                  {submitMessage && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800 text-sm">{submitMessage}</p>
                    </div>
                  )}

                  {submitError && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800 text-sm">{submitError}</p>
                    </div>
                  )}
                </form>
              ) : (
                <div className="text-center py-12">
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-${theme.primaryLight} text-${theme.primary} rounded-full mb-6 animate-float`}>
                    <LogIn className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Login Required</h3>
                  <p className="text-gray-600 mb-6">
                    Please login to send us a message. This helps us provide you with better support and maintain secure communication.
                  </p>
                  <button
                    onClick={() => window.location.href = '/login'}
                    className={`bg-${theme.primary} hover:bg-${theme.primaryHover} text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 inline-flex items-center`}
                  >
                    <LogIn className="h-5 w-5 mr-2" />
                    Login to Send Message
                  </button>
                </div>
              )}
            </div>

            {/* Map */}
            <div className="bg-white p-8 rounded-2xl shadow-lg animate-slide-in-right">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Find Us</h2>

              <div className="relative rounded-xl overflow-hidden mb-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2412648751115!2d-73.98731668482413!3d40.75054557932881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1623454928346!5m2!1sen!2sus"
                  width="100%"
                  height="256"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl"
                  title="School Location"
                ></iframe>
                <div className={`absolute inset-0 bg-${theme.primary}/10 flex items-center justify-center pointer-events-none`}>
                  <div className={`bg-${theme.primary} text-white p-3 rounded-full animate-bounce-in`}>
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=123+Education+Street+Learning+City+LC+12345', '_blank')}
                  className={`w-full bg-${theme.primary} hover:bg-${theme.primaryHover} text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300`}
                >
                  Get Directions
                </button>
                <button
                  onClick={() => window.open('https://maps.google.com/maps?q=123+Education+Street+Learning+City+LC+12345', '_blank')}
                  className={`w-full bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300`}
                >
                  View on Google Maps
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Department Contacts */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            Department Contacts
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {departments.map((dept, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={dept.image}
                    alt={dept.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className={`text-lg font-bold text-${theme.primary}`}>{dept.title}</h3>
                    <p className={`text-${theme.primary}`}>{dept.name}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Phone className={`h-4 w-4 mr-2 text-${theme.primary}`} />
                    <span className={`text-${theme.primary}`}>{dept.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className={`h-4 w-4 mr-2 text-${theme.primary}`} />
                    <span className={`text-${theme.primary}`}>{dept.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;