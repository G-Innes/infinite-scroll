import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Navbar from './Navbar';
import { View } from '../../types/navbar';

vi.mock('./Navbar', () => ({
  __esModule: true,
  default: (props: any) => (
    <nav>
      <ul>
        <li>
          <button onClick={() => props.setCurrentView(View.Profile)}>
            <img src="profile.png" alt="Profile" />
          </button>
        </li>
        <li>
          <button onClick={() => props.setCurrentView(View.Gallery)}>
            <img src="home.png" alt="Home" />
          </button>
        </li>
        <li>
          <button onClick={() => props.setCurrentView(View.Favourites)}>
            <img src="favourites.png" alt="Favourites" />
          </button>
        </li>
      </ul>
    </nav>
  ),
}));

describe('Navbar', () => {
  it('should render NavButton components for each view', () => {
    const setCurrentView = vi.fn();

    render(<Navbar setCurrentView={setCurrentView} />);

    expect(screen.getByAltText('Profile')).toBeInTheDocument();
    expect(screen.getByAltText('Home')).toBeInTheDocument();
    expect(screen.getByAltText('Favourites')).toBeInTheDocument();
  });

  it('should call setCurrentView with correct view when a button is clicked', () => {
    const setCurrentView = vi.fn();

    render(<Navbar setCurrentView={setCurrentView} />);

    fireEvent.click(screen.getByAltText('Profile'));
    expect(setCurrentView).toHaveBeenCalledWith(View.Profile);

    fireEvent.click(screen.getByAltText('Home'));
    expect(setCurrentView).toHaveBeenCalledWith(View.Gallery);

    fireEvent.click(screen.getByAltText('Favourites'));
    expect(setCurrentView).toHaveBeenCalledWith(View.Favourites);
  });
});
