import React, { useEffect, useRef, useState } from 'react';
import { Coins, LogOut, Mail } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

declare global {
  interface Window {
    google?: any;
  }
}

// No renderiza nada mientras DATABASE_URL no esté configurada del lado del
// servidor — hasta ese momento la app se comporta exactamente igual que hoy.
export const AuthWidget: React.FC = () => {
  const { loading, dbConfigured, authenticated, user, balance, loginWithGoogleToken, requestMagicLink, logout } =
    useAuth();
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [magicLinkStatus, setMagicLinkStatus] = useState<string | null>(null);
  const googleBtnRef = useRef<HTMLDivElement>(null);
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;

  useEffect(() => {
    if (authenticated || !dbConfigured || !clientId || !window.google || !googleBtnRef.current) {
      return;
    }
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: async (response: { credential: string }) => {
        try {
          await loginWithGoogleToken(response.credential);
        } catch (err: any) {
          console.error('Google login error:', err.message || err);
        }
      },
    });
    window.google.accounts.id.renderButton(googleBtnRef.current, {
      theme: 'outline',
      size: 'medium',
      text: 'signin_with',
    });
  }, [authenticated, dbConfigured, clientId, loginWithGoogleToken]);

  if (loading || !dbConfigured) {
    return null;
  }

  if (authenticated && user) {
    return (
      <div className="flex items-center gap-3 text-xs font-mono">
        <span className="flex items-center gap-1 text-[#1C1C1C]/70" title="Créditos disponibles">
          <Coins className="w-3.5 h-3.5" /> {balance}
        </span>
        <span className="hidden sm:inline text-[#1C1C1C]/50">{user.email}</span>
        <button
          onClick={() => logout()}
          className="flex items-center gap-1 text-[#1C1C1C]/60 hover:text-black"
          title="Cerrar sesión"
        >
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-xs">
      {clientId && <div ref={googleBtnRef} />}
      {!showEmailForm ? (
        <button
          onClick={() => setShowEmailForm(true)}
          className="flex items-center gap-1 text-[#1C1C1C]/70 hover:text-black font-mono"
        >
          <Mail className="w-3.5 h-3.5" /> Enlace por email
        </button>
      ) : (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setMagicLinkStatus(null);
            try {
              const msg = await requestMagicLink(email);
              setMagicLinkStatus(msg);
            } catch (err: any) {
              setMagicLinkStatus(err.message);
            }
          }}
          className="flex items-center gap-1"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className="border border-black/20 px-2 py-1 text-xs w-36 bg-white"
          />
          <button type="submit" className="px-2 py-1 bg-black text-white text-[10px] uppercase tracking-wider">
            Enviar
          </button>
        </form>
      )}
      {magicLinkStatus && <span className="text-[#1C1C1C]/60 max-w-[16rem]">{magicLinkStatus}</span>}
    </div>
  );
};
