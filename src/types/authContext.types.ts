import { UserTypeAuth } from './auth.types';

export type AuthContextType = {
  user: UserTypeAuth | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};
