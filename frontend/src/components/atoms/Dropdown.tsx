import { useState, useRef, useEffect, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

type DropdownProps = {
    selectedFilter: string
    filterOptions: string[]
    onFilterChange: (newFilter: string) => void
    outsideSearchBar?: boolean
    title?: string
}

const Dropdown = (props: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const toggleDropdown = () => setIsOpen((prev) => !prev)

    const handleOptionClicked = (option: string) => {
        props.onFilterChange(option)
        setIsOpen(false)
    }

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
                <div className='text-xs mb-1 opacity-70'>{props.title}</div>
            )}
            <section className='h-full w-full'>
                <Menu.Button
                    onClick={toggleDropdown}
                    className={`${
                        props.outsideSearchBar
                            ? 'rounded-md shadow-sm w-40'
                            : 'w-24'
                    } inline-flex justify-center items-center h-full px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}>
                    <span className='block overflow-hidden text-ellipsis whitespace-nowrap'>
                        {props.selectedFilter}
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
                    className='absolute right-0 z-50 mt-1 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-full'>
                    <section className='py-1'>
                        {props.filterOptions.map((option) => (
                            <Menu.Item key={option}>
                                {({ active }) => (
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault()
                                            handleOptionClicked(option)
                                        }}
                                        className={`${
                                            active
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-700'
                                        } block px-4 py-2 text-sm w-full text-left`}>
                                        {option}
                                    </button>
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
