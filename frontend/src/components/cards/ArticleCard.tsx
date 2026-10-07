import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Badge } from '../ui/Badge';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface ArticleCardProps {
  title: string;
  excerpt: string;
  imageUrl: string;
  imageAlt?: string;
  category: string;
  date?: string;
  readTime?: string;
  author?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  excerpt,
  imageUrl,
  imageAlt,
  category,
  date = 'Mars 2026',
  readTime = '4 min de lecture',
  author = 'Guide SENEGAL TOP TOUR',
  href,
  onClick,
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();

  const CardWrapper = href ? 'a' : 'div';
  const wrapperProps = href ? { href } : { onClick };

  return (
    <motion.div
      whileHover={!prefersReducedMotion ? { y: -5, transition: { duration: 0.3 } } : undefined}
      className={cn(
        'group bg-white rounded-[24px] overflow-hidden border border-[#C7A77A]/25 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left',
        className
      )}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#151515]">
        <img
          src={imageUrl}
          alt={imageAlt || title}
          loading="lazy"
          className="w-full h-full object-cover transform scale-100 group-hover:scale-108 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="absolute top-3.5 left-3.5 z-10">
          <Badge variant="glass" className="text-[10px]">
            {category}
          </Badge>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Meta Info */}
          <div className="flex items-center gap-3 text-xs text-neutral-400 font-medium">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#C7A77A]" />
              {date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#C7A77A]" />
              {readTime}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#151515] group-hover:text-[#173C32] transition-colors leading-snug">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed line-clamp-3">
            {excerpt}
          </p>
        </div>

        {/* Footer info & CTA */}
        <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-neutral-500">
            <User className="w-3.5 h-3.5 text-[#A85D3A]" />
            <span className="truncate max-w-[140px]">{author}</span>
          </div>

          <CardWrapper
            {...wrapperProps}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#173C32] group-hover:text-[#A85D3A] transition-colors cursor-pointer select-none"
          >
            <span>Lire l'article</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
          </CardWrapper>
        </div>
      </div>
    </motion.div>
  );
};
