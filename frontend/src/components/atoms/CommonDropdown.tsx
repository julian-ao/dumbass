import { Fragment, ReactNode } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Text } from '@chakra-ui/react'

/**
 * Type definition for the props of the CommonDropdown component.
 *
 * @typedef {Object} CommonDropdownProps
 *
 * @property {string} [selectedFilter] - Selected filter value to be displayed by default.
 * @property {string[]} filterOptions - A list of strings representing the available filter options.
 * @property {ReactNode[]} [optionIcons] - An optional list of React components (icons) to be displayed next to each filter option.
 * @property {(newFilter: string) => void} [onFilterChange] - A function that is called when a filter option is selected.
 * @property {string} [label] - Optional label text to be displayed in front of the selected filter value.
 * @property {ReactNode} [icon] - An optional icon component to be displayed in front of the label text.
 */
type CommonDropdownProps = {
    selectedFilter?: string
    filterOptions: string[]
    optionIcons?: ReactNode[]
    onFilterChange?: (newFilter: string) => void
    label?: string
    icon?: ReactNode
}

/**
 * CommonDropdown is a generic dropdown component that allows users to choose between different filter/sorting options.
 *
 * When a filter/sorting option is selected, the `onFilterChange` function will be called with the selected filter value as an argument.
 * If optionIcons are provided, an icon will be displayed next to each filter option.
 *
 * @param {CommonDropdownProps} props - Properties passed to the CommonDropdown component.
 * @param {string} props.selectedFilter - Selected filter value to be displayed by default.
 * @param {string[]} props.filterOptions - A list of strings representing the available filter options.
 * @param {ReactNode[]} props.optionIcons - An optional list of React components (icons) to be displayed next to each filter option.
 * @param {(newFilter: string) => void} props.onFilterChange - A function that is called when a filter option is selected.
 * @param {string} props.label - Optional label text to be displayed in front of the selected filter value.
 * @param {ReactNode} props.icon - An optional icon component to be displayed in front of the label text.
 */
const CommonDropdown = ({
    selectedFilter,
    filterOptions,
    optionIcons,
    onFilterChange,
    label = '',
    icon = <ChevronDownIcon className='ml-2 -mr-1 h-5 w-5' aria-hidden='true' />
}: CommonDropdownProps) => {
    return (
        <Menu as='div' className='relative inline-block text-left h-full'>
            <div className='h-full'>
                <Menu.Button className='inline-flex justify-center items-center h-full w-full rounded-md px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-offset-2'>
                    {icon}
                    {label ? <Text ml={2}>{label}</Text> : selectedFilter}
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'>
                <Menu.Items className='absolute left-0 z-10 mt-2 w-32 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5'>
                    <div className='py-1'>
                        {filterOptions.map((option, index) => (
                            <Menu.Item key={option}>
                                {({ active }) => (
                                    <a
                                        onClick={(e) => {
                                            e.preventDefault()
                                            if (onFilterChange) {
                                                // Check if onFilterChange is defined
                                                onFilterChange(option)
                                            }
                                        }}
                                        className={`${
                                            active
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-700'
                                        } flex items-center block px-4 py-2 text-sm`}>
                                        {optionIcons && optionIcons[index]}
                                        {option}
                                    </a>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default CommonDropdown
