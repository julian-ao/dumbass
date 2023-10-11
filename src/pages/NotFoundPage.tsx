import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
    const navigate = useNavigate()

    return (
        <div className='flex items-center pt-10 px-5 sm:pt-32 sm:px-10 flex-col text-gray-500 text-center'>
            <h1 className='text-7xl'>Oops!</h1>
            <h2 className='text-3xl my-4'>404 - Page Not Found</h2>
            <p className='max-w-xl'>
                The page you are looking for does not exist. How you got here is
                a mystery, but you can click the button below to go back to the
                homepage.
            </p>
            {/* TODO - replace button with Button-component not yet in this branch */}
            <button
                className='flex w-56 justify-center rounded-md px-3 py-1.5 mt-6 text-sm font-semibold leading-8 text-white shadow-[0_4px_9px_-4px_#8FC0A9] hover:scale-105 transition-all'
                style={{
                    background:
                        'linear-gradient(to right, #C8D5B9, #8FC0A9, #68B0AB)'
                }}
                onClick={() => navigate('/')}>
                Go to homescreen
            </button>
        </div>
    )
}

export default NotFoundPage
