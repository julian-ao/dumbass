import Button from '../atoms/Button'
import Breadcrumb from '../atoms/Breadcrumb'

/**
 * NotFoundPage component - A user-friendly error page for routing failures
 *
 * This component is displayed when the user tries to navigate to a route that does not exist.
 * It provides an error message and a button to navigate back to the homepage.
 */

export type ErrorPageType = {
    title: string
    subTitle: string
    description: string
    buttonText: string
    buttonFunction: () => void
}

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
