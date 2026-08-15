import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: ['Googlebot', 'Bingbot', 'Applebot', 'YandexBot'],
        allow: '/',
        disallow: ['/private/', '/api/'],
      },
      {
        userAgent: ['GPTBot', 'CCBot', 'anthropic-ai'],
        disallow: '/',
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/api/'],
      },
    ],
    sitemap: 'https://syunikdreams.am/sitemap.xml',
  };
}
