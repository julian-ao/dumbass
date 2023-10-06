import FilterAltIcon from '@mui/icons-material/FilterAlt';
import GradeIcon from '@mui/icons-material/Grade';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
  } from '@chakra-ui/react'

export default function Filter(){
    return (
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<FilterAltIcon/>}
                variant='outline'
            />
            <MenuList>
                <MenuItem
                    icon={<GradeIcon />}
                    _hover={{
                        background: 'inherit', 
                    }}
                    _focus={{
                        background: 'inherit', 
                    }}
                >
                    Rating
                </MenuItem>
                <MenuItem
                    icon={<SortByAlphaIcon />}
                    _hover={{
                        background: 'inherit', 
                    }}
                    _focus={{
                        background: 'inherit', 
                    }}
                >
                    Alphabetical
                </MenuItem>
            </MenuList>
        </Menu>
    );
}