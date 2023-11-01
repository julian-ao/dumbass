import { useNavigate, useParams } from 'react-router-dom'
import { InfoPageTemplate } from '../organisms/InfoPageTemplate'
import { useQuery } from '@apollo/client'
import { GET_ARTIST_BY_ID } from '../../graphql/queries/artistQueries'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { formatAlternateNames } from '../../lib/utils'
import { ErrorPage } from './ErrorPage'

export const ArtistPage = () => {
    const { id = '' } = useParams()
    const navigate = useNavigate()

    const { data, loading } = useQuery(GET_ARTIST_BY_ID, {
        variables: { id: parseInt(id) }
    })

    const [isFavorite, setIsFavorite] = useState<boolean>(false) // TODO

    if (data?.getArtistById || loading) {
        return (
            <InfoPageTemplate
                isLoading={loading}
                title={data?.getArtistById.name}
                subtitle={formatAlternateNames(
                    data?.getArtistById.alternate_names
                )}
                image={data?.getArtistById.image_url}
                averageRating={data?.getArtistById.average_rating}
                numOfRatings={data?.getArtistById.number_of_ratings}
                description={data?.getArtistById.description}
                tabs={[
                    {
                        title: 'Info',
                        icon: faCircleInfo
                    }
                ]}
                handleFavoriteButtonClick={() => setIsFavorite(!isFavorite)}
                isFavorite={isFavorite}
                id={id}
                type='artist'
            />
        )
        /*     } else if (error?.networkError?.statusCode === 404) {
        return (
            <ErrorPage
                title='Oops!'
                subTitle='404 - Artist not found'
                description='The artist you are looking for does not exist. How you got here is a mystery, but you can click the button below to go back to the homepage.'
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
