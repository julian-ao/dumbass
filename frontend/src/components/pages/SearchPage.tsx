import { useEffect, useState } from 'react'
import { ArtistCardProps, SongCardProps } from '../molecules/ArtistSongCard'
import CardView from '../organisms/CardView'
import SearchBar from '../molecules/SearchBar'
import Breadcrumb from '../atoms/Breadcrumb'
import Pagination from '../molecules/Pagination'
import { useSearchParams } from 'react-router-dom'
import Dropdown from '../atoms/Dropdown'

/**
 * SearchPage component to render and handle search functionality,
 * filtering and sorting for artists and songs.
 */
function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams()

    const validFilters = ['Song', 'Artist']
    const defaultFilter = 'Song'
    const validSorting = ['Rating', 'Alphabetical']
    const defaultSorting = 'Rating'

    const filterFromURL = searchParams.get('filter') || defaultFilter
    const sortingFromURL = searchParams.get('sorting') || defaultSorting

    const [selectedFilter, setSelectedFilter] = useState(
        validFilters.includes(filterFromURL) ? filterFromURL : defaultFilter
    )
    const [selectedSorting, setSelectedSorting] = useState(
        validSorting.includes(sortingFromURL) ? sortingFromURL : defaultSorting
    )

    useEffect(() => {
        const newSearchParams = new URLSearchParams(searchParams)
        if (searchParams.get('filter') !== selectedFilter) {
            newSearchParams.set('filter', selectedFilter)
        }
        if (searchParams.get('sorting') !== selectedSorting) {
            newSearchParams.set('sorting', selectedSorting)
        }
        setSearchParams(newSearchParams, { replace: true })
    }, [selectedFilter, selectedSorting, searchParams, setSearchParams])

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
                <SearchBar
                    className='w-4/5 mt-10 drop-shadow mb-5'
                    filterOptions={['Song', 'Artist']}
                    selectedFilter={selectedFilter}
                    onFilterChange={(newFilter) => setSelectedFilter(newFilter)}
                />
            </header>
            <section className='flex justify-center mb-10'>
                <Dropdown
                    selectedFilter={selectedSorting}
                    filterOptions={validSorting}
                    onFilterChange={(newSorting) =>
                        setSelectedSorting(newSorting)
                    }
                    outsideSearchBar
                    title='Sort by'
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
                    totalPages={5}
                />
            </section>
        </main>
    )
}

export default SearchPage
