import { useCallback, useEffect, useState } from 'react';

export interface AuthUser {
  id: string;
  email: string;
  displayName: string | null;
}

interface AuthState {
  loading: boolean;
  dbConfigured: boolean;
  authenticated: boolean;
  user: AuthUser | null;
  balance: number;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    loading: true,
    dbConfigured: false,
    authenticated: false,
    user: null,
    balance: 0,
  });

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me', { credentials: 'include' });
      const data = await res.json();
      setState({
        loading: false,
        dbConfigured: !!data.dbConfigured,
        authenticated: !!data.authenticated,
        user: data.user ?? null,
        balance: data.balance ?? 0,
      });
    } catch {
      setState((s) => ({ ...s, loading: false }));
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const loginWithGoogleToken = useCallback(
    async (idToken: string) => {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ idToken }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'No se pudo iniciar sesión con Google.');
      }
      await refresh();
    },
    [refresh]
  );

  const requestMagicLink = useCallback(async (email: string) => {
    const res = await fetch('/api/auth/magic-link/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.error || 'No se pudo enviar el enlace de acceso.');
    }
    return data.message as string;
  }, []);

  const logout = useCallback(async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    await refresh();
  }, [refresh]);

  return { ...state, loginWithGoogleToken, requestMagicLink, logout, refresh };
}
