/**
 * SENEGAL TOP TOUR — Configuration centralisée
 * Variables d'environnement et paramètres officiels.
 */

export const SITE_CONFIG = {
  name: 'SENEGAL TOP TOUR',
  tagline: 'Découvrez le Sénégal autrement',
  description: "Plateforme touristique d'exception : excursions privatisées, voyages à thèmes et tourisme solidaire au Sénégal.",
  
  // WhatsApp Configuration (utilise la variable d'env si fournie, sinon valeur officielle)
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '+221 77 000 00 00',
  whatsappRawNumber: (import.meta.env.VITE_WHATSAPP_NUMBER || '221770000000').replace(/[^0-9]/g, ''),
  
  // Contact
  email: import.meta.env.VITE_CONTACT_EMAIL || 'contact@senegaltoptour.com',
  phoneDisplay: '+221 77 000 00 00',
  address: "Presqu'île du Cap-Vert, Dakar · Sénégal",
  hours: '7j/7 de 08h00 à 20h00 (GMT)',
  
  // Official Excursion Destinies List
  destinations: [
    'Dakar',
    'Gorée',
    'Dakar + Gorée',
    'Kayar',
    'Lac Rose',
    'Noflaye',
    'Joal-Fadiouth',
    'Autre',
  ] as const,
};

/**
 * Générateur de lien WhatsApp officiel pré-formaté
 */
export const buildWhatsAppUrl = (options: {
  excursionName?: string;
  date?: string;
  travelersCount?: number | string;
  customMessage?: string;
}): string => {
  if (options.customMessage) {
    return `https://wa.me/${SITE_CONFIG.whatsappRawNumber}?text=${encodeURIComponent(options.customMessage)}`;
  }

  const message = [
    'Bonjour SENEGAL TOP TOUR,',
    '',
    "Je souhaite obtenir des informations concernant l'excursion :",
    options.excursionName || '[Nom]',
    '',
    `Date souhaitée : ${options.date || '[Date]'}`,
    `Nombre de voyageurs : ${options.travelersCount || '[Nombre]'}`,
    '',
    'Merci.',
  ].join('\n');

  return `https://wa.me/${SITE_CONFIG.whatsappRawNumber}?text=${encodeURIComponent(message)}`;
};
