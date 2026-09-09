import type { Metadata } from 'next';
import './globals.css';
import { steps } from './content';
export const metadata: Metadata = { title: steps[0].title + ' | Canopy Advisory Group', description: 'A practical conversation about delegating, reviewing, and improving work with AI.' };
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}
