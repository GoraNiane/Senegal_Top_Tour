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

const luxuryEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const variantsMap: Record<ScrollAnimationType, Variants> = {
  'fade-up': {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-down': {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-left': {
    hidden: { opacity: 0, x: -45 },
    visible: { opacity: 1, x: 0 },
  },
  'fade-right': {
    hidden: { opacity: 0, x: 45 },
    visible: { opacity: 1, x: 0 },
  },
  'scale-up': {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
  'blur-reveal': {
    hidden: { opacity: 0, y: 35, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  'stagger-container': {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  },
};

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 0.75,
  threshold = 0.12,
  className = '',
  staggerDelay = 0.12,
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
        viewport={{ once, amount: threshold, margin: '0px 0px -50px 0px' }}
        className={className}
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
      viewport={{ once, amount: threshold, margin: '0px 0px -50px 0px' }}
      transition={{
        duration,
        delay,
        ease: luxuryEase,
      }}
      className={className}
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
      hidden: { opacity: 0, y: 35 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease: luxuryEase },
      },
    },
    'scale-up': {
      hidden: { opacity: 0, scale: 0.94, y: 20 },
      visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.65, ease: luxuryEase },
      },
    },
    'blur-reveal': {
      hidden: { opacity: 0, y: 25, filter: 'blur(6px)' },
      visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.65, ease: luxuryEase },
      },
    },
  };

  return (
    <motion.div variants={itemVariants[animation]} className={className}>
      {children}
    </motion.div>
  );
};
