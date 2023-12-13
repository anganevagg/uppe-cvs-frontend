export interface IArticle {
  id: string;
  title: string;
  doi?: string;
  url?: string;
  file_url?: string;
  publication_date: string;
  authors: string[];
}

export interface ICreateArticle {
  title: string;
  doi?: string | null;
  url?: string | null;
  file?: File;
  publication_date: string;
  authors: string[];
}

interface File {
  name: string;
  fileBase64: string;
}
