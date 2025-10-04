import type { User } from '@payload-types'

export type Login = (
  previousState: any,
  args: { email: string; password: string },
) => Promise<User | null>

export type Logout = () => Promise<void>

export interface AuthContext {
  user?: User | null
}
