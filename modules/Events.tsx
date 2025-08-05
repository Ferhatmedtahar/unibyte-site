"use client";
import { pastEvents } from "@/utils/constants";
import { gsap } from "gsap";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Events = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Refs for GSAP animations
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const statsRef = useRef(null);
  const descriptionRef = useRef(null);
  const dateRef = useRef(null);
  const backgroundRef = useRef(null);

  const animateIn = () => {
    const tl = gsap.timeline();

    // Set initial states
    gsap.set(
      [
        badgeRef.current,
        titleRef.current,
        statsRef.current,
        descriptionRef.current,
        dateRef.current,
      ],
      {
        opacity: 0,
        y: 30,
      }
    );

    // Animate elements in sequence
    tl.to(backgroundRef.current, {
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
    })
      .to(
        badgeRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .to(
        statsRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .to(
        descriptionRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .to(
        dateRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3"
      );
  };

  const animateOut = () => {
    const tl = gsap.timeline();

    tl.to(
      [
        badgeRef.current,
        titleRef.current,
        statsRef.current,
        descriptionRef.current,
        dateRef.current,
      ],
      {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: "power2.in",
        stagger: 0.05,
      }
    ).to(
      backgroundRef.current,
      {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.in",
      },
      "-=0.2"
    );

    return tl;
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const outAnimation = animateOut();
    outAnimation.then(() => {
      setCurrentSlide((prev) => (prev + 1) % pastEvents.length);
    });
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const outAnimation = animateOut();
    outAnimation.then(() => {
      setCurrentSlide(
        (prev) => (prev - 1 + pastEvents.length) % pastEvents.length
      );
    });
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);

    const outAnimation = animateOut();
    outAnimation.then(() => {
      setCurrentSlide(index);
    });
  };

  // Handle slide changes and animations
  useEffect(() => {
    if (isTransitioning) {
      // Small delay to ensure DOM updates
      const timer = setTimeout(() => {
        animateIn();
        setIsTransitioning(false);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [currentSlide, isTransitioning]);

  // Initial animation on mount
  useEffect(() => {
    animateIn();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        nextSlide();
      }
    }, 6000);

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
            ref={backgroundRef}
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${currentEvent.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
              transform: "scale(1.05)",
            }}
          />
          <div
            className={`absolute inset-0 bg-gradient-to-r ${currentEvent.gradient} opacity-70`}
          />
          <div className="absolute inset-0 bg-black opacity-30" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center text-white w-full">
            {/* Event Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-primary-500/55 backdrop-blur-sm border border-primary-500/70 text-white text-xs sm:text-sm font-medium mb-4 sm:mb-6 lg:mb-8"
            >
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">Past Events Showcase</span>
              <span className="xs:hidden">Past Events</span>
            </div>

            {/* Main Title */}
            <h1
              ref={titleRef}
              className="bg-gradient-to-b from-primary-600 via-primary-400 to-primary-400 bg-clip-text text-transparent text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 px-2 leading-tight"
            >
              {currentEvent.title}
            </h1>

            {/* Event Stats */}
            <div
              ref={statsRef}
              className="flex flex-row flex-wrap justify-center gap-2 md:gap-4 mb-6 sm:mb-8 px-2"
            >
              <div className="flex w-fit items-center bg-primary-500/55 border border-primary-500/70 text-white backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">
                <Users className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-1 sm:mr-2" />
                <span className="font-semibold whitespace-nowrap">
                  {currentEvent.participants}
                </span>
              </div>
              <div className="flex w-fit items-center bg-primary-500/55 border border-primary-500/70 text-white backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-1 sm:mr-2" />
                <span className="font-semibold whitespace-nowrap">
                  {currentEvent.duration}
                </span>
              </div>
              <div className="flex w-fit items-center bg-primary-500/55 border border-primary-500/70 text-white backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-1 sm:mr-2" />
                <span className="font-semibold whitespace-nowrap">
                  {currentEvent.location}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="px-4 sm:px-6 lg:px-8">
              <p
                ref={descriptionRef}
                className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl mx-auto mb-8 sm:mb-12 text-white"
              >
                {currentEvent.description}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Buttons - Desktop */}
        <button
          onClick={prevSlide}
          disabled={isTransitioning}
          className="hidden sm:block absolute left-4 lg:left-8 top-1/2 transform -translate-y-1/2 z-20 bg-primary-500/40 backdrop-blur-sm hover:bg-primary-500/60 hover:cursor-pointer text-white p-3 lg:p-4 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6  transition-transform text-primary-100" />
        </button>

        <button
          onClick={nextSlide}
          disabled={isTransitioning}
          className="hidden sm:block absolute right-4 lg:right-8 top-1/2 transform -translate-y-1/2 z-20 bg-primary-500/40 backdrop-blur-sm hover:bg-primary-500/60 hover:cursor-pointer text-white p-3 lg:p-4 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6  text-primary-100 transition-transform" />
        </button>

        {/* Mobile Navigation Buttons */}
        <div className="sm:hidden absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 flex space-x-4">
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="bg-primary-500/40 backdrop-blur-sm hover:bg-primary-500/60 text-white p-3 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5 text-primary-100 " />
          </button>
          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="bg-primary-500/40 backdrop-blur-sm hover:bg-primary-500/60 text-white p-3 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5 text-primary-100" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col items-center space-y-4">
            {/* Dots */}
            <div className="flex space-x-2 sm:space-x-3">
              {pastEvents.map((event, index) => (
                <button
                  key={event.id}
                  onClick={() => goToSlide(index)}
                  disabled={isTransitioning}
                  className={`w-2 sm:w-3 lg:w-5 h-1 sm:h-1.5 lg:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    index === currentSlide
                      ? "bg-primary-500 scale-115"
                      : "bg-primary-500/60 hover:bg-primary-500/80"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 sm:h-1.5 bg-white/20">
          <div
            className="h-full bg-primary-500 transition-all duration-300 ease-out"
            style={{
              width: `${((currentSlide + 1) / pastEvents.length) * 100}%`,
            }}
          />
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* Section Header */}
          <div className="mb-12 lg:mb-16">
            <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 text-sm font-medium mb-4 sm:mb-6">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
              What's Next
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl pb-4 text-gradient font-bold bg-gradient-to-r from-primary-600 via-primary-400 to-primary-500 bg-clip-text text-transparent mb-4 sm:mb-6 px-2">
              Upcoming Events
            </h2>
            <p className="text-lg sm:text-xl text-primary-400/85 max-w-3xl mx-auto px-4">
              Get ready for our most exciting events yet! Stay tuned for
              announcements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              "Blockchain Workshop",
              "Frontend Workshop",
              "Cloud Computing ",
            ].map((title, index) => (
              <div key={index} className="group">
                <div className="  border border-primary-100 transition-all duration-500 ease-out hover:shadow-lg hover:shadow-primary-500/20 hover:bg-gradient-to-br hover:from-primary-50 hover:to-indigo-100  rounded-2xl lg:rounded-2xl p-6 lg:p-8 shadow-lg  ">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary-500 to-pink-400 cursor-default rounded-xl lg:rounded-2xl mx-auto mb-4 lg:mb-6 flex items-center justify-center">
                    <Calendar className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-primary-600 mb-3 lg:mb-4 px-2">
                    {title}
                  </h3>

                  <div className="bg-gradient-to-r from-primary-50 to-purple-200 rounded-full py-2 sm:py-3 px-4 sm:px-6 inline-block">
                    <span className="text-primary-600 font-semibold text-sm sm:text-base">
                      Coming Soon
                    </span>
                  </div>

                  <div className="mt-4 lg:mt-6 text-primary-300">
                    <p className="text-sm sm:text-base">
                      Stay tuned for more details!
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 lg:mt-16">
            <div className="bg-gradient-to-r from-primary-500 to-pink-600 rounded-2xl lg:rounded-3xl p-6 lg:p-8 text-white">
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                Don't Miss Out!
              </h3>
              <p className="text-lg sm:text-xl mb-4 sm:mb-6 opacity-90 px-2">
                Be the first to know about our upcoming events and workshops.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
// "use client";
// import { pastEvents } from "@/utils/constants";
// import { gsap } from "gsap";
// import {
//   Calendar,
//   ChevronLeft,
//   ChevronRight,
//   Clock,
//   MapPin,
//   Users,
// } from "lucide-react";
// import { useEffect, useRef, useState } from "react";

// const Events = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isTransitioning, setIsTransitioning] = useState(false);

//   // Refs for GSAP animations
//   const badgeRef = useRef(null);
//   const titleRef = useRef(null);
//   const statsRef = useRef(null);
//   const descriptionRef = useRef(null);
//   const dateRef = useRef(null);
//   const backgroundRef = useRef(null);

//   const animateIn = () => {
//     const tl = gsap.timeline();

//     // Set initial states
//     gsap.set(
//       [
//         badgeRef.current,
//         titleRef.current,
//         statsRef.current,
//         descriptionRef.current,
//         dateRef.current,
//       ],
//       {
//         opacity: 0,
//         y: 30,
//       }
//     );

//     // Animate elements in sequence
//     tl.to(backgroundRef.current, {
//       scale: 1,
//       duration: 0.8,
//       ease: "power2.out",
//     })
//       .to(
//         badgeRef.current,
//         {
//           opacity: 1,
//           y: 0,
//           duration: 0.6,
//           ease: "power2.out",
//         },
//         "-=0.4"
//       )
//       .to(
//         titleRef.current,
//         {
//           opacity: 1,
//           y: 0,
//           duration: 0.8,
//           ease: "power2.out",
//         },
//         "-=0.3"
//       )
//       .to(
//         statsRef.current,
//         {
//           opacity: 1,
//           y: 0,
//           duration: 0.6,
//           ease: "power2.out",
//         },
//         "-=0.4"
//       )
//       .to(
//         descriptionRef.current,
//         {
//           opacity: 1,
//           y: 0,
//           duration: 0.6,
//           ease: "power2.out",
//         },
//         "-=0.3"
//       )
//       .to(
//         dateRef.current,
//         {
//           opacity: 1,
//           y: 0,
//           duration: 0.6,
//           ease: "power2.out",
//         },
//         "-=0.3"
//       );
//   };

//   const animateOut = () => {
//     const tl = gsap.timeline();

//     tl.to(
//       [
//         badgeRef.current,
//         titleRef.current,
//         statsRef.current,
//         descriptionRef.current,
//         dateRef.current,
//       ],
//       {
//         opacity: 0,
//         y: -20,
//         duration: 0.4,
//         ease: "power2.in",
//         stagger: 0.05,
//       }
//     ).to(
//       backgroundRef.current,
//       {
//         scale: 1.1,
//         duration: 0.3,
//         ease: "power2.in",
//       },
//       "-=0.2"
//     );

//     return tl;
//   };

//   const nextSlide = () => {
//     if (isTransitioning) return;
//     setIsTransitioning(true);

//     const outAnimation = animateOut();
//     outAnimation.then(() => {
//       setCurrentSlide((prev) => (prev + 1) % pastEvents.length);
//     });
//   };

//   const prevSlide = () => {
//     if (isTransitioning) return;
//     setIsTransitioning(true);

//     const outAnimation = animateOut();
//     outAnimation.then(() => {
//       setCurrentSlide(
//         (prev) => (prev - 1 + pastEvents.length) % pastEvents.length
//       );
//     });
//   };

//   const goToSlide = (index: number) => {
//     if (isTransitioning || index === currentSlide) return;
//     setIsTransitioning(true);

//     const outAnimation = animateOut();
//     outAnimation.then(() => {
//       setCurrentSlide(index);
//     });
//   };

//   // Handle slide changes and animations
//   useEffect(() => {
//     if (isTransitioning) {
//       // Small delay to ensure DOM updates
//       const timer = setTimeout(() => {
//         animateIn();
//         setIsTransitioning(false);
//       }, 100);

//       return () => clearTimeout(timer);
//     }
//   }, [currentSlide, isTransitioning]);

//   // Initial animation on mount
//   useEffect(() => {
//     animateIn();
//   }, []);

//   // Auto-play functionality
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (!isTransitioning) {
//         nextSlide();
//       }
//     }, 6000);

//     return () => clearInterval(interval);
//   }, [isTransitioning]);

//   const currentEvent = pastEvents[currentSlide];

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Past Events Slider Section */}
//       <section className="relative h-screen overflow-hidden">
//         {/* Background Image with Overlay */}
//         <div className="absolute inset-0">
//           <div
//             ref={backgroundRef}
//             className="w-full h-full bg-cover bg-center bg-no-repeat"
//             style={{
//               backgroundImage: `url(${currentEvent.image})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center center",
//               transform: "scale(1.05)",
//             }}
//           />
//           <div
//             className={`absolute inset-0 bg-gradient-to-r ${currentEvent.gradient} opacity-70`}
//           />
//           <div className="absolute inset-0 bg-black opacity-30" />
//         </div>

//         {/* Content Overlay */}
//         <div className="relative z-10 h-full flex items-center justify-center px-6">
//           <div className="max-w-6xl mx-auto text-center text-white">
//             {/* Event Badge */}
//             <div
//               ref={badgeRef}
//               className="inline-flex items-center px-6 py-3 rounded-full bg-primary-500/55 backdrop-blur-sm border border-primary-500/70 text-white text-sm font-medium mb-8"
//             >
//               <Calendar className="w-4 h-4 mr-2" />
//               Past Events Showcase
//             </div>

//             {/* Main Title */}
//             <h1
//               ref={titleRef}
//               className=" bg-gradient-to-b from-primary-600 via-primary-400 to-primary-400 bg-clip-text text-transparent text-5xl md:text-7xl font-bold mb-6"
//             >
//               {currentEvent.title}
//             </h1>

//             {/* Event Stats */}
//             <div
//               ref={statsRef}
//               className="flex flex-wrap justify-center gap-8 mb-8"
//             >
//               <div className="flex items-center bg-primary-500/55  border border-primary-500/70 text-white backdrop-blur-sm rounded-full px-4 py-2">
//                 <Users className="w-5 h-5 mr-2" />
//                 <span className="font-semibold">
//                   {currentEvent.participants}
//                 </span>
//               </div>
//               <div className="flex items-center bg-primary-500/55  border border-primary-500/70 text-white backdrop-blur-sm rounded-full px-4 py-2">
//                 <Clock className="w-5 h-5 mr-2" />
//                 <span className="font-semibold">{currentEvent.duration}</span>
//               </div>
//               <div className="flex items-center bg-primary-500/55  border border-primary-500/70 text-white backdrop-blur-sm rounded-full px-4 py-2">
//                 <MapPin className="w-5 h-5 mr-2" />
//                 <span className="font-semibold">{currentEvent.location}</span>
//               </div>
//             </div>

//             {/* Description */}
//             <p
//               ref={descriptionRef}
//               className="text-base sm:text-lg md:text-xl leading-relaxed max-w-4xl mx-auto mb-12 text-white "
//             >
//               {currentEvent.description}
//             </p>
//           </div>
//         </div>

//         {/* Navigation Buttons */}
//         <button
//           onClick={prevSlide}
//           disabled={isTransitioning}
//           className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-4 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
//         >
//           <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
//         </button>

//         <button
//           onClick={nextSlide}
//           disabled={isTransitioning}
//           className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-4 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
//         >
//           <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
//         </button>

//         {/* Slide Indicators */}
//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
//           <div className="flex flex-col items-center space-y-4">
//             {/* Dots */}
//             <div className="flex space-x-3">
//               {pastEvents.map((event, index) => (
//                 <button
//                   key={event.id}
//                   onClick={() => goToSlide(index)}
//                   disabled={isTransitioning}
//                   className={`w-3 lg:w-5 h-1.5 lg:h-2 rounded-full transition-all duration-300 cursor-pointer ${
//                     index === currentSlide
//                       ? "bg-primary-500 scale-115"
//                       : "bg-primary-500/60 hover:bg-primary-500/80"
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Progress Bar */}
//         <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20">
//           <div
//             className="h-full bg-primary-500 transition-all duration-300 ease-out"
//             style={{
//               width: `${((currentSlide + 1) / pastEvents.length) * 100}%`,
//             }}
//           />
//         </div>
//       </section>

//       {/* Coming Soon Section */}
//       <section className="py-20 px-6 ">
//         <div className="max-w-6xl mx-auto text-center">
//           {/* Section Header */}
//           <div className="mb-16">
//             <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 text-sm font-medium mb-6">
//               <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
//               What's Next
//             </div>
//             <h2 className="text-4xl md:text-6xl pb-4 text-gradient font-bold bg-gradient-to-r from-primary-600 via-primary-400 to-primary-500 bg-clip-text text-transparent mb-6">
//               Upcoming Events
//             </h2>
//             <p className="text-xl text-primary-400/85 max-w-3xl mx-auto">
//               Get ready for our most exciting events yet! Stay tuned for
//               announcements.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               "Blockchain Workshop",
//               "Mobile App Development",
//               "Cloud Computing Summit",
//             ].map((title, index) => (
//               <div key={index} className="group">
//                 <div className=" rounded-3xl p-8 shadow-lg shadow-primary-600/10 hover:shadow-xl hover:shadow-primary-600/20 transition-all duration-500 transform hover:bg-primary-600/30 border border-primary-600/60">
//                   <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-pink-400 cursor-default rounded-2xl mx-auto mb-6 flex items-center justify-center  ">
//                     <Calendar className="w-8 h-8 text-white" />
//                   </div>

//                   <h3 className="text-2xl font-bold text-primary-600 mb-4">
//                     {title}
//                   </h3>

//                   <div className="bg-gradient-to-r from-primary-50 to-purple-200 rounded-full py-3 px-6 inline-block">
//                     <span className="text-primary-600 font-semibold">
//                       Coming Soon
//                     </span>
//                   </div>

//                   <div className="mt-6 text-primary-300">
//                     <p>Stay tuned for more details!</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* CTA */}
//           <div className="mt-16">
//             <div className="bg-gradient-to-r from-primary-500 to-pink-600 rounded-3xl p-8 text-white">
//               <h3 className="text-3xl font-bold mb-4">Don't Miss Out!</h3>
//               <p className="text-xl mb-6 opacity-90">
//                 Be the first to know about our upcoming events and workshops.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Events;
