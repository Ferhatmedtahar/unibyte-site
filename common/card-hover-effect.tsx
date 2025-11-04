"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  py-4 ",
        className
      )}
    >
      {items.map((item, idx) => (
        <motion.div
          key={item?.link}
          className="card-item relative group block p-2 h-full w-full cursor-pointer"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-gradient-to-br from-primary-500/90 to-primary-600/90 block rounded-3xl shadow-2xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  transition: { duration: 0.2, delay: 0.1 },
                }}
              />
            )}
          </AnimatePresence>

          <Card>
            <motion.div initial={{ scale: 1 }} transition={{ duration: 0.2 }}>
              <CardIcon>
                <div className="w-16 h-16 bg-gradient-to-br from-primary-300 to-primary-400 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-primary-300/50 transition-all duration-300">
                  <Image
                    src={item?.link}
                    width={40}
                    height={40}
                    alt={item.title}
                    className=" filter group-hover:brightness-110 transition-all duration-300"
                  />
                </div>
              </CardIcon>
            </motion.div>

            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>

            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-primary-200/30 to-primary-300/30 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-br from-yellow-400/30 to-yellow-500/30 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75"></div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-3xl h-full w-full p-6 overflow-hidden bg-[#fafafacc] backdrop-blur-sm border-2 border-primary-400/60 group-hover:border-primary-400/80 relative z-20 shadow-lg group-hover:shadow-xl transition-all duration-300 min-h-[260px]",
        className
      )}
    >
      <div className="relative z-50 h-full flex flex-col">{children}</div>
    </div>
  );
};

export const CardIcon = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return <div className={cn("mb-6", className)}>{children}</div>;
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn(
        "text-primary-800 group-hover:text-primary-400 font-bold text-xl tracking-wide mb-4 transition-colors duration-300",
        className
      )}
    >
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "text-primary-600/90 group-hover:text-primary-300/90 tracking-wide leading-relaxed text-sm flex-grow transition-colors duration-300",
        className
      )}
    >
      {children}
    </p>
  );
};
