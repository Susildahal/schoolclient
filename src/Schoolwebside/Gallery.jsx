import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Gallery from './Home/Gallery';

const Newgallery = () => {
  const { scrollY } = useScroll();
    const { scrollYProgress } = useScroll();

  const images = [
    { src: '../image/1.jpg', alt: 'Image 1' },
    { src: '../image/2.jpg', alt: 'Image 2' },
    { src: '../image/2.jpg', alt: 'Image 3' },
    { src: '../image/1.jpg', alt: 'Image 4' },
    { src: '../image/1.jpg', alt: 'Image 5' },
    { src: '../image/1.jpg', alt: 'Image 6' },
    { src: '../image/1.jpg', alt: 'Image 7' },
    { src: '../image/1.jpg', alt: 'Image 8' },
  ];
  const y = useTransform(scrollY, [0, 1000], [0, -100 ]);

  return (
    <>
       <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-1 left-0  lg:mx-[10vw] h-2 z-50 w-full bg-red-800 rounded-full origin-left"
      />
   
    <div className=' '>
    <div className='grid  z-auto  mt-20 grid-cols-2  h-auto w-full md:grid-cols-3   bg-gradient-to-r from-amber-300 via-lime-300 to-red-300  lg:grid-cols-4 gap-2 md:gap-6'>
      {images.map((image, index) => {
       
        
        return (
          <motion.div
            key={index}
            className='relative group'
            style={{ y }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ margin: '-100px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <motion.img
              src={image.src}
              alt={image.alt}
              className='w-full h-full  object-cover rounded-lg shadow-lg'
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
            />
            
            <motion.div
              className='absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 rounded-lg'
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
             
            </motion.div>
          </motion.div>
        );
      })}
    </div>
    <div className='-mt-32'>
        <Gallery/>
        </div>
    </div >
    
    </>
  );
};

export default Newgallery;