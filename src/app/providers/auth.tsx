'use client';

// import type { Permissions } from 'payload/auth';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

import type { User } from '@payload-types';
import type { AuthContext, Login, Logout } from './types';

import { rest } from './rest';

const Context = createContext({} as AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<null | User>();

  const login = useCallback<Login>(async (args) => {
    const user = await rest(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/login`, args);
    setUser(user ?? null);
    return user ?? null;
  }, []);

  const logout = useCallback<Logout>(async () => {
    await rest(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`);
    setUser(null);
    return;
  }, []);

  // On mount, get user and set
  useEffect(() => {
    const fetchMe = async () => {
      const user = await rest(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
        {},
        {
          method: 'GET',
        },
      );
      setUser(user);
    };

    void fetchMe();
  }, []);

  return (
    <Context.Provider
      value={{
        login,
        logout,
        setUser,
        user,
      }}
    >
      {children}
    </Context.Provider>
  );
};

type UseAuth<T = User> = () => AuthContext;

export const useAuth: UseAuth = () => useContext(Context);
