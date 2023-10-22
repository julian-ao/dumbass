import { useState } from 'react'
import ArtistSongCard, {
    ArtistCardProps,
    SongCardProps
} from '../molecules/ArtistSongCard'

/**
 * @typedef {Object} CardViewProps
 *
 * @property {string} [title] - An optional title string that will be displayed
 *                 above the cards if provided.
 * @property {Array<ArtistCardProps | SongCardProps>} cardData - An array
 *                 containing the data for each card to be displayed in the view.
 *                 Each object in the array should adhere to either the
 *                 `ArtistCardProps` or `SongCardProps` type definitions.
 */
export type CardViewProps = {
    title?: string
    cardData: Array<ArtistCardProps | SongCardProps>
}

/**
 * `CardView` Component.
 *
 * A component to render a collection of cards with optional title. Each card
 * will be rendered according to the data provided in the `cardData` array.
 * Cards could be of type `ArtistCard` or `SongCard` and are rendered using
 * the `ArtistSongCard` component.
 *
 * @param {CardViewProps} props - Object containing `title` and `cardData`.
 * @param {string} [props.title] - Optional title for the card view.
 * @param {Array<ArtistCardProps | SongCardProps>} props.cardData - Array
 *                  containing data for each card to be displayed.
 */
const CardView = (props: CardViewProps) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [maxPage, setMaxPage] = useState(props.cardData.length / 12)

    return (
        <div className='w-10/12 md:px-12'>
            {props.title ? (
                <div className='text-2xl font-medium my-5 text-blueGray self-start'>
                    {props.title}
                </div>
            ) : null}
            <div className='mb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-4 gap-3'>
                {props.cardData.map((cardData, index) => (
                    <ArtistSongCard key={index} {...cardData} />
                ))}
            </div>
        </div>
    )
}

export default CardView
