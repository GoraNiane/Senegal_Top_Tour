import { type Variants, type Transition } from 'framer-motion';

/**
 * SENEGAL TOP TOUR — Motion & Animation System (Framer Motion)
 * Animations fluides, luxueuses, respectueuses de l'accessibilité.
 */

export const luxuryEasing: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const luxurySpring = { type: 'spring' as const, stiffness: 300, damping: 30 };

export const defaultTransition: Transition = {
  duration: 0.6,
  ease: luxuryEasing,
};

// Fade In
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: defaultTransition,
  },
};

// Fade In Up
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: luxuryEasing,
    },
  },
};

// Fade In Down
export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: luxuryEasing,
    },
  },
};

// Fade In Left
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.65,
      ease: luxuryEasing,
    },
  },
};

// Fade In Right
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.65,
      ease: luxuryEasing,
    },
  },
};

// Scale Up
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: luxuryEasing,
    },
  },
};

// Stagger Container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

// Stagger Item
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: luxuryEasing,
    },
  },
};

// Image Reveal & Zoom Hover
export const imageZoomHover = {
  rest: { scale: 1, transition: { duration: 0.7, ease: luxuryEasing } },
  hover: { scale: 1.07, transition: { duration: 0.7, ease: luxuryEasing } },
};

// Card Lift on Hover
export const cardHover = {
  rest: { y: 0, transition: { duration: 0.35, ease: luxuryEasing } },
  hover: { y: -6, transition: { duration: 0.35, ease: luxuryEasing } },
};

// Button Micro-Interactions
export const buttonTap = {
  scale: 0.97,
  transition: { duration: 0.1 },
};

export const buttonHover = {
  y: -2,
  transition: { duration: 0.2, ease: luxuryEasing },
};

// Modal Animation
export const modalOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const modalDialog: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: luxuryEasing },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 12,
    transition: { duration: 0.2 },
  },
};
