import React, { useState } from 'react';
import ImageGallery from './components/ImageGallery/ImageGallery';
import FavouritesPage from './pages/FavouritesPage';
import Navbar from './components/Navbar/Navbar';
import './App.css';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('gallery');

  const renderView = () => {
    switch (currentView) {
      case 'gallery':
        return <ImageGallery />;
      case 'favourites':
        return <FavouritesPage />;
      default:
        return <ImageGallery />;
    }
  };

  return (
    <div>
      <Navbar setCurrentView={setCurrentView} />
      {renderView()}
    </div>
  );
};

export default App;
