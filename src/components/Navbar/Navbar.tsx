import React from 'react';
import styles from './Navbar.module.css';

// Import SVGs
import HomeIcon from '../../assets/home.png';
import FavouritesIcon from '../../assets/favorite.png';
import ProfileIcon from '../../assets/account.png';

interface NavbarProps {
  setCurrentView: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setCurrentView }) => {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <button onClick={() => setCurrentView('profile')}>
            <img src={ProfileIcon} alt="Profile" />
          </button>
        </li>
        <li>
          <button onClick={() => setCurrentView('gallery')}>
            <img src={HomeIcon} alt="Home" />
          </button>
        </li>
        <li>
          <button onClick={() => setCurrentView('favourites')}>
            <img src={FavouritesIcon} alt="Favourites" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
