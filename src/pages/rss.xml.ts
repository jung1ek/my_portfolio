import type { APIRoute } from 'astro';
import { getPosts } from '../lib/content';
import { site } from '../data/site';

export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.data.title}]]></title>
      <link>${site.url}/writing/${post.id}/</link>
      <guid>${site.url}/writing/${post.id}/</guid>
      <pubDate>${post.data.date.toUTCString()}</pubDate>
      <description><![CDATA[${post.data.description}]]></description>
    </item>`,
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${site.name}</title>
    <link>${site.url}</link>
    <description>${site.description}</description>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
};
