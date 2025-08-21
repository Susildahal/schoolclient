import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // or from 'next/link' if using Next.js
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: '../image/fb.png', alt: 'Facebook', url: 'https://www.facebook.com/profile.php?id=100093151088747' },
    { icon: '../image/gmail.png', alt: 'Email', url: 'mailto:info@baghbhariv.edu.np' },
    { icon: '../image/whatapp.png', alt: 'whatapp', url: 'https://www.whatsapp.com/' },
    { icon: '../image/viber.png', alt: 'viber', url: 'https://viber.com' }
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact Us', path: '/Contactus' },
    { name: 'Our Services', path: '/OurService' },
    { name: 'Student Details', path: '/Student' },
    { name: 'Notices', path: '/Aboutpublicnotic' }
  ];

  const contactInfo = [
    { icon: <MapPin size={18} />, text: 'Mahankal-4, Kaleshower, Lalitpur' },
    { icon: <Phone size={18} />, text: '+977 984-2188491' },
    { icon: <Phone size={18} />, text: '+977 984-2188491' },
    { icon: <Mail size={18} />, text: 'bbss.kaleshwor2022@gmail.com' }
  ];

  return (
    <footer className="bg-gray-900   text-white pt-16 pb-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* School Info */}
          <div className="flex flex-col items-center md:items-start">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-3">Bagh Bhariv School</h3>
              <p className="text-gray-400 leading-relaxed">
                Providing quality education since 1990. Empowering students to become future leaders.
              </p>
            </div>
            <div className="w-full max-w-xs overflow-hidden rounded-xl shadow-2xl border-2 border-gray-700">
              <img 
                src="../image/1.jpg" 
                alt="School Campus" 
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-semibold text-white mb-5 flex items-center">
              <ExternalLink className="mr-2" size={18} />
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-3 w-full">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-semibold text-white mb-5">Contact Information</h3>
            <ul className="space-y-3">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-gray-500 mr-3 mt-0.5">{item.icon}</span>
                  <span className="text-gray-400">{item.text}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 w-full">
              <h4 className="text-gray-400 mb-3">Opening Hours</h4>
              <p className="text-gray-500 text-sm">Sunday - Friday: 9AM - 4PM</p>
              <p className="text-gray-500 text-sm">Saturday: Closed</p>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-semibold text-white mb-5">Connect With Us</h3>
            <p className="text-gray-400 mb-4 text-center md:text-left">
              Follow us on social media for updates and news.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors"
                  aria-label={social.alt}
                >
                  <img 
                    src={social.icon} 
                    alt={social.alt} 
                    className="w-5 h-5 object-contain"
                  />
                </motion.a>
              ))}
            </div>
            
            <div className="mt-8 w-full">
              <h4 className="text-gray-400 mb-3">Newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md text-white font-medium transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500">
          <p className="text-sm">
            © {new Date().getFullYear()} Bagh Bhariv School. All rights reserved. | 
            <Link to="/privacy" className="hover:text-gray-300 ml-2">Privacy Policy</Link> | 
            <Link to="/terms" className="hover:text-gray-300 ml-2">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;