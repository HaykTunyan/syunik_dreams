import type { Metadata } from "next";
import { Noto_Sans_Armenian } from "next/font/google";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import "@/styles/globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from "next/navigation";

const notoArmenian = Noto_Sans_Armenian({
  subsets: ["armenian"],
  variable: "--font-noto-armenian",
});

export const metadata: Metadata = {
  title: "Syunik - Legend of Mountains",
  description: "Discover the breathtaking beauty and history of Syunik region.",
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!['en', 'hy'].includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${notoArmenian.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ErrorBoundary>
            <main>{children}</main>
          </ErrorBoundary>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
