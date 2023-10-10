import ArtistSongCard, {
    ArtistCardProps,
    SongCardProps
} from '../molecules/ArtistSongCard'

export type CardViewProps = {
    title?: string
    length: number
    //cardData: Array<ArtistCardProps | SongCardProps>
    singleCardData: ArtistCardProps | SongCardProps
    // TODO: remove singleCardData and only use cardData
}

const CardView = (props: CardViewProps) => {
    return (
        <div className='w-10/12 md:px-12'>
            {props.title ? (
                <div
                    data-testid='top_song_header'
                    className='text-2xl font-bold my-5 text-blueGray self-start'>
                    {props.title}
                </div>
            ) : null}
            <div className='mb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-4 gap-3'>
                {Array(props.length)
                    .fill(props.singleCardData)
                    .map((props, index) => (
                        <ArtistSongCard key={index} {...props} />
                    ))}
            </div>
        </div>
    )
}

export default CardView
