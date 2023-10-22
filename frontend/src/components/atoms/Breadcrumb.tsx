import { Link } from 'react-router-dom'

/**
 * `BreadcrumbProps` is a type defining the properties expected by the `Breadcrumb` component.
 *
 * @typedef {Object} BreadcrumbProps
 *
 * @property {Object[]} items - An array of objects each representing a breadcrumb item.
 * @property {string} items.name - The name of the breadcrumb item to be displayed.
 * @property {string} [items.link] - The optional link for the breadcrumb item. When provided, the name will be rendered as a link.
 */
export type BreadcrumbProps = {
    items: {
        name: string
        link?: string
    }[]
}

/**
 * The `Breadcrumb` component renders a breadcrumb navigation element.
 *
 * @param {BreadcrumbProps} props - The properties object, adhering to the `BreadcrumbProps` type.
 *
 * @example
 * // Usage
 * <Breadcrumb items={[ { name: 'Search' } ]} />
 *
 * @returns {JSX.Element} The rendered breadcrumb navigation element.
 */
const Breadcrumb = (props: BreadcrumbProps) => {
    return (
        <div className='w-1/2 text-left'>
            <nav aria-label='breadcrumb' className='w-max'>
                <ol className='flex w-full flex-wrap items-center rounded-md bg-blue-gray-50 bg-opacity-60 py-2 px-4 text-696d7d'>
                    <li className='flex items-center font-sans text-sm font-normal leading-normal antialiased transition-colors'>
                        <Link
                            className='opacity-60 duration-300 hover:text-green'
                            to='/'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-4 w-4'
                                viewBox='0 0 20 20'
                                fill='currentColor'>
                                <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z'></path>
                            </svg>
                        </Link>
                        <span className='pointer-events-none mx-2 select-none font-sans text-sm font-normal leading-normal antialiased'>
                            /
                        </span>
                    </li>
                    {props.items.map((item, index) => (
                        <li className='flex  items-center font-sans text-sm font-normal leading-normal antialiased transition-colors'>
                            {item.link ? (
                                <Link
                                    className='hover:text-green transition-all'
                                    to={item.link}>
                                    <span>{item.name}</span>
                                </Link>
                            ) : (
                                <div className='opacity-70'>
                                    <span>{item.name}</span>
                                </div>
                            )}
                            {index !== props.items.length - 1 && (
                                <span className='pointer-events-none mx-2 select-none font-sans text-sm font-normal leading-normal antialiased'>
                                    /
                                </span>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </div>
    )
}

export default Breadcrumb
