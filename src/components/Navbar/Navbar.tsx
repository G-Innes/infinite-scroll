import React from 'react';
import styles from './Navbar.module.css';
import { NavbarProps, NavButtonProps, View } from '../../types/navbar';

import HomeIcon from '../../assets/home.png';
import FavouritesIcon from '../../assets/favorite.png';
import ProfileIcon from '../../assets/account.png';

// Render the NavButton component
const NavButton: React.FC<NavButtonProps> = ({
  view,
  icon,
  altText,
  setCurrentView,
}) => (
  <li>
    <button onClick={() => setCurrentView(view)}>
      <img src={icon} alt={altText} />
    </button>
  </li>
);

// Render the Navbar component
const Navbar: React.FC<NavbarProps> = ({ setCurrentView }) => {
  return (
    <nav className={styles.navbar}>
      <ul>
        <NavButton
          view={View.Profile}
          icon={ProfileIcon}
          altText="Profile"
          setCurrentView={setCurrentView}
        />
        <NavButton
          view={View.Gallery}
          icon={HomeIcon}
          altText="Home"
          setCurrentView={setCurrentView}
        />
        <NavButton
          view={View.Favourites}
          icon={FavouritesIcon}
          altText="Favourites"
          setCurrentView={setCurrentView}
        />
      </ul>
    </nav>
  );
};

export default Navbar;
