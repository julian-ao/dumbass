import { useParams } from 'react-router-dom'

export default function SongPage() {
    const { songId } = useParams()

    return (
        <div className='bg-[#EFEFEF] min-h-screen'>
            <div className='flex flex-col items-center justify-center w-screen px-12'>
                {songId}
            </div>
        </div>
    )
}
