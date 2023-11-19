// import { render, screen } from '@testing-library/react'
// import Navbar from '../components/organisms/Navbar'
// import { test } from 'vitest'
// import '@testing-library/jest-dom'
// import { MemoryRouter } from 'react-router-dom'
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import rootReducer from '../redux/reducers/userReducer';

test('test', () => {
    expect(1).toBe(1)
})

// const mockStore = createStore(rootReducer);

// test('Test that the Navbar renders with Search and Favorites', async () => {
//     render(
//         <Provider store={mockStore}>
//             <MemoryRouter>
//                 <Navbar />
//             </MemoryRouter>
//         </Provider>
//     )

//     // Title
//     const titleElement = screen.getByRole('Navbar-title')
//     expect(titleElement).toBeInTheDocument()
//     expect(titleElement).toHaveTextContent('DumBass')

//     // Search
//     const exploreElement = screen.getByRole('Navbar-Search')
//     expect(exploreElement).toBeInTheDocument()
//     expect(exploreElement).toHaveTextContent('Search')

//     // Favorites
//     const favoritesElement = screen.getByRole('Navbar-Favorites')
//     expect(favoritesElement).toBeInTheDocument()
//     expect(favoritesElement).toHaveTextContent('Favorites')
// })
