// import React, { useState } from "react";
// import { motion } from "framer-motion";

// const OurCoreValue = () => {
//   const [hoveredIndex, setHoveredIndex] = useState(null);

//   const coreValues = [
//     { name: "Compassion", icon: "❤️", color: "from-blue-500 to-indigo-500", bgColor: "bg-blue-50", hoverBg: "hover:bg-blue-100" },
//     { name: "Respect", icon: "🤝", color: "from-indigo-500 to-blue-500", bgColor: "bg-indigo-50", hoverBg: "hover:bg-indigo-100" },
//     { name: "Service", icon: "🌟", color: "from-blue-600 to-cyan-500", bgColor: "bg-cyan-50", hoverBg: "hover:bg-cyan-100" },
//     { name: "Excellence", icon: "🏆", color: "from-purple-500 to-blue-500", bgColor: "bg-purple-50", hoverBg: "hover:bg-purple-100" },
//     { name: "Teamwork", icon: "👥", color: "from-teal-500 to-blue-500", bgColor: "bg-teal-50", hoverBg: "hover:bg-teal-100" },
//     { name: "Integrity", icon: "⚖️", color: "from-cyan-500 to-indigo-500", bgColor: "bg-gray-50", hoverBg: "hover:bg-gray-100" },
//     { name: "Empowerment", icon: "💪", color: "from-blue-500 to-purple-500", bgColor: "bg-slate-50", hoverBg: "hover:bg-slate-100" },
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.15,
//         delayChildren: 0.2,
//       },
//     },
//   };

//   const cardVariants = {
//     hidden: { 
//       opacity: 0, 
//       y: 30, 
//       scale: 0.95 
//     },
//     visible: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 15,
//       },
//     },
//   };

//   return (
//     <div className="h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 lg:px-20 relative overflow-hidden flex flex-col justify-center">
//       {/* Subtle Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         {/* Geometric shapes */}
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
//           className="absolute top-32 right-32 w-40 h-40 border-2 border-blue-200/20 rounded-full"
//         />
//         <motion.div
//           animate={{ rotate: -360 }}
//           transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
//           className="absolute bottom-40 left-20 w-32 h-32 border-2 border-indigo-200/30 rounded-full"
//         />
        
//         {/* Floating elements */}
//         {[...Array(8)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-2 h-2 bg-blue-300/30 rounded-full"
//             animate={{
//               y: [0, -20, 0],
//               opacity: [0.3, 0.7, 0.3],
//             }}
//             transition={{
//               duration: Math.random() * 4 + 3,
//               repeat: Infinity,
//               delay: Math.random() * 2,
//             }}
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//             }}
//           />
//         ))}
//       </div>

//       {/* Main Title */}
//       <motion.div
//         className="text-center mb-12"
//         initial={{ opacity: 0, y: -30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//         viewport={{ once: true }}
//       >
//         <motion.h1
//           className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
//           initial={{ opacity: 0, scale: 0.9 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           viewport={{ once: true }}
//         >
//           Our <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Core Values</span>
//         </motion.h1>
//         <motion.p
//           className="text-lg text-gray-600 max-w-2xl mx-auto mb-6"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//           viewport={{ once: true }}
//         >
//           The foundation of our educational philosophy and the principles that guide every aspect of our institution
//         </motion.p>
//         <motion.div
//           className="w-32 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"
//           initial={{ scaleX: 0 }}
//           whileInView={{ scaleX: 1 }}
//           transition={{ duration: 1, delay: 0.6 }}
//           viewport={{ once: true }}
//         />
//       </motion.div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 max-w-7xl mx-auto flex-1">
//         {/* Image Section */}
//         <motion.div
//           className="relative group order-2 lg:order-1"
//           initial={{ opacity: 0, x: -50 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           viewport={{ once: true }}
//         >
//           <div className="absolute -inset-1 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-3xl blur opacity-50 group-hover:opacity-75 transition duration-500"></div>
//           <div className="relative">
//             <motion.img
//               src="/image/1.jpg"
//               alt="Core Values Representation"
//               className="w-full h-[50vh] lg:h-[55vh] object-cover rounded-3xl shadow-xl relative z-10 border-4 border-white"
//               whileHover={{ scale: 1.02 }}
//               transition={{ type: "spring", stiffness: 300, damping: 30 }}
//             />
//             <motion.div
//               className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent rounded-3xl z-20"
//               initial={{ opacity: 0 }}
//               whileHover={{ opacity: 1 }}
//               transition={{ duration: 0.3 }}
//             />
//           </div>
          
//           {/* Decorative elements around image */}
//           <motion.div
//             className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl shadow-lg"
//             animate={{ rotate: [0, 10, -10, 0] }}
//             transition={{ duration: 4, repeat: Infinity }}
//           />
//           <motion.div
//             className="absolute -bottom-4 -left-4 w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full shadow-lg"
//             animate={{ scale: [1, 1.1, 1] }}
//             transition={{ duration: 3, repeat: Infinity }}
//           />
//         </motion.div>

