import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getSpotsReviews } from '../../store/ReviewsReducer';
import { getAllSpots } from '../../store/spotsReducer';
import AddReviewModal from '../AddReview/AddReviewModal';
import { createBooking, loadBookings } from '../../store/bookings';
import { loadUsersBookings } from '../../store/sessionBooking';
import './SpotDetails.css'

function NoUserSpotDetails() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();
    const spotObject = useSelector((state) => (state.spots));
    const spot = Object.values(spotObject).find(spot => spot.id === +spotId);


    const user = useSelector(state => state.session.user)
    const bookings = useSelector(state => state.bookings)
    const spotsBookingsArr = Object.values(bookings)
    const allReviews = useSelector((state) => (state.reviews))
    const reviews = Object.values(allReviews);

    let currentDate = new Date();
    const nextDate = new Date(currentDate.getTime() + 86400000)

    const getDate = (dateObj) => {
        let month;
        if (dateObj.getMonth() < 9) {
            month = `0${dateObj.getMonth() + 1}`
        }
        else {
            month = `${dateObj.getMonth() + 1}`
        }

        let date;
        if (dateObj.getDate() < 10) {
            date = `0${dateObj.getDate()}`
        } else {
            date = `${dateObj.getDate()}`
        }

        let year = dateObj.getFullYear()

        return `${year}-${month}-${date}`
    }



    const [startdate, setStartDate] = useState(getDate(currentDate))
    const [endDate, setEndDate] = useState(getDate(nextDate))
    const [errors, setErrors] = useState([])

    useEffect(() => {
        dispatch(getSpotsReviews(spotId));
        dispatch(getAllSpots());
        dispatch(loadBookings(spotId))
    }, [dispatch, spotId])

    const onSubmit = (e) => {
        e.preventDefault()

        if (spotsBookingsArr.length) {
            let errorArr = []

            for (let i = 0; i < spotsBookingsArr.length; i++) {
                let booking = spotsBookingsArr[i];
                let bookingStartDate = `${booking.startDate.slice(5, 7)}-${booking.startDate.slice(8, 10)}-${booking.startDate.slice(0, 4)}`
                let bookingEndDate = `${booking.endDate.slice(5, 7)}-${booking.endDate.slice(8, 10)}-${booking.endDate.slice(0, 4)}`

                let modStartDate = `${startdate.slice(5)}-${startdate.slice(0, 4)}`
                let modEndDate = `${endDate.slice(5)}-${endDate.slice(0, 4)}`

                if (startdate === endDate) {
                    errorArr.push(`Start date and end date cannot be the same day.`)
                    setErrors(errorArr)
                    return
                }

                if (modStartDate >= bookingStartDate && modStartDate < bookingEndDate) {
                    // console.log('if')
                    errorArr.push(`The dates ${bookingStartDate} thru ${bookingEndDate} has already been booked.`)
                    setErrors(errorArr)
                    return
                } else if (modEndDate > bookingStartDate && modEndDate <= bookingEndDate) {
                    // console.log('else if')
                    errorArr.push(`The dates ${bookingStartDate} thru ${bookingEndDate} has already been booked.`)
                    setErrors(errorArr)
                    return
                }
            }
        }

        const payload = {
            "spotId": spot.id,
            "startDate": startdate,
            "endDate": endDate
        }



        dispatch(createBooking(payload))
        dispatch(loadUsersBookings())
        return history.push('/bookings')
        // dispatch(loadBookings(spotId))

        // setErrors([])
        // setStartDate(`yyyy-mm-dd`)
        // setEndDate(`yyyy-mm-dd`)

        // return history.push('/bookings')
    }
    // console.log(`Enddate: ${endDate}       startdate: ${startdate}`)
    let nights = ((new Date(endDate) - new Date(startdate)) / 86400000)

    // const getNewMin = () => {
    //     let currStartDate = new Date(startdate)
    //     let newStartDate = new Date(currStartDate.getTime() + (86400000 * 2))

    //     // console.log(`newStartDate ${newStartDate}`)

    //     let newMonth;
    //     if (currentDate.getMonth() < 9) {
    //         newMonth = `0${newStartDate.getMonth() + 1}`
    //     }
    //     else {
    //         newMonth = `${newStartDate.getMonth() + 1}`
    //     }
    //     let newDate;
    //     if (newStartDate.getDate() < 10) {
    //         newDate = `0${newStartDate.getDate()}`
    //     } else {
    //         newDate = `${newStartDate.getDate()}`
    //     }

    //     let newYear = `${newStartDate.getFullYear()}`
    //     // setEndDate(`${year}-${month}-${date}`)
    //     // console.log(`${newYear}-${newMonth}-${newDate}`)
    //     return `${newYear}-${newMonth}-${newDate}`
    // }

    return (
        <>
            {spot && reviews && (
                <div className='page-div'>
                    <div className="spot">
                        <h1 className='header'>{spot.name}</h1>
                        <div className="description-container">
                            <p className="d1">
                                <span className="spot-details-star">&#9733;</span>
                                {!!spot.avgRating ? spot.avgRating.toFixed(2) : "0"} - {reviews.length} Reviews
                            </p>
                            <p className="d2">{spot.city}, {spot.state ? `${spot.state}, ${spot.country} ` : spot.country} </p>
                        </div>
                        <div className='image-container'>
                            <div className='main-image-container'>
                                <img src={spot.previewImage} alt={"Preview Spot"} className="i1" />
                            </div>
                            <div className='other-image-container'>
                                <img src={spot.previewImage} alt={"Preview Spot"} className="i2" />
                                <img src={spot.previewImage} alt={"Preview Spot"} className="i3" />
                            </div>
                            <div className='other-image-container'>
                                <img src={spot.previewImage} alt={"Preview Spot"} className="i4" />
                                <img src={spot.previewImage} alt={"Preview Spot"} className="i5" />
                            </div>
                        </div>
                        <div className='bottom-container'>
                            <div className='spot-description-container'>
                                <p className='spot-description'>{spot.description} </p>
                            </div>
                            <div className='bookings'>
                                <form onSubmit={onSubmit} className="bookingForm">
                                    <div className='booking-description'>
                                        <p><span className="price">${spot.price}</span> night</p>
                                        <p className="spot-details-d1">
                                            <span className="all-spots-star">&#9733;</span>
                                            {!!spot.avgRating ? spot.avgRating.toFixed(2) : "0"} - {reviews.length} Reviews
                                        </p>
                                    </div>
                                    <div className='calendar'>
                                        <div className="CheckIn">
                                            <span style={{ paddingRight: '20px' }}>
                                                Check In:
                                            </span>
                                            <input
                                                type={"date"}
                                                value={startdate}
                                                min={getDate(currentDate)}
                                                onChange={(e) => setStartDate(e.target.value)}
                                            />
                                        </div>
                                        <div className="CheckOut">
                                            <span style={{ paddingRight: '8px' }}>
                                                Check Out:
                                            </span>
                                            <input
                                                type={"date"}
                                                value={endDate}
                                                min={getDate(nextDate)}
                                                onChange={(e) => setEndDate(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            {
                                                !!errors.length && (
                                                    errors.map((error, idx) => (
                                                        <div key={idx} id="bookingError">
                                                            {error}
                                                        </div>
                                                    ))
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className='calculation'>
                                        <div className='left'>
                                            <p className='b-p'> ${spot.price} x {nights} nights</p>
                                        </div>
                                        <div className='right'>
                                            <p className='b-p'> ${spot.price * nights} </p>
                                        </div>
                                    </div>
                                    <div className='total'>
                                        <div>
                                            <p>Total</p>
                                        </div>
                                        <div>
                                            <p>${spot.price * nights}</p>
                                        </div>
                                    </div>
                                    {
                                        user && user.id !== spot.ownerId &&
                                        <button type='submit' className='submitBooking'>Book</button>
                                    }
                                </form>
                            </div>
                        </div>
                        <div className='reviews-container'>
                            <div className='reviews-header'>
                                <h3>
                                    <span className="spot-details-reviews-star">&#9733; </span>
                                    {!!spot.avgRating ? spot.avgRating.toFixed(2) : "0"} - {reviews.length} Reviews
                                </h3>
                                {user && user.id !== spot.ownerId && (<AddReviewModal />)}
                            </div>
                            <div className='review-grid'>
                                {reviews.map(review => (
                                    <div className='review' key={review.id} >
                                        <div className='review-user'>
                                            <div className='profile'>
                                                <i className="fas fa-user-circle fa-2x" />
                                            </div>
                                            <div className='user-name'>
                                                <p className='review-username'>{review.User?.firstName} {review.User?.lastName}</p>
                                                <p className='review-time'>{review.createdAt.slice(0, 10)}</p>
                                            </div>
                                        </div>
                                        <div className='review-description'>
                                            <p>{review.review}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default NoUserSpotDetails;
