import ArtistSongCard, {
    ArtistCardProps,
    SongCardProps
} from '../components/molecules/ArtistSongCard'
import Navbar from '../components/molecules/Navbar'

const songs: SongCardProps[] = [
    {
        cardType: 'song',
        imageUrl:
            'https://i1.sndcdn.com/artworks-5M1wsAL8ySiHG4ne-BLcO3A-t500x500.jpg',
        title: 'The Less I Know The Better',
        rating: 1.2,
        numOfRatings: 40,
        artist: 'Tame Impala',
        releaseDate: '2014-03-17'
    },
    {
        cardType: 'song',
        imageUrl:
            'https://images.genius.com/4aed0eb3cba7f88da5fcbc4fc689048e.300x300x1.jpg',
        title: 'Summer Jam',
        rating: 4.3,
        numOfRatings: 23415,
        artist: 'Kool John (Ft. Iamsu! & P-Lo)',
        releaseDate: '2013-01-01'
    },
    {
        cardType: 'song',
        imageUrl:
            'https://i.scdn.co/image/ab67616d0000b273e1d47c00ddecbfb810c807ed',
        title: 'Somebody That I Used to Know',
        rating: 3.6,
        numOfRatings: 403252222,
        artist: 'Gotye ft. Kimbra',
        releaseDate: '2014-03-17'
    },
    {
        cardType: 'song',
        imageUrl:
            'https://images.genius.com/70a7ef69242915a9cd1c3f68031e4c0a.300x300x1.jpg',
        title: 'Tie My Hands',
        rating: 2.7,
        numOfRatings: 40,
        artist: 'Lil Wayne (Ft. Robin Thicke)',
        releaseDate: '2008-06-10'
    }
]

const artists: ArtistCardProps[] = [
    {
        cardType: 'artist',
        imageUrl:
            'https://upload.wikimedia.org/wikipedia/commons/e/e7/%22AM%22_%28Arctic_Monkeys%29.jpg',
        title: 'Arctic Monkeys',
        alternateNames: ['Death Ramps'],
        rating: 2.7,
        numOfRatings: 403424
    },
    {
        cardType: 'artist',
        imageUrl: 'https://s3.amazonaws.com/rapgenius/black-rob-news.jpg',
        title: 'Black Rob',
        alternateNames: ['R. Ross', 'Robert Ross'],
        rating: 1.2,
        numOfRatings: 25150
    },
    {
        cardType: 'artist',
        imageUrl:
            'https://images.genius.com/c1108171df736ca45fb2a2ecdcbe8478.683x683x1.jpg',
        title: 'Immortal Technique',
        alternateNames: ['Immortal Tech'],
        rating: 3.4,
        numOfRatings: 1242
    }
]

export default function ExplorePage() {
    return (
        <div>
            <Navbar />
            <div className='bg-lightGray h-screen w-screen m-0 sm:p-10 p-5'>
                <div className='mb-20 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 sm:gap-8 gap-4'>
                    {songs.map((data, index) => (
                        <ArtistSongCard key={index} {...data} />
                    ))}
                </div>
                <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 sm:gap-8 gap-4'>
                    {artists.map((data, index) => (
                        <ArtistSongCard key={index} {...data} />
                    ))}
                </div>
            </div>
        </div>
    )
}
