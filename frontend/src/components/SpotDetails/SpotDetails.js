import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteSpotAtId } from "../../store/spotsReducer";
import AddSpotFormModal from "../AddSpot/AddSpotFormModal";
import { getASpot } from "../../store/spotsReducer";
import { deleteAReview, getSpotsReviews } from "../../store/ReviewsReducer";
import AddReviewModal from "../AddReview/AddReviewModal";
import './SpotDetails.css'
import EditSpotFormModal from "../EditSpot/EditSpotFromModal";

const SpotDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();

    const sessionUser = useSelector(state => state.session.user);
    const spot = useSelector((state) => (state.spots[spotId]));
    const allReviews = useSelector((state) => (state.reviews))
    const reviews = Object.values(allReviews);

    console.log("SPOT ", spot)
    // console.log("REVIEWS", reviews);

    let count = reviews.length

    useEffect(() => {
        dispatch(getASpot(spotId))
    }, [dispatch, spot])

    useEffect(() => {
        dispatch(getSpotsReviews(spotId))
    }, [dispatch, reviews.length])

    if (sessionUser && sessionUser?.id === spot?.ownerId) {

        const edit = <EditSpotFormModal />

        const deleteSpot = (e) => {
            e.preventDefault();

            dispatch(deleteSpotAtId(spotId))
            history.push('/hostspot')
        }

        let noReview;
        if (!spot?.avgRating) {
            noReview = "No"
        }

        let reviewsDiv;

        if (!!reviews) {
            reviewsDiv = <div className="reviews">
                <h2>{noReview} Stars {spot.avgRating?.toFixed(2)} {count} Reviews</h2>
                {reviews?.map(({ id, User, createdAt, review, stars }) => (
                    <div key={id}>
                        <div className="user">
                            <div>{User.firstName} {User.lastName}</div>
                            <div className="time"> {createdAt.slice(0, 10)}</div>
                        </div>
                        <div className="description">
                            <div>Rating {stars}</div>
                            <div>{review}</div>
                        </div>
                    </div>
                ))}
            </div>
        }

        return (
            <>
                <div className="spot">
                    <div>
                        <h1>{spot?.name}</h1>
                        <img src={spot?.previewImage} className="image" alt={"Spot preview"} />
                        <p>{spot?.description} ${spot?.price} night</p>
                        {edit}
                        <button onClick={deleteSpot}>Delete</button>
                    </div>
                    {reviewsDiv}
                </div>
            </>
        )
    }
    else {
        let AddReview;
        if (sessionUser && sessionUser?.id !== spot?.ownerId) {
            AddReview = <AddReviewModal />
        }

        let reviewId;
        const removeReview = (e) => {
            e.preventDefault();
            console.log("The review's id to be deleted is: ", typeof reviewId, reviewId)
            dispatch(deleteAReview(reviewId))
            history.push(`/spots/${spotId}`)
        }

        let deleteReview;
        reviews?.filter(review => {
            if (sessionUser && review.userId === sessionUser.id) {
                deleteReview = <button key={review.id} onClick={removeReview}>Delete Review</button>
                reviewId = review.id;
            }
        })
        let noReview;
        if (!spot?.avgRating) {
            noReview = "No"
        }

        return (
            <>
                <div className="spot">
                    <div>
                        <h1>{spot?.name}</h1>
                        <img src={spot?.previewImage} className="image" alt={"Spot preview"} />
                        <p>{spot?.description} ${spot?.price} night Rating {spot?.avgRating?.toFixed(2)}</p>
                    </div>
                    {!!reviews && (
                        <div className="reviews">
                            <h2>{noReview} Stars {spot?.avgRating?.toFixed(2)} - {count} Reviews</h2>
                            {AddReview}
                            {reviews?.map(({ id, User, createdAt, review, stars }) => (
                                <div key={id} className="review">
                                    <div className="user">
                                        <div>{User?.firstName} {User?.lastName}</div>
                                        <div className="time"> {createdAt?.slice(0, 10)}</div>
                                    </div>
                                    <div className="description">
                                        <div>Rating {stars}</div>
                                        <div>{review}</div>
                                    </div>
                                    <div>
                                        {deleteReview}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </>
        )
    }
}

export default SpotDetails;
