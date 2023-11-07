import { useState } from 'react'
import CommonDropdown from '../atoms/CommonDropdown'
import Paginate from 'react-paginate'
import { ArtistCardProps, SongCardProps } from '../molecules/ArtistSongCard'
import CardView from '../organisms/CardView'
import SortIcon from '@mui/icons-material/Sort'
import GradeIcon from '@mui/icons-material/Grade'
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import PersonIcon from '@mui/icons-material/Person'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import Breadcrumb from '../atoms/Breadcrumb'
import { GET_FAVORITES } from '../../graphql/queries/favoriteQueries'
import { GET_SONGS_BY_ID } from '../../graphql/queries/songQueries'
import { GET_ARTISTS_BY_ID } from '../../graphql/queries/artistQueries'
import { useQuery } from '@apollo/client'
import { RootState } from '../../redux/store'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

/**
 * @component FavoritesPage
 *
 * `FavoritesPage` is a React functional component that provides an interface for users
 * to interact with their favorite songs and artists.
 */
export default function FavoritesPage() {
    const username = useSelector((state: RootState) => state.user.username)
    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 12
    const offset = currentPage * itemsPerPage
    const [songFavorites, setSongFavorites] = useState<number[]>([])
    const [artistFavorites, setArtistFavorites] = useState<number[]>([])

    const {
        data: favoritesData,
        loading: favoritesLoading,
        error: favoritesError
    } = useQuery(GET_FAVORITES, {
        variables: { username: username }
    })

    // Use useEffect to make the queries for song and artist data
    useEffect(() => {
        if (favoritesData && favoritesData.getFavorites) {
            setSongFavorites(
                favoritesData.getFavorites
                    .filter((item: { type: string }) => item.type === 'song')
                    .slice(offset, offset + itemsPerPage)
            )

            setArtistFavorites(
                favoritesData.getFavorites
                    .filter((item: { type: string }) => item.type === 'artist')
                    .slice(offset, offset + itemsPerPage)
            )

            // Now, you have the songIds and artistIds. Use these to query the data.
            // You can also use variables in the queries.
        }
    }, [favoritesData])

    const handlePageClick = (data: { selected: number }) => {
        setCurrentPage(data.selected)
    }

    useEffect(() => {
        const {
            data: songData,
            loading: songLoading,
            error: songError
        } = useQuery(GET_SONGS_BY_ID, {
            variables: { songIds: songFavorites }
        })

        const {
            data: artistData,
            loading: artistLoading,
            error: artistError
        } = useQuery(GET_ARTISTS_BY_ID, {
            variables: { artistIds: artistFavorites }
        })
    }, [songFavorites, artistFavorites])

    if (favoritesLoading || artistLoading || songLoading) {
        return <p>Loading...</p> // Handle the loading state
    }

    if (favoritesError || artistError || songError) {
        console.log(
            JSON.stringify(favoritesError, null, 2) +
                JSON.stringify(artistError, null, 2) +
                JSON.stringify(songError, null, 2)
        )
        return <p>Error loading favorites.</p> // Handle the error state
    }

    console.log(songData)

    return (
        <main className='w-full flex flex-col'>
            <Breadcrumb
                items={[
                    {
                        name: 'Favorites'
                    }
                ]}
            />
            <section className='flex justify-center gap-10 my-10'>
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
                {/* <CardView cardData={songData} /> */}
                {/* <CardView cardData={artistData} /> */}
                <Paginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={Math.ceil(favoritesData.length / itemsPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={
                        'pagination flex justify-center space-x-2 mb-5'
                    }
                    activeClassName={
                        'active bg-blue-200 flex items-center justify-center'
                    }
                    pageClassName={
                        'text-black border rounded px-3 py-2 hover:bg-blue-300 flex items-center justify-center'
                    }
                    pageLinkClassName={
                        'w-full h-full flex items-center justify-center'
                    }
                    previousClassName={
                        'text-black border rounded px-3 py-2 hover:bg-blue-300 flex items-center justify-center'
                    }
                    nextClassName={
                        'text-black border rounded px-3 py-2 hover:bg-blue-300 flex items-center justify-center'
                    }
                    previousLinkClassName={
                        'w-full h-full flex items-center justify-center'
                    }
                    nextLinkClassName={
                        'w-full h-full flex items-center justify-center'
                    }
                    disabledClassName={
                        'text-gray-300 border rounded px-3 py-2 opacity-50 cursor-not-allowed flex items-center justify-center'
                    }
                    disabledLinkClassName={
                        'opacity-50 cursor-not-allowed w-full h-full flex items-center justify-center'
                    }
                    breakLinkClassName={
                        'border-b border-black w-full h-full flex items-center justify-center'
                    }
                />
            </section>
        </main>
    )
}
