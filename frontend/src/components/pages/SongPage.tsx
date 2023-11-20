import { useNavigate, useParams } from 'react-router-dom'
import { InfoPageTemplate } from '../organisms/InfoPageTemplate'
import { useQuery } from '@apollo/client'
import { GET_SONG_BY_ID } from '../../graphql/queries/songQueries'
import { faMicrophoneLines } from '@fortawesome/free-solid-svg-icons'
import { ErrorPage } from './ErrorPage'

/**
 * `SongPage` Component.
 *
 * This component is responsible for displaying detailed information about a specific song.
 * It fetches the song's data using a GraphQL query based on the song's ID obtained from the URL parameters.
 * The component renders an `InfoPageTemplate` with the fetched song data, including its title, artist names, image, rating, lyrics, and release date.
 * 
 * The `InfoPageTemplate` is used to structure and present the information in a consistent and informative layout.
 * The page includes a tab for lyrics, represented by a microphone icon, to indicate the lyrical content of the song.
 *
 * If the data for the song is not available or an error occurs during fetching, the `ErrorPage` component is rendered,
 * displaying an error message and providing an option to navigate back to the homepage.
 *
 * @returns {JSX.Element} The rendered page for the song with detailed information or an error message.
 */
export const SongPage = () => {
    const { id = '' } = useParams()
    const navigate = useNavigate()

    const { data, loading } = useQuery(GET_SONG_BY_ID, {
        variables: { id: parseInt(id) }
    })

    if (data?.getSongById || loading) {
        return (
            <InfoPageTemplate
                isLoading={loading}
                title={data?.getSongById.title}
                subtitle={data?.getSongById.artist_names}
                image={data?.getSongById.header_image_url}
                averageRating={data?.getSongById.average_rating}
                numOfRatings={data?.getSongById.number_of_ratings}
                lyrics={data?.getSongById.lyrics}
                release_date={data?.getSongById.release_date}
                tabs={[
                    {
                        title: 'Lyrics',
                        icon: faMicrophoneLines
                    }
                ]}
                id={id}
                type='song'
            />
        )
    } else {
        return (
            <ErrorPage
                title='Oops!'
                subTitle='Unknown error'
                description='Something wrong happened, you can try again or click the button below to go back to the homepage'
                buttonText='Go to homepage'
                buttonFunction={() => navigate('/')}
            />
        )
    }
}
