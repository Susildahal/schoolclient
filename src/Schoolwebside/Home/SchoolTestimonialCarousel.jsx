import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star, Users } from 'lucide-react';

export default function SchoolTestimonialCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Sample testimonial data - replace with your backend data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Parent of Grade 8 Student",
      testimonial: "This school has exceeded all our expectations. The teachers are incredibly dedicated, and my daughter has flourished academically and personally. The supportive environment and innovative teaching methods have made learning enjoyable for her.",
      rating: 5,
      date: "March 2025"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Alumni - Class of 2020",
      testimonial: "The education I received here prepared me exceptionally well for university. The critical thinking skills, leadership opportunities, and strong foundation in academics have been invaluable in my journey. I'm proud to be an alumnus.",
      rating: 5,
      date: "February 2025"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      role: "Parent of Grade 10 Student",
      testimonial: "What sets this school apart is their commitment to holistic development. Not only has my son excelled academically, but he's also developed confidence, creativity, and strong moral values. The extracurricular programs are outstanding.",
      rating: 5,
      date: "January 2025"
    },
    {
      id: 4,
      name: "James Wilson",
      role: "Parent of Grade 6 & 9 Students",
      testimonial: "Having two children in this school, I can confidently say it's the best decision we made. The individual attention each child receives, the modern facilities, and the caring staff create an environment where children thrive.",
      rating: 5,
      date: "December 2024"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
      />
    ));
  };

  return (
    <section className="py-16 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="text-indigo-600" size={28} />
            <h2 className="text-3xl font-bold text-gray-900">What Our Community Says</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from parents, students, and alumni about their experiences with our school community.
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          
          {/* Main Testimonial Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 relative overflow-hidden">
            
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 opacity-10">
              <Quote size={80} className="text-indigo-600" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              
              {/* Rating Stars */}
              <div className="flex items-center gap-1 mb-6">
                {renderStars(testimonials[currentSlide].rating)}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 font-medium">
                "{testimonials[currentSlide].testimonial}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-1">
                    {testimonials[currentSlide].name}
                  </h4>
                  <p className="text-indigo-600 font-medium mb-1">
                    {testimonials[currentSlide].role}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {testimonials[currentSlide].date}
                  </p>
                </div>
                
                {/* Navigation Arrows */}
                <div className="flex gap-2">
                  <button
                    onClick={prevSlide}
                    className="p-3 bg-indigo-100 hover:bg-indigo-200 text-indigo-600 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="p-3 bg-indigo-100 hover:bg-indigo-200 text-indigo-600 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                  index === currentSlide
                    ? 'bg-indigo-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-6 bg-gray-200 rounded-full h-1 overflow-hidden">
            <div 
              className="bg-indigo-600 h-full transition-all duration-300 ease-linear"
              style={{ width: `${((currentSlide + 1) / testimonials.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Statistics */}
  
      </div>
    </section>
  );
}