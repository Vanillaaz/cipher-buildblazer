const AUTH_KEY = 'cipher_admin_session';

export const ADMIN_CREDENTIALS = {
  username: import.meta.env.VITE_ADMIN_USER || 'admin',
  password: import.meta.env.VITE_ADMIN_PASSWORD || 'cipheradmin2026',
};

export const checkAuthSession = (): boolean => {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return false;
    const session = JSON.parse(raw);
    return session && session.isAuthenticated === true;
  } catch {
    return false;
  }
};

export const loginAdmin = (user: string, pass: string): { success: boolean; message: string } => {
  const expectedUser = ADMIN_CREDENTIALS.username.trim().toLowerCase();
  const expectedPass = ADMIN_CREDENTIALS.password.trim();

  if (user.trim().toLowerCase() === expectedUser && pass.trim() === expectedPass) {
    const session = {
      username: user.trim(),
      isAuthenticated: true,
      loginTime: new Date().toISOString(),
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
    return { success: true, message: 'Access granted. Welcome to CIPHER Admin Portal.' };
  }

  return { success: false, message: 'Invalid admin username or password.' };
};

export const logoutAdmin = (): void => {
  localStorage.removeItem(AUTH_KEY);
};
