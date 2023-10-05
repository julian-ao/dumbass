import { faMusic } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

const routes = [
    {
        path: '/explore',
        title: 'Home'
    },
    {
        path: '/favorites',
        title: 'Favorites'
    }
]

const Navbar = () => {
    const location = useLocation()

    const [userDropdownVisible, setUserDropdownVisible] =
        useState<boolean>(false)
    const [mobileDropdownVisible, setMobileDropdownVisible] =
        useState<boolean>(false)

    const userPhoto =
        'https://media.licdn.com/dms/image/D5603AQF-WLbY91FVmg/profile-displayphoto-shrink_800_800/0/1666367680104?e=2147483647&v=beta&t=eSYLHzEK41R_m1U3Tub7KhJ9RYWSQkqECSqFy95VMFo'
    const userName = 'Sander Skogh Linnerud'
    const userMail = 'sander@linnerud.no'

    const userDropdownRef = useRef<HTMLDivElement | null>(null)
    const mobileDropdownRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        // Dropdown logic
        const handleClickOutside = (event: MouseEvent) => {
            if (
                userDropdownRef.current &&
                !userDropdownRef.current.contains(event.target as Node)
            ) {
                setUserDropdownVisible(false)
            }

            if (
                mobileDropdownRef.current &&
                !mobileDropdownRef.current.contains(event.target as Node)
            ) {
                setMobileDropdownVisible(false)
            }
        }

        // Add event listener when component mounts
        document.addEventListener('mousedown', handleClickOutside)

        // Remove event listener when component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleSignOut = () => {
        console.log('TODO')
    }

    return (
        <nav className='bg-white border-gray-200 dark:bg-gray-900'>
            <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-7'>
                <Link
                    to='/explore'
                    className='flex items-center gap-3 text-green'>
                    <FontAwesomeIcon icon={faMusic} size={'xl'} />
                    <span
                        role='Navbar-title'
                        className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white text-blueGray'>
                        DrumBass
                    </span>
                </Link>
                <div className='flex items-center md:order-2 relative'>
                    <button
                        type='button'
                        className='flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
                        onClick={() =>
                            setUserDropdownVisible(!userDropdownVisible)
                        }>
                        <span className='sr-only'>Open user menu</span>
                        <img
                            className='w-8 h-8 rounded-full'
                            src={userPhoto}
                            alt='user photo'
                        />
                    </button>
                    {/* User Dropdown */}
                    <div
                        ref={userDropdownRef as React.RefObject<HTMLDivElement>}
                        className={`z-50 ${
                            userDropdownVisible ? '' : 'hidden'
                        } absolute top-5 right-0 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}>
                        <div className='px-4 py-3'>
                            <span className='block text-sm text-gray-900 dark:text-white'>
                                {userName}
                            </span>
                            <span className='block text-sm  text-gray-500 truncate dark:text-gray-400'>
                                {userMail}
                            </span>
                        </div>
                        {/* User Dropdown Content */}
                        <ul className='py-2'>
                            <li>
                                <div
                                    onClick={handleSignOut}
                                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer dark:text-gray-200 dark:hover:text-white'>
                                    Sign out
                                </div>
                            </li>
                        </ul>
                    </div>
                    {/* Mobile Dropdown */}
                    <button
                        ref={
                            mobileDropdownRef as React.RefObject<HTMLButtonElement>
                        }
                        type='button'
                        className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
                        onClick={() =>
                            setMobileDropdownVisible(!mobileDropdownVisible)
                        }>
                        <span className='sr-only'>Open main menu</span>
                        <svg
                            className='w-5 h-5'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 17 14'>
                            <path
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M1 1h15M1 7h15M1 13h15'
                            />
                        </svg>
                    </button>
                </div>
                {/* Mobile Dropdown Content */}
                <div
                    ref={mobileDropdownRef as React.RefObject<HTMLDivElement>}
                    className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
                        mobileDropdownVisible ? '' : 'hidden'
                    }`}>
                    <ul className='flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
                        {routes.map((route, index) => (
                            <li key={index}>
                                <Link
                                    to={route.path}
                                    role={'Navbar-' + route.title}
                                    className={`block py-2 pl-3 pr-4 ${
                                        location.pathname === route.path
                                            ? 'text-white bg-green rounded md:bg-transparent md:text-green md:p-0 md:dark:text-blue-500'
                                            : 'blueGray rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                                    }`}>
                                    {route.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
