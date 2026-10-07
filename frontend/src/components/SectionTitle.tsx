import React from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  theme?: 'light' | 'dark';
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  badge,
  title,
  subtitle,
  align = 'center',
  theme = 'light',
}) => {
  const isDark = theme === 'dark';

  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }[align];

  return (
    <div className={`flex flex-col ${alignClasses} mb-12 md:mb-16`}>
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.25em] mb-3.5 border"
          style={{
            borderColor: isDark ? 'rgba(201, 154, 74, 0.4)' : 'rgba(168, 93, 58, 0.25)',
            backgroundColor: isDark ? 'rgba(201, 154, 74, 0.1)' : 'rgba(199, 167, 122, 0.12)',
            color: isDark ? '#C99A4A' : '#A85D3A',
          }}
        >
          {badge}
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight leading-[1.15] ${
          isDark ? 'text-[#FFFFFF]' : 'text-[#151515]'
        }`}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`mt-4 text-base sm:text-lg max-w-2xl font-light leading-relaxed ${
            isDark ? 'text-[#F7F4EE]/75' : 'text-[#151515]/75'
          }`}
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="w-16 h-[2px] bg-[#C99A4A] mt-5 origin-center"
      />
    </div>
  );
};
