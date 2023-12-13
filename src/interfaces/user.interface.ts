import { IArticle } from './article.interface';

export interface IUpdateUser {
  first_name: string;
  last_name: string;
  password?: string;
  phone?: string | null;
  personal_email?: string | null;
}

export interface IUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  personal_email?: string;
  phone?: string;
  profile_image?: string;
  roles: string;
  updatedAt?: string;
  createdAt: string;
  chiefId?: string;
  articles: IArticle[];
  awards: any[];
  certifications: any[];
  congresses_conferences: any[];
  degrees: any[];
  projects: any[];
  subjects: any[];
}

export interface ICreateUser {
  email: string | null;
  role: string | null;
  chief_id?: string;
}
