import React from 'react';
import styles from './Navbar.module.css';

interface NavbarProps {
  setCurrentView: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setCurrentView }) => {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <button onClick={() => setCurrentView('gallery')}>Home</button>
        </li>
        <li>
          <button onClick={() => setCurrentView('favourites')}>
            Favourites
          </button>
        </li>
        <li>
          <button onClick={() => setCurrentView('profile')}>Profile</button>
        </li>
        <li>
          <button onClick={() => {}}>Toggle Dark Mode</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
