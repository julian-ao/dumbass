import { useState } from 'react'
import Breadcrumb from '../atoms/Breadcrumb'
import { useLocation } from 'react-router-dom'
import RatingStars from '../atoms/RatingStars'
import {
    IconDefinition,
    faCalendarDays,
    faComments
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatDateString } from '../../lib/utils'
import Skeleton from 'react-loading-skeleton'
import Reviews from '../molecules/Reviews'
import { FavoriteButton } from '../atoms/FavoriteButton'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

/**
 * @typedef {Object} InfoPageTemplateProps
 * @property {boolean} isLoading - Indicates if the page is currently loading data.
 * @property {string} title - The title of the item (artist or song) being displayed.
 * @property {string} subtitle - The subtitle or additional information of the item.
 * @property {string} image - The image URL for the item.
 * @property {number} averageRating - The average rating of the item.
 * @property {number} numOfRatings - The number of ratings the item has received.
 * @property {string[]} [description] - An optional array of strings containing descriptive paragraphs for the item.
 * @property {string} [lyrics] - Optional lyrics for the item (if it's a song).
 * @property {string} [release_date] - The release date of the item (if it's a song).
 * @property {Array<{title: string, icon: IconDefinition}>} tabs - An array of objects representing tabs with titles and icons.
 * @property {string} id - The unique identifier for the item.
 * @property {'artist' | 'song'} type - The type of the item, either 'artist' or 'song'.
 */
export type InfoPageTemplateProps = {
    isLoading: boolean
    title: string
    subtitle: string
    image: string
    averageRating: number
    numOfRatings: number
    description?: string[]
    lyrics?: string
    release_date?: string
    tabs: {
        title: string
        icon: IconDefinition
    }[]
    id: string
    type: 'artist' | 'song'
}

/**
 * The `InfoPageTemplate` component displays detailed information about a music item (artist or song).
 *
 * It renders a header section with the item's image, title, subtitle, and additional metadata like ratings and release date. It also provides a tab navigation system, allowing the user to switch between different views (like Lyrics, Info, and Reviews).
 * The component shows a loading skeleton when the data is being fetched (`isLoading` is true). It utilizes the `FavoriteButton` and `Reviews` components for user interaction.
 * The tabs and their content are dynamically rendered based on the `tabs` prop.
 *
 * @param {InfoPageTemplateProps} props - Properties to configure the info page.
 * @returns {JSX.Element} The rendered information page for a music item.
 */
