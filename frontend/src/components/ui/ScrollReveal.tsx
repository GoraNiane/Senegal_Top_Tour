import React from 'react';
import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';

export type ScrollAnimationType =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'scale-up'
  | 'blur-reveal'
  | 'stagger-container';

interface ScrollRevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  animation?: ScrollAnimationType;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

const luxuryEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const variantsMap: Record<ScrollAnimationType, Variants> = {
  'fade-up': {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-down': {
    hidden: { opacity: 0, y: -16 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-left': {
    hidden: { opacity: 0, x: -16 },
    visible: { opacity: 1, x: 0 },
  },
  'fade-right': {
    hidden: { opacity: 0, x: 16 },
    visible: { opacity: 1, x: 0 },
  },
  'scale-up': {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1 },
  },
  'blur-reveal': {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0 },
  },
  'stagger-container': {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.02,
      },
    },
  },
};

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 0.4,
  threshold = 0.01,
  className = '',
  staggerDelay = 0.06,
  once = true,
  ...props
}) => {
  const selectedVariant = variantsMap[animation] || variantsMap['fade-up'];

  if (animation === 'stagger-container') {
    return (
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: staggerDelay,
              delayChildren: delay,
            },
          },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: threshold, margin: '0px 0px 200px 0px' }}
        className={`will-change-transform ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={selectedVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold, margin: '0px 0px 200px 0px' }}
      transition={{
        duration,
        delay,
        ease: luxuryEase,
      }}
      className={`will-change-transform ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const ScrollRevealItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-up' | 'scale-up' | 'blur-reveal';
}> = ({ children, className = '', animation = 'fade-up' }) => {
  const itemVariants: Record<string, Variants> = {
    'fade-up': {
      hidden: { opacity: 0, y: 12 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: luxuryEase },
      },
    },
    'scale-up': {
      hidden: { opacity: 0, scale: 0.98, y: 8 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.35, ease: luxuryEase },
      },
    },
    'blur-reveal': {
      hidden: { opacity: 0, y: 10 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: luxuryEase },
      },
    },
  };

  return (
    <motion.div variants={itemVariants[animation]} className={`will-change-transform ${className}`}>
      {children}
    </motion.div>
  );
};
