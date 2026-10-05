import type { APIRoute } from 'astro';
import { getAllMediaItems } from '../firebase/client';

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site ? site.href.replace(/\/$/, '') : 'https://drama-pro-33ff6.web.app';
  const allMedia = await getAllMediaItems();

  const staticUrls = [
    `${baseUrl}/ar/`,
    `${baseUrl}/en/`,
    `${baseUrl}/download/`
  ];

  const dynamicUrls: string[] = [];

  allMedia.forEach((item) => {
    const typePath = item.type === 'series' ? 'series' : 'movie';
    dynamicUrls.push(`${baseUrl}/ar/${typePath}/${item.id}`);
    dynamicUrls.push(`${baseUrl}/en/${typePath}/${item.id}`);
  });

  const allUrls = [...staticUrls, ...dynamicUrls];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${allUrls
    .map((url) => {
      const isAr = url.includes('/ar/');
      const altUrl = isAr ? url.replace('/ar/', '/en/') : url.replace('/en/', '/ar/');
      const arUrl = isAr ? url : altUrl;
      const enUrl = isAr ? altUrl : url;

      return `
  <url>
    <loc>${url}</loc>
    <changefreq>daily</changefreq>
    <priority>${url.endsWith('/ar/') || url.endsWith('/en/') || url.endsWith('/download/') ? '1.0' : '0.8'}</priority>
    <xhtml:link rel="alternate" hreflang="ar" href="${arUrl}" />
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />
  </url>`;
    })
    .join('')}
</urlset>`;

  return new Response(sitemapXml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