export const InfoPageTemplate = (props: InfoPageTemplateProps) => {
    const username = useSelector((state: RootState) => state.user.username)
    const [selectedTab, setSelectedTab] = useState<string>(props.tabs[0].title)

    const reviewsTab = {
        title: 'Reviews',
        icon: faComments
    }

    const tabs = [...props.tabs, reviewsTab]

    const location = useLocation()
    const fromLink = location.state?.fromLink
    const fromName = location.state?.fromName

    return (
        <main>
            <Breadcrumb
                isLoading={props.isLoading}
                items={
                    fromName
                        ? [
                              {
                                  name:
                                      fromName[1].toUpperCase() +
                                      fromName.slice(2),
                                  link: fromLink
                              },
                              {
                                  name: props.title
                              }
                          ]
                        : [
                              {
                                  name: props.title
                              }
                          ]
                }
            />
            <section className='flex items-center justify-center w-screen sm:p-12 lg:py-16 lg:px-32'>
                <article className='md:grid md:grid-cols-4 w-full max-w-4xl gap-10 bg-white sm:rounded-xl shadow p-5 pt-10 xs:p-10'>
                    <header className='flex flex-col xs:flex-row gap-5 justify-start xs:items-center md:block md:col-span-1 xs:mb-5 md:m-0'>
                        <figure className='aspect-w-1 aspect-h-1 md:w-full'>
                            {props.isLoading ? (
                                <Skeleton height={175} width={`100%`} />
                            ) : (
                                <div className='relative w-[10rem] h-[10rem] rounded-xl overflow-hidden shadow'>
                                    <img
                                        className='object-cover w-full h-full'
                                        src={props.image}
                                        alt={'Image of ' + props.title}
                                    />
                                </div>
                            )}
                        </figure>
                        <section className='md:mt-5 flex flex-col gap-2 xs:gap-2'>
                            {props.isLoading ? (
                                <Skeleton height={20} width={`75%`} />
                            ) : (
                                <div className='text-lg font-medium leading-5'>
                                    {props.title}
                                </div>
                            )}
                            {props.isLoading ? (
                                <Skeleton height={15} width={`50%`} />
                            ) : (
                                <div className='text-sm'>{props.subtitle}</div>
                            )}
                            {props.isLoading ? (
                                <Skeleton height={25} width={`75%`} />
                            ) : (
                                <RatingStars
                                    rating={props.averageRating || 0}
                                    changeToOne={true}
                                    numOfRatings={props.numOfRatings || 0}
                                    color='yellow'
                                />
                            )}
                            {props.isLoading ? (
                                <Skeleton height={20} width={`65%`} />
                            ) : (
                                props.release_date && (
                                    <div className='flex gap-3 mt-2 items-center text-blueGray'>
                                        <FontAwesomeIcon
                                            icon={faCalendarDays}
                                        />
                                        <div>
                                            {formatDateString(
                                                props.release_date
                                            )}
                                        </div>
                                    </div>
                                )
                            )}
                            {props.isLoading ? (
                                <Skeleton height={40} width={`100%`} />
                            ) : (
                                <>
                                    {username && (
                                        <FavoriteButton
                                            type={props.type}
                                            id={props.id}
                                        />
                                    )}
                                </>
                            )}
                        </section>
                    </header>
                    <section className='col-span-3'>
                        <nav className='border-b border-gray-200 dark:border-gray-700'>
                            <ul className='flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400'>
                                {props.isLoading ? (
                                    <ul className='flex gap-3 justify-around'>
                                        <Skeleton height={50} width={100} />
                                        <Skeleton height={50} width={100} />
                                    </ul>
                                ) : (
                                    tabs.map((tab, index) => (
                                        <button
                                            key={index}
                                            className='mr-2'
                                            id={`tab-button${index}`}
                                            onClick={() =>
                                                setSelectedTab(tab.title)
                                            }>
                                            <div
                                                className={`inline-flex items-center justify-center p-4 rounded-t-lg cursor-pointer ${
                                                    selectedTab === tab.title
                                                        ? 'text-green border-b-2 border-green active dark:text-green dark:border-green'
                                                        : ''
                                                }`}
                                                aria-current='page'>
                                                <FontAwesomeIcon
                                                    className={`w-4 h-4 mr-2 ${
                                                        selectedTab ===
                                                        tab.title
                                                            ? 'text-green dark:text-green'
                                                            : 'text-gray-400 dark:text-gray-500'
                                                    }`}
                                                    icon={tab.icon}
                                                />
                                                {tab.title}
                                            </div>
                                        </button>
                                    ))
                                )}
                            </ul>
                        </nav>
                        <article className='flex flex-col gap-8 py-8 xs:px-8'>
                            {selectedTab === 'Lyrics' && props.lyrics && (
                                <p className='text-blueGray whitespace-pre-line'>
                                    {props.isLoading ? (
                                        <>
                                            <Skeleton
                                                count={5}
                                                width={'100%'}
                                            />
                                            <br />
                                            <Skeleton
                                                count={4}
                                                width={'100%'}
                                            />
                                            <br />
                                            <Skeleton
                                                count={6}
                                                width={'100%'}
                                            />
                                        </>
                                    ) : (
                                        props.lyrics
                                    )}
                                </p>
                            )}
                            {selectedTab === 'Info' && (
                                <>
                                    {props.description?.map(
                                        (paragraph: string, index: number) => (
                                            <p
                                                key={index}
                                                className='text-blueGray'>
                                                {paragraph}
                                            </p>
                                        )
                                    )}
                                </>
                            )}
                            {selectedTab === 'Reviews' && (
                                <Reviews
                                    targetId={props.id}
                                    targetType={props.type}
                                />
                            )}
                        </article>
                    </section>
                </article>
            </section>
        </main>
    )
}
