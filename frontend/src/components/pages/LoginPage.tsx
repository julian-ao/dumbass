import { FaMusic } from 'react-icons/fa'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InputField from '../atoms/InputField'
import Button from '../atoms/Button'
import { customToast } from '../../lib/utils'
import { LOGIN_USER } from '../../graphql/mutations/userMutations'
import { useMutation } from '@apollo/client'

/**
 * LoginPageProps - Properties type for LoginPage component
 *
 * @property {Function} setUser - Optional function to set the user in a higher component or context. Expected to be a function that accepts no arguments and returns void.
 */
type LoginPageProps = {
    setUser?: () => void
}

/**
 * LoginPage component - Used for user authentication
 *
 * Allows a user to log in by providing a username and a password. After successful login, navigation to the homepage is performed and a successful login message is shown. If the login fails, an error message is displayed.
 *
 * @param {LoginPageProps} props - Properties passed down from parent component. Optionally includes `setUser`.
 */
export default function LoginPage({ setUser }: LoginPageProps): JSX.Element {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loginUserMutation] = useMutation(LOGIN_USER)

    /**
     * loginUser - Event handler for form submission.
     *
     * Validates provided username and password. If credentials match (username: 'guest', password: 'guest'), navigates to the homepage and optionally invokes the `setUser` function if provided.
     * Shows a toast notification for successful login or failure.
     *
     * @param {React.FormEvent} e - Event object related to the form submission.
     */
    async function loginUser(e: React.FormEvent) {
        e.preventDefault()

        try {
            const result = await loginUserMutation({
                variables: { username, password }
            })
            const { data } = result

            if (data.loginUser) {
                customToast('success', 'Successfully logged in')
                if (setUser) {
                    setUser()
                }
                navigate('/')
            } else {
                customToast('error', 'An error occurred while logging in')
            }
        } catch (error) {
            console.log(JSON.stringify(error, null, 2))
            customToast('error', 'Wrong password or username')
        }
    }

    return (
        <div className='w-screen flex justify-center'>
            <div className='flex h-4/5 sm:w-[32rem] w-4/5 flex-col justify-center px-8 py-10 my-10 rounded-lg md:px-20 bg-white'>
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
                        <InputField
                            id='username'
                            type='username'
                            title='Username'
                            value={username}
                            onChange={setUsername}
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
                        <Button title={'Sign in'} type={'submit'} />
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
