import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  MapPin,
  CalendarCheck,
  Sparkles,
  HeartHandshake,
  Image as ImageIcon,
  Star,
  MessageSquare,
  Mail,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit,
  Copy,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Search,
  Users,
  ExternalLink,
  Phone,
  Download,
  Filter,
  RefreshCw,
  Bell,
  Menu,
  X,
  AlertCircle,
  ChevronRight,
  TrendingUp,
  SlidersHorizontal,
} from 'lucide-react';
import { Logo } from '../../components/Logo';
import { PageTransition } from '../../components/PageTransition';
import {
  Excursion,
  Destination,
  Reservation,
  Testimonial,
  GalleryImage,
  Experience,
  ContactMessage,
  NewsletterSubscriber,
  DashboardStats,
  PublicationStatus,
  ReservationStatus,
  User,
} from '../../types';
import { api, FALLBACK_EXCURSIONS, FALLBACK_DESTINATIONS, FALLBACK_TESTIMONIALS, FALLBACK_GALLERY } from '../../services/api';

// Modals
import { ConfirmModal } from './components/ConfirmModal';
import { ReservationDetailModal } from './components/ReservationDetailModal';
import { DestinationModal } from './components/DestinationModal';
import { ExcursionFormModal } from './components/ExcursionFormModal';
import { GalleryModal } from './components/GalleryModal';
import { TestimonialModal } from './components/TestimonialModal';
import { ThemeModal } from './components/ThemeModal';

