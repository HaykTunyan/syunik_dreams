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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {

  /**
   * 
   * generateMetadata function is used to generate the metadata for the root layout.
   * 
   */

  const { locale } = await params;
  const isEn = locale === 'en';

  const title = isEn ? "Syunik - Legend of Mountains" : "Սյունիք - Լեռների Լեգենդը";
  const description = isEn
    ? "Discover the breathtaking beauty and history of Syunik region. Explore ancient monasteries, high mountains, and heroic history."
    : "Բացահայտեք Սյունիքի մարզի շունչ կտրող գեղեցկությունն ու պատմությունը։ Բացահայտեք հնագույն վանքերը, բարձր լեռները և հերոսական պատմությունը։";

  return {
    title: {
      default: title,
      template: `%s | ${isEn ? 'Syunik Dreams' : 'Սյունիքի Երազանքներ'}`
    },
    description,
    icons: {
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      apple: [
        { url: "/apple-icon.svg", type: "image/svg+xml" },
      ],
      shortcut: "/icon.svg",
    },
    themeColor: [
      { media: "(prefers-color-scheme: dark)", color: "#18181b" },
      { media: "(prefers-color-scheme: light)", color: "#f59e0b" },
    ],
    openGraph: {
      title,
      description,
      url: `https://syunikdreams.am/${locale}`,
      siteName: isEn ? "Syunik Dreams" : "Սյունիքի Երազանքներ",
      images: [
        {
          url: "/images/syunik_landscape.png",
          width: 1200,
          height: 630,
          alt: isEn ? "Syunik Landscape" : "Սյունիքի բնապատկեր",
        },
      ],
      locale: isEn ? "en_US" : "hy_AM",
      type: "website",
    },
    keywords: ["syunik", "mountains", "discover", "landscape", "armenia", "eternal", "history", "travel"],
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/syunik_landscape.png"],
    },
  };
}

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

  const isEn = locale === 'en';
  const title = isEn ? "Syunik Dreams" : "Սյունիքի Երազանքներ";
  const description = isEn
    ? "Befriend the mountains and history of Syunik"
    : "Ընկերացեք Սյունիքի լեռների և պատմության հետ";

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: title,
    description: description,
    url: 'https://syunikdreams.am',
    logo: 'https://syunikdreams.am/images/syunik_view.png',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Syunik',
      addressCountry: 'AM'
    },
    areaServed: {
      '@type': 'State',
      name: 'Syunik'
    }
  };

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${notoArmenian.variable} font-sans antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ErrorBoundary>
            <main>{children}</main>
          </ErrorBoundary>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
