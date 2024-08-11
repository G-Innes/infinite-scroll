// Type definitions for Navbar component
export enum View {
  Profile = 'profile',
  Gallery = 'gallery',
  Favourites = 'favourites',
}
export interface NavbarProps {
  setCurrentView: (view: View) => void;
}

export interface NavButtonProps {
  view: View;
  icon: string;
  altText: string;
  setCurrentView: (view: View) => void;
}
