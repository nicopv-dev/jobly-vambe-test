import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { TooltipProvider } from '@/components/ui/tooltip';

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
      <TooltipProvider>
        <body className={font.className}>{children}</body>
      </TooltipProvider>
    </html>
  );
}
