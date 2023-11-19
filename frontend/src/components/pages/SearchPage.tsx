import { useEffect, useState } from 'react'
import { ArtistCardProps, SongCardProps } from '../molecules/ArtistSongCard'
import CardView from '../organisms/CardView'
import SearchBar from '../molecules/SearchBar'
import Breadcrumb from '../atoms/Breadcrumb'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import {
    COUNT_ARTISTS,
    GET_ARTISTS_ON_NAME
} from '../../graphql/queries/artistQueries'
import {
    COUNT_SONGS,
    GET_SONGS_ON_TITLE
} from '../../graphql/queries/songQueries'
import Pagination from '../molecules/Pagination'
import { Artist, Song } from '../../lib/types'
import { useSearchParams } from 'react-router-dom'
import Dropdown from '../atoms/Dropdown'
import { ClipLoader } from 'react-spinners'

type CardProps = ArtistCardProps | SongCardProps

/**
 * SearchPage component to render and handle search functionality,
 * filtering and sorting for artists and songs.
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

    const { data: totalSongsData } = useQuery(COUNT_SONGS, {
        variables: { title: term },
        skip: filter !== 'song'
    })

    const { data: totalArtistsData } = useQuery(COUNT_ARTISTS, {
        variables: { name: term },
        skip: filter !== 'artist'
    })

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

    const { data: artistsData, loading: artistsLoading } = useQuery(
        GET_ARTISTS_ON_NAME,
        {
            variables: {
                name: term,
                limit: itemsPerPage,
                sort: sort,
                page: currentPage
            },
            skip: filter !== 'artist',
            fetchPolicy: 'cache-and-network'
        }
    )

    const { data: songsData, loading: songsLoading } = useQuery(
        GET_SONGS_ON_TITLE,
        {
            variables: {
                title: term,
                limit: itemsPerPage,
                sort: sort,
                page: currentPage
            },
            skip: filter !== 'song',
            fetchPolicy: 'cache-and-network'
        }
    )

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
                    {artistsLoading || songsLoading ? (
                        <div className='absolute h-96 flex items-center'>
                            <ClipLoader color={'#8fc0a9'} size={100} />
                        </div>
                    ) : (
                        <CardView cardData={data} />
                    )}
                </section>
                <Pagination
                    onClickPrevious={() => setCurrentPage(currentPage - 1)}
                    onClickNext={() => setCurrentPage(currentPage + 1)}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    isLoading={artistsLoading || songsLoading}
                />
            </section>
        </main>
    )
}

export default SearchPage
