import { FaMusic } from 'react-icons/fa'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InputField from '../components/molecules/InputField'
import Button from '../components/molecules/Button'
import { customToast } from '../lib/utils'

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
            customToast('error', 'Wrong password or username')
            return
        }
        if (setUser) setUser()
        navigate('/')
        customToast('success', 'Successfully logged in')
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
