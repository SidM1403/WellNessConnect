const GOOGLE_CSE_ID = process.env.GOOGLE_CSE_ID;
const GOOGLE_CSE_API_KEY = process.env.GOOGLE_CSE_API_KEY;
const SEARCH_ENDPOINT = 'https://www.googleapis.com/customsearch/v1';

const normalizeItem = (item) => {
  if (!item?.link || !/^https?:\/\//i.test(item.link)) return null;

  const title = (item.title || '').trim();
  const snippet = (item.snippet || '').trim();
  const source =
    (item.displayLink || '')
      .replace(/^www\./i, '')
      .trim() ||
    (() => {
      try {
        return new URL(item.link).hostname.replace(/^www\./i, '');
      } catch {
        return '';
      }
    })();

  return {
    title: title || 'Untitled resource',
    snippet: snippet || 'No summary available for this result.',
    link: item.link,
    source
  };
};

export const searchArticles = async (req, res, next) => {
  try {
    const q = (req.query.q || '').trim();
    if (!q) {
      return res.status(400).json({ message: 'Search query (q) is required.' });
    }

    if (!GOOGLE_CSE_ID || !GOOGLE_CSE_API_KEY) {
      return res
        .status(503)
        .json({ message: 'Article search is not configured. Please set GOOGLE_CSE_ID and GOOGLE_CSE_API_KEY.' });
    }

    const url = new URL(SEARCH_ENDPOINT);
    url.searchParams.set('key', GOOGLE_CSE_API_KEY);
    url.searchParams.set('cx', GOOGLE_CSE_ID);
    url.searchParams.set('q', q);
    url.searchParams.set('num', '8');
    url.searchParams.set('safe', 'active');

    const response = await fetch(url);
    const body = await response.json();

    if (!response.ok) {
      const message = body?.error?.message || 'Search provider returned an error.';
      return res.status(response.status).json({ message });
    }

    const items = Array.isArray(body.items) ? body.items : [];
    const articles = items.map(normalizeItem).filter(Boolean);

    return res.json({
      query: q,
      count: articles.length,
      articles
    });
  } catch (err) {
    console.error('Article search failed', err);
    return next(err);
  }
};

export default searchArticles;

