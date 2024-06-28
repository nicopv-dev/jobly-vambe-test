import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface State {
  theme: Theme;
}

interface Action {
  setTheme: (theme: Theme) => void;
}

const themeStore = create<State & Action>((set) => ({
  theme: 'light',
  setTheme: (theme: Theme) => set((state) => ({ theme: theme })),
}));

export const useThemeStore = themeStore;
