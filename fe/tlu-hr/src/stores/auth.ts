import { create } from 'zustand';
import type { User, LoginCredentials } from '../types';
import mockUsers from '../data/users.json';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

// Password validation: min 8 chars, uppercase, lowercase, number
const validatePassword = (password: string): boolean => {
  const minLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  return minLength && hasUppercase && hasLowercase && hasNumber;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (credentials: LoginCredentials): Promise<boolean> => {
    set({ isLoading: true, error: null });

    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Find user by username
    const user = mockUsers.find((u) => u.username === credentials.username);

    if (!user) {
      set({
        isLoading: false,
        error: 'Tên đăng nhập không tồn tại',
        user: null,
        isAuthenticated: false,
      });
      return false;
    }

    // Check password match
    if (user.password !== credentials.password) {
      set({
        isLoading: false,
        error: 'Mật khẩu không đúng',
        user: null,
        isAuthenticated: false,
      });
      return false;
    }

    // Validate password format (optional check for additional security)
    if (!validatePassword(credentials.password)) {
      set({
        isLoading: false,
        error: 'Mật khẩu không đáp ứng yêu cầu bảo mật',
        user: null,
        isAuthenticated: false,
      });
      return false;
    }

    // Successful login
    const { password, ...userWithoutPassword } = user;
    set({
      user: userWithoutPassword as User,
      isAuthenticated: true,
      isLoading: false,
      error: null,
    });
    return true;
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  },

  clearError: () => {
    set({ error: null });
  },
}));
