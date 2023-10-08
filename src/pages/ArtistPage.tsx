const songs = [
    { title: 'Thank U, Next', year: 2018 },
    { title: 'No Tears Left to Cry', year: 2018 },
    { title: 'Into You', year: 2016 },
    { title: 'Dangerous Woman', year: 2016 }
]

const ArtistPage = () => {
    return (
        <div className='flex'>
            <div className='w-1/3 pt-8 pl-10'>
                <h1 className='text-3xl font-semibold text-center pb-10 text-blueGray'>
                    Ariana Grande
                </h1>
                <img
                    className='aspect-square rounded-xl sm:w-96 sm:h-96 w-60 h-60 object-cover'
                    src='https://i.scdn.co/image/ab67616100005174cdce7620dc940db079bf4952'
                    alt='Image'
                    role='ArtistSongCard-image'
                />
                <p className="text-blueGray mt-4">
                    Ariana Grande began performing onstage when she was a child.
                    Her involvement in a Broadway play at age 15, followed by
                    some small TV parts, helped her land the role of Cat on TV's
                    Victorious. She followed that with the spinoff Sam & Cat and
                    then dove headfirst into a chart-topping musical career,
                    releasing five albums: Yours Truly (2013), My Everything
                    (2014), Dangerous Woman (2016), Sweetener (2018) and Thank
                    U, Next (2019).
                </p>
            </div>
            <div className='w-1/3'></div>
        </div>
    )
}

export default ArtistPage
