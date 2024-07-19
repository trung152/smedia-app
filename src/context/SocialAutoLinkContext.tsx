// context/SocialAutoLinkContext.tsx
'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SocialAutoLinkContextProps {
  socialAutoLinkData: any;
  setSocialAutoLinkData: (data: any) => void;
}

const SocialAutoLinkContext = createContext<SocialAutoLinkContextProps | undefined>(undefined);

export const SocialAutoLinkProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [socialAutoLinkData, setSocialAutoLinkData] = useState<any>(null);

  return (
    <SocialAutoLinkContext.Provider value={{ socialAutoLinkData, setSocialAutoLinkData }}>
      {children}
    </SocialAutoLinkContext.Provider>
  );
};

export const useSocialAutoLink = (): SocialAutoLinkContextProps => {
  const context = useContext(SocialAutoLinkContext);
  if (!context) {
    throw new Error('useSocialAutoLink must be used within a SocialAutoLinkProvider');
  }
  return context;
};