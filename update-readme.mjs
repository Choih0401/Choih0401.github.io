// scripts/update-readme.mjs
import fs from 'fs';
import Parser from 'rss-parser';

const FEED_URL = process.env.BLOG_FEED_URL || 'https://choih0401.github.io/feed.xml';
const MAX_ITEMS = parseInt(process.env.BLOG_MAX_ITEMS || '3', 10);

const README_PATH = 'README.md';
const START = '<!-- BLOG:START -->';
const END = '<!-- BLOG:END -->';

function formatItem(item) {
  const date = item.isoDate || item.pubDate || '';
  const ymd = date ? new Date(date).toISOString().slice(0, 10) : '';
  const url = item.link || item.guid || '#';
  const title = (item.title || '').trim();
  return `- ${ymd ? `**${ymd}** — ` : ''}[${title}](${url})`;
}

async function main() {
  const parser = new Parser();
  let feed;
  try {
    feed = await parser.parseURL(FEED_URL);
  } catch (e) {
    console.error('Failed to fetch/parse feed:', e.message);
    process.exit(1);
  }

  const lines = (feed.items || []).slice(0, MAX_ITEMS).map(formatItem);
  const block = lines.length ? lines.join('\n') : '_No recent posts_';

  const readme = fs.readFileSync(README_PATH, 'utf8');

  if (!readme.includes(START) || !readme.includes(END)) {
    console.error(`Missing markers in README. Please include:\n${START}\n...content...\n${END}`);
    process.exit(1);
  }

  const updated = readme.replace(
    new RegExp(`${START}[\\s\\S]*?${END}`, 'm'),
    `${START}\n${block}\n${END}`
  );

  if (updated !== readme) {
    fs.writeFileSync(README_PATH, updated);
    console.log('README updated successfully.');
  } else {
    console.log('README already up-to-date.');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
