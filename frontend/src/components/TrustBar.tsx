import React from 'react';
import { ShieldCheck, Compass, HeartHandshake, PhoneCall } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const TrustBar: React.FC = () => {
  const { t, language } = useLanguage();

  const items = [
    {
      icon: Compass,
      title: t.trustBar.item1Title,
      subtitle: t.trustBar.item1Desc,
    },
    {
      icon: ShieldCheck,
      title: t.trustBar.item2Title,
      subtitle: t.trustBar.item2Desc,
    },
    {
      icon: HeartHandshake,
      title: t.trustBar.item3Title,
      subtitle: t.trustBar.item3Desc,
    },
    {
      icon: PhoneCall,
      title: t.trustBar.item4Title,
      subtitle: t.trustBar.item4Desc,
    },
  ];

  return (
    <section className="bg-white border-y border-[#C7A77A]/20 py-5 sm:py-6 px-4 sm:px-6 lg:px-8 shadow-xs relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-3.5 group p-2 rounded-xl hover:bg-[#F7F4EE]/50 transition-colors">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#173C32]/10 text-[#173C32] flex items-center justify-center flex-shrink-0 group-hover:bg-[#173C32] group-hover:text-[#C99A4A] transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs sm:text-sm font-serif font-bold text-[#151515] group-hover:text-[#173C32] transition-colors leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[10.5px] sm:text-xs text-neutral-500 font-light mt-0.5 leading-tight">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
