import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatDateString } from '../lib/utils'
import RatingStars from '../components/atoms/RatingStars'
import InfoPageTabs from '../components/molecules/InfoPageTabs'
// import { useParams } from 'react-router-dom'

type InfoPageProps = {
    pageType: 'song' | 'artist'
}

export default function InfoPage({ pageType }: InfoPageProps) {
    // const { songId } = useParams()

    let songMockData = {
        imageUrl:
            'https://i.scdn.co/image/ab67616d0000b273f7f74100d5cc850e01172cbf',
        title: 'In Da Club',
        artist: '50 Cent',
        rating: 4.5,
        numOfRatings: 1000000,
        date: '2003-01-07',
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
        info: '',
        reviews: [
            {
                userName: 'Sander Skogh Linnerud',
                imageUrl:
                    'https://media.licdn.com/dms/image/D5603AQF-WLbY91FVmg/profile-displayphoto-shrink_800_800/0/1666367680104?e=2147483647&v=beta&t=eSYLHzEK41R_m1U3Tub7KhJ9RYWSQkqECSqFy95VMFo',
                rating: 5,
                text: 'Kjempekul sang, elsker den! Hører på den hver kveld før jeg legger meg <3'
            },
            {
                userName: 'Jakob Opland',
                imageUrl:
                    'https://premium.vgc.no/v2/images/4d46c3b4-294d-4a35-9773-80aa99c957de?fit=crop&format=auto&h=1920&w=1440&s=f386f08acf63a88f29e9d82e7b7b1b90b65b2b1f',
                rating: 2,
                text: 'Ikke så fan'
            }
        ]
    }

    let artistMockData = {
        imageUrl:
            'https://www.uka.no/uploads/cache/66/e7/66e75771d31a087bd8754021b203d98c.jpg',
        title: '50 cent',
        artist: 'Who is 50 cent?',
        rating: 4.7,
        numOfRatings: 45454,
        date: '1975-07-06',
        lyrics: [],
        info: '50 Cent, whose real name is Curtis James Jackson III, is a prominent American rapper, actor, and entrepreneur. He was born on July 6, 1975, in Queens, New York City. His journey to stardom began in the late 1990s when he started making a name for himself in the underground hip-hop scene with a series of well-received mixtapes. However, it was his collaboration with Eminem and Dr. Dre that catapulted him to mainstream success.',
        reviews: [
            {
                userName: 'Sander Skogh Linnerud',
                imageUrl:
                    'https://media.licdn.com/dms/image/D5603AQF-WLbY91FVmg/profile-displayphoto-shrink_800_800/0/1666367680104?e=2147483647&v=beta&t=eSYLHzEK41R_m1U3Tub7KhJ9RYWSQkqECSqFy95VMFo',
                rating: 5,
                text: '50 cent er favorittartisten min! Så han under Uka 2023 og var beste kvelden i mitt liv<3'
            },
            {
                userName: 'Jakob Opland',
                imageUrl:
                    'https://premium.vgc.no/v2/images/4d46c3b4-294d-4a35-9773-80aa99c957de?fit=crop&format=auto&h=1920&w=1440&s=f386f08acf63a88f29e9d82e7b7b1b90b65b2b1f',
                rating: 2,
                text: 'Ikke så fan'
            }
        ]
    }

    let mockType = pageType === 'song' ? songMockData : artistMockData

    return (
        <div className='flex items-center justify-center w-screen sm:p-12 lg:py-16 lg:px-32'>
            <div className='md:grid md:grid-cols-4 w-full max-w-4xl gap-10 bg-white sm:rounded-xl shadow p-5 xs:p-10'>
                <div className='flex flex-col xs:flex-row gap-5 justify-start xs:items-center md:block md:col-span-1 mb-5 md:m-0'>
                    <div className='aspect-w-1 aspect-h-1 md:w-full'>
                        <img
                            className='aspect-content rounded-xl shadow object-cover w-full max-w-[10rem]'
                            src={mockType.imageUrl}
                        />
                    </div>
                    <div className='md:mt-5 flex flex-col gap-2 xs:gap-5'>
                        <div>
                            <div className='text-lg font-medium'>
                                {mockType.title}
                            </div>
                            <div>{mockType.artist}</div>
                        </div>
                        <div>
                            <RatingStars
                                rating={mockType.rating}
                                changeToOne={true}
                                numOfRatings={mockType.numOfRatings}
                                color='yellow'
                            />
                            <div className='flex gap-3 mt-2 items-center text-blueGray'>
                                <FontAwesomeIcon icon={faCalendarDays} />
                                <div className=''>
                                    {formatDateString(mockType.date)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-span-3 bg-blue-1000'>
                    <InfoPageTabs pageType={pageType} mockType={mockType} />
                </div>
            </div>
        </div>
    )
}