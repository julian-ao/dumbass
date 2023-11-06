import { useState } from 'react'
import SortIcon from '@mui/icons-material/Sort'
import GradeIcon from '@mui/icons-material/Grade'
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import PersonIcon from '@mui/icons-material/Person'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import { ArtistCardProps, SongCardProps } from '../molecules/ArtistSongCard'
import CardView from '../organisms/CardView'
import CommonDropdown from '../atoms/CommonDropdown'
import CommonSearchBar from '../molecules/CommonSearchBar'
import Breadcrumb from '../atoms/Breadcrumb'
import Pagination from '../molecules/Pagination'

/**
 * SearchPage component to render and handle search functionality,
 * filtering and sorting for artists and songs.
 */
function SearchPage() {
    const FiftycentProps = {
        cardType: 'artist',
        imageUrl:
            'https://www.uka.no/uploads/cache/66/e7/66e75771d31a087bd8754021b203d98c.jpg',
        title: '50 Cent',
        alternateNames: ['Fiddy', 'Boo Boo'],
        rating: 4.5,
        numOfRatings: 1000000
    } as ArtistCardProps

    const InDaClubProps = {
        cardType: 'song',
        imageUrl:
            'https://upload.wikimedia.org/wikipedia/en/1/12/50_Cent_-_In_Da_Club_-_CD_cover.jpg',
        title: 'In Da Club',
        artist: '50 Cent',
        rating: 4.5,
        numOfRatings: 1000000,
        releaseDate: '2003-01-07'
    } as SongCardProps

    const allData = Array(20)
        .fill(InDaClubProps)
        .concat(Array(20).fill(FiftycentProps))

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 12

    const offset = currentPage * itemsPerPage
    const currentData = allData.slice(offset, offset + itemsPerPage)

    return (
        <main className='w-full'>
            <Breadcrumb
                items={[
                    {
                        name: 'Search'
                    }
                ]}
            />
            <header className='flex justify-center'>
                <CommonSearchBar className='w-4/5 mt-10 drop-shadow mb-10' />
            </header>
            <section className='flex justify-center gap-10 mb-10'>
                <CommonDropdown
                    label='Sort by'
                    icon={<SortIcon />}
                    filterOptions={['Rating', 'Alphabetical']}
                    optionIcons={[<GradeIcon />, <SortByAlphaIcon />]}
                />
                <CommonDropdown
                    label='Filter by'
                    icon={<FilterAltIcon />}
                    filterOptions={['Artists', 'Songs']}
                    optionIcons={[<PersonIcon />, <MusicNoteIcon />]}
                />
            </section>
            <section className='w-full flex flex-col justify-center items-center'>
                <section className='w-full flex justify-center'>
                    <CardView cardData={currentData} />
                </section>
                <Pagination
                    onClickPrevious={() => setCurrentPage(currentPage - 1)}
                    onClickNext={() => setCurrentPage(currentPage + 1)}
                    currentPage={currentPage}
                    totalPages={
                        5 /* Math.ceil((allData.length ?? 0) / itemsPerPage) */
                    }
                />
            </section>
        </main>
    )
}

export default SearchPage
