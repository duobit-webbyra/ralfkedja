'use client'

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

import type { User } from '@payload-types'
import type { AuthContext } from './types'
import { loginAction } from './login'

const Context = createContext({} as AuthContext)

export const AuthProvider: React.FC<{ children: React.ReactNode, initialUser: User | null }> = ({ children, initialUser }) => {
  const [user] = useState<null | User>(initialUser)

  const login = useCallback(async (args: { email: string, password: string }) => {

    try {
      await loginAction(args.email, args.password)
      window.location.href = "/medlemssida"
    } catch (error) {
      console.error(error)

    }
  }, [])

  // On mount, get user and set

  return (
    <Context.Provider
      value={{
        user,
        login
      }}
    >
      {children}
    </Context.Provider>
  )
}

type UseAuth<T = User> = () => AuthContext

export const useAuth: UseAuth = () => useContext(Context)
