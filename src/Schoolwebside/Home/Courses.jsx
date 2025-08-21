import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Users,
  Clock,
  ChevronRight,
  Calculator,
  Cog,
} from "lucide-react";

const CoursesSection = () => {
  const [activeTab, setActiveTab] = useState("primary");
  const [language, setLanguage] = useState("en");

  const courses = {
    primary: {
      en: {
        title: "Primary Education",
        subtitle: "Foundation for Future Success",
        description:
          "Building strong fundamentals in core subjects with interactive learning methods.",
        grades: "Classes 1-5",
        duration: "5 Years",
        students: "200+ Students",
        image: "/api/placeholder/600/400",
        subjects: [
          "English Language",
          "Nepali",
          "Mathematics",
          "Science",
          "Social Studies",
          "Computer Basics",
          "Arts & Crafts",
          "Physical Education",
        ],
        features: [
          "Interactive learning methods",
          "Child-friendly environment",
          "Experienced primary teachers",
          "Regular parent-teacher meetings",
          "Extra-curricular activities",
          "Individual attention to each child",
        ],
      },
      np: {
        title: "प्राथमिक शिक्षा",
        subtitle: "भविष्यको आधार",
        description:
          "बालबालिकाको समग्र विकासका लागि आधारभूत विषयहरूमा बलियो जग निर्माण गर्दै रमाइलो तरिकाले सिकाउने।",
        grades: "कक्षा १-५",
        duration: "५ वर्ष",
        students: "२००+ विद्यार्थी",
        image: "/api/placeholder/600/400",
        subjects: [
          "अंग्रेजी भाषा",
          "नेपाली",
          "गणित",
          "विज्ञान",
          "सामाजिक अध्ययन",
          "कम्प्युटर आधारभूत ज्ञान",
          "चित्रकला र हस्तकला",
          "शारीरिक शिक्षा",
        ],
        features: [
          "रमाइलो सिकाइ वातावरण",
          "बालमैत्री कक्षा कोठा",
          "अनुभवी शिक्षकहरूको मार्गदर्शन",
          "अभिभावक-शिक्षक बैठक",
          "अतिरिक्त क्रियाकलाप (संगीत, खेलकुद)",
          "प्रत्येक बालबालिकामा व्यक्तिगत ध्यान",
        ],
      },
      color: "bg-green-500",
    },
    secondary: {
      en: {
        title: "Secondary Education",
        subtitle: "Preparing for Higher Studies",
        description:
          "Comprehensive academic program preparing students for advanced education.",
        grades: "Classes 6-10",
        duration: "5 Years",
        students: "250+ Students",
        image: "/api/placeholder/600/400",
        subjects: [
          "Advanced Mathematics",
          "Physics",
          "Chemistry",
          "Biology",
          "English Literature",
          "Nepali Literature",
          "Social Studies",
          "Computer Science",
        ],
        features: [
          "SEE preparation focused curriculum",
          "Laboratory-based practical learning",
          "Career guidance counseling",
          "Regular mock examinations",
          "Sports and cultural activities",
          "Scholarship opportunities",
        ],
      },
      np: {
        title: "माध्यमिक शिक्षा",
        subtitle: "उच्च अध्ययनको तयारी",
        description:
          "विद्यार्थीलाई एसईई (SEE) को तयारीसँगै उच्च शिक्षाका लागि सक्षम बनाउने सम्पूर्ण शैक्षिक कार्यक्रम।",
        grades: "कक्षा ६-१०",
        duration: "५ वर्ष",
        students: "२५०+ विद्यार्थी",
        image: "/api/placeholder/600/400",
        subjects: [
          "गणित (उन्नत)",
          "भौतिकशास्त्र",
          "रसायनशास्त्र",
          "जीवविज्ञान",
          "अंग्रेजी साहित्य",
          "नेपाली साहित्य",
          "सामाजिक अध्ययन",
          "कम्प्युटर विज्ञान",
        ],
        features: [
          "SEE केन्द्रित पाठ्यक्रम",
          "प्रयोगशालामुखी शिक्षा",
          "करियर मार्गदर्शन",
          "मक परीक्षण (Mock Exams)",
          "सांस्कृतिक कार्यक्रम र खेलकुद",
          "उत्कृष्ट विद्यार्थीका लागि छात्रवृत्ति",
        ],
      },
      color: "bg-blue-500",
    },
    engineering: {
      en: {
        title: "Technical Secondary (Engineering)",
        subtitle: "Future Engineers Start Here",
        description:
          "Specialized technical education preparing students for engineering careers.",
        grades: "Classes 9-12",
        duration: "4 Years",
        students: "150+ Students",
        image: "/api/placeholder/600/400",
        subjects: [
          "Engineering Mathematics",
          "Physics",
          "Chemistry",
          "Computer Programming",
          "Technical Drawing",
          "Workshop Technology",
          "Electronics",
          "Mechanical Systems",
        ],
        features: [
          "Modern engineering laboratories",
          "Industry-experienced faculty",
          "Project-based learning",
          "Internship opportunities",
          "University pathway programs",
          "Technical skill certifications",
        ],
      },
      np: {
        title: "प्राविधिक शिक्षा (इन्जिनियरिङ)",
        subtitle: "भविष्यका इन्जिनियरहरूको सुरुयात्रा",
        description:
          "प्राविधिक विषयमा विशेष ध्यान दिँदै विद्यार्थीलाई इन्जिनियरिङ क्षेत्रमा करियर बनाउने आधार दिने।",
        grades: "कक्षा ९-१२",
        duration: "४ वर्ष",
        students: "१५०+ विद्यार्थी",
        image: "/api/placeholder/600/400",
        subjects: [
          "इन्जिनियरिङ गणित",
          "भौतिकशास्त्र",
          "रसायनशास्त्र",
          "कम्प्युटर प्रोग्रामिङ",
          "टेक्निकल ड्रइङ",
          "वर्कशप प्रविधि",
          "इलेक्ट्रोनिक्स",
          "मेकानिकल प्रणाली",
        ],
        features: [
          "आधुनिक प्राविधिक प्रयोगशाला",
          "उद्योग अनुभव भएका शिक्षक",
          "प्रोजेक्ट-आधारित सिकाइ",
          "इंटर्नशिप अवसरहरू",
          "विश्वविद्यालय प्रवेश तयारी",
          "प्राविधिक सीप प्रमाणपत्र",
        ],
      },
      color: "bg-purple-500",
    },
  };

  const tabIcons = {
    primary: BookOpen,
    secondary: Calculator,
    engineering: Cog,
  };

  const currentCourse = courses[activeTab][language];
  const TabIcon = tabIcons[activeTab];

  return (
    <div className="bg-gray-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Language Switch */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setLanguage(language === "en" ? "np" : "en")}
            className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-100 transition"
          >
            {language === "en" ? "नेपालीमा हेर्नुहोस्" : "View in English"}
          </button>
        </div>

        {/* Header */}
        <motion.div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {language === "en"
              ? "Our Academic Programs"
              : "हाम्रा शैक्षिक कार्यक्रमहरू"}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === "en"
              ? "Comprehensive education programs designed to nurture academic excellence and prepare students for successful futures."
              : "समग्र शैक्षिक कार्यक्रम जसले शैक्षिक उत्कृष्टता बढाउँछ र विद्यार्थीलाई उज्ज्वल भविष्यका लागि तयार पार्छ।"}
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
          {Object.keys(courses).map((courseKey) => {
            const course = courses[courseKey][language];
            const Icon = tabIcons[courseKey];
            return (
              <button
                key={courseKey}
                onClick={() => setActiveTab(courseKey)}
                className={`flex items-center justify-center space-x-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                  activeTab === courseKey
                    ? `${courses[courseKey].color} text-white shadow-lg`
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span>{course.title.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Course */}
        <motion.div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left */}
            <div className="p-8 lg:p-12">
              <div className="flex items-center space-x-3 mb-6">
                <div
                  className={`w-12 h-12 ${courses[activeTab].color} rounded-lg flex items-center justify-center`}
                >
                  <TabIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">
                    {currentCourse.title}
                  </h3>
                  <p className="text-lg text-gray-600">
                    {currentCourse.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                {currentCourse.description}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Users className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <div className="font-semibold text-gray-900">
                    {currentCourse.students}
                  </div>
                  <div className="text-sm text-gray-600">
                    {language === "en" ? "Enrolled" : "विद्यार्थी"}
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <BookOpen className="w-6 h-6 mx-auto mb-2 text-green-600" />
                  <div className="font-semibold text-gray-900">
                    {currentCourse.grades}
                  </div>
                  <div className="text-sm text-gray-600">
                    {language === "en" ? "Grade Levels" : "कक्षा"}
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                  <div className="font-semibold text-gray-900">
                    {currentCourse.duration}
                  </div>
                  <div className="text-sm text-gray-600">
                    {language === "en" ? "Program" : "अवधि"}
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  {language === "en" ? "Key Features" : "मुख्य विशेषताहरू"}
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {currentCourse.features.map((f, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <div
                        className={`w-2 h-2 ${courses[activeTab].color} rounded-full`}
                      ></div>
                      <span className="text-gray-700">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className={`group flex items-center space-x-2 px-8 py-4 ${courses[activeTab].color} text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg`}
              >
                <span>
                  {language === "en" ? "Learn More" : "थप जान्नुहोस्"}
                </span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Right */}
            <div className="bg-gray-50 p-8 lg:p-12">
              <div className="h-64 rounded-2xl overflow-hidden mb-8">
                <img
                  src={currentCourse.image}
                  alt={currentCourse.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-6">
                {language === "en" ? "Core Subjects" : "मुख्य विषयहरू"}
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {currentCourse.subjects.map((s, i) => (
                  <div
                    key={i}
                    className="bg-white p-3 rounded-lg text-center text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition"
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gray-900 rounded-3xl p-8 lg:p-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              {language === "en"
                ? "Ready to Enroll Your Child?"
                : "तपाईंको बच्चालाई भर्ना गर्न तयार हुनुहुन्छ?"}
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {language === "en"
                ? "Join our academic community and give your child the foundation they need for a successful future."
                : "हाम्रो शैक्षिक परिवारमा सहभागी भइ आफ्नो बच्चाको भविष्य उज्ज्वल बनाउन आजै कदम चाल्नुहोस्।"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition">
                {language === "en" ? "Apply for Admission" : "भर्ना फारम भर्नुहोस्"}
              </button>
              <button className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold rounded-lg transition">
                {language === "en"
                  ? "Schedule Campus Visit"
                  : "विद्यालय भ्रमण तालिका"}
              </button>
              <button className="px-8 py-4 bg-white text-gray-900 hover:bg-gray-100 font-semibold rounded-lg transition">
                {language === "en"
                  ? "Download Prospectus"
                  : "प्रॉस्पेक्टस डाउनलोड गर्नुहोस्"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesSection;
