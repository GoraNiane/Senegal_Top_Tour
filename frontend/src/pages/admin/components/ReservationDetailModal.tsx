import React, { useState } from 'react';
import { X, Phone, Mail, Calendar, Users, MapPin, Compass, Clock, DollarSign, MessageSquare, CheckCircle, ExternalLink, Save } from 'lucide-react';
import { Reservation, ReservationStatus } from '../../../types';

interface ReservationDetailModalProps {
  reservation: Reservation | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (id: string, newStatus: ReservationStatus, notes?: string) => Promise<void>;
}

export const ReservationDetailModal: React.FC<ReservationDetailModalProps> = ({
  reservation,
  isOpen,
  onClose,
  onUpdateStatus,
}) => {
  if (!isOpen || !reservation) return null;

  const [status, setStatus] = useState<ReservationStatus>(reservation.status || 'PENDING');
  const [notes, setNotes] = useState(reservation.notes || '');
  const [isSaving, setIsSaving] = useState(false);

  const cleanPhone = (reservation.phoneWhatsApp || reservation.phone || '').replace(/[^0-9+]/g, '');
  const cleanPhoneForWa = cleanPhone.replace(/\+/g, '');
  const defaultWhatsAppMsg = encodeURIComponent(
    `Bonjour ${reservation.fullName},\n\nJe suis le responsable de la conciergerie SENEGAL TOP TOUR. Je fais suite à votre demande de réservation (Réf: ${reservation.refNumber || 'STT'}) pour votre séjour au Sénégal.\n\nNous serions ravis d'organiser votre expérience sur-mesure.`
  );

  const handleSave = async () => {
    if (!reservation.id) return;
    setIsSaving(true);
    try {
      await onUpdateStatus(reservation.id, status, notes);
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#182320] border border-white/15 max-w-2xl w-full rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 relative my-8 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white/50 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 pr-8">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#C99A4A]/20 text-[#C99A4A] border border-[#C99A4A]/30 text-xs font-mono font-bold">
              {reservation.refNumber || 'RÉSERVATION'}
            </div>
            <h3 className="font-serif text-2xl font-bold text-white mt-1">
              {reservation.fullName}
            </h3>
            <span className="text-[11px] text-white/50">
              Demande reçue le : {reservation.createdAt ? new Date(reservation.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Récemment'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/${cleanPhoneForWa}?text=${defaultWhatsAppMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black text-xs font-bold inline-flex items-center gap-1.5 shadow-md transition-transform hover:scale-105"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Contacter WhatsApp</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
            <a
              href={`mailto:${reservation.email}?subject=Votre demande de réservation Senegal Top Tour (${reservation.refNumber || ''})`}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>
          </div>
        </div>

        {/* Client & Booking details grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-2.5">
            <h4 className="text-[#C99A4A] font-bold uppercase tracking-wider text-[11px]">
              Coordonnées Client
            </h4>
            <div className="flex items-center gap-2 text-white/90">
              <Mail className="w-4 h-4 text-white/50 flex-shrink-0" />
              <span className="select-all">{reservation.email}</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="font-mono text-emerald-300 font-bold select-all">
                {reservation.phoneWhatsApp || reservation.phone || 'Non renseigné'}
              </span>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-2.5">
            <h4 className="text-[#C99A4A] font-bold uppercase tracking-wider text-[11px]">
              Détails du Séjour
            </h4>
            <div className="flex items-center gap-2 text-white/90">
              <Calendar className="w-4 h-4 text-white/50 flex-shrink-0" />
              <span>Date souhaitée : <strong>{reservation.preferredDate || reservation.requestedDate}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <Users className="w-4 h-4 text-white/50 flex-shrink-0" />
              <span>Nombre de voyageurs : <strong>{reservation.numberOfTravelers || reservation.travelerCount}</strong></span>
            </div>
            {reservation.duration && (
              <div className="flex items-center gap-2 text-white/90">
                <Clock className="w-4 h-4 text-white/50 flex-shrink-0" />
                <span>Durée : {reservation.duration}</span>
              </div>
            )}
            {reservation.budget && (
              <div className="flex items-center gap-2 text-white/90">
                <DollarSign className="w-4 h-4 text-white/50 flex-shrink-0" />
                <span>Gamme / Budget : {reservation.budget}</span>
              </div>
            )}
          </div>
        </div>

        {/* Requested Tour */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-[#C99A4A] font-bold text-xs">
            <Compass className="w-4 h-4" />
            <span>Circuit ou Excursion demandée :</span>
          </div>
          <p className="text-sm font-semibold text-white">
            {reservation.experienceType || reservation.excursion || reservation.destination || 'Circuit sur mesure'}
          </p>
          {reservation.destination && (
            <div className="flex items-center gap-1.5 text-xs text-white/60">
              <MapPin className="w-3.5 h-3.5" />
              <span>Destination principale : {reservation.destination}</span>
            </div>
          )}
        </div>

        {/* Message */}
        {reservation.message && (
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-white/70 font-semibold">
              <MessageSquare className="w-4 h-4 text-[#C99A4A]" />
              <span>Message du client :</span>
            </div>
            <p className="text-white/90 italic bg-black/20 p-3 rounded-lg border border-white/5 whitespace-pre-wrap leading-relaxed">
              « {reservation.message} »
            </p>
          </div>
        )}

        {/* Status management & Notes */}
        <div className="bg-[#131d1a] rounded-xl p-4 border border-[#C99A4A]/20 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase font-bold text-[#C99A4A] tracking-wider mb-1.5">
                Statut de la réservation
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ReservationStatus)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2.5 text-xs text-white font-bold focus:outline-none focus:border-[#C99A4A]"
              >
                <option value="PENDING" className="bg-[#182320] text-amber-400">⏳ EN ATTENTE (PENDING)</option>
                <option value="CONTACTED" className="bg-[#182320] text-blue-400">📞 CONTACTÉ (CONTACTED)</option>
                <option value="CONFIRMED" className="bg-[#182320] text-emerald-400">✅ CONFIRMÉ (CONFIRMED)</option>
                <option value="COMPLETED" className="bg-[#182320] text-purple-400">🎉 TERMINÉ (COMPLETED)</option>
                <option value="CANCELLED" className="bg-[#182320] text-red-400">❌ ANNULÉ (CANCELLED)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-white/70 tracking-wider mb-1.5">
                Notes internes d'agence
              </label>
              <input
                type="text"
                placeholder="Ex: Chauffeur Moussa affecté, acompte 30% reçu"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#C99A4A]"
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors"
          >
            Fermer
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Enregistrement...' : 'Mettre à jour'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
