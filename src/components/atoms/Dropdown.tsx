import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

/**
 * Definerer prop-types for Dropdown-komponenten.
 * 
 * @typedef {Object} DropdownProps
 * 
 * @property {string} selectedFilter - Den nåværende valgte filterverdien.
 * @property {string[]} filterOptions - En liste av tilgjengelige filteralternativer.
 * @property {(newFilter: string) => void} onFilterChange - En funksjon som kalles når et filteralternativ er valgt, med det nye filteret som argument.
 */
type DropdownProps = {
    selectedFilter: string
    filterOptions: string[]
    onFilterChange: (newFilter: string) => void
}

/**
 * Dropdown-komponenten tillater brukere å velge et alternativ fra en liste for å filtrere data.
 * 
 * Når en bruker velger et alternativ fra dropdown-menyen, blir `onFilterChange`-callbacken kalt
 * med det valgte filteralternativet som argument.
 * 
 * @param {DropdownProps} props - Props som sendes til Dropdown-komponenten.
 * @param {string} props.selectedFilter - Den nåværende valgte filterverdien.
 * @param {string[]} props.filterOptions - En liste av tilgjengelige filteralternativer.
 * @param {(newFilter: string) => void} props.onFilterChange - En funksjon som kalles når et filteralternativ er valgt, med det nye filteret som argument.
 */
const Dropdown = ({
    selectedFilter,
    filterOptions,
    onFilterChange
}: DropdownProps) => {
    return (
        <Menu as='div' className='relative inline-block text-left h-full'>
            <div className='h-full'>
                <Menu.Button className='inline-flex justify-center items-center h-full w-full rounded-md px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-offset-2'>
                    {selectedFilter}
                    <ChevronDownIcon
                        className='ml-2 -mr-1 h-5 w-5'
                        aria-hidden='true'
                    />
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
                <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    <div className='py-1'>
                        {filterOptions.map((option) => (
                            <Menu.Item key={option}>
                                {({ active }) => (
                                    <a
                                        onClick={(e) => {
                                            e.preventDefault()
                                            onFilterChange(option)
                                        }}
                                        className={`${
                                            active
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-700'
                                        } block px-4 py-2 text-sm`}>
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

export default Dropdown
