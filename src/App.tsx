import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ExplorePage from './pages/ExplorePage'
import FavoritesPage from './pages/FavoritesPage'
import SearchPage from './pages/SearchPage'

const queryClient = new QueryClient()

export default function App() {
    return (
        <ChakraProvider>
            <QueryClientProvider client={queryClient}>
                <Routes>
                    <Route path='/' element={<LoginPage />} />
                    <Route path='/explore' element={<ExplorePage />} />
                    <Route path='/favorites' element={<FavoritesPage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='/search' element={<SearchPage />} />
                </Routes>
            </QueryClientProvider>
        </ChakraProvider>
    )
}
