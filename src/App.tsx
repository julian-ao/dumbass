import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ExplorePage from './pages/ExplorePage'
import FavoritesPage from './pages/FavoritesPage'
import { useState } from 'react'
import Navbar from './components/molecules/Navbar'
import { Toaster } from 'react-hot-toast'
import NotFoundPage from './pages/NotFoundPage'

const queryClient = new QueryClient()

export default function App() {
    const [userLoggedIn, setUserLoggedIn] = useState(false)

    return (
        <QueryClientProvider client={queryClient}>
            <Navbar
                userLoggedIn={userLoggedIn}
                signOut={() => setUserLoggedIn(false)}
            />
            <Toaster />
            <Routes>
                <Route path='/' element={<ExplorePage />} />
                <Route path='/' element={<ExplorePage />} />
                <Route path='/favorites' element={<FavoritesPage />} />
                <Route
                    path='/login'
                    element={
                        <LoginPage setUser={() => setUserLoggedIn(true)} />
                    }
                />
                <Route path='*' element={<NotFoundPage />} />
                <Route path='/register' element={<RegisterPage />} />
            </Routes>
        </QueryClientProvider>
    )
}
