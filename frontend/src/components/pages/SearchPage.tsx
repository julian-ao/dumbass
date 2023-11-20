import { useEffect, useState } from 'react'
import { ArtistCardProps, SongCardProps } from '../molecules/ArtistSongCard'
import CardView from '../organisms/CardView'
import SearchBar from '../molecules/SearchBar'
import Breadcrumb from '../atoms/Breadcrumb'
import { useLocation } from 'react-router-dom'
import Pagination from '../molecules/Pagination'
import { Artist, Song } from '../../lib/types'
import { useSearchParams } from 'react-router-dom'
import Dropdown from '../atoms/Dropdown'
import { ClipLoader } from 'react-spinners'
import { useSearchPage } from '../../hooks/useSearchPage'

type CardProps = ArtistCardProps | SongCardProps

/**
 * `SearchPage` Component.
 *
 * This component serves as a search interface for the application. It allows users to search for songs or artists
 * and displays the results in a paginated card view. The search functionality is enhanced with sorting and filtering options.
 *
 * The component uses GraphQL queries to fetch search results based on the user's input, filter, and sort criteria.
 * The results are displayed using the `CardView` component, which shows either `ArtistCardProps` or `SongCardProps` depending on the search filter.
 * 
 * The `SearchBar` component is used to accept user input for search terms, and a `Dropdown` component provides options for sorting the search results.
 * The component also includes a `Pagination` element to navigate through search results spread across multiple pages.
 *
 * If no search term is provided, the component displays a prompt for the user to enter a search term.
 * In case of loading, a spinner is shown, and in the event of no results or an error, an appropriate message is displayed.
 *
 * @returns {JSX.Element} The rendered search page with search functionality and results.
 */
function SearchPage() {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)

    const term = queryParams.get('term')
    const filter = queryParams.get('filter')
    const sort = queryParams.get('sort')
    const [searchParams, setSearchParams] = useSearchParams()

    const validFilters = ['song', 'artist']
    const defaultFilter = 'song'
    const validSort = ['relevance', 'rating', 'alphabetical']
    const defaultSort = 'relevance'

    const filterFromURL = searchParams.get('filter') || defaultFilter
    const sortFromURL = searchParams.get('sort') || defaultSort

    const [selectedFilter, setSelectedFilter] = useState(
        validFilters.includes(filterFromURL) ? filterFromURL : defaultFilter
    )
    const [selectedSort, setSelectedSorting] = useState(
        validSort.includes(sortFromURL) ? sortFromURL : defaultSort
    )

    useEffect(() => {
        const newSearchParams = new URLSearchParams(searchParams)
        if (searchParams.get('filter') !== selectedFilter) {
            newSearchParams.set('filter', selectedFilter)
        }
        if (searchParams.get('sort') !== selectedSort) {
            newSearchParams.set('sort', selectedSort)
        }
        setSearchParams(newSearchParams, { replace: true })
    }, [selectedFilter, selectedSort, searchParams, setSearchParams])

    const [data, setData] = useState<CardProps[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const itemsPerPage = 12

    const {
        totalSongsData,
        totalArtistsData,
        artistsData,
        songsData,
        loading
    } = useSearchPage(term, filter, sort, itemsPerPage, currentPage)

    useEffect(() => {
        if (filter === 'artist' && artistsData) {
            const artistCardData: ArtistCardProps[] =
                artistsData.getArtistsOnName.map((artist: Artist) => ({
                    cardType: 'artist',
                    id: artist.id,
                    title: artist.name,
                    alternateNames: artist.alternate_names,
                    imageUrl: artist.image_url,
                    rating: artist.average_rating,
                    numOfRatings: artist.number_of_ratings
                }))
            setData(artistCardData)
        } else if (filter === 'song' && songsData) {
            const songCards: SongCardProps[] = songsData.getSongsOnTitle.map(
                (song: Song) => ({
                    cardType: 'song',
                    id: song.id,
                    title: song.title,
                    artist: song.artist_names,
                    imageUrl: song.header_image_url,
                    rating: song.average_rating,
                    numOfRatings: song.number_of_ratings,
                    releaseDate: song.release_date
                })
            )
            setData(songCards)
        }
    }, [filter, artistsData, songsData])

    useEffect(() => {
        let totalItems = 0
        if (filter === 'artist' && totalArtistsData) {
            totalItems = totalArtistsData.countArtists
        } else if (filter === 'song' && totalSongsData) {
            totalItems = totalSongsData.countSongs
        }
        setTotalPages(Math.ceil(totalItems / itemsPerPage))
    }, [totalArtistsData, totalSongsData, itemsPerPage, filter])

    useEffect(() => {
        setCurrentPage(1)
    }, [term, selectedFilter, selectedSort])

    const isTermProvided = term !== null && term.trim() !== ''

    if (!isTermProvided) {
        return (
            <main className='w-full'>
                <Breadcrumb items={[{ name: 'Search' }]} />
                <header className='flex justify-center'>
                    <SearchBar
                        filterOptions={validFilters}
                        selectedFilter={selectedFilter}
                        selectedSort={selectedSort}
                        onFilterChange={(newFilter) =>
                            setSelectedFilter(newFilter)
                        }
                    />
                </header>
                <section className='flex text-xl justify-center w-full text-gray-500'>
                    Please enter a search term...
                </section>
            </main>
        )
    }

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
                    filterOptions={validFilters}
                    selectedFilter={selectedFilter}
                    selectedSort={selectedSort}
                    onFilterChange={(newFilter) => setSelectedFilter(newFilter)}
                />
            </header>
            <section className='flex justify-center mt-5 mb-10'>
                {data.length > 0 && (
                    <Dropdown
                        selectedFilter={selectedSort}
                        filterOptions={validSort}
                        onFilterChange={(newSorting) =>
                            setSelectedSorting(newSorting)
                        }
                        outsideSearchBar
                        title='Sort by'
                    />
                )}
            </section>
            <section className='w-full flex flex-col justify-center items-center'>
                <section className='w-full flex justify-center'>
                    {loading ? (
                        <div className='absolute h-96 flex items-center'>
                            <ClipLoader color={'#8fc0a9'} size={100} />
                        </div>
                    ) : (
                        <CardView
                            cardData={data}
                            customErrorMessage='No results...'
                        />
                    )}
                </section>
                <Pagination
                    onClickPrevious={() => setCurrentPage(currentPage - 1)}
                    onClickNext={() => setCurrentPage(currentPage + 1)}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    isLoading={loading}
                />
            </section>
        </main>
    )
}

export default SearchPage
