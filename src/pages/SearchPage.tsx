import { useState } from 'react'
import Paginate from 'react-paginate'
import { Sort } from '../components/atoms/Sort'
import { SearchBarWithoutFilter } from '../components/molecules/SearchBarWithoutFilter'
import { Filter } from '../components/atoms/Filter'
import {
    ArtistCardProps,
    SongCardProps
} from '../components/molecules/ArtistSongCard'
import CardView from '../components/views/CardView'

function SearchPage() {
    const FiftycentProps = {
        cardType: 'artist',
        imageUrl:
            'https://www.uka.no/uploads/cache/66/e7/66e75771d31a087bd8754021b203d98c.jpg',
        title: '50 Cent',
        alternateNames: ['Fiddy', 'Boo Boo'],
        rating: 4.5,
        numOfRatings: 1000000
    } as ArtistCardProps

    const InDaClubProps = {
        cardType: 'song',
        imageUrl:
            'https://upload.wikimedia.org/wikipedia/en/1/12/50_Cent_-_In_Da_Club_-_CD_cover.jpg',
        title: 'In Da Club',
        artist: '50 Cent',
        rating: 4.5,
        numOfRatings: 1000000,
        releaseDate: '2003-01-07'
    } as SongCardProps

    const allData = Array(10)
        .fill(InDaClubProps)
        .concat(Array(10).fill(FiftycentProps))

    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 6

    const handlePageClick = (data: { selected: number }) => {
        setCurrentPage(data.selected)
    }

    const offset = currentPage * itemsPerPage
    const currentData = allData.slice(offset, offset + itemsPerPage)

    return (
        <div className='w-full'>
            <div className='flex justify-center'>
                <SearchBarWithoutFilter className='w-4/5 mt-10 drop-shadow mb-10' />
            </div>
            <div className='flex justify-center gap-10 mb-10'>
                <Filter />
                <Sort />
            </div>
            <div className='w-full flex flex-col justify-center items-center'>
                <CardView cardData={currentData} />
                <Paginate
                    previousLabel={'Forrige'}
                    nextLabel={'Neste'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={Math.ceil(allData.length / itemsPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={
                        'pagination flex justify-center space-x-2 mb-5'
                    }
                    activeClassName={
                        'active bg-blue-200 flex items-center justify-center'
                    }
                    pageClassName={
                        'text-black border rounded px-3 py-2 hover:bg-blue-300 flex items-center justify-center'
                    }
                    pageLinkClassName={
                        'w-full h-full flex items-center justify-center'
                    }
                    previousClassName={
                        'text-black border rounded px-3 py-2 hover:bg-blue-300 flex items-center justify-center'
                    }
                    nextClassName={
                        'text-black border rounded px-3 py-2 hover:bg-blue-300 flex items-center justify-center'
                    }
                    previousLinkClassName={
                        'w-full h-full flex items-center justify-center'
                    }
                    nextLinkClassName={
                        'w-full h-full flex items-center justify-center'
                    }
                    disabledClassName={
                        'text-gray-300 border rounded px-3 py-2 opacity-50 cursor-not-allowed flex items-center justify-center'
                    }
                    disabledLinkClassName={
                        'opacity-50 cursor-not-allowed w-full h-full flex items-center justify-center'
                    }
                    breakLinkClassName={
                        'border-b border-black w-full h-full flex items-center justify-center'
                    }
                />
            </div>
        </div>
    )
}

export default SearchPage
