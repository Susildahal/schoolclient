import { Calendar, ArrowRight, Bell } from 'lucide-react';

export default function NoticeSection() {
  const notices = [
    {
      id: 1,
      title: "System Maintenance Scheduled",
      description: "We will be performing scheduled maintenance on our servers to improve performance and security. Services may be temporarily unavailable.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&h=200&fit=crop",
      date: "Aug 18, 2025",
      isNew: true
    },
    {
      id: 2,
      title: "New Feature Release - Dashboard 2.0",
      description: "Exciting new dashboard features are now available including advanced analytics, custom widgets, and improved user interface.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",
      date: "Aug 15, 2025",
      isNew: true
    },
    {
      id: 3,
      title: "Security Update - Action Required",
      description: "Important security updates have been implemented. Please review your account settings and update your password for enhanced protection.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&h=200&fit=crop",
      date: "Aug 12, 2025",
      isNew: false
    }
  ];

  const handleViewMore = (noticeId) => {
    // This is where you would navigate to the notice page
    console.log(`Navigating to notice page for notice ID: ${noticeId}`);
    // For example: navigate(`/notices/${noticeId}`) in a real app
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Bell className="text-blue-600" size={24} />
            <h2 className="text-3xl font-bold text-gray-900">Latest Notices</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with our latest announcements, system updates, and important information.
          </p>
        </div>

        {/* Notice Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notices.map((notice) => (
            <div 
              key={notice.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group"
            >
              {/* Image Section */}
              <div className="relative overflow-hidden">
                <img 
                  src={notice.image} 
                  alt={notice.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {notice.isNew && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      NEW
                    </span>
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {notice.title}
                </h3>

                {/* Date */}
                <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                  <Calendar size={14} />
                  <span>{notice.date}</span>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {notice.description}
                </p>

                {/* View More Button */}
                <button 
                  onClick={() => handleViewMore(notice.id)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  View More
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Notices Button */}
        <div className="text-center mt-12">
          <button 
            onClick={() => handleViewMore('all')}
            className="inline-flex items-center gap-2 px-8 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg border-2 border-gray-200 hover:border-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            View All Notices
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}