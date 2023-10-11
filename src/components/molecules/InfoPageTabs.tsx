import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faComments,
    faMicrophoneLines,
    faCircleInfo
} from '@fortawesome/free-solid-svg-icons'
import Reviews from '../atoms/Reviews'

type InfoPageTabsProps = {
    pageType: 'song' | 'artist'
    mockType: {
        imageUrl: string
        title: string
        artist: string
        rating: number
        numOfRatings: number
        date: string
        lyrics: Array<{
            title: string
            lines: Array<string>
        }>
        reviews: Array<{
            userName: string
            imageUrl: string
            rating: number
            text: string
        }>
        info: string
    }
}

const InfoPageTabs = ({ pageType, mockType }: InfoPageTabsProps) => {
    const tabs = [
        {
            title: pageType === 'song' ? 'Lyrics' : 'Artist Info',
            icon: pageType === 'song' ? faMicrophoneLines : faCircleInfo
        },
        {
            title: 'Reviews',
            icon: faComments
        }
    ]

    const [selectedTab, setSelectedTab] = useState<string>(
        pageType === 'song' ? 'Lyrics' : 'Artist Info'
    )

    return (
        <div className='col-span-3 bg-blue-1000'>
            <div className='border-b border-gray-200 dark:border-gray-700'>
                <ul className='flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400'>
                    {tabs.map((tab, index) => (
                        <li
                            key={index}
                            className='mr-2'
                            onClick={() => setSelectedTab(tab.title)}>
                            <div
                                className={`inline-flex items-center justify-center p-4 rounded-t-lg cursor-pointer ${
                                    selectedTab == tab.title
                                        ? 'text-green border-b-2 border-green active dark:text-green dark:border-green'
                                        : ''
                                }`}
                                aria-current='page'>
                                <FontAwesomeIcon
                                    className={`w-4 h-4 mr-2 ${
                                        selectedTab == tab.title
                                            ? 'text-green dark:text-green'
                                            : 'text-gray-400 dark:text-gray-500'
                                    }`}
                                    icon={tab.icon}
                                />
                                {tab.title}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='flex flex-col gap-8 py-8 xs:px-8'>
                {selectedTab === 'Lyrics' ? (
                    <>
                        {mockType.lyrics.map((lyric, index) => (
                            <div key={index}>
                                <div className='italic'>{lyric.title}</div>
                                <div>
                                    {lyric.lines.map((line, i) => (
                                        <div key={index + '-' + i}>{line}</div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </>
                ) : selectedTab === 'Reviews' ? (
                    <Reviews reviews={mockType.reviews} />
                ) : (
                    <>
                        <h2 className='text-blueGray text-3xl font-medium'>
                            {mockType.artist}
                        </h2>
                        <p className='text-blueGray'>{mockType.info}</p>
                    </>
                )}
            </div>
        </div>
    )
}

export default InfoPageTabs
