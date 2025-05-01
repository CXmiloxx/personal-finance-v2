export type themeType = 'light' | 'dark';

export interface ThemeContextType {
  theme: themeType;
  toggleTheme: () => void;
}
