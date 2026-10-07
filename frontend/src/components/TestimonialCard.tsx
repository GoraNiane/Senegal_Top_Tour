import React from 'react';
import { Star, Quote, MapPin } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-[24px] p-7 sm:p-8 border border-[#C7A77A]/25 shadow-sm hover:shadow-xl transition-all duration-400 flex flex-col justify-between relative group">
      {/* Decorative Quote mark */}
      <Quote className="absolute top-6 right-6 w-8 h-8 text-[#C7A77A]/20 group-hover:text-[#C99A4A]/40 transition-colors" />

      <div>
        {/* Rating Stars */}
        <div className="flex items-center gap-1 text-[#C99A4A] mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < testimonial.rating ? 'fill-current text-[#C99A4A]' : 'text-neutral-300'
              }`}
            />
          ))}
        </div>

        {/* Comment */}
        <p className="text-sm sm:text-base text-[#151515]/80 font-light leading-relaxed italic mb-6">
          « {testimonial.comment} »
        </p>
      </div>

      {/* Author profile */}
      <div className="pt-4 border-t border-neutral-100 flex items-center gap-3.5">
        <img
          src={
            testimonial.avatarUrl ||
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
          }
          alt={testimonial.fullName}
          className="w-12 h-12 rounded-full object-cover border border-[#C7A77A]/40"
        />
        <div>
          <h4 className="font-serif font-bold text-base text-[#173C32]">
            {testimonial.fullName}
          </h4>
          <div className="flex items-center gap-1 text-xs text-[#A85D3A]">
            <MapPin className="w-3 h-3" />
            <span>{testimonial.country}</span>
            {testimonial.tourName && (
              <span className="text-neutral-400">· {testimonial.tourName}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
