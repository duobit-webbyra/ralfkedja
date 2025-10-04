import type { User } from '@payload-types'

export type Login = (
  args: { email: string; password: string },
) => Promise<void>

export type Logout = () => Promise<void>

export interface AuthContext {
  user?: User | null,
  login: Login
}
