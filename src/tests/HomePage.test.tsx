import HomePage from "../pages/HomePage";
import { render, screen } from '@testing-library/react';
import { test } from 'vitest';
import '@testing-library/jest-dom';

test('HomePage renders without crashing', () => {
    render(<HomePage />);
});
  
test('HomePage contains "Top Songs" and "Top Artists" headings', () => {
    render(<HomePage />);
    
    const topSongsHeader = screen.getByTestId('top_song_header');
    const topArtistsHeader = screen.getByTestId('top_artist_header');
    
    expect(topSongsHeader).toBeInTheDocument();
    expect(topArtistsHeader).toBeInTheDocument();
});