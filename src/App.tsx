import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ExplorePage from './pages/ExplorePage'
import FavoritesPage from './pages/FavoritesPage'
import Navbar from './components/molecules/Navbar'
import InfoPage from './pages/InfoPage'
import NotFoundPage from './pages/NotFoundPage'
import SearchPage from './pages/SearchPage'

const queryClient = new QueryClient()

export default function App() {
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (window.location.pathname === '/') {
            navigate('/explore')
        }
    }, [navigate])

    return (
        <ChakraProvider>
            <QueryClientProvider client={queryClient}>
                <Navbar
                    userLoggedIn={userLoggedIn}
                    signOut={() => setUserLoggedIn(false)}
                />
                <Toaster />
                <Routes>
                    <Route path='/' element={<></>} />
                    <Route path='/explore' element={<ExplorePage />} />
                    <Route path='/favorites' element={<FavoritesPage />} />
                    <Route
                        path='/login'
                        element={
                            <LoginPage setUser={() => setUserLoggedIn(true)} />
                        }
                    />
                    <Route path='*' element={<NotFoundPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route
                        path='/song/:songId'
                        element={<InfoPage pageType='song' />}
                    />
                    <Route
                        path='/artist/:artistId'
                        element={<InfoPage pageType='artist' />}
                    />
                    <Route path='/search' element={<SearchPage />} />
                </Routes>
            </QueryClientProvider>
        </ChakraProvider>
    )
}
