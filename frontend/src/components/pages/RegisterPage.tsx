import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import InputField from '../atoms/InputField'
import Button from '../atoms/Button'
import { customToast } from '../../lib/utils'
import { ADD_USER } from '../../graphql/mutations/userMutations'
import { useMutation } from '@apollo/client'

/**
 * `RegisterPage` Component.
 *
 * This component presents a registration form for creating a new user account. 
 * It includes input fields for username, password, and password confirmation, along with a submit button.
 * The form performs validation to ensure that the entered passwords match.
 *
 * Upon form submission, a GraphQL mutation is used to attempt creating a new user. 
 * Success or failure feedback is provided to the user through custom toast messages.
 * On successful account creation, the user is navigated to the login page.
 * In case of errors such as a username conflict, an appropriate error message is displayed.
 *
 * The page also provides a link to the login page for users who already have an account.
 *
 * @returns {JSX.Element} The rendered registration page with a form for creating a new user account.
 */
export default function RegisterPage(): JSX.Element {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [addUser] = useMutation(ADD_USER)

    /**
     * Handles the registration form submission.
     * Validates the form data and uses the `ADD_USER` mutation for creating a new user.
     *
     * @param {React.FormEvent} e - The form event.
     */
    async function registerAccount(e: React.FormEvent) {
        e.preventDefault()
        if (password !== confirmPassword) {
            customToast('error', 'The passwords does not match')
            return
        }
        try {
            const { data } = await addUser({
                variables: { username, password }
            })

            if (data.addUser) {
                customToast('success', 'User successfully created')
                navigate('/login')
            } else {
                customToast('error', 'Failed to create the user')
            }
        } catch (error) {
            customToast('error', 'Username is already taken')
        }
    }

    return (
        <main className='w-screen flex justify-center'>
            <section className='flex h-4/5 sm:w-[32rem] w-4/5 flex-col justify-center px-8 py-10 my-10 rounded-lg md:px-20 bg-white'>
                <header className='sm:mx-auto sm:w-full sm:max-w-sm'>
                    <h2 className='text-center text-3xl font-bold leading-9 tracking-tight text-blueGray'>
                        Create an account
                    </h2>
                </header>

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

                    <footer className='mt-10 text-center text-sm text-blueGray'>
                        Already have an account?
                        <button
                            onClick={() => navigate('/login')}
                            className='ml-2 font-semibold leading-6 text-green hover:cursor-pointer'>
                            Login here
                        </button>
                    </footer>
                </div>
            </section>
        </main>
    )
}
