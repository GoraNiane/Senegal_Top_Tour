import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  MessageCircle,
  AlertCircle,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';
import { SectionTitle } from '../components/SectionTitle';
import { PageTransition } from '../components/PageTransition';
import { api } from '../services/api';
import { SITE_CONFIG, buildWhatsAppUrl } from '../config';

interface ContactErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const [searchParams] = useSearchParams();
  const prefillSubject = searchParams.get('subject') || '';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: prefillSubject || 'Demande générale d’informations',
    message: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    document.title = 'Contact & Conciergerie — SENEGAL TOP TOUR';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Contactez la conciergerie de Senegal Top Tour à Dakar. Assistance voyage 7j/7, devis sur mesure et conciergerie WhatsApp directe.'
      );
    }
    window.scrollTo(0, 0);
  }, []);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'fullName':
        if (!value || value.trim().length < 2) {
          return 'Ce champ est obligatoire';
        }
        return undefined;
      case 'email':
        if (!value || !value.trim()) {
          return 'Ce champ est obligatoire';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) {
          return 'Veuillez saisir une adresse email valide';
        }
        return undefined;
      case 'phone':
        // Optional or standard phone check if provided
        if (value && value.trim().length > 0 && value.trim().length < 6) {
          return 'Veuillez saisir un numéro de téléphone valide';
        }
        return undefined;
      case 'message':
        if (!value || value.trim().length < 10) {
          return 'Veuillez saisir votre message (au moins 10 caractères)';
        }
        return undefined;
      default:
        return undefined;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ContactErrors = {};
    let isValid = true;

    ['fullName', 'email', 'phone', 'message'].forEach((field) => {
      const err = validateField(field, (formData as any)[field]);
      if (err) {
        newErrors[field as keyof ContactErrors] = err;
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

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Anti-spam honeypot
    if (formData.honeypot) {
      console.warn('Spam submission detected in contact form.');
      return;
    }

    setTouched({
      fullName: true,
      email: true,
      phone: true,
      message: true,
    });

    if (!validateForm()) {
      setErrorMessage('Veuillez renseigner correctement les champs obligatoires.');
      return;
    }

    setErrorMessage('');
    setFormState('loading');

    try {
      const payload = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.subject,
        message: formData.message.trim(),
      };

      const res = await api.sendContactMessage(payload);

      if (res && res.success !== false) {
        setFormState('success');
      } else {
        setFormState('error');
        setErrorMessage(res?.message || 'Une erreur est survenue lors de l’envoi de votre message.');
      }
    } catch {
      setFormState('error');
      setErrorMessage('Erreur réseau. Veuillez réessayer ou utiliser notre conciergerie WhatsApp.');
    }
  };

  const handleReset = () => {
    setFormState('idle');
    setErrors({});
    setTouched({});
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      subject: 'Demande générale d’informations',
      message: '',
      honeypot: '',
    });
  };

  const whatsappDirectUrl = buildWhatsAppUrl({
    customMessage: `Bonjour SENEGAL TOP TOUR,\n\nJe souhaite échanger avec votre conciergerie concernant un projet de séjour au Sénégal.\n\nMerci.`,
  });

  return (
    <PageTransition>
      <div className="bg-[#F7F4EE] min-h-screen text-[#151515] pt-28 sm:pt-36 pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Title */}
          <SectionTitle
            badge="Contact & Conciergerie"
            title="Échangeons sur votre projet"
            subtitle="Notre équipe locale est à votre disposition 7j/7 pour concevoir votre séjour idéal au Sénégal."
            align="center"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mt-10">
            {/* Left Column: Direct Contacts & Hours (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#173C32] text-white rounded-[32px] p-7 sm:p-10 shadow-xl space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#C99A4A]/10 rounded-full blur-2xl pointer-events-none" />

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C99A4A]">
                    Conciergerie Officielle
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif text-white">
                    {SITE_CONFIG.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                    Une assistance attentive et personnalisée pour tous vos déplacements au Sénégal.
                  </p>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-white/90 pt-4 border-t border-white/10">
                  <div className="flex items-start gap-3.5">
                    <MapPin className="w-5 h-5 text-[#C99A4A] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white font-semibold">Siège & Accueil</strong>
                      <span className="text-white/70">{SITE_CONFIG.address}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Phone className="w-5 h-5 text-[#C99A4A] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white font-semibold">Ligne Directe / WhatsApp</strong>
                      <span className="text-white/70">{SITE_CONFIG.phoneDisplay}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Mail className="w-5 h-5 text-[#C99A4A] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white font-semibold">Courrier Électronique</strong>
                      <span className="text-white/70">{SITE_CONFIG.email}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Clock className="w-5 h-5 text-[#C99A4A] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white font-semibold">Disponibilité</strong>
                      <span className="text-white/70">{SITE_CONFIG.hours}</span>
                    </div>
                  </div>
                </div>

                {/* Direct WhatsApp CTA Button */}
                <div className="pt-4 border-t border-white/10">
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Ouvrir WhatsApp direct</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form (7 Cols) */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-[32px] p-6 sm:p-10 border border-[#C7A77A]/30 shadow-sm">
                {formState !== 'success' ? (
                  <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-serif text-[#173C32]">
                        Envoyez-nous un message
                      </h3>
                      <p className="text-xs text-neutral-500 font-light mt-1">
                        Nous vous répondons sous 24h avec une proposition sur mesure.
                      </p>
                    </div>

                    {/* Global Error Banner */}
                    {errorMessage && (
                      <div
                        role="alert"
                        className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2.5"
                      >
                        <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* Anti-spam honeypot */}
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="contact-website">Website</label>
                      <input
                        type="text"
                        id="contact-website"
                        name="honeypot"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formData.honeypot}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Nom complet & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="contact-fullName"
                          className="block text-xs uppercase font-bold text-[#173C32] tracking-wider mb-2"
                        >
                          Nom complet <span className="text-[#A85D3A]">*</span>
                        </label>
                        <input
                          type="text"
                          id="contact-fullName"
                          name="fullName"
                          required
                          aria-required="true"
                          aria-invalid={!!errors.fullName}
                          aria-describedby={errors.fullName ? 'contact-fullName-error' : undefined}
                          placeholder="Votre nom et prénom"
                          value={formData.fullName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`w-full bg-[#F7F4EE]/60 border rounded-xl px-4 py-3 text-sm text-[#151515] placeholder-neutral-400 focus:outline-none focus:ring-2 transition-all ${
                            errors.fullName
                              ? 'border-rose-400 focus:ring-rose-200 focus:border-rose-600'
                              : 'border-[#C7A77A]/40 focus:ring-[#173C32]/20 focus:border-[#173C32]'
                          }`}
                        />
                        {errors.fullName && (
                          <p id="contact-fullName-error" role="alert" className="mt-1 text-xs text-rose-600 font-medium">
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-xs uppercase font-bold text-[#173C32] tracking-wider mb-2"
                        >
                          Adresse Email <span className="text-[#A85D3A]">*</span>
                        </label>
                        <input
                          type="email"
                          id="contact-email"
                          name="email"
                          required
                          aria-required="true"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? 'contact-email-error' : undefined}
                          placeholder="votre.email@domaine.com"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`w-full bg-[#F7F4EE]/60 border rounded-xl px-4 py-3 text-sm text-[#151515] placeholder-neutral-400 focus:outline-none focus:ring-2 transition-all ${
                            errors.email
                              ? 'border-rose-400 focus:ring-rose-200 focus:border-rose-600'
                              : 'border-[#C7A77A]/40 focus:ring-[#173C32]/20 focus:border-[#173C32]'
                          }`}
                        />
                        {errors.email && (
                          <p id="contact-email-error" role="alert" className="mt-1 text-xs text-rose-600 font-medium">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Téléphone & Sujet */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="contact-phone"
                          className="block text-xs uppercase font-bold text-[#173C32] tracking-wider mb-2"
                        >
                          Téléphone / WhatsApp
                        </label>
                        <input
                          type="tel"
                          id="contact-phone"
                          name="phone"
                          placeholder="+33 6 00 00 00 00"
                          value={formData.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="w-full bg-[#F7F4EE]/60 border border-[#C7A77A]/40 rounded-xl px-4 py-3 text-sm text-[#151515] focus:outline-none focus:ring-2 focus:ring-[#173C32]/20 focus:border-[#173C32] transition-all"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact-subject"
                          className="block text-xs uppercase font-bold text-[#173C32] tracking-wider mb-2"
                        >
                          Objet de votre demande
                        </label>
                        <select
                          id="contact-subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full bg-[#F7F4EE]/60 border border-[#C7A77A]/40 rounded-xl px-4 py-3 text-sm text-[#151515] focus:outline-none focus:ring-2 focus:ring-[#173C32]/20 focus:border-[#173C32] transition-all cursor-pointer"
                        >
                          <option value="Demande générale d’informations">Demande générale d’informations</option>
                          <option value="Circuit sur mesure / Privatisation">Circuit sur mesure / Privatisation</option>
                          <option value="Excursion à la journée">Excursion à la journée</option>
                          <option value="Voyage à thèmes (Cuisine, Métiers)">Voyage à thèmes (Cuisine, Métiers)</option>
                          <option value="Projet Tourisme Solidaire">Projet Tourisme Solidaire</option>
                          <option value="Autre demande">Autre demande</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-xs uppercase font-bold text-[#173C32] tracking-wider mb-2"
                      >
                        Votre Message <span className="text-[#A85D3A]">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'contact-message-error' : undefined}
                        rows={4}
                        placeholder="Décrivez-nous vos souhaits de voyage, dates envisagées, nombre de personnes ou questions..."
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full bg-[#F7F4EE]/60 border rounded-xl p-4 text-sm text-[#151515] placeholder-neutral-400 focus:outline-none focus:ring-2 transition-all ${
                          errors.message
                            ? 'border-rose-400 focus:ring-rose-200 focus:border-rose-600'
                            : 'border-[#C7A77A]/40 focus:ring-[#173C32]/20 focus:border-[#173C32]'
                        }`}
                      />
                      {errors.message && (
                        <p id="contact-message-error" role="alert" className="mt-1 text-xs text-rose-600 font-medium">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={formState === 'loading'}
                      className={`w-full btn-primary py-4 text-xs font-bold uppercase tracking-wider rounded-full flex items-center justify-center gap-2 transition-all ${
                        formState === 'loading'
                          ? 'opacity-70 cursor-not-allowed'
                          : 'cursor-pointer hover:shadow-lg'
                      }`}
                    >
                      {formState === 'loading' ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Transmission en cours...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Envoyer le message</span>
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  /* Success Confirmation Screen */
                  <div className="text-center py-10 space-y-5 animate-in fade-in duration-300">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <h4 className="text-2xl sm:text-3xl font-serif text-[#173C32]">
                      Message transmis avec succès !
                    </h4>

                    <p className="text-sm text-neutral-600 font-light max-w-md mx-auto leading-relaxed">
                      Merci pour votre prise de contact. Notre équipe locale vous répondra dans les plus brefs délais (généralement sous quelques heures).
                    </p>

                    <div className="pt-4">
                      <button
                        onClick={handleReset}
                        className="btn-primary text-xs uppercase tracking-wider px-6 py-3 cursor-pointer"
                      >
                        Envoyer un autre message
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
export default Contact;
