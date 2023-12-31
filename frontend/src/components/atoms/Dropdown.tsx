import { useState, useRef, useEffect, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { titleCaseWord } from '../../lib/utils'

/**
 * @typedef {Object} DropdownProps
 * @property {string} selectedFilter - The currently selected filter option.
 * @property {string[]} filterOptions - An array of available filter options.
 * @property {(newFilter: string) => void} onFilterChange - Callback function to execute when a new filter option is selected.
 * @property {boolean} [outsideSearchBar] - Flag indicating if the dropdown is used outside a search bar context, affecting styling.
 * @property {string} [title] - Optional title to display above the dropdown.
 */
type DropdownProps = {
    selectedFilter: string
    filterOptions: string[]
    onFilterChange: (newFilter: string) => void
    outsideSearchBar?: boolean
    title?: string
    buttonId?: string
}

/**
 * The `Dropdown` component provides a customizable dropdown menu.
 *
 * This component displays a list of options and allows the user to select one. It manages its open/close state internally and calls
 * the `onFilterChange` prop when an option is selected. The component uses `titleCaseWord` from '../../lib/utils' to format the display
 * text of the options and the selected filter.
 *
 * The appearance of the dropdown can be modified by the `outsideSearchBar` prop, which changes the styling to suit different contexts.
 * If a `title` prop is provided, it is displayed above the dropdown.
 *
 * @param {DropdownProps} props - Properties to configure the dropdown.
 * @returns {JSX.Element} The rendered dropdown menu component.
 */
const Dropdown = (props: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    /**
     * Toggles the open/close state of the dropdown menu.
     */
    const toggleDropdown = () => setIsOpen((prev) => !prev)

    /**
     * Handles the selection of a filter option.
     * Closes the dropdown and invokes the onFilterChange callback with the selected option.
     *
     * @param {string} option - The selected filter option.
     */
    const handleOptionClicked = (option: string) => {
        props.onFilterChange(option)
        setIsOpen(false)
    }

    /**
     * Handles click events outside of the dropdown component.
     * Closes the dropdown if a click occurs outside of the component.
     */
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <Menu
            as='div'
            className='relative inline-block text-left h-full'
            ref={dropdownRef}>
            {props.title && (
                <div
                    role='button'
                    className='absolute -top-5 text-xs mb-1 opacity-70'>
                    {props.title}
                </div>
            )}
            <section className='h-full w-full'>
                <Menu.Button
                    onClick={toggleDropdown}
                    id={props.buttonId || 'filter-button'}
                    className={`${
                        props.outsideSearchBar
                            ? 'rounded-md shadow-sm w-40'
                            : 'w-24'
                    } inline-flex justify-center items-center h-full px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50  focus-visible:ring-2 focus-visible:ring-white transition-all focus-visible:ring-opacity-75`}>
                    <span className='block overflow-hidden text-ellipsis whitespace-nowrap'>
                        {titleCaseWord(props.selectedFilter)}
                    </span>
                    <ChevronDownIcon
                        className='ml-2 -mr-1 h-5 w-5'
                        aria-hidden='true'
                    />
                </Menu.Button>
            </section>
            <Transition
                as={Fragment}
                show={isOpen}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'>
                <Menu.Items
                    static
                    className='absolute right-0 z-50 mt-1 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5  w-full'>
                    <section className='py-1'>
                        {props.filterOptions.map((option, index) => (
                            <Menu.Item key={option}>
                                {({ active }) => (
                                    <>
                                        <button
                                            id={`sort-option-${index + 1}`}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                handleOptionClicked(option)
                                            }}
                                            className={`${
                                                active
                                                    ? 'bg-gray-100 text-gray-900'
                                                    : 'text-gray-700'
                                            } block px-4 py-2 text-sm w-full text-left`}
                                            data-testid={`dropdown-option-${option}`}>
                                            {titleCaseWord(option)}
                                        </button>
                                    </>
                                )}
                            </Menu.Item>
                        ))}
                    </section>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default Dropdown
