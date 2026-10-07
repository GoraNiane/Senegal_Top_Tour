import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExperienceCardProps {
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  link: string;
  ctaText: string;
  highlights?: string[];
  index: number;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  category,
  description,
  imageUrl,
  link,
  ctaText,
  highlights,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative bg-[#1c1c1c] rounded-[24px] overflow-hidden border border-white/10 hover:border-[#C99A4A]/50 transition-all duration-500 flex flex-col justify-between shadow-xl"
    >
      {/* Top Image Banner */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transform scale-100 group-hover:scale-108 transition-transform duration-700 filter brightness-[0.9]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1c] via-transparent to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-5 left-5 z-10 px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#C99A4A]/30 text-xs text-[#C99A4A] font-semibold tracking-wider uppercase">
          {category}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl sm:text-3xl font-serif text-white group-hover:text-[#F7F4EE] transition-colors mb-3 leading-snug">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed mb-6">
            {description}
          </p>

          {/* Key highlights */}
          {highlights && highlights.length > 0 && (
            <div className="space-y-2 mb-8">
              {highlights.slice(0, 3).map((hl, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-white/80">
                  <Sparkles className="w-3 h-3 text-[#C99A4A] flex-shrink-0" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA Link */}
        <div className="pt-4 border-t border-white/10">
          <Link
            to={link}
            className="inline-flex items-center gap-2.5 text-sm font-semibold text-[#C99A4A] group-hover:text-white transition-colors duration-300 tracking-wide"
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
