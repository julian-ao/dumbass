import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faComments,
    faMicrophoneLines,
    faCircleInfo
} from '@fortawesome/free-solid-svg-icons'
import Reviews from './Reviews'

/**
 * @typedef {Object} Lyric
 *
 * @property {string} title - Title of the lyric section.
 * @property {string[]} lines - Individual lines of the lyric section.
 */

/**
 * @typedef {Object} Review
 *
 * @property {string} userName - Name of the user who wrote the review.
 * @property {string} imageUrl - URL of the user's profile image.
 * @property {number} rating - Rating provided by the user.
 * @property {string} text - Text of the review.
 */

/**
 * @typedef {Object} MockType
 *
 * @property {string} imageUrl - URL of the item image.
 * @property {string} title - Title of the item (e.g., song or artist).
 * @property {string} artist - Name of the artist.
 * @property {number} rating - Overall rating of the item.
 * @property {number} numOfRatings - Total number of ratings received.
 * @property {string} date - Release date or information date.
 * @property {Lyric[]} lyrics - Array of lyric sections.
 * @property {Review[]} reviews - Array of user reviews.
 * @property {string} info - Additional information.
 */

/**
 * @typedef {Object} InfoPageTabsProps
 *
 * @property {'song' | 'artist'} pageType - Type of the page to determine content and tab titles.
 * @property {MockType} mockType - Mock data to be displayed on the page.
 */
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

/**
 * `InfoPageTabs` Component.
 *
 * A component that generates a tab-based layout to showcase detailed information and user
 * reviews for a song or artist. It displays lyrics for songs, information for artists,
 * and user reviews in different tabs. The component adjusts the content and tab titles
 * dynamically based on the provided `pageType`.
 *
 * @param {InfoPageTabsProps} props - Properties to configure the component.
 */
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
        <section className='col-span-3 bg-blue-1000'>
            <nav className='border-b border-gray-200 dark:border-gray-700'>
                <ul className='flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400'>
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            className='mr-2'
                            onClick={() => setSelectedTab(tab.title)}>
                            <div
                                className={`inline-flex items-center justify-center p-4 rounded-t-lg cursor-pointer ${
                                    selectedTab === tab.title
                                        ? 'text-green border-b-2 border-green active dark:text-green dark:border-green'
                                        : ''
                                }`}
                                aria-current='page'>
                                <FontAwesomeIcon
                                    className={`w-4 h-4 mr-2 ${
                                        selectedTab === tab.title
                                            ? 'text-green dark:text-green'
                                            : 'text-gray-400 dark:text-gray-500'
                                    }`}
                                    icon={tab.icon}
                                />
                                {tab.title}
                            </div>
                        </button>
                    ))}
                </ul>
            </nav>
            <article className='flex flex-col gap-8 py-8 xs:px-8'>
                {selectedTab === 'Lyrics' ? (
                    <>
                        {mockType.lyrics.map((lyric, index) => (
                            <div key={index}>
                                <h2 className='italic'>{lyric.title}</h2>
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
            </article>
        </section>
    )
}

export default InfoPageTabs
