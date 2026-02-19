import { MetadataRoute } from 'next';
import { cities } from '@/data/cities';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://syunikdreams.am';
  const locales = ['en', 'hy'];
  
  const staticPages = [
    '',
    '/city',
    '/history',
    '/trips',
    '/contact',
    '/product',
    '/privacy-policy',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate localized static pages
  locales.forEach((locale) => {
    staticPages.forEach((page) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: page === '' ? 1 : 0.8,
      });
    });

    // Generate dynamic city detail pages
    cities.forEach((city) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/city/${city.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    });
  });

  return sitemapEntries;
}
