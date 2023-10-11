import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import InputField from '../components/molecules/InputField'
import Button from '../components/molecules/Button'
import { customToast } from '../lib/utils'

/**
 * RegisterPage component - A user interface for account registration
 *
 * This component provides form fields for user registration and performs
 * simple front-end validation (password matching). Upon successful validation,
 * it redirects users to the login page and provides a success toast notification.
 * 
 * @returns {JSX.Element}
 */
export default function RegisterPage(): JSX.Element {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    /**
     * registerAccount - Event handler for form submission
     *
     * This function is triggered upon form submission. It performs a simple
     * front-end validation check to ensure passwords match and provides
     * relevant toast notifications. Upon successful validation, it redirects
     * the user to the login page and provides a success toast notification.
     * 
     * @param {React.FormEvent} e - Form event
     */
    function registerAccount(e: React.FormEvent) {
        e.preventDefault()
        if (password !== confirmPassword) {
            customToast('error', 'The passwords does not match')
            return
        }
        navigate('/login')
        customToast('success', 'User successfully created')
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
