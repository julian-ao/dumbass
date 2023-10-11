import InputField from '../../components/molecules/InputField'
import Button from '../../components/molecules/Button'
import { useState } from 'react'
import RatingStars from '../../components/atoms/RatingStars'
import toast from 'react-hot-toast'

type ReviewProps = {
    reviews: Array<{
        userName: string
        imageUrl: string
        rating: number
        text: string
    }>
}

const Reviews = ({ reviews }: ReviewProps) => {
    const [review, setReview] = useState('')
    const [userRating, setUserRating] = useState(0)
    const [submitted, setSubmitted] = useState(false)

    const updateUserRating = (newRating: number) => {
        if (newRating === userRating) {
            setUserRating(0)
            return
        }
        setUserRating(newRating)
    }

    const submitReview = () => {
        if (userRating === 0) {
            toast.error('Must choose a rating', {
                style: {
                    padding: '14px',
                    color: '#696d7d'
                },
                iconTheme: {
                    primary: 'red',
                    secondary: '#FFFAEE'
                }
            })
            return
        }
        toast.success('Review submitted', {
            style: {
                padding: '14px',
                color: '#696d7d'
            },
            iconTheme: {
                primary: '#8fc0a9',
                secondary: '#FFFAEE'
            }
        })
        setUserRating(0)
        setReview('')
        setSubmitted(true)
    }

    return (
        <>
            {reviews.map((review, index) => (
                <div key={index}>
                    <div className='flex gap-3 items-center mb-2'>
                        <img
                            className='w-10 h-10 rounded-full aspect-square object-cover'
                            src={review.imageUrl}
                        />
                        <div className='flex flex-col'>
                            <div className='font-medium text-blueGray'>
                                {review.userName}
                            </div>
                            <RatingStars
                                rating={review.rating}
                                changeToOne={false}
                                size='small'
                                color='yellow'
                            />
                        </div>
                    </div>
                    <p className='text-blueGray'>{review.text}</p>
                </div>
            ))}
            <form
                className='flex-col gap-5 pt-5 border-t border-gray-200'
                /*onSubmit={() => ()}*/
            >
                {submitted ? (
                    <p className='text-blueGray italic'>
                        You have already submitted a review
                    </p>
                ) : (
                    <>
                        <div className='mb-4'>
                            <RatingStars
                                rating={userRating}
                                changeToOne={false}
                                size='large'
                                color='yellow'
                                updateRating={updateUserRating}
                            />
                        </div>
                        <div className='md:grid md:grid-cols-4 items-end gap-5'>
                            <InputField
                                id='yourReview'
                                type='text'
                                title='Your Review'
                                value={review}
                                onChange={setReview}
                                required
                                className='w-full md:col-span-3'
                            />
                            <div className='flex w-full justify-center mt-4'>
                                <Button
                                    title='Submit'
                                    type='button'
                                    onClick={submitReview}
                                    className='h-12'
                                />
                            </div>
                        </div>
                    </>
                )}
            </form>
        </>
    )
}

export default Reviews
