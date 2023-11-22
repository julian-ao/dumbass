import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { Toaster } from 'react-hot-toast'
import LoginPage from './components/pages/LoginPage'
import RegisterPage from './components/pages/RegisterPage'
import HomePage from './components/pages/HomePage'
import FavoritesPage from './components/pages/FavoritesPage'
import Navbar from './components/organisms/Navbar'
import SearchPage from './components/pages/SearchPage'
import { ArtistPage } from './components/pages/ArtistPage'
import { SongPage } from './components/pages/SongPage'
import 'react-loading-skeleton/dist/skeleton.css'
import { ErrorPage } from './components/pages/ErrorPage'
import { Provider } from 'react-redux'
import store from './redux/store'

const queryClient = new QueryClient()
const client = new ApolloClient({
    uri: 'http://it2810-02.idi.ntnu.no:8000/graphql',
    cache: new InMemoryCache()
})

/**
 * App is the main component of the application.
 *
 * It integrates various providers and libraries such as Chakra UI, Apollo Client, React Query, React Router,
 * and Redux to set up the application's core functionality and routing.
 *
 * The App component uses:
 * - `ChakraProvider` for styling with Chakra UI components.
 * - `ApolloProvider` for GraphQL queries with an Apollo Client instance.
 * - `QueryClientProvider` from React Query for managing server state.
 * - `Provider` from React Redux for managing application state.
 * - `Navbar` and `Toaster` components for the user interface.
 * - `Routes` and `Route` from React Router for handling navigation and rendering different pages based on the URL.
 *
 * The App component defines routes for various pages such as HomePage, FavoritesPage, LoginPage, RegisterPage,
 * ArtistPage, SongPage, SearchPage, and a catch-all ErrorPage for 404 errors.
 *
 * The ErrorPage is configured to display a custom message and provides a button to navigate back to the homepage.
 *
 * @returns {JSX.Element} The main JSX structure of the application encompassing various providers and routes.
 */

export default function App() {
    const navigate = useNavigate()

    return (
        <ChakraProvider>
            <ApolloProvider client={client}>
                <QueryClientProvider client={queryClient}>
                    <Provider store={store}>
                        <Navbar />
                        <Toaster />
                        <Routes>
                            <Route path='/' element={<HomePage />} />
                            <Route
                                path='/favorites'
                                element={<FavoritesPage />}
                            />
                            <Route path='/login' element={<LoginPage />} />
                            <Route
                                path='/register'
                                element={<RegisterPage />}
                            />
                            <Route
                                path='*'
                                element={
                                    <ErrorPage
                                        title='Oops!'
                                        subTitle='404 - Page not found'
                                        description='The page you are looking for does not exist. How you got here is a mystery, but you can click the button below to go back to the homepage.'
                                        buttonText='Go to homepage'
                                        buttonFunction={() => navigate('/')}
                                    />
                                }
                            />
                            <Route
                                path='/register'
                                element={<RegisterPage />}
                            />
                            <Route path='/song/:id' element={<SongPage />} />
                            <Route
                                path='/artist/:id'
                                element={<ArtistPage />}
                            />
                            <Route path='/search' element={<SearchPage />} />
                        </Routes>
                    </Provider>
                </QueryClientProvider>
            </ApolloProvider>
        </ChakraProvider>
    )
}
