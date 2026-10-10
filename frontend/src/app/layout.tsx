import type { Metadata } from 'next';
import './globals.css';
import { AppLayout } from '../components/layout/AppLayout';

export const metadata: Metadata = {
  title: 'BERLIN — Fast Food & Late-Night Delivery',
  description:
    'Order gourmet smashed burgers, stone-baked sourdough pizzas, crispy wings, and loaded peri-peri fries from Berlin. 25-minute fast delivery to your door.',
  keywords: [
    'Berlin Fast Food',
    'Burger Delivery',
    'Pizza Delivery',
    'Gourmet Smash Burger',
    'Late Night Fast Food',
    'Crispy Chicken',
  ],
  openGraph: {
    title: 'BERLIN — Fast Food & Late-Night Delivery',
    description: 'Smashed burgers and stone-baked pizzas delivered scorching hot in 25 minutes.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-zinc-950 text-white selection:bg-red-600 selection:text-white">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
