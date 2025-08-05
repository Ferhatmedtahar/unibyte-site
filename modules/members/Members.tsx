"use client";

import MarqueeRow from "./components/MarqueeRow";

// Your team members data
export const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Lead Developer",
  },
  {
    name: "Michael Chen",
    role: "UI/UX Designer",
  },
  {
    name: "Emily Davis",
    role: "Product Manager",
  },
  {
    name: "James Wilson",
    role: "Data Scientist",
  },
  {
    name: "Lisa Rodriguez",
    role: "Marketing Lead",
  },
  {
    name: "Alex Thompson",
    role: "DevOps Engineer",
  },
  {
    name: "Maria Garcia",
    role: "QA Specialist",
  },
  {
    name: "David Kim",
    role: "Frontend Developer",
  },
  {
    name: "Rachel Brown",
    role: "Backend Developer",
  },
  {
    name: "Tom Anderson",
    role: "Technical Lead",
  },
  {
    name: "Jessica Lee",
    role: "Business Analyst",
  },
  {
    name: "Mark Taylor",
    role: "Software Architect",
  },
  {
    name: "Amy White",
    role: "Scrum Master",
  },
  {
    name: "Chris Johnson",
    role: "Security Expert",
  },
  {
    name: "Nina Patel",
    role: "Mobile Developer",
  },
  {
    name: "Ryan Miller",
    role: "Cloud Engineer",
  },
  {
    name: "Sophie Turner",
    role: "Content Strategist",
  },
  {
    name: "Daniel Lee",
    role: "AI Specialist",
  },
  {
    name: "Kate Wilson",
    role: "Project Coordinator",
  },
  {
    name: "Ben Clarke",
    role: "Full Stack Developer",
  },
];

export default function TeamTestimonials() {
  // Split members into two groups of 10
  const firstRow = teamMembers.slice(0, 10);
  const secondRow = teamMembers.slice(10, 20);

  return (
    <>
      {/* Add custom CSS for animations */}
      <style jsx global>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        .hover\\:pause:hover {
          animation-play-state: paused !important;
        }
      `}</style>

      <div className=" py-12 sm:py-24 px-4">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-10">
            <h2 className="text-center text-4xl md:text-6xl pb-4 text-gradient font-bold bg-gradient-to-r from-primary-600 via-primary-400 to-primary-500 bg-clip-text text-transparent mb-2">
              Meet Our Amazing Team
            </h2>
            <p className="text-lg md:text-xl text-primary-400/85 max-w-3xl mx-auto px-4">
              Discover the talented individuals who make our success possible
            </p>
          </div>
          <div className="space-y-2 sm:space-y-4">
            <MarqueeRow members={firstRow} direction="left" />
            <MarqueeRow members={secondRow} direction="right" />
          </div>
        </div>
      </div>
    </>
  );
}
