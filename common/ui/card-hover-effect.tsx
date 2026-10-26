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
        className,
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
                className="absolute inset-0 h-full w-full bg-gradient-to-br from-primary-400 via-primary-500 to-primary-700 block rounded-[2rem]"
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
                <div className="w-14 h-14 bg-primary-500 rounded-2xl flex items-center justify-center transition-colors duration-300 group-hover:bg-primary-700">
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
            <div className="absolute top-7 right-7 w-2 h-2 bg-gold-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
        "rounded-[2rem] h-full w-full p-7 overflow-hidden bg-primary-50/70 group-hover:bg-transparent relative z-20 transition-colors duration-300 min-h-[280px]",
        className,
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
        "text-primary-800 group-hover:text-white font-semibold text-2xl tracking-[-0.02em] mb-3 transition-colors duration-300",
        className,
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
        "text-primary-700/75 group-hover:text-primary-100/90 leading-relaxed text-base flex-grow transition-colors duration-300",
        className,
      )}
    >
      {children}
    </p>
  );
};
