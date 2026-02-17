// ============================================================================
// Root Layout - Next.js 15 App Router
// ============================================================================
// Purpose: Root layout with providers, fonts, and global styles
// Author: @dev (Dex) + @ux-expert (Uma)
// ============================================================================

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Road to Fluency - Business English',
  description: 'Aprenda inglês de negócios com exercícios inteligentes, correção por IA e acompanhamento de progresso.',
  keywords: ['business english', 'inglês de negócios', 'aprender inglês', 'fluência', 'spaced repetition'],
  authors: [{ name: 'Road to Fluency' }],
  openGraph: {
    title: 'Road to Fluency - Business English',
    description: 'Aprenda inglês de negócios com exercícios inteligentes e acompanhamento de progresso.',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" className={inter.variable}>
      <body>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
