import { useParams } from 'react-router-dom'
import { InfoPageTemplate } from '../organisms/InfoPageTemplate'
import { useQuery } from '@apollo/client'
import { GET_ARTIST_BY_ID } from '../../graphql/queries/artistQueries'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { formatAlternateNames } from '../../lib/utils'
import NotFoundPage from './NotFoundPage'

export const ArtistPage = () => {
    const { id = '' } = useParams()

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
            />
        )
    } else {
        // TODO if error?.networkError?.statusCode is 404
        return <NotFoundPage />
    }
}
