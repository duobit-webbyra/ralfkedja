import type { User } from '@payload-types';

export type Login = (args: { email: string; password: string }) => Promise<User>;

export type Logout = () => Promise<void>;

export interface AuthContext {
  login: Login;
  logout: Logout;
  setUser: (user: null | User) => void;
  user?: null | User;
}
