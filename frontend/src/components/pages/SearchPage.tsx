import { useEffect, useState } from 'react'
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
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ARTISTS_ON_NAME } from '../../graphql/queries/artistQueries'
import { GET_SONGS_ON_TITLE } from '../../graphql/queries/songQueries'
import Pagination from '../molecules/Pagination'
import { Artist, Song } from '../../lib/types'

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

    type CardProps = ArtistCardProps | SongCardProps;

    const [data, setData] = useState<CardProps[]>([]);
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 2


    console.log("Term: " + term)
    console.log("Filter: " + filter)
    console.log("Sort: " + sort)

    const { data: artistsData } = useQuery(GET_ARTISTS_ON_NAME, {
        variables: { name: term, limit: itemsPerPage, sort: sort },
        skip: filter !== 'Artist',
    });

    const { data: songsData } = useQuery(GET_SONGS_ON_TITLE, {
        variables: { title: term, limit: itemsPerPage, sort: sort },
        skip: filter !== 'Song',
    });

    useEffect(() => {
        if (filter === 'Artist' && artistsData) {
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
        } else if (filter === 'Song' && songsData) {
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
                    <CardView cardData={data} />
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
