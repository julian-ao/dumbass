import Button from '../atoms/Button'
import Breadcrumb from '../atoms/Breadcrumb'

/**
 * @typedef {Object} ErrorPageType
 * @property {string} title - The title to display on the error page, typically indicating the nature of the error.
 * @property {string} subTitle - A subtitle providing additional information about the error.
 * @property {string} description - A more detailed description of the error or guidance for the user.
 * @property {string} buttonText - The text to display on the button.
 * @property {() => void} buttonFunction - The function to execute when the button is clicked, often used for navigation.
 */
export type ErrorPageType = {
    title: string
    subTitle: string
    description: string
    buttonText: string
    buttonFunction: () => void
}

/**
 * `ErrorPage` Component.
 *
 * This component renders an error page layout which can be used to display various types of error messages to the user.
 * It includes a title, subtitle, and detailed description of the error, along with a button that can perform an action, such as navigating back to a safe page.
 * The page also includes a breadcrumb component indicating that the user is on an 'Unknown Page'.
 *
 * @param {ErrorPageType} props - Properties to configure the error page.
 * @returns {JSX.Element} The rendered error page with the provided title, subtitle, description, and button.
 */
export const ErrorPage = (props: ErrorPageType) => {
    return (
        <main>
            <Breadcrumb
                items={[
                    {
                        name: 'Unknown Page'
                    }
                ]}
            />
            <section className='flex items-center pt-10 px-5 sm:pt-32 sm:px-10 flex-col text-gray-500 text-center'>
                <header>
                    <h1 className='text-7xl'>{props.title}</h1>
                    <h2 className='text-3xl my-4'>{props.subTitle}</h2>
                </header>

                <section className='max-w-xl mb-10'>
                    <p>{props.description}</p>
                </section>
                <section className='w-1/6 min-w-fit'>
                    <Button
                        title={props.buttonText}
                        type='button'
                        onClick={() => props.buttonFunction()}
                    />
                </section>
            </section>
        </main>
    )
}
