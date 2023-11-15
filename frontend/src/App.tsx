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
    uri: 'http://localhost:8000/graphql',
    cache: new InMemoryCache()
})

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
