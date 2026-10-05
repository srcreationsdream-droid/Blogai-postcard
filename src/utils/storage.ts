export interface FavoritesState {
  postcards: string[];
  quotes: string[];
  gallery: string[];
}

const STORAGE_KEY = 'blogai_postcard_favorites_v1';

export function getFavorites(): FavoritesState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { postcards: [], quotes: [], gallery: [] };
    const parsed = JSON.parse(raw);
    return {
      postcards: Array.isArray(parsed.postcards) ? parsed.postcards : [],
      quotes: Array.isArray(parsed.quotes) ? parsed.quotes : [],
      gallery: Array.isArray(parsed.gallery) ? parsed.gallery : []
    };
  } catch {
    return { postcards: [], quotes: [], gallery: [] };
  }
}

export function saveFavorites(favs: FavoritesState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
    window.dispatchEvent(new Event('favorites-updated'));
  } catch (e) {
    console.warn('LocalStorage save failed:', e);
  }
}

export function toggleFavorite(type: keyof FavoritesState, id: string): boolean {
  const current = getFavorites();
  const list = current[type];
  const exists = list.includes(id);
  const updated = exists ? list.filter(item => item !== id) : [...list, id];
  saveFavorites({
    ...current,
    [type]: updated
  });
  return !exists;
}

export function isFavorite(type: keyof FavoritesState, id: string): boolean {
  const current = getFavorites();
  return current[type].includes(id);
}
