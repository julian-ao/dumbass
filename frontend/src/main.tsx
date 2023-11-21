import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

/**
 * The entry point for the React application.
 *
 * This script is responsible for rendering the main App component into the DOM.
 * It wraps the App component with essential providers required for its operation:
 *
 * - `QueryClientProvider` from '@tanstack/react-query': Provides a React Query client for server state
 *   management throughout the application. This allows for efficient data fetching, caching, and synchronization.
 *
 * - `BrowserRouter` from 'react-router-dom': Provides a routing framework, enabling navigation between different
 *   views and components in the application. The basename prop is set to '/project2/', indicating that the app
 *   is served from that sub-directory on the server.
 *
 * - `App`: The root component of the application, which includes all the sub-components, routing, and state management.
 */

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter basename='/project2/'>
            <App />
        </BrowserRouter>
    </QueryClientProvider>
)
