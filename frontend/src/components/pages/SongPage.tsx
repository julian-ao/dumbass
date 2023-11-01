import { useNavigate, useParams } from 'react-router-dom'
import { InfoPageTemplate } from '../organisms/InfoPageTemplate'
import { useQuery } from '@apollo/client'
import { GET_SONG_BY_ID } from '../../graphql/queries/songQueries'
import { faMicrophoneLines } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { ErrorPage } from './ErrorPage'

export const SongPage = () => {
    const { id = '' } = useParams()
    const navigate = useNavigate()

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
        /* } else if (error?.networkError?.statusCode === 404) {
        return (
            <ErrorPage
                title='Oops!'
                subTitle='404 - Song not found'
                description='The song you are looking for does not exist. How you got here is a mystery, but you can click the button below to go back to the homepage.'
                buttonText='Go to homepage'
                buttonFunction={() => navigate('/')}
            />
        ) */
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
