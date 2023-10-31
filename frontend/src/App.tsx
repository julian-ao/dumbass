import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Route, Routes } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { Toaster } from 'react-hot-toast'
import { useState } from 'react'
import LoginPage from './components/pages/LoginPage'
import RegisterPage from './components/pages/RegisterPage'
import HomePage from './components/pages/HomePage'
import FavoritesPage from './components/pages/FavoritesPage'
import Navbar from './components/organisms/Navbar'
import NotFoundPage from './components/pages/NotFoundPage'
import SearchPage from './components/pages/SearchPage'
import { ArtistPage } from './components/pages/ArtistPage'
import { SongPage } from './components/pages/SongPage'
import 'react-loading-skeleton/dist/skeleton.css'

const queryClient = new QueryClient()
const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql',
    cache: new InMemoryCache()
})

export default function App() {
    const [userLoggedIn, setUserLoggedIn] = useState(false)

    return (
        <ChakraProvider>
            <ApolloProvider client={client}>
                <QueryClientProvider client={queryClient}>
                    <Navbar
                        userLoggedIn={userLoggedIn}
                        signOut={() => setUserLoggedIn(false)}
                    />
                    <Toaster />
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/favorites' element={<FavoritesPage />} />
                        <Route
                            path='/login'
                            element={
                                <LoginPage
                                    setUser={() => setUserLoggedIn(true)}
                                />
                            }
                        />
                        <Route path='*' element={<NotFoundPage />} />
                        <Route path='/register' element={<RegisterPage />} />
                        <Route path='/song/:id' element={<SongPage />} />
                        <Route path='/artist/:id' element={<ArtistPage />} />
                        <Route path='/search' element={<SearchPage />} />
                    </Routes>
                </QueryClientProvider>
            </ApolloProvider>
        </ChakraProvider>
    )
}
