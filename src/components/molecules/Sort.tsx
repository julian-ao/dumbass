import SortIcon from '@mui/icons-material/Sort';
import GradeIcon from '@mui/icons-material/Grade';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    Flex,
    Text
} from '@chakra-ui/react';

export default function Filter() {
    return (
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label='Options'
                variant='outline'
                px={4} // Add some padding to give space for the text
            >
                {/* Add Flex container to hold icon and text */}
                <Flex align="center" justify="center">
                    <SortIcon />
                    <Text ml={2}>Sort by</Text>
                </Flex>
            </MenuButton>
            <MenuList>
                <MenuItem
                    icon={<GradeIcon />}
                    _hover={{ background: 'inherit' }}
                    _focus={{ background: 'inherit' }}
                >
                    Rating
                </MenuItem>
                <MenuItem
                    icon={<SortByAlphaIcon />}
                    _hover={{ background: 'inherit' }}
                    _focus={{ background: 'inherit' }}
                >
                    Alphabetical
                </MenuItem>
            </MenuList>
        </Menu>
    );
}
