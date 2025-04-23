import React from 'react';
// src/app/layout.tsx
import ClientLayoutWrapper from '../components/Wrappers/ClientLayoutWrapper';
import './globals.css';

export const metadata = {
  title: 'AlFarhaan Khan (Static)',
  description: "AlFarhaan's Portfolio site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
