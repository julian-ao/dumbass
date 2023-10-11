import { faMusic } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { customToast } from '../../lib/utils'

const routes = [
    { path: '/explore', title: 'Explore' },
    { path: '/favorites', title: 'Favorites' },
    { path: '/login', title: 'Login' },
    { path: '/register', title: 'Register' }
]

type NavbarProps = {
    userLoggedIn?: boolean
    signOut?: () => void
}

const Navbar = ({ userLoggedIn, signOut }: NavbarProps) => {
    const location = useLocation()
    const userDropdownRef = useRef<HTMLDivElement | null>(null)

    const [userDropdownVisible, setUserDropdownVisible] = useState(false)
    const [mobileDropdownVisible, setMobileDropdownVisible] = useState(false)

    const userPhoto =
        'https://media.licdn.com/dms/image/D5603AQF-WLbY91FVmg/profile-displayphoto-shrink_800_800/0/1666367680104?e=2147483647&v=beta&t=eSYLHzEK41R_m1U3Tub7KhJ9RYWSQkqECSqFy95VMFo'
    const userName = 'Sander Skogh Linnerud'
    const userMail = 'sander@linnerud.no'

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

    const handleSignOut = () => {
        if (signOut) signOut()
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
                            DrumBass
                        </span>
                    </Link>
                    <div
                        className={`absolute top-[4rem] w-screen z-50 md:items-center md:static md:flex md:w-screen md:order-1 ${
                            mobileDropdownVisible ? '' : 'hidden'
                        }`}>
                        <ul className='flex flex-col w-full p-4 md:p-0 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white'>
                            {routes.slice(0, 4).map((route, index) => (
                                <li
                                    key={index}
                                    className={
                                        index >= 2
                                            ? !userLoggedIn
                                                ? 'md:hidden'
                                                : 'hidden'
                                            : ''
                                    }>
                                    <Link
                                        to={route.path}
                                        onClick={() =>
                                            setMobileDropdownVisible(false)
                                        }
                                        role={'Navbar-' + route.title}
                                        className={`block py-4 pl-4 pr-4 text-sm font-semibold md:hover:bg-white hover:bg-gray-100 ${
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
                            {routes.slice(2, 4).map((route, index) => (
                                <li key={index}>
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
                            className='flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300'
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
                            <span className='block text-sm text-gray-900'>
                                {userName}
                            </span>
                            <span className='block text-sm text-gray-500 truncate'>
                                {userMail}
                            </span>
                        </div>
                        <ul className='py-2'>
                            <li>
                                <div
                                    onClick={handleSignOut}
                                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer'>
                                    Sign out
                                </div>
                            </li>
                        </ul>
                    </div>
                    <button
                        type='button'
                        className='inline-flex items-center w-12 h-12 justify-center text-sm text-blueGray rounded-lg md:hidden hover:bg-gray-100 focus:outline-none'
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
