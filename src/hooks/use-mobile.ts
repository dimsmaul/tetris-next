'use client';

import { useContext } from 'react';
import { createContext, Context } from 'react';

type NavigateFunction = (path: string) => void;

export const NavigationContext: Context<NavigateFunction> = createContext<NavigateFunction>(() => {});

export const useNavigate = () => {
  return useContext(NavigationContext);
};