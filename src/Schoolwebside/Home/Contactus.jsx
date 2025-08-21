import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Check, User, MessageCircle } from 'lucide-react';
import { save } from "../redux/slicer/userMessageSlicer.js";
import { useDispatch } from 'react-redux';


function Contact() {
    const [formData, setFormData] = useState({
        firstName: '', 
        lastName: '',
        email: '',
        message: '',
        phone: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }
        
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        }

        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length === 0) {
            setIsSubmitting(true);

            // Combine firstName and lastName into a single name field
            const messageData = {
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                email: formData.email,
                message: formData.message,
                phone: formData.phone
            };

            setTimeout(() => {
                setIsSubmitted(true);
                setIsSubmitting(false);
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    message: '',
                    phone: ''
                });

                dispatch(save(messageData));
            }, 1000);
        } else {
            setErrors(newErrors);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    const contactItems = [
        {
            icon: Mail,
            title: 'Email Us',
            info: 'susildahal@gmail.com',
            color: 'text-blue-400'
        },
        {
            icon: Phone,
            title: 'Call Us',
            info: '+977 984-1234567',
            color: 'text-green-400'
        },
        {
            icon: MapPin,
            title: 'Visit Us',
            info: '12 lalitpur, Nepal',
            color: 'text-purple-400'
        }
    ];

    return (
        <div className="max-w-7xl mx-auto  mt-16 mb-10 flex">
            <motion.div 
                className="overflow-hidden w-full"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="grid  md:grid-cols-2 gap-6 min-h-[600px]">
                    {/* Left Side - Information */}
                    <motion.div 
                        className="bg-gradient-to-br rounded-3xl from-blue-600 via-blue-700 to-purple-700 p-12 flex flex-col justify-center relative overflow-hidden"
                        variants={itemVariants}
                    >
                        {/* Animated background elements */}
                        <div className="absolute inset-0 opacity-10">
                            <motion.div 
                                className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 180, 360]
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                            <motion.div 
                                className="absolute bottom-20 right-10 w-24 h-24 bg-white rounded-full"
                                animate={{
                                    y: [0, -20, 0],
                                    opacity: [0.3, 0.8, 0.3]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                            <motion.div 
                                className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.2, 0.6, 0.2]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        </div>
                        
                        <div className="relative z-10 text-white">
                            <motion.div 
                                className="mb-8"
                                variants={itemVariants}
                            >
                                <motion.h1 
                                    className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                >
                                    Let's Start a
                                    <motion.span 
                                        className="  pl-3"
                                        initial={{ x: -50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.8, delay: 0.4 }}
                                    >
                                        Conversation
                                    </motion.span>
                                </motion.h1>
                                <motion.p 
                                    className="text-xl text-blue-100 mb-8 leading-relaxed"
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.6 }}
                                >
                                    We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                                </motion.p>
                            </motion.div>
                            
                            <motion.div 
                                className="space-y-6"
                                variants={containerVariants}
                            >
                                {contactItems.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex items-center space-x-4 group cursor-pointer"
                                        variants={itemVariants}
                                        whileHover={{ 
                                            x: 10,
                                            transition: { duration: 0.3 }
                                        }}
                                        initial={{ x: -30, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                                    >
                                        <motion.div 
                                            className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-opacity-30 transition-all duration-300"
                                            whileHover={{ 
                                                scale: 1.1,
                                                rotate: 360,
                                                transition: { duration: 0.5 }
                                            }}
                                        >
                                            <item.icon className={`w-6 h-6 ${item.color} group-hover:scale-110 transition-transform duration-300`} />
                                        </motion.div>
                                        <div>
                                            <h3 className="font-semibold text-lg group-hover:text-yellow-300 transition-colors duration-300">{item.title}</h3>
                                            <p className="text-blue-200 group-hover:text-blue-100 transition-colors duration-300">{item.info}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Side - Form */}
                    <motion.div 
                        className="lg:pl-12 pl-2 mg:pl-7 flex flex-col justify-center"
                        variants={itemVariants}
                    >
                        <div className="">
                            <motion.div 
                                className="text-center mb-8"
                                initial={{ y: -30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                <h2 className="text-3xl font-bold text-gray-800 mb-3">Send Message</h2>
                                <p className="text-gray-600">Fill out the form below and we'll get back to you soon.</p>
                            </motion.div>

                            <AnimatePresence mode="wait">
                                {isSubmitted ? (
                                    <motion.div 
                                        className="text-center"
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.8, opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <motion.div 
                                            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
                                        >
                                            <Check className="w-8 h-8 text-green-600" />
                                        </motion.div>
                                        <motion.h3 
                                            className="text-xl font-semibold text-gray-800 mb-2"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 0.4 }}
                                        >
                                            Message Sent!
                                        </motion.h3>
                                        <motion.p 
                                            className="text-gray-600 mb-4"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 0.6 }}
                                        >
                                            Thank you for reaching out. We'll respond soon.
                                        </motion.p>
                                        <motion.button
                                            onClick={() => {
                                                setIsSubmitted(false);
                                                setFormData({
                                                    firstName: '',
                                                    lastName: '',
                                                    email: '',
                                                    message: '',
                                                    phone: ''
                                                });
                                            }}
                                            className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer transition-colors"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 0.8 }}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Send Another Message
                                        </motion.button>
                                    </motion.div>
                                ) : (
                                    <motion.form 
                                        onSubmit={handleSubmit}
                                        className="space-y-4"
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ duration: 0.6 }}
                                    >
                                        <motion.div 
                                            className="grid grid-cols-2 gap-4"
                                            variants={containerVariants}
                                        >
                                            <motion.div variants={itemVariants}>
                                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                                    <User className="w-4 h-4 text-gray-500" />
                                                    First Name
                                                </label>
                                                <motion.input
                                                    type="text"
                                                    id="firstName"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    className={`w-full px-4 py-2 border-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                        errors.firstName 
                                                            ? 'border-red-300 bg-red-50' 
                                                            : 'border-gray-300 hover:border-blue-400 focus:border-blue-500'
                                                    }`}
                                                    placeholder="John"
                                                    whileFocus={{ scale: 1.02 }}
                                                    transition={{ duration: 0.2 }}
                                                />
                                                <AnimatePresence>
                                                    {errors.firstName && (
                                                        <motion.div 
                                                            className="text-red-500 text-sm mt-1"
                                                            initial={{ opacity: 0, y: -10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: -10 }}
                                                        >
                                                            {errors.firstName}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                            
                                            <motion.div variants={itemVariants} className="pr-3">
                                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                                    <User className="w-4 h-4 text-gray-500" />
                                                    Last Name
                                                </label>
                                                <motion.input
                                                    type="text"
                                                    id="lastName"
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                    className={`w-full px-4 py-2  border-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                        errors.lastName 
                                                            ? 'border-red-300 bg-red-50' 
                                                            : 'border-gray-300 hover:border-blue-400 focus:border-blue-500'
                                                    }`}
                                                    placeholder="Doe"
                                                    whileFocus={{ scale: 1.02 }}
                                                    transition={{ duration: 0.2 }}
                                                />
                                                <AnimatePresence>
                                                    {errors.lastName && (
                                                        <motion.div 
                                                            className="text-red-500 text-sm mt-1"
                                                            initial={{ opacity: 0, y: -10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: -10 }}
                                                        >
                                                            {errors.lastName}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        </motion.div>


                                          <motion.div variants={itemVariants} className='pr-3'>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                                <Phone className="w-4 h-4 text-gray-500" />
                                                Phone Number
                                            </label>
                                            <motion.input
                                                type="text"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2 border-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                    errors.phone 
                                                        ? 'border-red-300 bg-red-50' 
                                                        : 'border-gray-300 hover:border-blue-400 focus:border-blue-500'
                                                }`}
                                                placeholder="9863*****"
                                                whileFocus={{ scale: 1.02 }}
                                                transition={{ duration: 0.2 }}
                                            />
                                            <AnimatePresence>
                                                {errors.phone && (
                                                    <motion.div 
                                                        className="text-red-500 text-sm mt-1"
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                    >
                                                        {errors.phone}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>

                                        
                                        <motion.div variants={itemVariants} className='pr-3'>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-gray-500" />
                                                Email Address
                                            </label>
                                            <motion.input
                                                type="text"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2 border-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                    errors.email 
                                                        ? 'border-red-300 bg-red-50' 
                                                        : 'border-gray-300 hover:border-blue-400 focus:border-blue-500'
                                                }`}
                                                placeholder="john@example.com"
                                                whileFocus={{ scale: 1.02 }}
                                                transition={{ duration: 0.2 }}
                                            />
                                            <AnimatePresence>
                                                {errors.email && (
                                                    <motion.div 
                                                        className="text-red-500 text-sm mt-1"
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                    >
                                                        {errors.email}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                        
                                        <motion.div variants={itemVariants} className='pr-3'>
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                                <MessageCircle className="w-4 h-4 text-gray-500" />
                                                Message
                                            </label>
                                            <motion.textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                rows="4"
                                                className={`w-full px-4 py-2 border-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                                                    errors.message 
                                                        ? 'border-red-300 bg-red-50' 
                                                        : 'border-gray-300 hover:border-blue-400 focus:border-blue-500'
                                                }`}
                                                placeholder="Tell us about your project or question..."
                                                whileFocus={{ scale: 1.02 }}
                                                transition={{ duration: 0.2 }}
                                            />
                                            <AnimatePresence>
                                                {errors.message && (
                                                    <motion.div 
                                                        className="text-red-500 text-sm mt-1"
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                    >
                                                        {errors.message}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                        
                                        <div className=' pr-3'>
                                            <motion.button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full bg-gradient-to-r  from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                                                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ duration: 0.5, delay: 0.8 }}
                                            >
                                                {isSubmitting ? (
                                                    <motion.span 
                                                        className="flex items-center justify-center gap-2"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                    >
                                                        <motion.div
                                                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                                            animate={{ rotate: 360 }}
                                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                        />
                                                        Sending...
                                                    </motion.span>
                                                ) : (
                                                    <>
                                                        <Send className="w-5 h-5" />
                                                        Send Message
                                                    </>
                                                )}
                                            </motion.button>
                                        </div>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}

export default Contact;