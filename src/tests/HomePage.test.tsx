import ExplorePage from '../pages/ExplorePage';
import { render, screen } from '@testing-library/react';
import { test } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

test('ExplorePage renders without crashing', () => {
    render(
        <MemoryRouter>
            <ExplorePage />
        </MemoryRouter>,
    );
});

test('ExplorePage contains "Top Songs" and "Top Artists" headings', () => {
    render(
        <MemoryRouter>
            <ExplorePage />
        </MemoryRouter>,
    );

    const topSongsHeader = screen.getByTestId('top_song_header');
    const topArtistsHeader = screen.getByTestId('top_artist_header');

    expect(topSongsHeader).toBeInTheDocument();
    expect(topArtistsHeader).toBeInTheDocument();
});