type AdminTab =
  | 'overview'
  | 'excursions'
  | 'destinations'
  | 'reservations'
  | 'themes'
  | 'solidaire'
  | 'gallery'
  | 'testimonials'
  | 'messages'
  | 'newsletter'
  | 'settings';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  // Navigation & UI state
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Authenticated user
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Database records
  const [stats, setStats] = useState<DashboardStats>({
    totalReservations: 0,
    pendingReservations: 0,
    confirmedReservations: 0,
    totalExcursions: 0,
    publishedExcursions: 0,
    upcomingExcursions: 0,
    draftExcursions: 0,
    totalDestinations: 0,
    publishedDestinations: 0,
    unreadMessages: 0,
    newsletterCount: 0,
  });

  const [excursions, setExcursions] = useState<Excursion[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);

  // Search & Filter state
  const [excursionSearch, setExcursionSearch] = useState('');
  const [excursionStatusFilter, setExcursionStatusFilter] = useState<string>('ALL');
  const [excursionCategoryFilter, setExcursionCategoryFilter] = useState<string>('ALL');

  const [reservationSearch, setReservationSearch] = useState('');
  const [reservationStatusFilter, setReservationStatusFilter] = useState<string>('ALL');

  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState<string>('ALL');

  // Modal states
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [isDestinationModalOpen, setIsDestinationModalOpen] = useState(false);

  const [selectedExcursion, setSelectedExcursion] = useState<Excursion | null>(null);
  const [isExcursionModalOpen, setIsExcursionModalOpen] = useState(false);
  const [isDuplicatingExcursion, setIsDuplicatingExcursion] = useState(false);

  const [selectedGalleryImage, setSelectedGalleryImage] = useState<GalleryImage | null>(null);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);

  const [selectedTheme, setSelectedTheme] = useState<Experience | null>(null);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  const [confirmModalData, setConfirmModalData] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // 1. Initial Authentication Check & Data Loading
  useEffect(() => {
    const token = localStorage.getItem('stt_admin_token');
    const userStr = localStorage.getItem('stt_admin_user');

    if (!token) {
      navigate('/admin/login');
      return;
    }

    if (userStr) {
      try {
        setCurrentUser(JSON.parse(userStr));
      } catch {
        setCurrentUser({ id: '1', name: 'Administrateur', email: 'admin@senegaltoptour.com', role: 'ADMIN' });
      }
    }

    loadAllAdminData();
  }, [navigate]);

  const loadAllAdminData = async () => {
    setLoading(true);
    try {
      // Parallel fetch for speed
      const [
        statsRes,
        excRes,
        destRes,
        resRes,
        expRes,
        galRes,
        testRes,
        msgRes,
        newsRes,
      ] = await Promise.allSettled([
        api.admin.getStats(),
        api.admin.getExcursions(),
        api.admin.getDestinations(),
        api.admin.getReservations(),
        api.admin.getExperiences(),
        api.admin.getGallery(),
        api.admin.getTestimonials(),
        api.admin.getMessages(),
        api.admin.getNewsletterSubscribers(),
      ]);

      if (statsRes.status === 'fulfilled' && statsRes.value?.data) {
        setStats(statsRes.value.data);
      }
      if (excRes.status === 'fulfilled' && excRes.value?.data) {
        setExcursions(excRes.value.data);
      } else {
        setExcursions(FALLBACK_EXCURSIONS as any);
      }
      if (destRes.status === 'fulfilled' && destRes.value?.data) {
        setDestinations(destRes.value.data);
      } else {
        setDestinations(FALLBACK_DESTINATIONS as any);
      }
      if (resRes.status === 'fulfilled' && resRes.value?.data) {
        setReservations(resRes.value.data);
      }
      if (expRes.status === 'fulfilled' && expRes.value?.data) {
        setExperiences(expRes.value.data);
      }
      if (galRes.status === 'fulfilled' && galRes.value?.data) {
        setGalleryImages(galRes.value.data);
      } else {
        setGalleryImages(FALLBACK_GALLERY);
      }
      if (testRes.status === 'fulfilled' && testRes.value?.data) {
        setTestimonials(testRes.value.data);
      } else {
        setTestimonials(FALLBACK_TESTIMONIALS);
      }
      if (msgRes.status === 'fulfilled' && msgRes.value?.data) {
        setMessages(msgRes.value.data);
      }
      if (newsRes.status === 'fulfilled' && newsRes.value?.data) {
        setSubscribers(newsRes.value.data);
      }
    } catch {
      showToast('Certaines données n’ont pas pu être synchronisées.', 'error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadAllAdminData();
    showToast('Données actualisées depuis la base de données.');
  };

  const handleLogout = () => {
    localStorage.removeItem('stt_admin_token');
    localStorage.removeItem('stt_admin_user');
    navigate('/admin/login');
  };

  // =========================================================
  // EXCURSIONS ACTIONS (Publish, Status, Duplicate, Delete)
  // =========================================================
  const handleSaveExcursion = async (payload: any) => {
    if (selectedExcursion && !isDuplicatingExcursion) {
      // Update
      const res = await api.admin.updateExcursion(selectedExcursion.id, payload);
      if (res.success) {
        showToast(`L’excursion '${payload.name}' a été mise à jour.`);
        await loadAllAdminData();
      } else {
        throw new Error(res.message);
      }
    } else {
      // Create or duplicate
      const res = await api.admin.createExcursion(payload);
      if (res.success) {
        showToast(`L’excursion '${payload.name}' a été créée avec succès.`);
        await loadAllAdminData();
      } else {
        throw new Error(res.message);
      }
    }
  };

  const handleQuickStatusChangeExcursion = async (id: string, newStatus: PublicationStatus) => {
    const res = await api.admin.updateExcursion(id, { status: newStatus });
    if (res.success) {
      showToast(`Statut mis à jour : ${newStatus}`);
      setExcursions((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
      );
    } else {
      showToast(res.message || 'Erreur de mise à jour', 'error');
    }
  };

  const handleDeleteExcursion = (exc: Excursion) => {
    setConfirmModalData({
      isOpen: true,
      title: 'Supprimer l’excursion',
      message: `Êtes-vous sûr de vouloir supprimer définitivement l’excursion « ${exc.name} » ? Cette action est irréversible.`,
      onConfirm: async () => {
        setConfirmModalData((prev) => ({ ...prev, isOpen: false }));
        const res = await api.admin.deleteExcursion(exc.id);
        if (res.success) {
          showToast(`L’excursion a été supprimée.`);
          setExcursions((prev) => prev.filter((e) => e.id !== exc.id));
        } else {
          showToast(res.message || 'Erreur lors de la suppression', 'error');
        }
      },
    });
  };

  // =========================================================
  // DESTINATIONS ACTIONS (Fast status cycling, CRUD)
  // =========================================================
  const handleSaveDestination = async (payload: any) => {
    if (selectedDestination) {
      const res = await api.admin.updateDestination(selectedDestination.id, payload);
      if (res.success) {
        showToast(`La destination '${payload.name}' a été mise à jour.`);
        await loadAllAdminData();
      } else {
        throw new Error(res.message);
      }
    } else {
      const res = await api.admin.createDestination(payload);
      if (res.success) {
        showToast(`La destination '${payload.name}' a été créée avec succès.`);
        await loadAllAdminData();
      } else {
        throw new Error(res.message);
      }
    }
  };

  const handleCycleDestinationStatus = async (dest: Destination) => {
    const statusCycle: Record<PublicationStatus, PublicationStatus> = {
      DRAFT: 'UPCOMING',
      UPCOMING: 'PUBLISHED',
      PUBLISHED: 'ARCHIVED',
      ARCHIVED: 'DRAFT',
    };
    const nextStatus = statusCycle[dest.status || 'PUBLISHED'] || 'PUBLISHED';
    const res = await api.admin.updateDestination(dest.id, { status: nextStatus });
    if (res.success) {
      showToast(`${dest.name} ➔ ${nextStatus}`);
      setDestinations((prev) =>
        prev.map((d) => (d.id === dest.id ? { ...d, status: nextStatus } : d))
      );
    } else {
      showToast(res.message || 'Erreur de mise à jour', 'error');
    }
  };

  const handleDeleteDestination = (dest: Destination) => {
    setConfirmModalData({
      isOpen: true,
      title: 'Supprimer la destination',
      message: `Êtes-vous sûr de vouloir supprimer la destination « ${dest.name} » ?`,
      onConfirm: async () => {
        setConfirmModalData((prev) => ({ ...prev, isOpen: false }));
        const res = await api.admin.deleteDestination(dest.id);
        if (res.success) {
          showToast(`La destination ${dest.name} a été supprimée.`);
          setDestinations((prev) => prev.filter((d) => d.id !== dest.id));
        } else {
          showToast(res.message || 'Erreur lors de la suppression', 'error');
        }
      },
    });
  };

  // =========================================================
  // RESERVATIONS ACTIONS
  // =========================================================
  const handleUpdateReservationStatus = async (id: string, newStatus: ReservationStatus, notes?: string) => {
    const res = await api.admin.updateReservationStatus(id, newStatus, notes);
    if (res.success) {
      showToast(`Réservation mise à jour : ${newStatus}`);
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: newStatus, notes } : r))
      );
    } else {
      showToast(res.message || 'Erreur de mise à jour', 'error');
    }
  };

  const handleDeleteReservation = (resItem: Reservation) => {
    if (!resItem.id) return;
    setConfirmModalData({
      isOpen: true,
      title: 'Supprimer la demande de réservation',
      message: `Êtes-vous sûr de vouloir supprimer la réservation ${resItem.refNumber} de ${resItem.fullName} ?`,
      onConfirm: async () => {
        setConfirmModalData((prev) => ({ ...prev, isOpen: false }));
        const res = await api.admin.deleteReservation(resItem.id!);
        if (res.success) {
          showToast(`Réservation supprimée.`);
          setReservations((prev) => prev.filter((r) => r.id !== resItem.id));
        } else {
          showToast(res.message || 'Erreur lors de la suppression', 'error');
        }
      },
    });
  };

  // =========================================================
  // GALLERY ACTIONS
  // =========================================================
  const handleSaveGalleryImage = async (payload: any) => {
    const res = await api.admin.createGalleryImage(payload);
    if (res.success) {
      showToast('Photo ajoutée à la galerie.');
      await loadAllAdminData();
    } else {
      throw new Error(res.message);
    }
  };

  const handleDeleteGalleryImage = (img: GalleryImage) => {
    setConfirmModalData({
      isOpen: true,
      title: 'Supprimer la photo',
      message: `Supprimer la photo « ${img.title} » de la galerie ?`,
      onConfirm: async () => {
        setConfirmModalData((prev) => ({ ...prev, isOpen: false }));
        const res = await api.admin.deleteGalleryImage(img.id);
        if (res.success) {
          showToast('Photo supprimée de la galerie.');
          setGalleryImages((prev) => prev.filter((g) => g.id !== img.id));
        } else {
          showToast(res.message || 'Erreur', 'error');
        }
      },
    });
  };

  // =========================================================
  // TESTIMONIALS ACTIONS
  // =========================================================
  const handleSaveTestimonial = async (payload: any) => {
    if (selectedTestimonial) {
      const res = await api.admin.updateTestimonial(selectedTestimonial.id, payload);
      if (res.success) {
        showToast('Témoignage mis à jour.');
        await loadAllAdminData();
      } else {
        throw new Error(res.message);
      }
    } else {
      const res = await api.admin.createTestimonial(payload);
      if (res.success) {
        showToast('Témoignage enregistré.');
        await loadAllAdminData();
      } else {
        throw new Error(res.message);
      }
    }
  };

  const handleDeleteTestimonial = (item: Testimonial) => {
    setConfirmModalData({
      isOpen: true,
      title: 'Supprimer le témoignage',
      message: `Supprimer le témoignage de ${item.fullName} ?`,
      onConfirm: async () => {
        setConfirmModalData((prev) => ({ ...prev, isOpen: false }));
        const res = await api.admin.deleteTestimonial(item.id);
        if (res.success) {
          showToast('Témoignage supprimé.');
          setTestimonials((prev) => prev.filter((t) => t.id !== item.id));
        } else {
          showToast(res.message || 'Erreur', 'error');
        }
      },
    });
  };

  // =========================================================
  // MESSAGES ACTIONS
  // =========================================================
  const handleMarkMessageRead = async (msg: ContactMessage) => {
    const res = await api.admin.markMessageAsRead(msg.id);
    if (res.success) {
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, isRead: true } : m))
      );
      showToast('Message marqué comme lu.');
    }
  };

  const handleDeleteMessage = (msg: ContactMessage) => {
    setConfirmModalData({
      isOpen: true,
      title: 'Supprimer le message',
      message: `Supprimer le message de ${msg.fullName} ?`,
      onConfirm: async () => {
        setConfirmModalData((prev) => ({ ...prev, isOpen: false }));
        const res = await api.admin.deleteMessage(msg.id);
        if (res.success) {
          showToast('Message supprimé.');
          setMessages((prev) => prev.filter((m) => m.id !== msg.id));
        } else {
          showToast(res.message || 'Erreur', 'error');
        }
      },
    });
  };

  // =========================================================
  // NEWSLETTER CSV EXPORT
  // =========================================================
  const handleExportNewsletterCSV = () => {
    if (subscribers.length === 0) {
      showToast('Aucun abonné à exporter.', 'error');
      return;
    }

    const headers = ['Email', 'Date d’inscription', 'Statut'];
    const rows = subscribers.map((s) => [
      `"${s.email}"`,
      `"${s.createdAt ? new Date(s.createdAt).toISOString() : ''}"`,
      `"${s.active ? 'Actif' : 'Désinscrit'}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `senegal-top-tour-newsletter-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Export CSV téléchargé avec succès !');
  };

  // Filtered lists
  const filteredExcursions = useMemo(() => {
    return excursions.filter((exc) => {
      const matchesSearch =
        exc.name.toLowerCase().includes(excursionSearch.toLowerCase()) ||
        exc.description?.toLowerCase().includes(excursionSearch.toLowerCase()) ||
        exc.destination?.name.toLowerCase().includes(excursionSearch.toLowerCase());
      const matchesStatus =
        excursionStatusFilter === 'ALL' || exc.status === excursionStatusFilter;
      const matchesCategory =
        excursionCategoryFilter === 'ALL' || exc.category === excursionCategoryFilter;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [excursions, excursionSearch, excursionStatusFilter, excursionCategoryFilter]);

  const filteredReservations = useMemo(() => {
    return reservations.filter((r) => {
      const matchesSearch =
        r.fullName.toLowerCase().includes(reservationSearch.toLowerCase()) ||
        r.email.toLowerCase().includes(reservationSearch.toLowerCase()) ||
        (r.refNumber && r.refNumber.toLowerCase().includes(reservationSearch.toLowerCase())) ||
        (r.destination && r.destination.toLowerCase().includes(reservationSearch.toLowerCase()));
      const matchesStatus =
        reservationStatusFilter === 'ALL' || r.status === reservationStatusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [reservations, reservationSearch, reservationStatusFilter]);

  const filteredGallery = useMemo(() => {
    if (galleryCategoryFilter === 'ALL') return galleryImages;
    return galleryImages.filter(
      (img) => img.category.toLowerCase() === galleryCategoryFilter.toLowerCase()
    );
  }, [galleryImages, galleryCategoryFilter]);

  // Pending count for real-time notification badge
  const pendingCount = reservations.filter((r) => r.status === 'PENDING').length;
  const unreadMsgCount = messages.filter((m) => !m.isRead).length;

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#0E1714] text-white flex flex-col font-sans selection:bg-[#C99A4A]/30 selection:text-white">
        {/* Toast Notification */}
        {toastMessage && (
          <div
            className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-xl shadow-2xl border text-xs font-semibold flex items-center gap-2.5 animate-in slide-in-from-top-3 duration-300 ${
              toastMessage.type === 'success'
                ? 'bg-[#173C32] text-white border-[#C99A4A]/50'
                : 'bg-red-900 text-white border-red-500'
            }`}
          >
            {toastMessage.type === 'success' ? (
              <CheckCircle className="w-4 h-4 text-[#C99A4A]" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400" />
            )}
            <span>{toastMessage.text}</span>
          </div>
        )}

        {/* Top Navbar */}
        <header className="bg-[#14201C] border-b border-white/10 px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-md">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Logo variant="light" size="sm" showSubtitle={false} />

            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#173C32] border border-[#C99A4A]/30 text-xs font-semibold text-[#C99A4A]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Administration · {currentUser?.role || 'ADMIN'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Sync Button */}
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              title="Synchroniser avec la base de données"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-[#C99A4A]' : ''}`} />
              <span className="hidden sm:inline">Actualiser</span>
            </button>

            {/* Public Site Link */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-semibold border border-white/10 transition-colors"
            >
              <span>Site Public</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>

            {/* Notification Indicator */}
            <button
              onClick={() => setActiveTab('reservations')}
              className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 border border-white/10"
              title={`${pendingCount} réservation(s) en attente`}
            >
              <Bell className="w-4 h-4" />
              {pendingCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C99A4A] text-black text-[10px] font-bold flex items-center justify-center animate-bounce">
                  {pendingCount}
                </span>
              )}
            </button>

            {/* User info & Logout */}
            <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-white/10">
              <span className="text-xs text-white/80 hidden xl:inline font-medium">
                {currentUser?.name || 'Administrateur'}
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Se déconnecter"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Déconnexion</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Body with Sidebar */}
        <div className="flex-1 flex max-w-[1600px] w-full mx-auto relative">
          {/* SIDEBAR (Desktop & Mobile Drawer) */}
          <aside
            className={`fixed lg:static top-[57px] bottom-0 left-0 z-40 w-64 bg-[#121C18] border-r border-white/10 flex flex-col justify-between p-4 transition-transform duration-300 ease-in-out ${
              mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            }`}
          >
            <div className="space-y-1.5 overflow-y-auto max-h-[calc(100vh-140px)] pr-1">
              {[
                { id: 'overview', label: 'Tableau de Bord', icon: LayoutDashboard },
                { id: 'excursions', label: 'Excursions & Circuits', icon: Compass, count: excursions.length },
                { id: 'destinations', label: 'Destinations', icon: MapPin, count: destinations.length },
                { id: 'reservations', label: 'Réservations', icon: CalendarCheck, badge: pendingCount, badgeColor: 'bg-[#C99A4A] text-black' },
                { id: 'themes', label: 'Voyages à Thèmes', icon: Sparkles },
                { id: 'solidaire', label: 'Tourisme Solidaire', icon: HeartHandshake },
                { id: 'gallery', label: 'Galerie Photos', icon: ImageIcon, count: galleryImages.length },
                { id: 'testimonials', label: 'Témoignages Clients', icon: Star, count: testimonials.length },
                { id: 'messages', label: 'Messages Contact', icon: MessageSquare, badge: unreadMsgCount, badgeColor: 'bg-emerald-500 text-black' },
                { id: 'newsletter', label: 'Abonnés Newsletter', icon: Mail, count: subscribers.length },
                { id: 'settings', label: 'Paramètres & Profil', icon: Settings },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id as AdminTab);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                      isActive
                        ? 'bg-[#C99A4A] text-[#0E1714] font-bold shadow-md'
                        : 'text-white/75 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-[#C99A4A]'}`} />
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== undefined && item.badge > 0 ? (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.badgeColor || 'bg-[#C99A4A] text-black'}`}>
                        {item.badge}
                      </span>
                    ) : item.count !== undefined ? (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] ${isActive ? 'bg-black/20 text-black' : 'bg-white/5 text-white/50'}`}>
                        {item.count}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>

            {/* Sidebar Bottom Footer */}
            <div className="pt-4 border-t border-white/10 text-[11px] text-white/40 space-y-1">
              <div className="flex items-center justify-between font-mono">
                <span>API v1.0.0</span>
                <span className="text-emerald-400">● Connecté</span>
              </div>
              <p className="text-[10px]">Senegal Top Tour © 2026</p>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto space-y-6">
            {/* Loading Overlay */}
            {loading && (
              <div className="p-8 rounded-2xl bg-[#14201C] border border-white/10 text-center space-y-3">
                <RefreshCw className="w-8 h-8 text-[#C99A4A] animate-spin mx-auto" />
                <p className="text-xs text-white/70">Synchronisation des données en temps réel...</p>
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 1: OVERVIEW / TABLEAU DE BORD (Section 3 & 17) */}
            {/* ========================================================= */}
            {!loading && activeTab === 'overview' && (
              <div className="space-y-6 animate-in fade-in">
                {/* Header Welcome */}
                <div className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-[#173C32] to-[#12201B] p-6 rounded-2xl border border-[#C99A4A]/30 shadow-xl">
                  <div className="space-y-1">
                    <span className="text-xs uppercase font-bold text-[#C99A4A] tracking-wider">
                      Vue d'ensemble de la conciergerie
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                      Tableau de Bord Senegal Top Tour
                    </h2>
                    <p className="text-xs text-white/70">
                      Gestion en direct des réservations, catalogues touristiques et communications
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setSelectedExcursion(null);
                        setIsDuplicatingExcursion(false);
                        setIsExcursionModalOpen(true);
                      }}
                      className="btn-gold px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Nouvelle Excursion</span>
                    </button>
                  </div>
                </div>

                {/* KPI Cards Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Reservations KPI */}
                  <div
                    onClick={() => setActiveTab('reservations')}
                    className="bg-[#14201C] p-5 rounded-2xl border border-white/10 hover:border-[#C99A4A]/50 transition-all cursor-pointer group space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs text-white/60 font-semibold uppercase">
                      <span>Demandes Reçues</span>
                      <CalendarCheck className="w-4 h-4 text-[#C99A4A]" />
                    </div>
                    <div className="text-3xl font-serif font-bold text-[#C99A4A]">
                      {reservations.length}
                    </div>
                    <div className="text-[11px] flex items-center gap-1.5 text-amber-400 font-medium">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      <span>{pendingCount} en attente de confirmation</span>
                    </div>
                  </div>

                  {/* Excursions KPI */}
                  <div
                    onClick={() => setActiveTab('excursions')}
                    className="bg-[#14201C] p-5 rounded-2xl border border-white/10 hover:border-[#C99A4A]/50 transition-all cursor-pointer group space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs text-white/60 font-semibold uppercase">
                      <span>Excursions Actives</span>
                      <Compass className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-3xl font-serif font-bold text-white">
                      {excursions.filter((e) => e.status === 'PUBLISHED').length}
                    </div>
                    <div className="text-[11px] text-white/60">
                      {excursions.filter((e) => e.status === 'UPCOMING').length} à venir · {excursions.filter((e) => e.status === 'DRAFT').length} brouillons
                    </div>
                  </div>

                  {/* Destinations KPI */}
                  <div
                    onClick={() => setActiveTab('destinations')}
                    className="bg-[#14201C] p-5 rounded-2xl border border-white/10 hover:border-[#C99A4A]/50 transition-all cursor-pointer group space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs text-white/60 font-semibold uppercase">
                      <span>Destinations</span>
                      <MapPin className="w-4 h-4 text-[#C99A4A]" />
                    </div>
                    <div className="text-3xl font-serif font-bold text-white">
                      {destinations.filter((d) => d.status === 'PUBLISHED').length}
                    </div>
                    <div className="text-[11px] text-emerald-400">
                      {destinations.length} répertoriées au total
                    </div>
                  </div>

                  {/* Newsletter KPI */}
                  <div
                    onClick={() => setActiveTab('newsletter')}
                    className="bg-[#14201C] p-5 rounded-2xl border border-white/10 hover:border-[#C99A4A]/50 transition-all cursor-pointer group space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs text-white/60 font-semibold uppercase">
                      <span>Abonnés Newsletter</span>
                      <Mail className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="text-3xl font-serif font-bold text-[#C99A4A]">
                      {subscribers.length}
                    </div>
                    <div className="text-[11px] text-white/60">
                      Carnets de voyages & offres
                    </div>
                  </div>
                </div>

                {/* Charts & Breakdown Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Status distribution chart */}
                  <div className="bg-[#14201C] rounded-2xl border border-white/10 p-5 space-y-4">
                    <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#C99A4A]" />
                      <span>Statut des Excursions</span>
                    </h3>
                    <div className="space-y-2.5 text-xs">
                      {[
                        { label: 'PUBLIÉES (En ligne)', count: excursions.filter((e) => e.status === 'PUBLISHED').length, color: 'bg-emerald-500' },
                        { label: 'À VENIR (« Bientôt disponible »)', count: excursions.filter((e) => e.status === 'UPCOMING').length, color: 'bg-amber-500' },
                        { label: 'BROUILLONS (DRAFT)', count: excursions.filter((e) => e.status === 'DRAFT').length, color: 'bg-white/40' },
                        { label: 'ARCHIVÉES', count: excursions.filter((e) => e.status === 'ARCHIVED').length, color: 'bg-red-500' },
                      ].map((s, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between text-[11px] text-white/80">
                            <span>{s.label}</span>
                            <span className="font-bold">{s.count}</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-full ${s.color} rounded-full`}
                              style={{ width: `${excursions.length ? (s.count / excursions.length) * 100 : 0}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Reservations Feed */}
                  <div className="lg:col-span-2 bg-[#14201C] rounded-2xl border border-white/10 p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
                        <CalendarCheck className="w-4 h-4 text-[#C99A4A]" />
                        <span>Dernières Demandes de Réservation</span>
                      </h3>
                      <button
                        onClick={() => setActiveTab('reservations')}
                        className="text-xs text-[#C99A4A] hover:underline"
                      >
                        Voir tout →
                      </button>
                    </div>

                    <div className="divide-y divide-white/5 space-y-2">
                      {reservations.slice(0, 4).map((r) => (
                        <div
                          key={r.id || r.refNumber}
                          onClick={() => {
                            setSelectedReservation(r);
                            setIsReservationModalOpen(true);
                          }}
                          className="pt-2 flex items-center justify-between hover:bg-white/5 p-2 rounded-xl transition-colors cursor-pointer text-xs"
                        >
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white">{r.fullName}</span>
                              <span className="font-mono text-[10px] text-[#C99A4A]">{r.refNumber}</span>
                            </div>
                            <span className="text-[11px] text-white/60 block">
                              {r.experienceType || r.destination} · {r.numberOfTravelers || r.travelerCount} pers.
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                                r.status === 'CONFIRMED'
                                  ? 'bg-emerald-950 text-emerald-400 border-emerald-700'
                                  : r.status === 'CONTACTED'
                                  ? 'bg-blue-950 text-blue-400 border-blue-700'
                                  : 'bg-amber-950 text-amber-400 border-amber-700'
                              }`}
                            >
                              {r.status || 'PENDING'}
                            </span>
                            <ChevronRight className="w-4 h-4 text-white/30" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 2: EXCURSIONS MANAGEMENT (Section 5 & 6) */}
            {/* ========================================================= */}
            {!loading && activeTab === 'excursions' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-white">
                      Catalogue des Excursions & Circuits
                    </h2>
                    <p className="text-xs text-white/60">
                      Gérez les offres, tarifs, horaires, descriptions et statuts de publication
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedExcursion(null);
                      setIsDuplicatingExcursion(false);
                      setIsExcursionModalOpen(true);
                    }}
                    className="btn-gold px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Nouvelle Excursion</span>
                  </button>
                </div>

                {/* Filter & Search Toolbar */}
                <div className="bg-[#14201C] p-4 rounded-2xl border border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="relative flex-1 min-w-[240px]">
                    <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={excursionSearch}
                      onChange={(e) => setExcursionSearch(e.target.value)}
                      placeholder="Rechercher par nom, destination..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-[#C99A4A]"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <select
                      value={excursionStatusFilter}
                      onChange={(e) => setExcursionStatusFilter(e.target.value)}
                      className="bg-[#182320] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    >
                      <option value="ALL">Tous les statuts</option>
                      <option value="PUBLISHED">PUBLIÉ</option>
                      <option value="UPCOMING">À VENIR</option>
                      <option value="DRAFT">BROUILLON</option>
                      <option value="ARCHIVED">ARCHIVÉ</option>
                    </select>

                    <select
                      value={excursionCategoryFilter}
                      onChange={(e) => setExcursionCategoryFilter(e.target.value)}
                      className="bg-[#182320] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    >
                      <option value="ALL">Toutes catégories</option>
                      <option value="Culture">Culture</option>
                      <option value="Patrimoine">Patrimoine</option>
                      <option value="Nature">Nature</option>
                      <option value="Aventure">Aventure</option>
                      <option value="Histoire">Histoire</option>
                    </select>
                  </div>
                </div>

                {/* Excursions Table */}
                <div className="bg-[#14201C] rounded-2xl border border-white/10 overflow-hidden shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-white/90">
                      <thead className="bg-white/5 uppercase tracking-wider text-[11px] text-[#C7A77A] border-b border-white/10">
                        <tr>
                          <th className="p-4">Excursion</th>
                          <th className="p-4">Destination</th>
                          <th className="p-4">Durée</th>
                          <th className="p-4">Prix</th>
                          <th className="p-4">Statut</th>
                          <th className="p-4">Featured</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredExcursions.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="p-8 text-center text-white/50">
                              Aucune excursion ne correspond aux critères.
                            </td>
                          </tr>
                        ) : (
                          filteredExcursions.map((exc) => (
                            <tr key={exc.id} className="hover:bg-white/5 transition-colors">
                              <td className="p-4">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={exc.images?.[0]?.url || '/images/dakar.png'}
                                    alt={exc.name}
                                    className="w-12 h-10 rounded-lg object-cover border border-white/10"
                                  />
                                  <div>
                                    <span className="font-bold text-white block">{exc.name}</span>
                                    <span className="text-[10px] font-mono text-white/50">/{exc.slug}</span>
                                  </div>
                                </div>
                              </td>

                              <td className="p-4">
                                <span className="px-2.5 py-1 rounded-lg bg-white/5 text-white/80 border border-white/10">
                                  {exc.destination?.name || 'Dakar'}
                                </span>
                              </td>

                              <td className="p-4 text-white/70">
                                {exc.duration}
                              </td>

                              <td className="p-4 font-mono text-[#C99A4A]">
                                {exc.price ? `${exc.price} ${exc.currency || '€'}` : 'Sur demande'}
                              </td>

                              <td className="p-4">
                                <select
                                  value={exc.status}
                                  onChange={(e) => handleQuickStatusChangeExcursion(exc.id, e.target.value as PublicationStatus)}
                                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                                    exc.status === 'PUBLISHED'
                                      ? 'bg-emerald-950 text-emerald-400 border-emerald-700'
                                      : exc.status === 'UPCOMING'
                                      ? 'bg-amber-950 text-amber-400 border-amber-700'
                                      : exc.status === 'DRAFT'
                                      ? 'bg-slate-900 text-slate-300 border-slate-700'
                                      : 'bg-red-950 text-red-400 border-red-700'
                                  }`}
                                >
                                  <option value="PUBLISHED">PUBLIÉ</option>
                                  <option value="UPCOMING">À VENIR</option>
                                  <option value="DRAFT">BROUILLON</option>
                                  <option value="ARCHIVED">ARCHIVÉ</option>
                                </select>
                              </td>

                              <td className="p-4">
                                {exc.isFeatured ? (
                                  <span className="px-2 py-0.5 rounded-full bg-[#C99A4A]/20 text-[#C99A4A] text-[10px] font-bold">
                                    ★ Top
                                  </span>
                                ) : (
                                  <span className="text-white/30 text-[10px]">-</span>
                                )}
                              </td>

                              <td className="p-4 text-right">
                                <div className="inline-flex items-center gap-1.5">
                                  {/* View live button */}
                                  <a
                                    href={`/excursions/${exc.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white"
                                    title="Voir la fiche publique"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                  </a>

                                  {/* Duplicate button */}
                                  <button
                                    onClick={() => {
                                      setSelectedExcursion(exc);
                                      setIsDuplicatingExcursion(true);
                                      setIsExcursionModalOpen(true);
                                    }}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#C99A4A]"
                                    title="Dupliquer ce circuit"
                                  >
                                    <Copy className="w-3.5 h-3.5" />
                                  </button>

                                  {/* Edit button */}
                                  <button
                                    onClick={() => {
                                      setSelectedExcursion(exc);
                                      setIsDuplicatingExcursion(false);
                                      setIsExcursionModalOpen(true);
                                    }}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-blue-400"
                                    title="Modifier"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>

                                  {/* Delete button */}
                                  <button
                                    onClick={() => handleDeleteExcursion(exc)}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-red-900/40 text-red-400"
                                    title="Supprimer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 3: DESTINATIONS MANAGEMENT (Section 7 & 8) */}
            {/* ========================================================= */}
            {!loading && activeTab === 'destinations' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-white">
                      Gestion des Destinations (13 Régions)
                    </h2>
                    <p className="text-xs text-white/60">
                      Modifiez les statuts de publication en 1 clic : DRAFT ➔ UPCOMING ➔ PUBLISHED ➔ ARCHIVED
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedDestination(null);
                      setIsDestinationModalOpen(true);
                    }}
                    className="btn-gold px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Nouvelle Destination</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {destinations.map((d) => (
                    <div
                      key={d.id}
                      className="bg-[#14201C] rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between hover:border-[#C99A4A]/40 transition-all shadow-lg"
                    >
                      <div className="h-36 relative">
                        <img
                          src={d.imageUrl || '/images/dakar.png'}
                          alt={d.name}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => handleCycleDestinationStatus(d)}
                          className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-md transition-transform hover:scale-105 ${
                            d.status === 'PUBLISHED'
                              ? 'bg-emerald-950 text-emerald-400 border-emerald-600'
                              : d.status === 'UPCOMING'
                              ? 'bg-amber-950 text-amber-400 border-amber-600'
                              : d.status === 'DRAFT'
                              ? 'bg-slate-900 text-slate-300 border-slate-600'
                              : 'bg-red-950 text-red-400 border-red-600'
                          }`}
                          title="Cliquer pour changer le statut"
                        >
                          {d.status === 'UPCOMING' ? 'Bientôt dispo' : d.status} ↻
                        </button>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#C99A4A]">
                            {d.region || 'Sénégal'}
                          </span>
                          <h4 className="font-serif text-lg font-bold text-white">
                            {d.name}
                          </h4>
                          <p className="text-xs text-white/60 line-clamp-2 mt-1">
                            {d.subtitle || d.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                          <button
                            onClick={() => {
                              setSelectedDestination(d);
                              setIsDestinationModalOpen(true);
                            }}
                            className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Modifier</span>
                          </button>

                          <button
                            onClick={() => handleDeleteDestination(d)}
                            className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Supprimer</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 4: RESERVATIONS & DEMANDES (Section 9 & 10) */}
            {/* ========================================================= */}
            {!loading && activeTab === 'reservations' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-white">
                      Demandes de Réservation
                    </h2>
                    <p className="text-xs text-white/60">
                      Suivi des demandes clients, prise de contact WhatsApp en 1 clic et confirmation
                    </p>
                  </div>
                </div>

                {/* Filter & Search Bar */}
                <div className="bg-[#14201C] p-4 rounded-2xl border border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="relative flex-1 min-w-[240px]">
                    <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={reservationSearch}
                      onChange={(e) => setReservationSearch(e.target.value)}
                      placeholder="Rechercher par nom, email, réf STT..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-[#C99A4A]"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <select
                      value={reservationStatusFilter}
                      onChange={(e) => setReservationStatusFilter(e.target.value)}
                      className="bg-[#182320] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    >
                      <option value="ALL">Tous les statuts</option>
                      <option value="PENDING">EN ATTENTE (PENDING)</option>
                      <option value="CONTACTED">CONTACTÉ (CONTACTED)</option>
                      <option value="CONFIRMED">CONFIRMÉ (CONFIRMED)</option>
                      <option value="COMPLETED">TERMINÉ (COMPLETED)</option>
                      <option value="CANCELLED">ANNULÉ (CANCELLED)</option>
                    </select>
                  </div>
                </div>

                {/* Reservations Table */}
                <div className="bg-[#14201C] rounded-2xl border border-white/10 overflow-hidden shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-white/90">
                      <thead className="bg-white/5 uppercase tracking-wider text-[11px] text-[#C7A77A] border-b border-white/10">
                        <tr>
                          <th className="p-4">Réf.</th>
                          <th className="p-4">Client</th>
                          <th className="p-4">Contact</th>
                          <th className="p-4">Date / Pers.</th>
                          <th className="p-4">Circuit demandé</th>
                          <th className="p-4">Statut</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredReservations.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="p-8 text-center text-white/50">
                              Aucune demande de réservation trouvée.
                            </td>
                          </tr>
                        ) : (
                          filteredReservations.map((r) => (
                            <tr key={r.id || r.refNumber} className="hover:bg-white/5 transition-colors">
                              <td className="p-4 font-mono font-bold text-[#C99A4A]">
                                {r.refNumber || 'STT'}
                              </td>

                              <td className="p-4 font-semibold text-white">
                                {r.fullName}
                              </td>

                              <td className="p-4 space-y-0.5">
                                <div className="text-white/80">{r.email}</div>
                                <div className="text-emerald-400 font-mono font-bold">{r.phoneWhatsApp || r.phone}</div>
                              </td>

                              <td className="p-4">
                                <div className="font-semibold">{r.preferredDate || r.requestedDate}</div>
                                <div className="text-white/50 text-[10px]">{r.numberOfTravelers || r.travelerCount} voyageur(s)</div>
                              </td>

                              <td className="p-4 max-w-xs">
                                <div className="font-medium text-white">{r.experienceType || r.excursion || r.destination}</div>
                                <div className="text-white/50 text-[10px] truncate">{r.message}</div>
                              </td>

                              <td className="p-4">
                                <select
                                  value={r.status || 'PENDING'}
                                  onChange={(e) => handleUpdateReservationStatus(r.id!, e.target.value as ReservationStatus)}
                                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                                    r.status === 'CONFIRMED'
                                      ? 'bg-emerald-950 text-emerald-400 border-emerald-700'
                                      : r.status === 'CONTACTED'
                                      ? 'bg-blue-950 text-blue-400 border-blue-700'
                                      : r.status === 'COMPLETED'
                                      ? 'bg-purple-950 text-purple-400 border-purple-700'
                                      : r.status === 'CANCELLED'
                                      ? 'bg-red-950 text-red-400 border-red-700'
                                      : 'bg-amber-950 text-amber-400 border-amber-700'
                                  }`}
                                >
                                  <option value="PENDING">EN ATTENTE</option>
                                  <option value="CONTACTED">CONTACTÉ</option>
                                  <option value="CONFIRMED">CONFIRMÉ</option>
                                  <option value="COMPLETED">TERMINÉ</option>
                                  <option value="CANCELLED">ANNULÉ</option>
                                </select>
                              </td>

                              <td className="p-4 text-right">
                                <div className="inline-flex items-center gap-1.5">
                                  {/* WhatsApp button */}
                                  <a
                                    href={`https://wa.me/${(r.phoneWhatsApp || r.phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                      `Bonjour ${r.fullName}, je fais suite à votre demande de réservation sur Senegal Top Tour (${r.refNumber}).`
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-2.5 py-1 rounded-lg bg-[#25D366] text-black text-[11px] font-bold inline-flex items-center gap-1 shadow"
                                    title="Ouvrir WhatsApp"
                                  >
                                    <Phone className="w-3 h-3" />
                                    <span>WhatsApp</span>
                                  </a>

                                  {/* Detail modal button */}
                                  <button
                                    onClick={() => {
                                      setSelectedReservation(r);
                                      setIsReservationModalOpen(true);
                                    }}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white"
                                    title="Voir fiche complète"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                  </button>

                                  {/* Delete button */}
                                  <button
                                    onClick={() => handleDeleteReservation(r)}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-red-900/40 text-red-400"
                                    title="Supprimer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 5: THEMES & SOLIDARITY (Section 12 & 13) */}
            {/* ========================================================= */}
            {!loading && (activeTab === 'themes' || activeTab === 'solidaire') && (
              <div className="space-y-6 animate-in fade-in">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-white">
                      {activeTab === 'themes' ? 'Voyages à Thèmes' : 'Piliers du Tourisme Solidaire'}
                    </h2>
                    <p className="text-xs text-white/60">
                      Gérez les programmes d'échanges, ateliers et projets communautaires
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedTheme(null);
                      setIsThemeModalOpen(true);
                    }}
                    className="btn-gold px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Nouvelle Expérience</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {experiences.map((exp) => (
                    <div
                      key={exp.id}
                      className="bg-[#14201C] rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between hover:border-[#C99A4A]/40 transition-all shadow-lg"
                    >
                      <div className="h-44 relative">
                        <img src={exp.imageUrl} alt={exp.title} className="w-full h-full object-cover" />
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#173C32] text-[#C99A4A] text-xs font-bold uppercase">
                          {exp.category}
                        </span>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <h4 className="font-serif text-lg font-bold text-white">
                            {exp.title}
                          </h4>
                          <p className="text-xs text-white/70 line-clamp-2 mt-1">
                            {exp.shortDescription || exp.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                          <button
                            onClick={() => {
                              setSelectedTheme(exp);
                              setIsThemeModalOpen(true);
                            }}
                            className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Modifier</span>
                          </button>

                          <a
                            href={exp.ctaLink || '/voyages-a-themes'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-[#C99A4A] hover:underline flex items-center gap-1"
                          >
                            <span>Voir page</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 6: GALLERY MANAGEMENT (Section 11) */}
            {/* ========================================================= */}
            {!loading && activeTab === 'gallery' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-white">
                      Photothèque & Galerie
                    </h2>
                    <p className="text-xs text-white/60">
                      Gérez les visuels haute définition par région et catégorie
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedGalleryImage(null);
                      setIsGalleryModalOpen(true);
                    }}
                    className="btn-gold px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Ajouter une Photo</span>
                  </button>
                </div>

                {/* Category filters */}
                <div className="flex flex-wrap items-center gap-2 pb-2 overflow-x-auto">
                  {['ALL', 'Dakar', 'Gorée', 'Kayar', 'Lac Rose', 'Culture', 'Nature', 'Gastronomie', 'Villages', 'Tourisme solidaire'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setGalleryCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        galleryCategoryFilter === cat
                          ? 'bg-[#C99A4A] text-black font-bold shadow'
                          : 'bg-white/5 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      {cat === 'ALL' ? 'Toutes' : cat}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredGallery.map((img) => (
                    <div
                      key={img.id}
                      className="group bg-[#14201C] rounded-2xl border border-white/10 overflow-hidden relative"
                    >
                      <div className="h-44 relative">
                        <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                          <span className="self-start px-2 py-0.5 rounded-full bg-[#173C32] text-white text-[10px] font-bold uppercase">
                            {img.category}
                          </span>
                          <button
                            onClick={() => handleDeleteGalleryImage(img)}
                            className="self-end p-2 bg-red-600 rounded-xl text-white hover:bg-red-700 shadow"
                            title="Supprimer la photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="p-3">
                        <h5 className="font-bold text-xs text-white truncate">{img.title}</h5>
                        <span className="text-[10px] text-white/50">{img.location || 'Sénégal'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 7: TESTIMONIALS (Section 14) */}
            {/* ========================================================= */}
            {!loading && activeTab === 'testimonials' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-white">
                      Témoignages Clients Certifiés
                    </h2>
                    <p className="text-xs text-white/60">
                      Gestion des retours d'expérience authentiques
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedTestimonial(null);
                      setIsTestimonialModalOpen(true);
                    }}
                    className="btn-gold px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Nouveau Témoignage</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {testimonials.map((t) => (
                    <div
                      key={t.id}
                      className="bg-[#14201C] rounded-2xl border border-white/10 p-5 flex flex-col justify-between space-y-4 shadow-lg"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-[#C99A4A]">
                            {[...Array(t.rating || 5)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-current" />
                            ))}
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              t.isPublished ? 'bg-emerald-950 text-emerald-400' : 'bg-white/10 text-white/50'
                            }`}
                          >
                            {t.isPublished ? 'Publié' : 'Masqué'}
                          </span>
                        </div>

                        <p className="text-xs text-white/80 italic leading-relaxed">
                          « {t.comment} »
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                        <div>
                          <strong className="text-white block">{t.fullName}</strong>
                          <span className="text-white/50 text-[11px]">{t.country} · {t.tourName}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setSelectedTestimonial(t);
                              setIsTestimonialModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-blue-400"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteTestimonial(t)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-red-900/40 text-red-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 8: MESSAGES CONTACT (Section 15) */}
            {/* ========================================================= */}
            {!loading && activeTab === 'messages' && (
              <div className="space-y-6 animate-in fade-in">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-white">
                    Boîte de Réception des Messages
                  </h2>
                  <p className="text-xs text-white/60">
                    Messages envoyés via le formulaire de contact public
                  </p>
                </div>

                <div className="space-y-3">
                  {messages.length === 0 ? (
                    <div className="p-8 rounded-2xl bg-[#14201C] border border-white/10 text-center text-white/50 text-xs">
                      Aucun message de contact dans la boîte de réception.
                    </div>
                  ) : (
                    messages.map((m) => (
                      <div
                        key={m.id}
                        className={`p-5 rounded-2xl border transition-all ${
                          !m.isRead
                            ? 'bg-[#173C32]/20 border-[#C99A4A]/40'
                            : 'bg-[#14201C] border-white/10'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <strong className="text-sm font-bold text-white">{m.fullName}</strong>
                            <span className="text-xs text-white/60">({m.email})</span>
                            {m.phone && (
                              <span className="font-mono text-xs text-emerald-400">· {m.phone}</span>
                            )}
                          </div>
                          <span className="text-[11px] text-white/50">
                            {new Date(m.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>

                        <div className="text-xs font-semibold text-[#C99A4A] mb-1">
                          Sujet : {m.subject}
                        </div>
                        <p className="text-xs text-white/80 whitespace-pre-wrap leading-relaxed">
                          « {m.message} »
                        </p>

                        <div className="pt-3 border-t border-white/10 mt-3 flex items-center justify-end gap-3 text-xs">
                          {!m.isRead && (
                            <button
                              onClick={() => handleMarkMessageRead(m)}
                              className="text-xs text-[#C99A4A] hover:underline"
                            >
                              Marquer comme lu
                            </button>
                          )}
                          <a
                            href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject)}`}
                            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-semibold flex items-center gap-1"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Répondre par Email</span>
                          </a>
                          <button
                            onClick={() => handleDeleteMessage(m)}
                            className="text-red-400 hover:text-red-300 p-1.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 9: NEWSLETTER (Section 16) */}
            {/* ========================================================= */}
            {!loading && activeTab === 'newsletter' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-white">
                      Abonnés à la Newsletter ({subscribers.length})
                    </h2>
                    <p className="text-xs text-white/60">
                      Carnets de voyage et offres privées Senegal Top Tour
                    </p>
                  </div>

                  <button
                    onClick={handleExportNewsletterCSV}
                    className="btn-gold px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg"
                  >
                    <Download className="w-4 h-4" />
                    <span>Exporter en CSV</span>
                  </button>
                </div>

                <div className="bg-[#14201C] rounded-2xl border border-white/10 overflow-hidden shadow-xl">
                  <table className="w-full text-left text-xs text-white/90">
                    <thead className="bg-white/5 uppercase tracking-wider text-[11px] text-[#C7A77A] border-b border-white/10">
                      <tr>
                        <th className="p-4">Adresse Email</th>
                        <th className="p-4">Date d'inscription</th>
                        <th className="p-4">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {subscribers.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="p-8 text-center text-white/50">
                            Aucun abonné pour le moment.
                          </td>
                        </tr>
                      ) : (
                        subscribers.map((s) => (
                          <tr key={s.id} className="hover:bg-white/5 transition-colors">
                            <td className="p-4 font-mono font-medium text-white">{s.email}</td>
                            <td className="p-4 text-white/60">
                              {new Date(s.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </td>
                            <td className="p-4">
                              <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-800">
                                Actif
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 10: SETTINGS & PROFIL */}
            {/* ========================================================= */}
            {!loading && activeTab === 'settings' && (
              <div className="max-w-2xl space-y-6 animate-in fade-in">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-white">
                    Paramètres & Profil Administrateur
                  </h2>
                  <p className="text-xs text-white/60">
                    Configuration de la plateforme et informations de conciergerie
                  </p>
                </div>

                <div className="bg-[#14201C] rounded-2xl border border-white/10 p-6 space-y-4 text-xs">
                  <h3 className="font-serif text-base font-bold text-[#C99A4A] border-b border-white/10 pb-2">
                    Compte Utilisateur Connecté
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-white/50 block">Nom complet</span>
                      <strong className="text-white text-sm">{currentUser?.name || 'Administrateur'}</strong>
                    </div>
                    <div>
                      <span className="text-white/50 block">Email officiel</span>
                      <strong className="text-white text-sm">{currentUser?.email || 'admin@senegaltoptour.com'}</strong>
                    </div>
                    <div>
                      <span className="text-white/50 block">Rôle de sécurité</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#173C32] text-[#C99A4A] font-bold text-[10px]">
                        {currentUser?.role || 'ADMIN'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#14201C] rounded-2xl border border-white/10 p-6 space-y-4 text-xs">
                  <h3 className="font-serif text-base font-bold text-[#C99A4A] border-b border-white/10 pb-2">
                    Coordonnées de Conciergerie Officielle
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                      <span>WhatsApp Concierge :</span>
                      <strong className="font-mono text-emerald-400">+221 77 884 80 29</strong>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                      <span>Email expéditeur :</span>
                      <strong className="font-mono text-white">contact@senegaltoptour.com</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleLogout}
                    className="w-full py-3 rounded-xl bg-red-900/30 hover:bg-red-900/50 text-red-400 border border-red-500/40 font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Se déconnecter de la session</span>
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>

        {/* MODALS */}
        <ReservationDetailModal
          isOpen={isReservationModalOpen}
          reservation={selectedReservation}
          onClose={() => setIsReservationModalOpen(false)}
          onUpdateStatus={handleUpdateReservationStatus}
        />

        <DestinationModal
          isOpen={isDestinationModalOpen}
          destination={selectedDestination}
          onClose={() => setIsDestinationModalOpen(false)}
          onSave={handleSaveDestination}
        />

        <ExcursionFormModal
          isOpen={isExcursionModalOpen}
          excursion={selectedExcursion}
          destinations={destinations}
          isDuplicate={isDuplicatingExcursion}
          onClose={() => setIsExcursionModalOpen(false)}
          onSave={handleSaveExcursion}
        />

        <GalleryModal
          isOpen={isGalleryModalOpen}
          image={selectedGalleryImage}
          onClose={() => setIsGalleryModalOpen(false)}
          onSave={handleSaveGalleryImage}
        />

        <TestimonialModal
          isOpen={isTestimonialModalOpen}
          testimonial={selectedTestimonial}
          onClose={() => setIsTestimonialModalOpen(false)}
          onSave={handleSaveTestimonial}
        />

        <ThemeModal
          isOpen={isThemeModalOpen}
          experience={selectedTheme}
          onClose={() => setIsThemeModalOpen(false)}
          onSave={async (data) => {
            showToast('Expérience mise à jour.');
            await loadAllAdminData();
          }}
        />

        <ConfirmModal
          isOpen={confirmModalData.isOpen}
          title={confirmModalData.title}
          message={confirmModalData.message}
          onConfirm={confirmModalData.onConfirm}
          onCancel={() => setConfirmModalData((prev) => ({ ...prev, isOpen: false }))}
        />
      </div>
    </PageTransition>
  );
};

export default AdminDashboard;
