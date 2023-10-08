import { FaMusic } from 'react-icons/fa'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

type LoginPageProps = {
    setUser?: () => void
}

export default function LoginPage({ setUser }: LoginPageProps): JSX.Element {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function loginUser(e: React.FormEvent) {
        e.preventDefault()

        if (password !== 'guest' || username !== 'guest') {
            toast.error('Wrong password or username', {
                style: {
                    padding: '14px',
                    color: '#696d7d'
                },
                iconTheme: {
                    primary: 'red',
                    secondary: '#FFFAEE'
                }
            })
            return
        }
        if (setUser) setUser()
        navigate('/')
        toast.success('Successfully logged in', {
            style: {
                padding: '14px',
                color: '#696d7d'
            },
            iconTheme: {
                primary: '#8fc0a9',
                secondary: '#FFFAEE'
            }
        })
    }

    return (
        <div className='w-screen flex justify-center'>
            <div className='flex h-4/5 sm:w-[32rem] w-4/5 flex-col justify-center px-8 py-10 mt-10 rounded-lg md:px-20 bg-white'>
                <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                    <div className='flex items-center justify-center'>
                        <FaMusic size={60} color='#8FC0A9' />
                    </div>
                    <h2 className='mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-blueGray'>
                        Sign in to your account
                    </h2>
                </div>

                <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                    <form className='space-y-6' onSubmit={loginUser}>
                        <div>
                            <label
                                htmlFor='username'
                                className='block text-sm font-medium leading-6 text-blueGray'>
                                Username
                            </label>
                            <div className='mt-2'>
                                <input
                                    id='username'
                                    name='username'
                                    type='username'
                                    autoComplete='username'
                                    placeholder='Username'
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    required
                                    className='block w-full h-12 rounded-md border-0 py-1.5 pl-2 text-blueGray shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-red focus:outline-none sm:text-sm sm:leading-6'
                                />
                            </div>
                        </div>

                        <div>
                            <div className='flex items-center justify-between'>
                                <label
                                    htmlFor='password'
                                    className='block text-sm font-medium leading-6 text-blueGray'>
                                    Password
                                </label>
                            </div>
                            <div className='mt-2'>
                                <input
                                    id='password'
                                    name='password'
                                    type='password'
                                    placeholder='Password'
                                    autoComplete='current-password'
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                    className='block w-full h-12 rounded-md border-0 py-1.5 pl-2 text-blueGray shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6'
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type='submit'
                                className='flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-8 text-white shadow-[0_4px_9px_-4px_#8FC0A9]'
                                style={{
                                    background:
                                        'linear-gradient(to right, #C8D5B9, #8FC0A9, #68B0AB)'
                                }}>
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className='mt-10 text-center text-sm text-blueGray'>
                        Don't have an account?
                        <a
                            onClick={() => navigate('/register')}
                            className='ml-2 font-semibold leading-6 text-green hover:cursor-pointer'>
                            Register here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
