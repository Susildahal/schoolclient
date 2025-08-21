import { Calendar, ArrowRight, GraduationCap } from 'lucide-react';

export default function SchoolAchievements() {
  // Sample data structure - you can replace this with your backend data
  const achievements = [
    {
      id: 1,
      title: "National Science Fair - First Place",
      description: "Our students won first place in the National Science Fair with their innovative project on renewable energy solutions and sustainable technology.",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop",
      date: "March 15, 2025"
    },
    {
      id: 2,
      title: "Inter-School Mathematics Olympiad Champions",
      description: "Proud to announce our mathematics team secured the championship title at the Inter-School Mathematics Olympiad competition.",
      image: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=400&h=300&fit=crop",
      date: "February 28, 2025"
    },
    {
      id: 3,
      title: "Best School Infrastructure Award",
      description: "Recognized for outstanding school infrastructure, modern facilities, and creating an excellent learning environment for students.",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop",
      date: "January 20, 2025"
    },
    {
      id: 4,
      title: "Cultural Fest - Outstanding Performance",
      description: "Our students delivered exceptional performances in dance, music, and drama at the annual inter-school cultural festival.",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=300&fit=crop",
      date: "December 18, 2024"
    }
  ];

  const handleViewMore = (achievementId) => {
    console.log(`Viewing achievement details for ID: ${achievementId}`);
    // Add your navigation logic here
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="text-indigo-600" size={32} />
            <h2 className="text-3xl font-bold text-gray-900">School Achievements</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Celebrating our students' outstanding accomplishments and school milestones that make us proud.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
            >
              
              {/* Image Section */}
              <div className="relative overflow-hidden h-48">
                <img 
                  src={achievement.image} 
                  alt={achievement.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                  {achievement.title}
                </h3>

                {/* Date */}
                <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                  <Calendar size={16} />
                  <span>{achievement.date}</span>
                </div>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                  {achievement.description}
                </p>

                {/* View More Button */}
                <button 
                  onClick={() => handleViewMore(achievement.id)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  View More
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button 
            onClick={() => handleViewMore('all')}
            className="inline-flex items-center gap-3 px-8 py-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-indigo-600 hover:text-indigo-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-lg"
          >
            <GraduationCap size={20} />
            View All Achievements
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}