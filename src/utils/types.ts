export type MediaType = 'movie' | 'series';

export interface Episode {
  id: String;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  videoUrl?: string;
  thumbnailUrl: string;
  order: number;
  duration: string;
  isPublished: boolean;
}

export interface MediaItem {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  posterUrl: string;
  backdropUrl: string;
  category: string;
  type: MediaType;
  rating: number;
  releaseYear: number;
  genres: string[];
  featured: boolean;
  videoUrl?: string;
  views?: number | string;
  tags?: string[];
  badge?: string;
  episodes?: Episode[];
}

export type SupportedLang = 'ar' | 'en';
