"use client";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

const Events = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const pastEvents = [
    {
      id: 1,
      title: "Linux Basics Workshop",
      date: "March 15, 2024",
      participants: "120+",
      duration: "4 hours",
      location: "Tech Lab A",
      description:
        "Dive into the fundamentals of Linux operating system. Learn command-line basics, file management, and system administration essentials.",
      image:
        "https://images.unsplash.com/photo-1629654291663-b91ad427bfde?w=800&h=600&fit=crop",
      gradient: "from-blue-600 to-purple-600",
    },
    {
      id: 2,
      title: "Python Programming Bootcamp",
      date: "February 28, 2024",
      participants: "200+",
      duration: "8 hours",
      location: "Main Auditorium",
      description:
        "Comprehensive Python workshop covering data structures, algorithms, web development with Flask, and machine learning basics.",
      image:
        "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=600&fit=crop",
      gradient: "from-green-600 to-blue-600",
    },
    {
      id: 3,
      title: "Web Development Hackathon",
      date: "January 20, 2024",
      participants: "80+",
      duration: "24 hours",
      location: "Innovation Hub",
      description:
        "48-hour intensive hackathon where teams built amazing web applications using modern frameworks like React, Vue, and Angular.",
      image:
        "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=600&fit=crop",
      gradient: "from-purple-600 to-pink-600",
    },
    {
      id: 4,
      title: "AI & Machine Learning Summit",
      date: "December 10, 2023",
      participants: "300+",
      duration: "6 hours",
      location: "Conference Hall",
      description:
        "Explore the latest trends in AI and ML with industry experts. Hands-on sessions with TensorFlow, PyTorch, and real-world applications.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      gradient: "from-indigo-600 to-purple-600",
    },
    {
      id: 5,
      title: "Cybersecurity Workshop",
      date: "November 25, 2023",
      participants: "150+",
      duration: "5 hours",
      location: "Security Lab",
      description:
        "Learn ethical hacking, penetration testing, and cybersecurity best practices. Hands-on experience with security tools and techniques.",
      image:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
      gradient: "from-red-600 to-orange-600",
    },
  ];

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % pastEvents.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(
      (prev) => (prev - 1 + pastEvents.length) % pastEvents.length
    );
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        nextSlide();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isTransitioning]);

  const currentEvent = pastEvents[currentSlide];

  return (
    <div className="min-h-screen bg-white">
      {/* Past Events Slider Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div
            className="w-full h-full bg-cover bg-center transition-all duration-1000 ease-in-out"
            style={{
              backgroundImage: `url(${currentEvent.image})`,
              transform: isTransitioning ? "scale(1.1)" : "scale(1)",
            }}
          />
          <div
            className={`absolute inset-0 bg-gradient-to-r ${currentEvent.gradient} opacity-80`}
          />
          <div className="absolute inset-0 bg-black opacity-40" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <div className="max-w-6xl mx-auto text-center text-white">
            {/* Event Badge */}
            <div
              className={`inline-flex items-center px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-medium mb-8 transition-all duration-500 ${
                isTransitioning
                  ? "opacity-0 translate-y-4"
                  : "opacity-100 translate-y-0"
              }`}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Past Events Showcase
            </div>

            {/* Main Title */}
            <h1
              className={`text-5xl md:text-7xl font-bold mb-6 transition-all duration-700 delay-100 ${
                isTransitioning
                  ? "opacity-0 translate-y-8"
                  : "opacity-100 translate-y-0"
              }`}
            >
              {currentEvent.title}
            </h1>

            {/* Event Stats */}
            <div
              className={`flex flex-wrap justify-center gap-8 mb-8 transition-all duration-700 delay-200 ${
                isTransitioning
                  ? "opacity-0 translate-y-8"
                  : "opacity-100 translate-y-0"
              }`}
            >
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Users className="w-5 h-5 mr-2" />
                <span className="font-semibold">
                  {currentEvent.participants}
                </span>
              </div>
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Clock className="w-5 h-5 mr-2" />
                <span className="font-semibold">{currentEvent.duration}</span>
              </div>
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="font-semibold">{currentEvent.location}</span>
              </div>
            </div>

            {/* Description */}
            <p
              className={`text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto mb-12 transition-all duration-700 delay-300 ${
                isTransitioning
                  ? "opacity-0 translate-y-8"
                  : "opacity-100 translate-y-0"
              }`}
            >
              {currentEvent.description}
            </p>

            {/* Date */}
            <div
              className={`text-lg font-medium opacity-90 transition-all duration-700 delay-400 ${
                isTransitioning
                  ? "opacity-0 translate-y-8"
                  : "opacity-100 translate-y-0"
              }`}
            >
              {currentEvent.date}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          disabled={isTransitioning}
          className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-4 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>

        <button
          onClick={nextSlide}
          disabled={isTransitioning}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-4 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col items-center space-y-4">
            {/* Dots */}
            <div className="flex space-x-3">
              {pastEvents.map((event, index) => (
                <button
                  key={event.id}
                  onClick={() => goToSlide(index)}
                  disabled={isTransitioning}
                  className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                    index === currentSlide
                      ? "bg-primary-500 scale-125"
                      : "bg-primary-500/60 hover:bg-primary-500/80"
                  }`}
                />
              ))}
            </div>

            {/* Current Event Name */}
            <div className="text-white text-center">
              <div className="text-sm opacity-75 mb-1">Current Event</div>
              <div className="font-semibold text-lg">{currentEvent.title}</div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20">
          <div
            className="h-full bg-primary-400 transition-all duration-300 ease-out"
            style={{
              width: `${((currentSlide + 1) / pastEvents.length) * 100}%`,
            }}
          />
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto text-center">
          {/* Section Header */}
          <div className="mb-16">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
              What's Next
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Upcoming Events
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get ready for our most exciting events yet! Stay tuned for
              announcements.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Blockchain Workshop",
              "Mobile App Development",
              "Cloud Computing Summit",
            ].map((title, index) => (
              <div key={index} className="group">
                <div className=" rounded-3xl p-8 shadow-lg shadow-primary-600/10 hover:shadow-xl hover:shadow-primary-600/20 transition-all duration-500 transform hover:bg-primary-600/30 border border-primary-600/60">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-103 transition-transform duration-300">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-primary-600 mb-4">
                    {title}
                  </h3>

                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-full py-3 px-6 inline-block">
                    <span className="text-purple-800 font-semibold">
                      Coming Soon
                    </span>
                  </div>

                  <div className="mt-6 text-primary-300">
                    <p>Stay tuned for more details!</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16">
            <div className="bg-gradient-to-r from-primary-700 to-primary-300 rounded-3xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-4">Don't Miss Out!</h3>
              <p className="text-xl mb-6 opacity-90">
                Be the first to know about our upcoming events and workshops.
              </p>
              <button className="bg-white text-purple-600 font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition-colors duration-300 hover:scale-105 transform">
                Get Notified
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
