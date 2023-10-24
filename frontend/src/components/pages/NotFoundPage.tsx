import { useNavigate } from 'react-router-dom'
import Button from '../atoms/Button'

/**
 * NotFoundPage component - A user-friendly error page for routing failures
 *
 * This component is displayed when the user tries to navigate to a route that does not exist.
 * It provides an error message and a button to navigate back to the homepage.
 */
const NotFoundPage = () => {
    const navigate = useNavigate()

    return (
        <main className='flex items-center pt-10 px-5 sm:pt-32 sm:px-10 flex-col text-gray-500 text-center'>
            <header>
                <h1 className='text-7xl'>Oops!</h1>
                <h2 className='text-3xl my-4'>404 - Page Not Found</h2>
            </header>
            
            <section className='max-w-xl mb-10'>
                <p>
                    The page you are looking for does not exist. How you got here is
                    a mystery, but you can click the button below to go back to the
                    homepage.
                </p>
            </section>
            <section className='w-1/6'>
                <Button
                    title='Go to homescreen'
                    type='button'
                    onClick={() => navigate('/')}
                />
            </section>
        </main>
    )
}

export default NotFoundPage
