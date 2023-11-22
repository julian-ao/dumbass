// Define a type for an artist
export type Artist = {
    id: string
    name: string
    image_url: string
    alternate_names: string[]
    average_rating: number
    number_of_ratings: number
}

// Define a type for a song
export type Song = {
    id: string
    title: string
    artist_names: string
    header_image_url: string
    release_date: string
    primary_artist_id: number
    average_rating: number
    number_of_ratings: number
}

// Define a type for favorite
export type FavoriteType = {
    type: string
    targetId: number
}

// Define a type for retrieveing favorites
export type GetFavoritesDataQueryResult = {
    getFavorites: FavoriteType[]
}

// Define a type for a review
export type ReviewType = {
    userName: string
    content: string
    rating: number
}

// Define a type for retrieveing reviews
export type GetReviewsByTargetIdQueryResult = {
    getReviewsByTarget: ReviewType[]
}
