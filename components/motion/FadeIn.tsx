"use client";

import * as motion from "motion/react-client";
import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "li";
};

export function FadeIn({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: FadeInProps) {
  const MotionTag = motion[as];
  const prefersReduced = useReducedMotion();

  return (
    <MotionTag
      initial={{ opacity: 0, y: prefersReduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: prefersReduced ? 0 : 0.8,
        delay: prefersReduced ? 0 : delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
