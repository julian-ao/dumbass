import { useParams } from 'react-router-dom'
import { InfoPageTemplate } from '../organisms/InfoPageTemplate'
import { useQuery } from '@apollo/client'
import { GET_SONG_BY_ID } from '../../graphql/queries/songQueries'
import { faMicrophoneLines } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import NotFoundPage from './NotFoundPage'

export const SongPage = () => {
    const { id = '' } = useParams()

    const { data, loading } = useQuery(GET_SONG_BY_ID, {
        variables: { id: parseInt(id) }
    })

    const [isFavorite, setIsFavorite] = useState<boolean>(false) // TODO

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
                handleFavoriteButtonClick={() => setIsFavorite(!isFavorite)}
                isFavorite={isFavorite}
            />
        )
    } else {
        // TODO if error?.networkError?.statusCode is 404
        return <NotFoundPage />
    }
}
