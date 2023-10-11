import {
    Flex,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text
} from '@chakra-ui/react'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import PersonIcon from '@mui/icons-material/Person'
import MusicNoteIcon from '@mui/icons-material/MusicNote'

export const Filter = () => {
    return (
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label='Options'
                variant='outline'
                px={4}
                bg={'white'}
                boxShadow={'sm'}
                zIndex={10}>
                <Flex align='center' justify='center'>
                    <FilterAltIcon />
                    <Text ml={2}>Filter by</Text>
                </Flex>
            </MenuButton>
            <MenuList>
                <MenuItem
                    icon={<PersonIcon />}
                    _hover={{ background: 'inherit' }}
                    _focus={{ background: 'inherit' }}>
                    Artists
                </MenuItem>
                <MenuItem
                    icon={<MusicNoteIcon />}
                    _hover={{ background: 'inherit' }}
                    _focus={{ background: 'inherit' }}>
                    Songs
                </MenuItem>
            </MenuList>
        </Menu>
    )
}
