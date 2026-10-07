import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Logo } from '../../components/Logo';
import { PageTransition } from '../../components/PageTransition';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@senegaltoptour.com');
  const [password, setPassword] = useState('SenegalTopTour2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect directly to dashboard
  useEffect(() => {
    const token = localStorage.getItem('stt_admin_token');
    if (token) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });

      const json = await res.json();
      if (res.ok && json.success && json.data?.token) {
        localStorage.setItem('stt_admin_token', json.data.token);
        localStorage.setItem('stt_admin_user', JSON.stringify(json.data.user));
        navigate('/admin/dashboard');
      } else {
        setError(json.message || 'Identifiants invalides. Veuillez vérifier votre email et mot de passe.');
      }
    } catch {
      setError('Impossible de joindre le serveur API. Veuillez vérifier votre connexion.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#0D1513] text-white flex items-center justify-center p-4 selection:bg-[#C99A4A]/30 selection:text-white">
        <div className="max-w-md w-full bg-[#15201C] rounded-[28px] p-8 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Gold Glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#C99A4A]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#173C32]/40 rounded-full blur-3xl pointer-events-none" />

          {/* Logo & Header */}
          <div className="text-center space-y-3 mb-8 relative z-10">
            <div className="inline-flex justify-center mb-1">
              <Logo variant="light" size="md" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#173C32] text-[#C99A4A] border border-[#C99A4A]/30 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Espace Administration</span>
            </div>
            <p className="text-xs text-white/60">
              Plateforme de gestion centralisée Senegal Top Tour
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-900/40 border border-red-500/50 text-red-200 text-xs flex items-center gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            <div>
              <label className="block text-xs uppercase font-bold text-[#C7A77A] tracking-wider mb-2">
                Identifiant / Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@senegaltoptour.com"
                  className="w-full bg-white/5 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#C99A4A] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-[#C7A77A] tracking-wider mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-white/5 border border-white/15 rounded-xl pl-10 pr-11 py-3 text-sm text-white focus:outline-none focus:border-[#C99A4A] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#173C32]/30 border border-[#C99A4A]/20 text-[11px] text-white/80 space-y-1">
              <div className="text-[#C99A4A] font-bold flex items-center gap-1.5">
                <span>Identifiants officiels préconfigurés :</span>
              </div>
              <div className="font-mono text-white/70">
                admin@senegaltoptour.com · SenegalTopTour2026!
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-gold py-3.5 text-xs font-bold uppercase tracking-wider rounded-full flex items-center justify-center gap-2 shadow-lg hover:shadow-[#C99A4A]/20 transition-all cursor-pointer"
            >
              <span>{loading ? 'Authentification en cours...' : 'Se connecter au Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-xs text-white/40 hover:text-[#C99A4A] transition-colors"
            >
              ← Retour au site public
            </a>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
