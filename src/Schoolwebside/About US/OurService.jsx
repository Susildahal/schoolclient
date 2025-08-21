import { motion, useScroll } from 'framer-motion';
import React from 'react';

const OurService = () => {
  const { scrollYProgress } = useScroll();

  const service = [
    {
      src: '/image/20.jpg',
      alt: 'Library Image',
      notice: "Good Reading Environment",
      desc: "A well-equipped library with a wide range of books, magazines, and educational materials. Comfortable seating arrangement to promote a calm and focused reading atmosphere. Quiet zones specifically designated for self-study and group discussions. Proper lighting and ventilation to create a conducive learning environment."
    },
    {
      src: '/image/2.jpeg',
      alt: 'Teacher Image',
      notice: "Experienced and Supportive Teachers",
      desc: "Highly qualified teachers with expertise in their subjects. Approachable and available for one-on-one guidance and doubt-clearing sessions. Regular training and workshops for teachers to stay updated with the latest teaching methods. Encouragement of interactive learning through discussions, debates, and group activities."
    },
    {
      src: '/image/12.avif',
      alt: 'Revision Class Image',
      notice: "Regular Revision Classes",
      desc: "Scheduled extra classes focusing on key topics and difficult areas. Use of practice tests and quizzes to assess understanding and track progress. Small group sessions for personalized attention and targeted learning. Feedback and evaluation to help students identify strengths and areas for improvement."
    },
    {
      src: '/image/3.jpeg',
      alt: 'School Premises',
      notice: "Clean and Safe School Premises",
      desc: "Regular cleaning and maintenance to ensure a hygienic environment. Safe drinking water and clean washroom facilities for students and staff. Proper security measures, including CCTV and trained security personnel. Adequate emergency exits and first aid facilities to handle unforeseen situations."
    },
    {
      src: '/image/aichild.webp',
      alt: 'Study Materials',
      notice: "Organized Study Materials",
      desc: "Availability of comprehensive notes, guides, and handouts for all subjects. Access to previous years’ question papers and sample papers for practice. Subject-specific study materials aligned with the curriculum. Easy access to materials through both physical and digital formats for convenience."
    },
    {
      src: '/image/laptop.webp',
      alt: 'Computer Lab',
      notice: "Access to Computer Labs",
      desc: "Well-maintained labs with modern computers and high-speed internet. Software and tools available for various subjects and research needs. Guidance from instructors to teach digital skills and safe internet practices. Regular updates of systems and software to keep up with technological advancements."
    }
  ];

  return (
    <div className="container mx-auto px-4">
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-1 left-0 h-2 z-50 w-full bg-red-800 rounded-full origin-left"
      />

      {/* Service grid */}
      <div className=" mt-20 gap-10 grid lg:grid-cols-3 md:grid-cols-2">
        {service.map((item, index) => (
          <div key={index} className="flex flex-col mt-10 items-center">
            <motion.img
              initial={{ x: '-50%', scale: 0.5, opacity: 0 }}
              whileInView={{ x: 0, scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              src={item.src}
              alt={item.alt}
              className="h-[200px] w-[250px] object-cover mb-4"
            />
            <div className="text-center text-slate-300 text-xl mb-4">
              {item.notice}
            </div>
            <div className="text-white text-lg text-left px-4">
              {item.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurService;
