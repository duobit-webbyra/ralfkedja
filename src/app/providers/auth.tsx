'use client'

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

import type { User } from '@payload-types'
import type { AuthContext } from './types'

const Context = createContext({} as AuthContext)

export const AuthProvider: React.FC<{ children: React.ReactNode, initialUser: User | null }> = ({ children, initialUser }) => {
  const [user] = useState<null | User>(initialUser)

  console.log(user)

  // On mount, get user and set

  return (
    <Context.Provider
      value={{
        user,
      }}
    >
      {children}
    </Context.Provider>
  )
}

type UseAuth<T = User> = () => AuthContext

export const useAuth: UseAuth = () => useContext(Context)
