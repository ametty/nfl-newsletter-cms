export interface Newsletter {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface NewsletterInsert {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  published?: boolean;
}

export interface NewsletterUpdate {
  title?: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  published?: boolean;
}
