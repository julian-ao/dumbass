import { useEffect, useState } from 'react'
import { ArtistCardProps, SongCardProps } from '../molecules/ArtistSongCard'
import CardView from '../organisms/CardView'
import SearchBar from '../molecules/SearchBar'
import Breadcrumb from '../atoms/Breadcrumb'
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ARTISTS_ON_NAME } from '../../graphql/queries/artistQueries'
import { GET_SONGS_ON_TITLE } from '../../graphql/queries/songQueries'
import Pagination from '../molecules/Pagination'
import { Artist, Song } from '../../lib/types'
import { useSearchParams } from 'react-router-dom'
import Dropdown from '../atoms/Dropdown'

/**
 * SearchPage component to render and handle search functionality,
 * filtering and sorting for artists and songs.
 */
function SearchPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    
    const term = queryParams.get('term');
    const filter = queryParams.get('filter');
    const sort = queryParams.get('sort');
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

    type CardProps = ArtistCardProps | SongCardProps;

    const [data, setData] = useState<CardProps[]>([]);
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 6

    const { data: artistsData } = useQuery(GET_ARTISTS_ON_NAME, {
        variables: { name: term, limit: itemsPerPage, sort: sort, page: currentPage},
        skip: filter !== 'artist',
    });

    const { data: songsData } = useQuery(GET_SONGS_ON_TITLE, {
        variables: { title: term, limit: itemsPerPage, sort: sort, page: currentPage},
        skip: filter !== 'song',
    });

    useEffect(() => {
        if (filter === 'artist' && artistsData) {
            const artistCardData: ArtistCardProps[] = artistsData.getArtistsOnName.map((artist: Artist) => ({
                cardType: 'artist',
                id: artist.id,
                title: artist.name,
                alternateNames: artist.alternate_names,
                imageUrl: artist.image_url,
                rating: artist.average_rating,
                numOfRatings: artist.number_of_ratings
            }))
            setData(artistCardData);
        } else if (filter === 'song' && songsData) {
            const songCards: SongCardProps[] = songsData.getSongsOnTitle.map((song: Song) => ({
                cardType: 'song',
                id: song.id,
                title: song.title,
                artist: song.artist_names,
                imageUrl: song.header_image_url,
                rating: song.average_rating,
                numOfRatings: song.number_of_ratings,
                releaseDate: song.release_date
            }));
            setData(songCards);
        }
    }, [filter, artistsData, songsData]);

    // const offset = currentPage * itemsPerPage
    // const currentData = songsData.slice(offset, offset + itemsPerPage)

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
            <section className='flex justify-center mb-10'>
                <Dropdown
                    selectedFilter={selectedSort}
                    filterOptions={validSort}
                    onFilterChange={(newSorting) =>
                        setSelectedSorting(newSorting)
                    }
                    outsideSearchBar
                    title='Sort by'
                />
            </section>
            <section className='w-full flex flex-col justify-center items-center'>
                <section className='w-full flex justify-center'>
                    <CardView cardData={data} />
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
