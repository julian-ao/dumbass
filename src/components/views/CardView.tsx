import ArtistSongCard, {
    ArtistCardProps,
    SongCardProps
} from '../molecules/ArtistSongCard'

export type CardViewProps = {
    title?: string;
    cardData: Array<ArtistCardProps | SongCardProps>;
}

const CardView = (props: CardViewProps) => {
    return (
        <div className='w-10/12 md:px-12'>
            {props.title ? (
                <div className='text-2xl font-bold my-5 text-blueGray self-start'>
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

export default CardView;
