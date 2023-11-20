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
                <article className='min-[900px]:grid min-[900px]:grid-cols-4 w-full max-w-4xl gap-10 bg-white sm:rounded-xl shadow p-5 pt-10 xs:p-10'>
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
