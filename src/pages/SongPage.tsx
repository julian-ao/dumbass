import {
    faComments,
    faMicrophoneLines,
    faCalendarDays
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { formatDateString } from '../lib/utils'
import RatingStars from '../components/atoms/RatingStars'
import InputField from '../components/molecules/InputField'
import Button from '../components/molecules/Button'
// import { useParams } from 'react-router-dom'

export default function SongPage() {
    // const { songId } = useParams()

    const mockData = {
        imageUrl:
            'https://i.scdn.co/image/ab67616d0000b273f7f74100d5cc850e01172cbf',
        title: 'In Da Club',
        artist: '50 Cent',
        rating: 4.5,
        numOfRatings: 1000000,
        releaseDate: '2003-01-07',
        lyrics: [
            {
                title: 'Intro',
                lines: [
                    'Go, go',
                    'Go, go, go, go',
                    "Go, shawty, it's your birthday",
                    "We gon' party like it's your birthday",
                    "We gon' sip Bacardí like it's your birthday",
                    "And you know we don't give a fuck it's not your birthday"
                ]
            },
            {
                title: 'Chorus',
                lines: [
                    "You can find me in the club, bottle full of bub'",
                    "Look, mami, I got the X if you into takin' drugs",
                    "I'm into havin' sex, I ain't into makin' love",
                    "So come give me a hug if you into gettin' rubbed",
                    "You can find me in the club, bottle full of bub'",
                    "Look, mami, I got the X if you into takin' drugs",
                    "I'm into havin' sex, I ain't into makin' love",
                    "So come give me a hug if you into gettin' rubbed"
                ]
            },
            {
                title: 'Verse 1',
                lines: [
                    'When I pull up out front, you see the Benz on dubs (Uh-huh)',
                    "When I roll twenty deep, it's twenty nines in the club (Yeah)",
                    'Niggas heard I fuck with Dre, now they wanna show me love',
                    'When you sell like Eminem, then the hoes, they wanna fuck (Woo)',
                    "Look homie, ain't nothin' changed, hoes down, G's up",
                    'I see Xzibit in the cut, hey, nigga, roll that weed up (Roll that)',
                    "If you watch how I move, you'll mistake me for a player or pimp",
                    "Been hit with a few shells, but I don't walk with a limp (I'm aight)",
                    "In the hood in L.A., they sayin', '50, you hot' (Uh-huh)",
                    "They like me, I want 'em to love me like they love Pac",
                    "But holla in New York, the niggas'll tell you I'm loco (Yeah)",
                    'And the plan is to put the rap game in a chokehold (Uh-huh)',
                    "I'm fully focused, man, my money on my mind",
                    "Got a mil' out the deal and I'm still on the grind (Woo)",
                    "Now shawty said she feelin' my style, she feelin' my flow (Uh-huh)",
                    'Her girlfriend with her, they bi and they ready to go (Okay)'
                ]
            },
            {
                title: 'Chorus',
                lines: [
                    "You can find me in the club, bottle full of bub'",
                    "Look, mami, I got the X if you into takin' drugs",
                    "I'm into havin' sex, I ain't into makin' love",
                    "So come give me a hug if you into gettin' rubbed",
                    "You can find me in the club, bottle full of bub'",
                    "Look, mami, I got the X if you into takin' drugs",
                    "I'm into havin' sex, I ain't into makin' love",
                    "So come give me a hug if you into gettin' rubbed"
                ]
            }
        ],
        reviews: [
            {
                userName: 'Sander Skogh Linnerud',
                imageUrl:
                    'https://media.licdn.com/dms/image/D5603AQF-WLbY91FVmg/profile-displayphoto-shrink_800_800/0/1666367680104?e=2147483647&v=beta&t=eSYLHzEK41R_m1U3Tub7KhJ9RYWSQkqECSqFy95VMFo',
                rating: 4.8,
                text: 'Kjempekul sang, elsker den! Hører på den hver kveld før jeg legger meg <3'
            },
            {
                userName: 'Jakob Opland',
                imageUrl:
                    'https://premium.vgc.no/v2/images/4d46c3b4-294d-4a35-9773-80aa99c957de?fit=crop&format=auto&h=1920&w=1440&s=f386f08acf63a88f29e9d82e7b7b1b90b65b2b1f',
                rating: 2.3,
                text: 'Ikke så fan'
            }
        ]
    }

    const tabs = [
        {
            title: 'Lyrics',
            icon: faMicrophoneLines
        },
        {
            title: 'Reviews',
            icon: faComments
        }
    ]

    const [selectedTab, setSelectedTab] = useState<string>('Lyrics')
    const [review, setReview] = useState<string>('')
    /* const [rating, setRating] = useState<number>() */

    return (
        <div className='flex items-center justify-center w-screen sm:p-12 lg:py-16 lg:px-32'>
            <div className='md:grid md:grid-cols-4 w-full max-w-4xl gap-10 bg-white sm:rounded-xl shadow p-5 xs:p-10'>
                <div className='flex flex-col xs:flex-row gap-5 justify-start xs:items-center md:block md:col-span-1 mb-5 md:m-0'>
                    <div className='aspect-w-1 aspect-h-1 md:w-full'>
                        <img
                            className='aspect-content rounded-xl shadow object-cover w-full max-w-[10rem]'
                            src={mockData.imageUrl}
                        />
                    </div>

                    <div className='md:mt-5 flex flex-col gap-2 xs:gap-5'>
                        <div>
                            <div className='text-lg font-medium'>
                                {mockData.title}
                            </div>
                            <div className=''>{mockData.artist}</div>
                        </div>
                        <div>
                            <RatingStars
                                rating={mockData.rating}
                                numOfRatings={mockData.numOfRatings}
                            />
                            <div className='flex gap-2 items-center text-blueGray'>
                                <FontAwesomeIcon icon={faCalendarDays} />
                                <div className=''>
                                    {formatDateString(mockData.releaseDate)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                                {mockData.lyrics.map((lyric, index) => (
                                    <div key={index}>
                                        <div className='italic'>
                                            {lyric.title}
                                        </div>
                                        <div>
                                            {lyric.lines.map((line, i) => (
                                                <div key={index + '-' + i}>
                                                    {line}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : selectedTab === 'Reviews' ? (
                            <>
                                {mockData.reviews.map((review, index) => (
                                    <div key={index}>
                                        <div className='flex gap-3 items-center mb-2'>
                                            <img
                                                className='w-10 h-10 rounded-full aspect-square object-cover'
                                                src={review.imageUrl}
                                            />
                                            <div className='flex flex-col'>
                                                <div className='font-medium'>
                                                    {review.userName}
                                                </div>
                                                <RatingStars
                                                    rating={review.rating}
                                                    size='small'
                                                    color='yellow'
                                                />
                                            </div>
                                        </div>
                                        <div>{review.text}</div>
                                    </div>
                                ))}
                                <form
                                    className='grid grid-cols-1 md:grid-cols-4 gap-5 pt-5 border-t border-gray-200 dark:border-gray-700'
                                    onSubmit={() => {
                                        console.log('TODO')
                                    }}>
                                    <InputField
                                        id='yourReview'
                                        type='text'
                                        title='Your Review'
                                        value={review}
                                        onChange={setReview}
                                        required
                                        className='w-full md:col-span-3'
                                    />
                                    {/* <InputField
                                        type={'number'}
                                        title={'Rating(0 to 5)'}
                                        value={rating}
                                        onChange={setRating}
                                        required
                                        className='w-full md:col-span-1'
                                    /> */}
                                    <div className='flex items-end'>
                                        <Button
                                            title='Submit'
                                            type='button'
                                            className='h-12'
                                        />
                                    </div>
                                </form>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}
