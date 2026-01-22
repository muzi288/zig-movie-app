// src/store.ts
import create from 'zustand';

interface AppState {
  darkMode: boolean;
  favorites: number[]; // store favorite movie IDs
  toggleDarkMode: () => void;
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const useAppStore = create<AppState>((set, get) => ({
  darkMode: true,
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),

  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

  addFavorite: (id: number) =>
    set((state) => {
      const newFavs = [...state.favorites, id];
      localStorage.setItem('favorites', JSON.stringify(newFavs));
      return { favorites: newFavs };
    }),

  removeFavorite: (id: number) =>
    set((state) => {
      const newFavs = state.favorites.filter((f) => f !== id);
      localStorage.setItem('favorites', JSON.stringify(newFavs));
      return { favorites: newFavs };
    }),

  isFavorite: (id: number) => get().favorites.includes(id),
}));