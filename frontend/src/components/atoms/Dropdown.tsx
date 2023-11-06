import { useState, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

/**
 * Defines prop-types for the Dropdown component.
 *
 * @typedef {Object} DropdownProps
 *
 * @property {string} selectedFilter - The currently selected filter value.
 * @property {string[]} filterOptions - A list of available filter options.
 * @property {(newFilter: string) => void} onFilterChange - A function that is called when a filter option is selected, with the new filter as an argument.
 */
type DropdownProps = {
    selectedFilter: string
    filterOptions: string[]
    onFilterChange: (newFilter: string) => void
}

/**
 * The Dropdown component allows users to select an option from a list to filter data.
 *
 * When a user selects an option from the dropdown menu, the `onFilterChange` callback is called
 * with the selected filter option as an argument.
 *
 * @param {DropdownProps} props - Props passed to the Dropdown component.
 * @param {string} props.selectedFilter - The currently selected filter value.
 * @param {string[]} props.filterOptions - A list of available filter options.
 * @param {(newFilter: string) => void} props.onFilterChange - A function that is called when a filter option is selected, with the new filter as an argument.
 */
const Dropdown = ({
    selectedFilter,
    filterOptions,
    onFilterChange
}: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => setIsOpen(!isOpen)

    const handleOptionClicked = (option: string) => {
        onFilterChange(option)
        setIsOpen(false)
    }

    return (
        <Menu as='div' className='relative inline-block text-left h-full'>
            <section className='h-full'>
                <Menu.Button
                    onClick={toggleDropdown}
                    className='inline-flex justify-center items-center h-full w-full rounded-md px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
                    {selectedFilter}
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
                    className='absolute right-0 z-10 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    <section className='py-1'>
                        {filterOptions.map((option) => (
                            <Menu.Item key={option}>
                                {({ active }) => (
                                    <a
                                        href='#'
                                        onClick={(e) => {
                                            e.preventDefault()
                                            handleOptionClicked(option)
                                        }}
                                        className={`${
                                            active
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-700'
                                        } block px-4 py-2 text-sm cursor-pointer`}>
                                        {option}
                                    </a>
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
