import { Fragment, ReactNode } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Flex, IconButton, MenuItem as ChakraMenuItem, MenuList, Text } from '@chakra-ui/react';

type CommonDropdownProps = {
    selectedFilter?: string;
    filterOptions: string[];
    optionIcons?: ReactNode[];
    onFilterChange?: (newFilter: string) => void;  // Made optional with '?'
    label?: string;
    icon?: ReactNode;
};

const CommonDropdown = ({
    selectedFilter,
    filterOptions,
    optionIcons,
    onFilterChange,
    label = '',
    icon = <ChevronDownIcon className='ml-2 -mr-1 h-5 w-5' aria-hidden='true' />,
}: CommonDropdownProps) => {
    return (
        <Menu as='div' className='relative inline-block text-left h-full'>
            <div className='h-full'>
                <Menu.Button
                    className='inline-flex justify-center items-center h-full w-full rounded-md px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-offset-2'
                >
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
                leaveTo='transform opacity-0 scale-95'
            >
                <Menu.Items className='absolute left-0 z-10 mt-2 w-32 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    <div className='py-1'>
                        {filterOptions.map((option, index) => (
                            <Menu.Item key={option}>
                                {({ active }) => (
                                    <a
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (onFilterChange) {  // Check if onFilterChange is defined
                                                onFilterChange(option);
                                            }
                                        }}
                                        className={`${
                                            active
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-700'
                                        } flex items-center block px-4 py-2 text-sm`}
                                    >
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
    );
};

export default CommonDropdown;
