import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import toast from 'react-hot-toast'
import InputField from '../components/molecules/InputField'
import Button from '../components/molecules/Button'

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
            <div className='flex h-4/5 sm:w-[32rem] w-4/5 flex-col justify-center px-8 py-10 my-10 rounded-lg md:px-20 bg-white'>
                <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                    <h2 className='text-center text-3xl font-bold leading-9 tracking-tight text-blueGray'>
                        Create an account
                    </h2>
                </div>

                <div className='mt-6 sm:mx-auto sm:w-full sm:max-w-sm'>
                    <form className='space-y-6' onSubmit={registerAccount}>
                        <InputField
                            id='username'
                            type='username'
                            title='Username'
                            value={username}
                            onChange={setUsername}
                            required
                        />
                        <InputField
                            id='email'
                            type='email'
                            title='Email'
                            value={email}
                            onChange={setEmail}
                            required
                        />
                        <InputField
                            id='password'
                            type='password'
                            title='Password'
                            value={password}
                            onChange={setPassword}
                            required
                        />
                        <InputField
                            id='confirmPassword'
                            type='password'
                            title='Confirm Password'
                            value={confirmPassword}
                            onChange={setConfirmPassword}
                            required
                        />
                        <Button title='Create Account' type='submit' />
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
