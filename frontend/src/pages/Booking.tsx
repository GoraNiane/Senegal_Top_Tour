import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  Send,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
  Calendar,
  Users,
  MapPin,
  Clock,
  AlertCircle,
  ArrowRight,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { SectionTitle } from '../components/SectionTitle';
import { PageTransition } from '../components/PageTransition';
import { api } from '../services/api';
import { SITE_CONFIG, buildWhatsAppUrl } from '../config';

interface FormErrors {
  fullName?: string;
  email?: string;
  phoneWhatsApp?: string;
  numberOfTravelers?: string;
  preferredDate?: string;
  destination?: string;
  duration?: string;
}

export const Booking: React.FC = () => {
  const [searchParams] = useSearchParams();

  // URL prefill parameters
  const prefillExcursion = searchParams.get('excursion') || '';
  const prefillTheme = searchParams.get('theme') || searchParams.get('experienceType') || '';
  const prefillDestination = searchParams.get('destination') || '';

  // Initial destination computation
  const initialDestination = () => {
    if (prefillDestination) return prefillDestination;
    if (prefillExcursion) {
      const match = SITE_CONFIG.destinations.find((d) =>
        prefillExcursion.toLowerCase().includes(d.toLowerCase())
      );
      if (match) return match;
    }
    return '';
  };

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneWhatsApp: '',
    numberOfTravelers: 2,
    preferredDate: '',
    destination: initialDestination(),
    excursionName: prefillExcursion || prefillTheme || '',
    duration: '½ journée',
    message: prefillExcursion
      ? `Bonjour, je souhaite réserver l'excursion "${prefillExcursion}". Merci de me confirmer les disponibilités et modalités.`
      : prefillTheme
      ? `Bonjour, je suis intéressé(e) par l'expérience "${prefillTheme}". Pouvez-vous me proposer un programme sur mesure ?`
      : '',
    honeypot: '', // Anti-spam hidden trap
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [confirmationData, setConfirmationData] = useState<{
    fullName: string;
    destination: string;
    date: string;
    travelers: number;
    refNumber: string;
  } | null>(null);

  useEffect(() => {
    document.title = 'Demande de Réservation — SENEGAL TOP TOUR';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Préparez votre prochaine expérience avec Senegal Top Tour : réservation d’excursions, circuits sur mesure et immersions privatisées au départ de Dakar.'
      );
    }
    window.scrollTo(0, 0);
  }, []);

  const validateField = (name: string, value: any): string | undefined => {
    switch (name) {
      case 'fullName':
        if (!value || typeof value !== 'string' || value.trim().length < 2) {
          return 'Ce champ est obligatoire (nom et prénom)';
        }
        return undefined;
      case 'email':
        if (!value || typeof value !== 'string' || !value.trim()) {
          return 'Ce champ est obligatoire';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) {
          return 'Veuillez saisir une adresse email valide';
        }
        return undefined;
      case 'phoneWhatsApp':
        if (!value || typeof value !== 'string' || value.trim().length < 6) {
          return 'Veuillez saisir un numéro de téléphone ou WhatsApp valide';
        }
        return undefined;
      case 'numberOfTravelers':
        const num = Number(value);
        if (!num || num < 1 || num > 50) {
          return 'Indiquez un nombre de voyageurs entre 1 et 50';
        }
        return undefined;
      case 'preferredDate':
        if (!value) {
          return 'Veuillez sélectionner votre date souhaitée';
        }
        return undefined;
      case 'destination':
        if (!value) {
          return 'Veuillez sélectionner une destination ou excursion';
        }
        return undefined;
      default:
        return undefined;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    ['fullName', 'email', 'phoneWhatsApp', 'numberOfTravelers', 'preferredDate', 'destination'].forEach((field) => {
      const err = validateField(field, (formData as any)[field]);
      if (err) {
        newErrors[field as keyof FormErrors] = err;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time validation if the field was previously touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Anti-spam honeypot detection
    if (formData.honeypot) {
      console.warn('Spam submission detected.');
      return;
    }

    // Touch all required fields
    setTouched({
      fullName: true,
      email: true,
      phoneWhatsApp: true,
      numberOfTravelers: true,
      preferredDate: true,
      destination: true,
    });

    if (!validateForm()) {
      setErrorMessage('Veuillez corriger les champs signalés avant de valider votre demande.');
      return;
    }

    setErrorMessage('');
    setFormState('loading');

    try {
      const payload = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phoneWhatsApp: formData.phoneWhatsApp.trim(),
        numberOfTravelers: Number(formData.numberOfTravelers),
        preferredDate: formData.preferredDate,
        destination: formData.destination,
        experienceType: formData.excursionName || formData.destination,
        duration: formData.duration,
        message: formData.message.trim(),
      };

      const res = await api.createReservation(payload);

      if (res.success) {
        const ref = res.refNumber || `STT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
        setConfirmationData({
          fullName: formData.fullName,
          destination: formData.destination,
          date: formData.preferredDate,
          travelers: Number(formData.numberOfTravelers),
          refNumber: ref,
        });

        setFormState('success');

        // Confetti celebration
        try {
          confetti({
            particleCount: 90,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#C99A4A', '#173C32', '#A85D3A', '#C7A77A'],
          });
        } catch {
          // ignore confetti on headless
        }
      } else {
        setFormState('error');
        setErrorMessage(res.message || 'Une erreur est survenue lors de l’envoi. Veuillez réessayer.');
      }
    } catch {
      setFormState('error');
      setErrorMessage('Une erreur réseau est survenue. Veuillez vérifier votre connexion ou nous contacter via WhatsApp.');
    }
  };

  const handleResetForm = () => {
    setConfirmationData(null);
    setFormState('idle');
    setErrors({});
    setTouched({});
    setFormData({
      fullName: '',
      email: '',
      phoneWhatsApp: '',
      numberOfTravelers: 2,
      preferredDate: '',
      destination: '',
      excursionName: '',
      duration: '½ journée',
      message: '',
      honeypot: '',
    });
  };

  // Pre-formatted WhatsApp link from current form fields
  const whatsappUrl = buildWhatsAppUrl({
    excursionName: formData.excursionName || formData.destination || '[Nom de l’excursion]',
    date: formData.preferredDate || '[Date souhaitée]',
    travelersCount: formData.numberOfTravelers || '[Nombre]',
  });

  return (
    <PageTransition>
      <div className="bg-[#F7F4EE] min-h-screen text-[#151515] pt-28 sm:pt-36 pb-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {formState !== 'success' ? (
            <>
              {/* Header Title */}
              <SectionTitle
                badge="Demande de Devis & Réservation"
                title="Préparez votre prochaine expérience."
                subtitle="Remplissez le formulaire ci-dessous pour recevoir une proposition détaillée et privatisée."
                align="center"
              />

              {/* Booking Form Card */}
              <div className="bg-white rounded-[32px] p-6 sm:p-10 md:p-12 border border-[#C7A77A]/30 shadow-xl mt-8">
                {/* Global Error Banner */}
                {errorMessage && (
                  <div
                    role="alert"
                    className="mb-8 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-medium flex items-start gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p>{errorMessage}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Anti-spam honeypot (hidden from real users) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website">Website (laisser vide)</label>
                    <input
                      type="text"
                      id="website"
                      name="honeypot"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.honeypot}
                      onChange={handleChange}
                    />
                  </div>

                  {/* 1. Coordonnées personnelles (2 colonnes desktop, 1 colonne mobile) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Nom complet */}
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-xs uppercase font-bold text-[#173C32] tracking-wider mb-2"
                      >
                        Nom complet <span className="text-[#A85D3A]">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.fullName}
                        aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                        placeholder="Ex : Sophie & Marc Delattre"
                        value={formData.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full bg-[#F7F4EE]/60 border rounded-2xl px-4 py-3.5 text-sm text-[#151515] placeholder-neutral-400 focus:outline-none focus:ring-2 transition-all ${
                          errors.fullName
                            ? 'border-rose-400 focus:ring-rose-200 focus:border-rose-600'
                            : 'border-[#C7A77A]/40 focus:ring-[#173C32]/20 focus:border-[#173C32]'
                        }`}
                      />
                      {errors.fullName && (
                        <p id="fullName-error" role="alert" className="mt-1.5 text-xs text-rose-600 font-medium">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs uppercase font-bold text-[#173C32] tracking-wider mb-2"
                      >
                        Adresse Email <span className="text-[#A85D3A]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        placeholder="votre.email@domaine.com"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full bg-[#F7F4EE]/60 border rounded-2xl px-4 py-3.5 text-sm text-[#151515] placeholder-neutral-400 focus:outline-none focus:ring-2 transition-all ${
                          errors.email
                            ? 'border-rose-400 focus:ring-rose-200 focus:border-rose-600'
                            : 'border-[#C7A77A]/40 focus:ring-[#173C32]/20 focus:border-[#173C32]'
                        }`}
                      />
                      {errors.email && (
                        <p id="email-error" role="alert" className="mt-1.5 text-xs text-rose-600 font-medium">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* 2. Téléphone / WhatsApp + Nombre de voyageurs + Date souhaitée */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {/* Téléphone / WhatsApp */}
                    <div>
                      <label
                        htmlFor="phoneWhatsApp"
                        className="block text-xs uppercase font-bold text-[#173C32] tracking-wider mb-2"
                      >
                        Téléphone / WhatsApp <span className="text-[#A85D3A]">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phoneWhatsApp"
                        name="phoneWhatsApp"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.phoneWhatsApp}
                        aria-describedby={errors.phoneWhatsApp ? 'phoneWhatsApp-error' : undefined}
                        placeholder="+33 6 12 34 56 78"
                        value={formData.phoneWhatsApp}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full bg-[#F7F4EE]/60 border rounded-2xl px-4 py-3.5 text-sm text-[#151515] placeholder-neutral-400 focus:outline-none focus:ring-2 transition-all ${
                          errors.phoneWhatsApp
                            ? 'border-rose-400 focus:ring-rose-200 focus:border-rose-600'
                            : 'border-[#C7A77A]/40 focus:ring-[#173C32]/20 focus:border-[#173C32]'
                        }`}
                      />
                      {errors.phoneWhatsApp && (
                        <p id="phoneWhatsApp-error" role="alert" className="mt-1.5 text-xs text-rose-600 font-medium">
                          {errors.phoneWhatsApp}
                        </p>
                      )}
                    </div>

                    {/* Nombre de voyageurs */}
                    <div>
                      <label
                        htmlFor="numberOfTravelers"
                        className="block text-xs uppercase font-bold text-[#173C32] tracking-wider mb-2"
                      >
                        Nombre de voyageurs <span className="text-[#A85D3A]">*</span>
                      </label>
                      <div className="relative">
                        <Users className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="number"
                          id="numberOfTravelers"
                          name="numberOfTravelers"
                          min="1"
                          max="50"
                          required
                          aria-required="true"
                          aria-invalid={!!errors.numberOfTravelers}
                          aria-describedby={errors.numberOfTravelers ? 'numberOfTravelers-error' : undefined}
                          value={formData.numberOfTravelers}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`w-full bg-[#F7F4EE]/60 border rounded-2xl pl-10 pr-4 py-3.5 text-sm text-[#151515] focus:outline-none focus:ring-2 transition-all ${
                            errors.numberOfTravelers
                              ? 'border-rose-400 focus:ring-rose-200 focus:border-rose-600'
                              : 'border-[#C7A77A]/40 focus:ring-[#173C32]/20 focus:border-[#173C32]'
                          }`}
                        />
                      </div>
                      {errors.numberOfTravelers && (
                        <p id="numberOfTravelers-error" role="alert" className="mt-1.5 text-xs text-rose-600 font-medium">
                          {errors.numberOfTravelers}
                        </p>
                      )}
                    </div>

                    {/* Date souhaitée */}
                    <div>
                      <label
                        htmlFor="preferredDate"
                        className="block text-xs uppercase font-bold text-[#173C32] tracking-wider mb-2"
                      >
                        Date souhaitée <span className="text-[#A85D3A]">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          id="preferredDate"
                          name="preferredDate"
                          required
                          aria-required="true"
                          aria-invalid={!!errors.preferredDate}
                          aria-describedby={errors.preferredDate ? 'preferredDate-error' : undefined}
                          value={formData.preferredDate}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`w-full bg-[#F7F4EE]/60 border rounded-2xl px-4 py-3.5 text-sm text-[#151515] focus:outline-none focus:ring-2 transition-all ${
                            errors.preferredDate
                              ? 'border-rose-400 focus:ring-rose-200 focus:border-rose-600'
                              : 'border-[#C7A77A]/40 focus:ring-[#173C32]/20 focus:border-[#173C32]'
                          }`}
                        />
                      </div>
                      {errors.preferredDate && (
                        <p id="preferredDate-error" role="alert" className="mt-1.5 text-xs text-rose-600 font-medium">
                          {errors.preferredDate}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* 3. Destination / Excursion souhaitée & Durée */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-3 border-t border-neutral-100">
                    {/* Destination / Excursion (Section 2 Prompt) */}
                    <div>
                      <label
                        htmlFor="destination"
                        className="block text-xs uppercase font-bold text-[#173C32] tracking-wider mb-2"
                      >
                        Destination / Excursion souhaitée <span className="text-[#A85D3A]">*</span>
                      </label>
                      <select
                        id="destination"
                        name="destination"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.destination}
                        aria-describedby={errors.destination ? 'destination-error' : undefined}
                        value={formData.destination}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full bg-[#F7F4EE]/60 border rounded-2xl px-4 py-3.5 text-sm text-[#151515] focus:outline-none focus:ring-2 transition-all cursor-pointer ${
                          errors.destination
                            ? 'border-rose-400 focus:ring-rose-200 focus:border-rose-600'
                            : 'border-[#C7A77A]/40 focus:ring-[#173C32]/20 focus:border-[#173C32]'
                        }`}
                      >
                        <option value="">Sélectionnez une destination</option>
                        {SITE_CONFIG.destinations.map((dest) => (
                          <option key={dest} value={dest}>
                            {dest}
                          </option>
                        ))}
                      </select>
                      {errors.destination && (
                        <p id="destination-error" role="alert" className="mt-1.5 text-xs text-rose-600 font-medium">
                          {errors.destination}
                        </p>
                      )}
                    </div>

                    {/* Durée estimée */}
                    <div>
                      <label
                        htmlFor="duration"
                        className="block text-xs uppercase font-bold text-[#173C32] tracking-wider mb-2"
                      >
                        Durée estimée
                      </label>
                      <select
                        id="duration"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        className="w-full bg-[#F7F4EE]/60 border border-[#C7A77A]/40 rounded-2xl px-4 py-3.5 text-sm text-[#151515] focus:outline-none focus:ring-2 focus:ring-[#173C32]/20 focus:border-[#173C32] transition-all cursor-pointer"
                      >
                        <option value="½ journée">½ Journée</option>
                        <option value="1 journée">1 Journée complète</option>
                        <option value="2-3 jours">2 à 3 Jours</option>
                        <option value="Sur mesure (1 semaine ou +)">Sur mesure (1 semaine ou +)</option>
                      </select>
                    </div>
                  </div>

                  {/* 4. Message / Précisions particulières */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs uppercase font-bold text-[#173C32] tracking-wider mb-2"
                    >
                      Message / Précisions particulières
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Précisez votre lieu de départ (Dakar, Saly), vos souhaits spécifiques, régimes alimentaires ou questions..."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-[#F7F4EE]/60 border border-[#C7A77A]/40 rounded-2xl p-4 text-sm text-[#151515] placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#173C32]/20 focus:border-[#173C32] transition-all"
                    />
                  </div>

                  {/* Engagement & Confidentialité */}
                  <div className="p-4 rounded-2xl bg-[#F7F4EE] border border-[#C7A77A]/25 flex items-center gap-3 text-xs text-neutral-600">
                    <ShieldCheck className="w-5 h-5 text-[#173C32] flex-shrink-0" />
                    <span>
                      Vos coordonnées sont traitées avec la plus stricte confidentialité et ne sont jamais cédées à des tiers.
                    </span>
                  </div>

                  {/* Form Submission Buttons Bar */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Primary Submit Button */}
                    <button
                      type="submit"
                      disabled={formState === 'loading'}
                      className={`w-full sm:w-auto btn-gold px-10 py-4 text-xs font-bold uppercase tracking-wider rounded-full shadow-xl flex items-center justify-center gap-2.5 transition-all ${
                        formState === 'loading'
                          ? 'opacity-70 cursor-not-allowed'
                          : 'cursor-pointer hover:shadow-2xl'
                      }`}
                    >
                      {formState === 'loading' ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-[#151515]" />
                          <span>Transmission en cours...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-[#151515]" />
                          <span>Envoyer ma demande</span>
                        </>
                      )}
                    </button>

                    {/* WhatsApp Quick Reservation Direct Link */}
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Réserver via WhatsApp</span>
                    </a>
                  </div>
                </form>
              </div>
            </>
          ) : (
            /* ==================================================
               4. CONFIRMATION SCREEN (PREMIUM DESIGN)
               ================================================== */
            <div className="bg-white rounded-[36px] p-8 sm:p-14 lg:p-16 border border-[#C7A77A]/30 text-center shadow-2xl space-y-8 animate-in fade-in duration-300">
              {/* Check Icon */}
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              {/* Confirmation Headlines (Exact prompt wording) */}
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold text-[#A85D3A] uppercase tracking-widest block">
                  Dossier N° {confirmationData?.refNumber}
                </span>

                <h2 className="text-3xl sm:text-4xl font-serif text-[#173C32]">
                  « Merci pour votre demande. »
                </h2>

                <p className="text-base sm:text-lg text-neutral-700 font-light max-w-xl mx-auto leading-relaxed">
                  « Notre équipe reviendra vers vous pour confirmer les détails de votre excursion. »
                </p>
              </div>

              {/* Résumé de la demande (Destination, Date, Voyageurs) */}
              <div className="bg-[#F7F4EE] rounded-2xl p-6 border border-[#C7A77A]/30 max-w-lg mx-auto text-left space-y-3.5">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#173C32] block border-b border-[#C7A77A]/20 pb-2">
                  Résumé de votre demande :
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-neutral-500 block">Destination :</span>
                    <strong className="text-[#173C32] text-sm font-serif block mt-0.5">
                      {confirmationData?.destination || 'Sénégal'}
                    </strong>
                  </div>

                  <div>
                    <span className="text-neutral-500 block">Date souhaitée :</span>
                    <strong className="text-[#173C32] text-sm font-serif block mt-0.5">
                      {confirmationData?.date || 'À convenir'}
                    </strong>
                  </div>

                  <div>
                    <span className="text-neutral-500 block">Voyageurs :</span>
                    <strong className="text-[#173C32] text-sm font-serif block mt-0.5">
                      {confirmationData?.travelers} personne{confirmationData && confirmationData.travelers > 1 ? 's' : ''}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={buildWhatsAppUrl({
                    excursionName: confirmationData?.destination,
                    date: confirmationData?.date,
                    travelersCount: confirmationData?.travelers,
                    customMessage: `Bonjour SENEGAL TOP TOUR,\n\nJe viens de déposer la demande numéro ${confirmationData?.refNumber} concernant l'excursion ${confirmationData?.destination}.\n\nDate : ${confirmationData?.date}\nVoyageurs : ${confirmationData?.travelers}\n\nMerci !`,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-4 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Confirmer via WhatsApp</span>
                </a>

                <button
                  onClick={handleResetForm}
                  className="w-full sm:w-auto btn-primary text-xs uppercase tracking-wider px-8 py-4 cursor-pointer"
                >
                  Nouvelle demande
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};
export default Booking;
