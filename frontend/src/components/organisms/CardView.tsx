import ArtistSongCard, {
    ArtistCardProps,
    SongCardProps
} from '../molecules/ArtistSongCard'

/**
 * @typedef {Object} CardViewProps
 * @property {string} [title] - An optional title string that will be displayed above the cards if provided.
 * @property {Array<ArtistCardProps | SongCardProps>} cardData - An array containing the data for each card to be displayed in the view. Each object in the array should follow either the `ArtistCardProps` or `SongCardProps` type definitions.
 * @property {string} [customErrorMessage] - An optional custom error message to display when there are no cards to render.
 */
export type CardViewProps = {
    title?: string
    cardData: Array<ArtistCardProps | SongCardProps>
    customErrorMessage?: string
}

/**
 * `CardView` Component.
 *
 * This component renders a collection of cards, each represented by either an `ArtistCard` or a `SongCard`. It displays an optional title above the cards. The cards are rendered based on the `cardData` array provided in the props, using the `ArtistSongCard` component for each card.
 * 
 * If the `cardData` array is empty, the component will display an error message, which can be customized through the `customErrorMessage` prop. If no custom error message is provided, a default message of 'No data found...' is displayed.
 *
 * @param {CardViewProps} props - Object containing `title`, `cardData`, and optionally `customErrorMessage`.
 * @returns {JSX.Element} The rendered card view component.
 */
const CardView = (props: CardViewProps) => {
    return (
        <section className='w-10/12 md:px-12'>
            {props.title ? (
                <h2 className='text-2xl font-medium my-5 text-blueGray self-start'>
                    {props.title}
                </h2>
            ) : null}
            {props.cardData.length > 0 ? (
                <div className='mb-5 grid grid-cols-1 md:grid-cols-2 min-[1100px]:grid-cols-3 sm:gap-4 gap-3'>
                    {props.cardData.map((cardData, index) => (
                        <article key={index}>
                            <ArtistSongCard {...cardData} />
                        </article>
                    ))}
                </div>
            ) : (
                <article className='flex text-xl justify-center w-full text-gray-500'>
                    {props.customErrorMessage
                        ? props.customErrorMessage
                        : 'No data found...'}
                </article>
            )}
        </section>
    )
}

export default CardView