//         {/* Values Section */}
//         <motion.div
//           className="space-y-4 order-1 lg:order-2"
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//         >
//           <motion.div
//             className="mb-8"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 leading-tight">
//               Building quality lives and{" "}
//               <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//                 strong culture
//               </span>{" "}
//               through...
//             </h2>
//             <p className="text-base text-gray-600">
//               These core values shape our educational approach and create a nurturing environment for growth.
//             </p>
//           </motion.div>

//           <div className="grid gap-3">
//             {coreValues.map((value, index) => (
//               <motion.div
//                 key={index}
//                 variants={cardVariants}
//                 className="group relative"
//                 onHoverStart={() => setHoveredIndex(index)}
//                 onHoverEnd={() => setHoveredIndex(null)}
//                 whileHover={{ 
//                   scale: 1.03,
//                   x: 10
//                 }}
//               >
//                 <div className={`relative bg-white ${value.hoverBg} border-2 border-gray-200 hover:border-blue-300 rounded-xl p-4 transition-all duration-300 shadow-md hover:shadow-lg`}>
//                   {/* Animated Background Gradient */}
//                   <motion.div
//                     className={`absolute inset-0 bg-gradient-to-r ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl`}
//                   />
                  
//                   <div className="relative z-10 flex items-center space-x-4">
//                     <motion.div
//                       className="text-2xl p-2 bg-white rounded-xl shadow-md border border-gray-100"
//                       animate={hoveredIndex === index ? {
//                         rotate: [0, -5, 5, 0],
//                         scale: [1, 1.1, 1.05, 1]
//                       } : {}}
//                       transition={{ duration: 0.5 }}
//                     >
//                       {value.icon}
//                     </motion.div>
                    
//                     <div className="flex-1">
//                       <motion.h3
//                         className="text-lg lg:text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300 mb-1"
//                         animate={hoveredIndex === index ? {
//                           x: [0, 3, 0]
//                         } : {}}
//                         transition={{ duration: 0.3 }}
//                       >
//                         {value.name}
//                       </motion.h3>
//                       <motion.div
//                         className={`h-0.5 bg-gradient-to-r ${value.color} rounded-full transition-all duration-300`}
//                         initial={{ width: 0 }}
//                         whileInView={{ width: hoveredIndex === index ? "100%" : "30%" }}
//                         transition={{ duration: 0.5 }}
//                       />
//                     </div>

//                     {/* Arrow indicator */}
//                     <motion.div
//                       className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                       animate={hoveredIndex === index ? { x: [0, 3, 0] } : {}}
//                       transition={{ duration: 0.5, repeat: Infinity }}
//                     >
//                       <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
//                         <motion.div className="w-3 h-3 border-r-2 border-t-2 border-white transform rotate-45" />
//                       </div>
//                     </motion.div>
//                   </div>

//                   {/* Subtle hover particles */}
//                   {hoveredIndex === index && (
//                     <motion.div
//                       className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       exit={{ opacity: 0 }}
//                     >
//                       {[...Array(3)].map((_, i) => (
//                         <motion.div
//                           key={i}
//                           className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full"
//                           initial={{ 
//                             x: "10%", 
//                             y: "50%",
//                             scale: 0,
//                             opacity: 0
//                           }}
//                           animate={{
//                             x: "90%",
//                             y: `${30 + Math.random() * 40}%`,
//                             scale: [0, 1, 0],
//                             opacity: [0, 0.8, 0]
//                           }}
//                           transition={{
//                             duration: 2,
//                             delay: i * 0.3,
//                             repeat: Infinity,
//                             repeatDelay: 1
//                           }}
//                         />
//                       ))}
//                     </motion.div>
//                   )}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </div>

//       {/* Bottom Decorative Element */}
//       <motion.div
//         className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
//         animate={{
//           y: [0, -8, 0],
//         }}
//         transition={{
//           duration: 2.5,
//           repeat: Infinity,
//           repeatType: "reverse",
//         }}
//       >
//         <div className="w-12 h-12 border-2 border-blue-300 rounded-full flex items-center justify-center bg-white shadow-lg">
//           <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
//         </div>
//       </motion.div>

//       {/* Additional decorative elements */}
//       <motion.div
//         className="absolute top-1/4 right-10 w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl shadow-lg opacity-70"
//         animate={{ 
//           rotate: [0, 360],
//           scale: [1, 1.05, 1]
//         }}
//         transition={{ 
//           rotate: { duration: 20, repeat: Infinity, ease: "linear" },
//           scale: { duration: 4, repeat: Infinity }
//         }}
//       />
//     </div>
//   );
// };

// export default OurCoreValue;
import React from 'react'

function Ourcorevalue() {
  return (
    <div>
      
    </div>
  )
}

export default Ourcorevalue
