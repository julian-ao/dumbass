import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Route, Routes } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { Toaster } from 'react-hot-toast'
import LoginPage from './components/pages/LoginPage'
import RegisterPage from './components/pages/RegisterPage'
import HomePage from './components/pages/HomePage'
import FavoritesPage from './components/pages/FavoritesPage'
import Navbar from './components/organisms/Navbar'
import InfoPage from './components/pages/InfoPage'
import NotFoundPage from './components/pages/NotFoundPage'
import SearchPage from './components/pages/SearchPage'
import { Provider } from 'react-redux'
import store from './redux/store'

const queryClient = new QueryClient()
const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql',
    cache: new InMemoryCache()
})

export default function App() {
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
                            <Route path='*' element={<NotFoundPage />} />
                            <Route
                                path='/register'
                                element={<RegisterPage />}
                            />
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
                    </Provider>
                </QueryClientProvider>
            </ApolloProvider>
        </ChakraProvider>
    )
}
