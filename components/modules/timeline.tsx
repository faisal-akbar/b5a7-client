"use client";
import { personalData } from "@/app/siteMetaData";
import { cn } from "@/lib/utils";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { motion, useInView } from "motion/react";
import React, { useRef } from "react";

type Data = {
  title: string;
  content: {
    title: string;
    description?: string | React.ReactNode;
  }[];
};
export const Timeline = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  // Transform experience data into timeline format
  const transformExperienceToTimeline = (): Data[] => {
    const experienceMap = new Map<
      string,
      { title: string; description?: string }[]
    >();

    personalData.experience.forEach((exp) => {
      const startYear = new Date(exp.from).getFullYear();
      const endYear =
        exp.to === "present"
          ? new Date().getFullYear()
          : new Date(exp.to).getFullYear();

      // Create year range for the timeline
      const yearRange =
        startYear === endYear ? `${startYear}` : `${startYear} - ${endYear}`;

      if (!experienceMap.has(yearRange)) {
        experienceMap.set(yearRange, []);
      }

      experienceMap.get(yearRange)!.push({
        title: `${exp.position} at ${exp.company}`,
        description: exp.summary,
      });
    });

    // Convert map to array and sort by year (newest first)
    return Array.from(experienceMap.entries())
      .map(([title, content]) => ({ title, content }))
      .sort((a, b) => {
        const aYear = parseInt(a.title.split(" - ")[0]);
        const bYear = parseInt(b.title.split(" - ")[0]);
        return bYear - aYear;
      });
  };

  const data: Data[] = transformExperienceToTimeline();
  return (
    <div
      ref={ref}
      className="text-xl shadow-section-inset dark:shadow-section-inset-dark my-6  dark:border-neutral-800"
    >
      <h2 className="flex pb-4 font-bold tracking-tight text-neutral-900 text-3xl dark:text-neutral-100 sm:text-3xl md:text-4xl">
        Experiences
      </h2>
      <hr className="border-gray-200 dark:border-gray-700 mb-5" />
      {data.map((year, index) => (
        <div content="px-4 py-1 " key={year.title} className="mb-4">
          <motion.h2
            initial={{
              filter: "blur(10px)",
              opacity: 0,
            }}
            animate={{
              filter: isInView ? "blur(0px)" : "blur(10px)",
              opacity: isInView ? 1 : 0,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
              delay: 0.1 * index,
            }}
            className="mb-2 w-fit rounded-md px-2 py-0.5 font-bold text-neutral-900  dark:text-neutral-100"
          >
            {year.title}
          </motion.h2>
          <div className="flex flex-col gap-4">
            {year.content.map((item, idx) => (
              <div key={item.title} className="pl-4">
                <Step isInView={isInView} idx={idx}>
                  <motion.h3
                    initial={{
                      opacity: 0,
                      y: -10,
                    }}
                    animate={{
                      opacity: isInView ? 1 : 0,
                      y: isInView ? 0 : -10,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                      delay: 0.2 * idx,
                    }}
                    className="text-neutral-600 dark:text-neutral-400"
                  >
                    {item.title}
                  </motion.h3>
                </Step>
                {item.description && (
                  <motion.p
                    initial={{
                      opacity: 0,
                      y: -10,
                    }}
                    animate={{
                      opacity: isInView ? 1 : 0,
                      y: isInView ? 0 : -10,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                      delay: 0.3 * idx,
                    }}
                    className="pt-1 pl-6 text-sm text-neutral-400 dark:text-neutral-500"
                  >
                    {item.description}
                  </motion.p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const Step = ({
  className,
  children,
  isInView,
  idx,
}: {
  className?: string;
  children: React.ReactNode;
  isInView: boolean;
  idx: number;
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -10,
      }}
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : -10,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
        delay: 0.2 * idx,
      }}
      className={cn("flex items-start gap-2", className)}
    >
      <IconCircleCheckFilled className="mt-1 h-4 w-4 text-neutral-500 dark:text-neutral-400" />
      {children}
    </motion.div>
  );
};
