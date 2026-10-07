import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, MessageCircle, ArrowRight } from 'lucide-react';
import { Container } from '../../components/layout/Container';

export const FinalCtaSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-[#173C32] text-white relative overflow-hidden text-center">
      {/* Soft Ambient Gold Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C99A4A]/10 blur-3xl pointer-events-none" />

      <Container size="md" className="relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#C99A4A] text-xs font-semibold uppercase tracking-[0.25em] border border-white/10 mx-auto">
          <Sparkles className="w-3.5 h-3.5" />
          <span>VOTRE VOYAGE AU SÉNÉGAL</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
          Votre prochaine aventure <br />
          <span className="italic font-serif font-normal text-[#C99A4A]">commence ici.</span>
        </h2>

        <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed max-w-xl mx-auto">
          Que vous souhaitiez une journée d'évasion à Gorée ou un grand circuit sur mesure à travers tout le pays, notre équipe locale est à votre écoute.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/reservation"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-full bg-gradient-to-r from-[#C99A4A] to-[#C7A77A] text-[#151515] hover:brightness-105 shadow-xl transition-all"
          >
            <Calendar className="w-4 h-4 text-[#151515]" />
            <span>Planifier mon voyage</span>
            <ArrowRight className="w-4 h-4 text-[#151515]" />
          </Link>

          <Link
            to="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-white transition-all"
          >
            <MessageCircle className="w-4 h-4 text-white" />
            <span>Nous contacter</span>
          </Link>
        </div>
      </Container>
    </section>
  );
};
