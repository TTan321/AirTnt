import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSpotsReviews } from '../../store/ReviewsReducer';
import { getAllSpots, getASpot } from '../../store/spotsReducer';
import './SpotDetails.css'

function NoUserSpotDetails() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector((state) => (state.spots[spotId]));

    const allReviews = useSelector((state) => (state.reviews))
    const reviews = Object.values(allReviews);

    console.log(reviews)

    useEffect(() => {
        dispatch(getAllSpots());
        dispatch(getSpotsReviews(spotId));
    }, [dispatch, spotId])

    return (
        <>
            {spot && reviews && (
                <div className='page-div'>
                    <div className="spot">
                        <h1 className='header'>{spot.name}</h1>
                        <div className="description-container">
                            <p className="d1"><span className="all-spots-star"><i className="fas fa-star" /> </span> {!!spot.avgRating ? spot.avgRating.toFixed(2) : "0"} - {reviews.length} Reviews</p>
                            <p className="d2">{spot.city}, {spot.state}, {spot.country} </p>
                        </div>
                        <div className='image-container'>
                            <img src={spot.previewImage} alt={"Preview Spot"} className="i1" />
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
                            <div className='spot-description'>
                                <p>{spot.description}</p>
                            </div>
                            <div className='bookings'>
                                <p className="price"><span className="price">${spot.price}</span> night</p>
                            </div>
                        </div>
                        <div className='reviews-container'>
                            {reviews.map(review => (
                                <div className='review' key={review.id} >
                                    <div className='review-user'>
                                        <p>{review.User.firstName} {review.User.lastName}</p>
                                    </div>
                                    <div className='review-description'>
                                        <p>{review.review}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default NoUserSpotDetails;
