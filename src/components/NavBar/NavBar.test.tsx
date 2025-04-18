import { render, screen } from '@testing-library/react';
import NavBar from './NavBar';
import { MemoryRouter } from 'react-router-dom';

describe('NavBar', () => {
  test('should navbar categories displayed correctly', () => {
    render(<MemoryRouter><NavBar /></MemoryRouter>);
    expect(screen.getByText('CryptoApplication')).toBeInTheDocument();
    expect(screen.getByText('Rechercher')).toBeInTheDocument();
    expect(screen.getByText('Gagnants et perdants')).toBeInTheDocument();
    expect(screen.getByText('Favoris')).toBeInTheDocument();
  });

});
