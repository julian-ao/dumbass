import { useNavigate, useParams } from 'react-router-dom'
import { InfoPageTemplate } from '../organisms/InfoPageTemplate'
import { useQuery } from '@apollo/client'
import { GET_ARTIST_BY_ID } from '../../graphql/queries/artistQueries'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { formatAlternateNames } from '../../lib/utils'
import { ErrorPage } from './ErrorPage'

/**
 * `ArtistPage` Component.
 *
 * This component fetches and displays detailed information about an artist using an `InfoPageTemplate`.
 * It queries the data for a specific artist by their ID using GraphQL and renders the `InfoPageTemplate` with this data.
 * The page displays the artist's name, alternate names, image, rating, and description. It includes a tab for additional artist information.
 *
 * If the data is not available or an error occurs, the component renders an `ErrorPage` component,
 * providing the user with a message and an option to navigate back to the homepage.
 *
 * @returns {JSX.Element} The rendered page with either the artist information or an error message.
 */
export const ArtistPage = () => {
    const { id = '' } = useParams()
    const navigate = useNavigate()

    // GraphQL query to fetch artist details by ID
    const { data, loading } = useQuery(GET_ARTIST_BY_ID, {
        variables: { id: parseInt(id) }
    })
    
    // Conditional rendering based on data availability or loading status
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
                id={id}
                type='artist'
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
