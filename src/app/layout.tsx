import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

const font = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });

export const metadata: Metadata = {
  title: 'Vambe Kanban Board by Nicolas Pereira',
  description: 'This is kanban example for apply to remote job',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
