import { faMusic } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { customToast } from '../../lib/utils'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'
import { setUserLogout } from '../../redux/actions/userActions'

const mainRoutes = [
    { path: '/search', title: 'Search' },
    { path: '/favorites', title: 'Favorites' }
]

const authRoutes = [
    { path: '/login', title: 'Login' },
    { path: '/register', title: 'Register' }
]

/**
 * `Navbar` Component.
 *
 * A navigation bar for the application, providing links to main routes and user authentication routes.
 * The navigation bar adapts to display different content based on whether the user is logged in or not.
 * It features a responsive design, offering a mobile-friendly dropdown menu for smaller screens.
 *
 * The component includes a user dropdown menu for logged-in users, allowing them to sign out.
 * It also handles the display of active route highlighting and provides an option for mobile users to toggle the visibility of the menu.
 *
 * @returns {JSX.Element} The rendered Navbar component.
 */
const Navbar = () => {
    const location = useLocation()
    const userDropdownRef = useRef<HTMLDivElement | null>(null)

    const [userDropdownVisible, setUserDropdownVisible] = useState(false)
    const [mobileDropdownVisible, setMobileDropdownVisible] = useState(false)

    const userPhoto = '/project2/avatar.png'
    const userLoggedIn = useSelector((state: RootState) => state.user.loggedIn)
    const userName = useSelector((state: RootState) => state.user.username)
    const dispatch = useDispatch()

    /**
     * Handles outside click for user dropdown menu to close it when clicking outside.
     */
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                userDropdownRef.current &&
                !userDropdownRef.current.contains(event.target as Node)
            ) {
                setUserDropdownVisible(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    /**
     * Handles user sign out. Dispatches an action to update the user's state in Redux and clears user data from local storage.
     */
    const handleSignOut = () => {
        dispatch(setUserLogout()) // Dispatch Redux action to set user as logged out

        localStorage.setItem('username', '')
        localStorage.setItem('isLoggedIn', 'false')

        setUserDropdownVisible(false)
        customToast('success', 'Successfully signed out')
    }

    return (
        <nav className='bg-white border-gray-200 shadow'>
            <div className='w-screen-xl h-16 flex items-center md:pl-10'>
                <div className='flex w-1/2'>
                    <Link
                        to='/'
                        className='flex items-center gap-3 text-green mr-16 pl-4'>
                        <FontAwesomeIcon icon={faMusic} size='xl' />
                        <span
                            role='Navbar-title'
                            className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white text-blueGray'>
                            DumBass
                        </span>
                    </Link>
                    <div
                        className={`absolute top-[4rem] w-screen z-50 md:items-center md:static md:flex md:w-screen md:order-1 ${
                            mobileDropdownVisible ? '' : 'hidden'
                        }`}>
                        <ul className='flex gap-[1.5px] flex-col w-full md:p-0 border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-gray-100 md:bg-white md:shadow-none shadow'>
                            {mainRoutes.map((route) => (
                                <li key={route.title}>
                                    <Link
                                        to={route.path}
                                        onClick={() =>
                                            setMobileDropdownVisible(false)
                                        }
                                        role={'Navbar-' + route.title}
                                        className={`block py-4 pl-4 pr-4 text-sm font-semibold bg-white ${
                                            location.pathname === route.path
                                                ? 'text-green'
                                                : 'text-blueGray hover:text-green transition-all'
                                        }`}>
                                        {route.title}
                                    </Link>
                                </li>
                            ))}
                            {!userLoggedIn &&
                                authRoutes.map((route) => (
                                    <li key={route.title} className='md:hidden'>
                                        <Link
                                            to={route.path}
                                            onClick={() =>
                                                setMobileDropdownVisible(false)
                                            }
                                            role='navigation'
                                            className={`block py-4 pl-4 pr-4 text-sm font-semibold bg-white ${
                                                location.pathname === route.path
                                                    ? 'text-green'
                                                    : 'text-blueGray hover:text-green transition-all'
                                            }`}>
                                            {route.title}
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
                <div className='flex w-1/2 justify-end items-center relative pr-4 md:pr-10'>
                    {!userLoggedIn ? (
                        <ul className='flex space-x-8'>
                            {authRoutes.map((route) => (
                                <li key={route.title}>
                                    <Link
                                        to={route.path}
                                        role={'Navbar-' + route.title}
                                        className={`md:block py-2 pl-4 pr-4 text-sm font-semibold hidden ${
                                            location.pathname === route.path
                                                ? 'text-green'
                                                : 'text-blueGray hover:text-green transition-all'
                                        }`}>
                                        {route.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <button
                            type='button'
                            className='flex mr-3 text-sm rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 shadow-md'
                            onClick={() =>
                                setUserDropdownVisible(!userDropdownVisible)
                            }>
                            <span className='sr-only'>Open user menu</span>
                            <img
                                className='w-12 h-12 rounded-full hover:opacity-75 transition-all'
                                src={userPhoto}
                                alt='user photo'
                            />
                        </button>
                    )}
                    <div
                        ref={userDropdownRef}
                        className={`z-50 ${
                            userDropdownVisible ? '' : 'hidden'
                        } absolute top-12 right-5 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow`}>
                        <div className='px-4 py-3'>
                            <span className='block text-sm text-gray-500 truncate'>
                                Logged in as{' '}
                                <span className='font-medium'>{userName}</span>
                            </span>
                        </div>
                        <ul>
                            <li>
                                <button
                                    onClick={handleSignOut}
                                    className='rounded-b-lg transition-all w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer'>
                                    Sign out
                                </button>
                            </li>
                        </ul>
                    </div>
                    <button
                        type='button'
                        className='inline-flex items-center w-12 h-12 justify-center text-sm text-blueGray transition-all rounded-lg md:hidden hover:bg-gray-100'
                        onClick={() =>
                            setMobileDropdownVisible(!mobileDropdownVisible)
                        }>
                        <span className='sr-only'>Open main menu</span>
                        <svg
                            className='w-6 h-6'
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
            </div>
        </nav>
    )
}

export default Navbar
