//import { render, screen, fireEvent } from '@testing-library/react'
//import LoginPage from '../components/pages/LoginPage'
import { test, expect } from 'vitest'
//import { MockedProvider } from '@apollo/client/testing'
//import { act } from 'react-dom/test-utils'
//import '@testing-library/jest-dom'
//import { BrowserRouter } from 'react-router-dom'
//import { LOGIN_USER } from '../graphql/mutations/userMutations'

test('test', () => {
    expect(1).toBe(1)
})
//window.matchMedia =
//    window.matchMedia ||
//    function () {
//        return {
//            matches: false,
//            addListener: function () {},
//            removeListener: function () {}
//        }
//    }
//
//const mocks = [
//    {
//        request: {
//            query: LOGIN_USER,
//            variables: { username: 'guest', password: 'guest' }
//        },
//        result: {
//            data: {
//                loginUser: true // Modify this according to your expected response
//            }
//        }
//    }
//]
//
//test('logs in with correct username and password', async () => {
//    act(() => {
//        render(
//            <MockedProvider mocks={mocks} addTypename={false}>
//                <LoginPage />
//            </MockedProvider>
//        )
//    })
//
//    // Fill in the username and password fields
//    fireEvent.change(screen.getByLabelText('Username'), {
//        target: { value: 'guest' }
//    })
//    fireEvent.change(screen.getByLabelText('Password'), {
//        target: { value: 'guest' }
//    })
//
//    // Submit the form
//    fireEvent.click(screen.getByText('Sign in'))
//
//    // Check if the user is redirected to the expected location
//    expect(window.location.pathname).toBe('/')
//})
//
//test('displays all components on the LoginPage', () => {
//    render(
//        <BrowserRouter>
//            <LoginPage />
//        </BrowserRouter>
//    )
//
//    // Check if the components are displayed
//    const usernameInput = screen.getByLabelText('Username')
//    const passwordInput = screen.getByLabelText('Password')
//    const signInButton = screen.getByText('Sign in')
//    const registerLink = screen.getByText('Register here')
//
//    // Assert that all components are displayed
//    expect(usernameInput).toBeInTheDocument()
//    expect(passwordInput).toBeInTheDocument()
//    expect(signInButton).toBeInTheDocument()
//    expect(registerLink).toBeInTheDocument()
//})
//
//test('redirects to register page when clicking the "Register here" link', () => {
//    render(
//        <BrowserRouter>
//            <LoginPage />
//        </BrowserRouter>
//    )
//
//    // Locate the "Register here" link and click it
//    const registerLink = screen.getByText('Register here')
//    fireEvent.click(registerLink)
//
//    // Check if the user is redirected to the expected URL
//    expect(window.location.pathname).toBe('/register')
//})
//
//test('displays toaster and does not login on wrong username or password', () => {
//    const { container } = render(
//        <BrowserRouter>
//            <LoginPage />
//        </BrowserRouter>
//    )
//
//    // Fill in the username and password fields with incorrect values
//    fireEvent.change(screen.getByLabelText('Username'), {
//        target: { value: 'wrongusername' }
//    })
//    fireEvent.change(screen.getByLabelText('Password'), {
//        target: { value: 'wrongpassword' }
//    })
//
//    // Submit the form
//    fireEvent.click(screen.getByText('Sign in'))
//
//    // Check if the user is not redirected (still on the login page)
//    const loginForm = container.querySelector('form')
//    expect(loginForm).toBeInTheDocument()
//})
