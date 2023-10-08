import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function RegisterPage(): JSX.Element {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    function registerAccount(e: React.FormEvent) {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error('The passwords does not match', {
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
        navigate('/login')
        toast.success('User successfully created', {
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
                    <h2 className='text-center text-3xl font-bold leading-9 tracking-tight text-blueGray'>
                        Create an user account
                    </h2>
                </div>

                <div className='mt-6 sm:mx-auto sm:w-full sm:max-w-sm'>
                    <form className='space-y-6' onSubmit={registerAccount}>
                        <div>
                            <label
                                htmlFor='username'
                                className='block text-sm font-medium leading-6 text-blueGray'>
                                Username
                            </label>
                            <div className='mt-1'>
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
                                    className='block w-full h-12 rounded-md border-0 pl-2 text-blueGray shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-red focus:outline-none sm:text-sm sm:leading-6'
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor='email'
                                className='block text-sm font-medium leading-6 text-blueGray'>
                                Email
                            </label>
                            <div className='mt-1'>
                                <input
                                    id='email'
                                    name='email'
                                    type='email'
                                    autoComplete='email'
                                    placeholder='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                            <div className='mt-1'>
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
                            <div className='flex items-center justify-between'>
                                <label
                                    htmlFor='password'
                                    className='block text-sm font-medium leading-6 text-blueGray'>
                                    Confirm password
                                </label>
                            </div>
                            <div className='mt-2'>
                                <input
                                    id='confirmPassword'
                                    name='confirmPassword'
                                    type='confirmPassword'
                                    placeholder='Confirm password'
                                    autoComplete='current-password'
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
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
                                Create Account
                            </button>
                        </div>
                    </form>

                    <p className='mt-10 text-center text-sm text-blueGray'>
                        Already have an account?
                        <a
                            onClick={() => navigate('/login')}
                            className='ml-2 font-semibold leading-6 text-green hover:cursor-pointer'>
                            Login here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
