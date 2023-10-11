import { Fragment, ReactNode } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Text } from '@chakra-ui/react'


/**
 * Typedefinisjon for propsene til CommonDropdown-komponenten.
 * 
 * @typedef {Object} CommonDropdownProps
 * 
 * @property {string} [selectedFilter] - Valgt filterverdi som skal vises som default.
 * @property {string[]} filterOptions - En liste av strenger som representerer de tilgjengelige filteralternativene.
 * @property {ReactNode[]} [optionIcons] - En valgfri liste av React-komponenter (ikoner) som skal vises ved siden av hver filteralternativ.
 * @property {(newFilter: string) => void} [onFilterChange] - En funksjon som kalles når et filteralternativ blir valgt.
 * @property {string} [label] - En valgfri labeltekst som skal vises foran den valgte filterverdien.
 * @property {ReactNode} [icon] - En valgfri ikon-komponent som skal vises foran labelteksten.
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
 * CommonDropdown er en generisk dropdown-komponent som tillater brukere å velge mellom ulike filter/sortering-alternativer.
 * 
 * Når et filter/sortering-alternativ blir valgt, vil `onFilterChange` funksjonen bli kalt med den valgte filterverdien som argument.
 * Hvis optionIcons blir gitt, vil et ikon bli vist ved siden av hver filteralternativ.
 * 
 * @param {CommonDropdownProps} props - Egenskaper som sendes til CommonDropdown-komponenten.
 * @param {string} props.selectedFilter - Valgt filterverdi som skal vises som default.
 * @param {string[]} props.filterOptions - En liste av strenger som representerer de tilgjengelige filteralternativene.
 * @param {ReactNode[]} props.optionIcons - En valgfri liste av React-komponenter (ikoner) som skal vises ved siden av hver filteralternativ.
 * @param {(newFilter: string) => void} props.onFilterChange - En funksjon som kalles når et filteralternativ blir valgt.
 * @param {string} props.label - En valgfri labeltekst som skal vises foran den valgte filterverdien.
 * @param {ReactNode} props.icon - En valgfri ikon-komponent som skal vises foran labelteksten.
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
                <Menu.Button className='inline-flex justify-center items-center h-full w-full rounded-md px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-offset-2'>
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
                <Menu.Items className='absolute left-0 z-10 mt-2 w-32 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
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
