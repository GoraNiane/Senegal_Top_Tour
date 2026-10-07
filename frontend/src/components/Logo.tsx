import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'light',
  size = 'md',
  showSubtitle = false,
}) => {
  const isLight = variant === 'light'; // light = white text (for dark/image backgrounds)

  const sizeClasses = {
    sm: {
      icon: 'w-8 h-8',
      senegal: 'text-sm sm:text-base font-serif font-bold tracking-[0.18em]',
      toptour: 'text-[9px] tracking-[0.25em] font-sans font-semibold',
    },
    md: {
      icon: 'w-10 h-10',
      senegal: 'text-base sm:text-lg md:text-xl font-serif font-bold tracking-[0.2em]',
      toptour: 'text-[10px] sm:text-[11px] tracking-[0.3em] font-sans font-semibold',
    },
    lg: {
      icon: 'w-12 h-12',
      senegal: 'text-xl sm:text-2xl font-serif font-bold tracking-[0.22em]',
      toptour: 'text-xs tracking-[0.32em] font-sans font-semibold',
    },
  }[size];

  return (
    <Link to="/" className="inline-flex items-center gap-3 group select-none">
      {/* Golden Rising Sun with Baobab Tree Logo Icon */}
      <div className={`${sizeClasses.icon} relative flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}>
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          {/* Semicircle sun fan dome */}
          <path
            d="M50 15 C30 15 14 31 14 52 L86 52 C86 31 70 15 50 15 Z"
            fill="url(#goldSunGrad)"
          />
          {/* Radiating sun ray lines in dome */}
          <path d="M50 16 L50 52" stroke="#FFFFFF" strokeWidth="2.5" strokeOpacity="0.85" />
          <path d="M36 21 L44 52" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.85" />
          <path d="M64 21 L56 52" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.85" />
          <path d="M24 33 L38 52" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.85" />
          <path d="M76 33 L62 52" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.85" />
          <path d="M17 48 L32 52" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.75" />
          <path d="M83 48 L68 52" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.75" />

          {/* Central Baobab tree silhouette inside dome */}
          <path
            d="M48 52 L48 40 C44 38 42 34 44 30 C46 26 54 26 56 30 C58 34 56 38 52 40 L52 52 Z"
            fill="#173C32"
          />

          {/* Golden Field / Horizon / Pirogue curves below */}
          <path
            d="M14 56 C28 56 46 62 50 78 C54 62 72 56 86 56 C74 76 58 84 50 84 C42 84 26 76 14 56 Z"
            fill="url(#goldBaseGrad)"
          />
          <path d="M14 56 C32 60 48 66 50 84" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.65" />
          <path d="M86 56 C68 60 52 66 50 84" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.65" />
          <path d="M30 64 C42 68 48 74 50 84" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.55" />
          <path d="M70 64 C58 68 52 74 50 84" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.55" />

          <defs>
            <linearGradient id="goldSunGrad" x1="50" y1="15" x2="50" y2="52" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E2B167" />
              <stop offset="1" stopColor="#C99A4A" />
            </linearGradient>
            <linearGradient id="goldBaseGrad" x1="50" y1="56" x2="50" y2="84" gradientUnits="userSpaceOnUse">
              <stop stopColor="#C99A4A" />
              <stop offset="1" stopColor="#9E692D" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center leading-none">
        <span className={`${sizeClasses.senegal} ${isLight ? 'text-white' : 'text-[#173C32]'} tracking-[0.2em] font-serif`}>
          SENEGAL
        </span>
        <span className={`${sizeClasses.toptour} text-[#C99A4A] tracking-[0.3em] uppercase mt-0.5`}>
          TOP TOUR
        </span>
      </div>
    </Link>
  );
};
