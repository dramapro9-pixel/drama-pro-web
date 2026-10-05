import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc, query, orderBy } from 'firebase/firestore';
import { firebaseConfig } from './config';
import type { MediaItem, Episode } from '../utils/types';

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function getAllMediaItems(): Promise<MediaItem[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'media'));
    const items: MediaItem[] = [];
    querySnapshot.forEach((docSnapshot) => {
      const data = docSnapshot.data();
      items.push({
        id: docSnapshot.id,
        titleAr: data.titleAr || '',
        titleEn: data.titleEn || '',
        descriptionAr: data.descriptionAr || '',
        descriptionEn: data.descriptionEn || '',
        posterUrl: data.posterUrl || '',
        backdropUrl: data.backdropUrl || '',
        category: data.category || '',
        type: (data.type === 'series' ? 'series' : 'movie') as 'movie' | 'series',
        rating: Number(data.rating || 0),
        releaseYear: Number(data.releaseYear || 0),
        genres: Array.isArray(data.genres) ? data.genres : [],
        featured: Boolean(data.featured),
        views: data.views || 0,
        tags: Array.isArray(data.tags) ? data.tags : [],
        badge: data.badge || undefined
      });
    });
    return items;
  } catch (error) {
    console.error('Error fetching media items from Firestore:', error);
    return [];
  }
}

export async function getMediaItemById(id: string): Promise<MediaItem | null> {
  try {
    const docRef = doc(db, 'media', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;

    const data = docSnap.data();
    return {
      id: docSnap.id,
      titleAr: data.titleAr || '',
      titleEn: data.titleEn || '',
      descriptionAr: data.descriptionAr || '',
      descriptionEn: data.descriptionEn || '',
      posterUrl: data.posterUrl || '',
      backdropUrl: data.backdropUrl || '',
      category: data.category || '',
      type: (data.type === 'series' ? 'series' : 'movie') as 'movie' | 'series',
      rating: Number(data.rating || 0),
      releaseYear: Number(data.releaseYear || 0),
      genres: Array.isArray(data.genres) ? data.genres : [],
      featured: Boolean(data.featured),
      views: data.views || 0,
      tags: Array.isArray(data.tags) ? data.tags : [],
      badge: data.badge || undefined
    };
  } catch (error) {
    console.error(`Error fetching media item ${id}:`, error);
    return null;
  }
}

export async function getEpisodesForSeries(seriesId: string): Promise<Episode[]> {
  try {
    const episodesRef = collection(db, 'media', seriesId, 'episodes');
    const q = query(episodesRef, orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    const episodes: Episode[] = [];

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      episodes.push({
        id: docSnap.id,
        titleAr: data.titleAr || '',
        titleEn: data.titleEn || '',
        descriptionAr: data.descriptionAr || '',
        descriptionEn: data.descriptionEn || '',
        thumbnailUrl: data.thumbnailUrl || '',
        order: Number(data.order || 0),
        duration: data.duration || '',
        isPublished: data.isPublished !== false
      });
    });

    return episodes;
  } catch (error) {
    console.error(`Error fetching episodes for series ${seriesId}:`, error);
    return [];
  }
}
