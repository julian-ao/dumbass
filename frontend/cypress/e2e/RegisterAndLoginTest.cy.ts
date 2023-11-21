import Chance from 'chance'

describe('User Registration and Login', () => {
    const chance = new Chance()
    // Generate random username and password
    const randomUsername = chance.word({ length: 8 })
    const randomPassword = chance.string({
        length: 8,
        alpha: true,
        numeric: true
    })

    it('registers a new user and logs in', () => {
        // Visit the registration page
        cy.visit('http://localhost:5173/project2/register/')

        // Fill in the registration form
        cy.get('#username').type(randomUsername)
        cy.get('#password').type(randomPassword)
        cy.get('#confirmPassword').type(randomPassword)
        cy.get('form').submit()

        // Check if the registration was successful
        cy.contains('User successfully created').should('be.visible')

        // Fill in the login form
        cy.get('#username').type(randomUsername)
        cy.get('#password').type(randomPassword)
        cy.get('form').submit()

        // Check if the login was successful
        cy.contains('Successfully logged in').should('be.visible')

        // Sign out user
        cy.get('#user-menu-button').click()
        cy.get('#sign-out-button').click()
        cy.contains('Successfully signed out').should('be.visible')
    })

    it('fails to login with wrong password or username', () => {
        // Visit the login page
        cy.visit('http://localhost:5173/project2/login/')

        // Attempt to login with the wrong password
        cy.get('#username').type(randomUsername)
        cy.get('#password').type('wrongpassword')
        cy.get('form').submit()

        // Check if login fails and error message is displayed
        cy.contains('Wrong password or username').should('be.visible')

        // Attempt to login with the wrong username
        cy.visit('http://localhost:5173/project2/login/')
        cy.get('#username').type('wrongusername')
        cy.get('#password').type(randomPassword)
        cy.get('form').submit()

        // Check if login fails and error message is displayed
        cy.contains('Wrong password or username').should('be.visible')
    })

    afterEach(() => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8000/graphql',
            body: {
                query: `mutation ($username: String!) {
                    deleteUser(username: $username) {
                      username
                    }
                }`,
                variables: {
                    username: randomUsername
                }
            }
        })
    })
})

describe('Wrong user Registration', () => {
    const chance = new Chance()

    it('fails when passwords do not match', () => {
        cy.visit('http://localhost:5173/project2/register/')

        // Fill out the registration form with mismatched passwords
        const randomUsername = chance.word({ length: 8 })
        cy.get('#username').type(randomUsername)
        cy.get('#password').type('password123')
        cy.get('#confirmPassword').type('password456')

        // Submit the form
        cy.get('form').submit()

        // Assert that an error message is displayed
        cy.contains('The passwords does not match').should('be.visible')
    })

    it('fails when trying to create two users with the same username', () => {
        // Visit the registration page
        cy.visit('http://localhost:5173/project2/register/')

        // Fill out the registration form with taken username
        cy.get('#username').type('hei')
        cy.get('#password').type('password123')
        cy.get('#confirmPassword').type('password123')

        // Submit the form
        cy.get('form').submit()

        // Assert that the user is created successfully
        cy.contains('Username is already taken').should('be.visible')

        // Try to create another user with different passwords
        cy.visit('http://localhost:5173/project2/register/')
        const randomUsername = chance.word({ length: 8 })
        cy.get('#username').type(randomUsername)
        cy.get('#password').type('123')
        cy.get('#confirmPassword').type('456')
        cy.get('form').submit()

        // Assert that an error message is displayed
        cy.contains('The passwords does not match').should('be.visible')
    })
})
