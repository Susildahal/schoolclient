import { motion } from "framer-motion";
import React from "react";

const Secondary = () => {
    return (
        <motion.div
            initial={{ opacity: 0, translateX:"-100%" }}
            animate={{ opacity: 1,  translateX:"0"  }}
            exit={{ opacity: 0, y: -20  , translateX:"-100%" }}
            transition={{ duration: 1.54 }}
            className=" h-auto  mt-[-60px] bg-slate-700 w-[100vw] text-white"
        >
            <main className=" ml-5 mt-20 lg:mt-28">
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2 }}
                    className="text-2xl font-bold"
                >
                </motion.h1>

                <div>
                    <motion.h1
                        className="text-center pt-10 text-xl md:text-3xl"
                        initial={{ opacity: 0, x: "-100%" }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 2 }}
                    >
                    Secondary
                    </motion.h1>
                    
                    <motion.div
          initial={{scale:0 ,opacity:0}}
          whileInView={{scale:1 ,opacity:1}}
          transition={{duration:2}}  
           className=" h-2 w-[85vw] rounded-full bg-red-400"></motion.div>

                    <div className="grid lg:grid-cols-2 text-white mt-8 gap-20 grid-cols-1">
                        {/* Left Section (Text) */}
                        <motion.div
                            className="text-left text-lg md:text-xl px-5"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                        >

                            Bagh Bhairav Secondary School, Kaleshower, Lalitpur provides a well-rounded educational environment that ensures all students can reach their full potential. The secondary level includes classes from Grade 8 to Grade 12, where students engage in a structured curriculum designed to develop both academic excellence and personal growth. At Bagh Bhairav, students are encouraged to actively participate in all academic and extracurricular activities, with parental support being a key factor in student success. Attendance in all classes and completion of assignments are essential to maximize learning opportunities. However, genuine absences due to illness are always understood.
                            <br />
                            <br />

                            Our faculty is composed of experienced educators who are dedicated to student success. They focus on making learning engaging and accessible by adapting teaching methods to fit student needs. Our curriculum is designed to be practical and relevant, ensuring students receive quality education in core subjects, while also offering STEM programs, extracurricular activities, and skill-based learning.
                            <br />
                            <br />
                            Bagh Bhairav Secondary School fosters a sense of social responsibility, discipline, and motivation among students. We recognize that success extends beyond academics, and we strive to provide a supportive learning atmosphere that encourages students to pursue their passions and future goals. Through a combination of academic rigor, extracurricular involvement, and personal development, we prepare our students for future challenges while nurturing their aspirations.
                        </motion.div>

                        {/* Right Section (Image) */}
                        <motion.div
                            initial={{ x: 50, scaleX: 0, opacity: 0 }}
                            whileInView={{ x: 0, scaleX: 1, opacity: 1 }}
                            transition={{ duration: 1 }}
                        >
                            <motion.img
                                className="h-[400px] w-[500px] rounded-lg shadow-lg mx-auto"
                                src="/image/Newprimary.jpeg" // Image path from public folder
                                alt="Primary"
                            />
                        </motion.div>
                    </div>
                </div>
            </main>
        </motion.div>
    );
};

export default Secondary;
