import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Utensils, HeartHandshake } from 'lucide-react';
import dakar4Img from '../assets/Dakar4.png';
import { useLanguage } from '../context/LanguageContext';

export const ExperiencesSection: React.FC = () => {
  const { t, language } = useLanguage();

  const experiences = [
    {
      title: language === 'de' ? 'Ausflüge & Rundreisen' : language === 'en' ? 'Excursions & Circuits' : 'Excursions & Circuits',
      description: language === 'de'
        ? 'Die Höhepunkte Senegals, von Dakar bis Saint-Louis, über Gorée und den Rosa See.'
        : language === 'en'
        ? 'The highlights of Senegal, from Dakar to Saint-Louis, passing through Gorée and the Pink Lake.'
        : 'Les incontournables du Sénégal, de Dakar à Saint-Louis en passant par Gorée et le Lac Rose.',
      imageUrl: dakar4Img || '/images/dakar4.png',
      link: '/excursions',
      ctaText: language === 'de' ? 'Entdecken' : language === 'en' ? 'Discover' : 'Découvrir',
      icon: Compass,
    },
    {
      title: language === 'de' ? 'Themenreisen' : language === 'en' ? 'Themed Journeys' : 'Voyages à thèmes',
      description: language === 'de'
        ? 'Kulinarik, professioneller Austausch, Kunsthandwerk, Ökobau und vieles mehr.'
        : language === 'en'
        ? 'Gastronomy, professional encounters, local craftsmanship, earth building, and more.'
        : 'Cuisine, rencontres professionnelles, artisanat, écoconstruction, et bien plus encore.',
      imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=85',
      link: '/voyages-a-themes',
      ctaText: language === 'de' ? 'Erkunden' : language === 'en' ? 'Explore' : 'Explorer',
      icon: Utensils,
    },
    {
      title: language === 'de' ? 'Solidarischer Tourismus' : language === 'en' ? 'Solidarity Tourism' : 'Tourisme solidaire',
      description: language === 'de'
        ? 'Unterstützung lokaler Dorfgemeinschaften und Förderung einer nachhaltigen Entwicklung.'
        : language === 'en'
        ? 'Empowering local rural communities and fostering sustainable human development.'
        : 'Soutenir les communautés locales et contribuer au développement durable.',
      imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=85',
      link: '/tourisme-solidaire',
      ctaText: language === 'de' ? 'Mehr erfahren' : language === 'en' ? 'Learn More' : 'En savoir plus',
      icon: HeartHandshake,
    },
  ];

  return (
    <section id="experiences" className="py-20 md:py-24 bg-[#23201d] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C99A4A] block">
              {language === 'de' ? 'REISEN MIT SINN' : language === 'en' ? 'MEANINGFUL JOURNEYS' : 'DES VOYAGES QUI ONT DU SENS'}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white">
              {language === 'de' ? 'Unsere Erlebnisse' : language === 'en' ? 'Our Experiences' : 'Nos expériences'}
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-white/80 font-light">
            <span>{language === 'de' ? 'Drei einzigartige Wege, den Senegal nach Ihrem Rhythmus zu erleben.' : language === 'en' ? 'Three distinct ways to live Senegal, at your rhythm.' : 'Trois façons de vivre le Sénégal, selon vos envies.'}</span>
            <Link
              to="/excursions"
              className="inline-flex items-center gap-2 text-xs font-medium px-5 py-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white border border-white/30 hover:border-white transition-all w-fit"
            >
              <span>{language === 'de' ? 'Alle Erlebnisse' : language === 'en' ? 'All experiences' : 'Toutes nos expériences'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 3 White Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {experiences.map((exp, idx) => {
            const Icon = exp.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image with circular badge */}
                <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-neutral-900">
                  <img
                    src={exp.imageUrl}
                    alt={exp.title}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Circular Icon Badge at bottom-left */}
                  <div className="absolute bottom-3 left-4 w-10 h-10 rounded-full bg-[#B8864E] text-white flex items-center justify-center shadow-md border-2 border-white">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Content text */}
                <div className="p-6 text-left flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-[#151515] mb-2 leading-snug">
                      {exp.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#151515]/70 font-light leading-relaxed mb-6">
                      {exp.description}
                    </p>
                  </div>

                  <div className="pt-2">
                    <Link
                      to={exp.link}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B8864E] hover:text-[#936634] transition-colors"
                    >
                      <span>{exp.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
