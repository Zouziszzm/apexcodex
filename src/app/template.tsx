import React from 'react';
import { ReactNode } from 'react';
import PageWrapper from '../components/Wrappers/PageWrapper';
import Navbar from '../components/Molecules/Navbar/Navbar';

export default function GlobalTemplate({ children }: { children: ReactNode }) {
  return (
    <PageWrapper>
      <Navbar />
      {children}
    </PageWrapper>
  );
}
