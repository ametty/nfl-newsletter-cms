import slugify from 'slugify';

export function createSlug(title: string): string {
  return slugify(title, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g,
  });
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function truncateText(text: string, length: number = 150): string {
  if (text.length <= length) return text;
  return text.substring(0, length).trim() + '...';
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}
