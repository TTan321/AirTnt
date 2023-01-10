import { useHistory } from "react-router-dom";
import { AddReviewModal } from "../AddReview/AddReviewModal"
import { deleteAReview } from "../../store/ReviewsReducer";

function NotSpotOwner({ reviews, sessionUser, spot, spotId }) {
    const history = useHistory()

    let count = reviews.length

    let AddReview;
    if (sessionUser && sessionUser?.id !== spot?.ownerId) {
        AddReview = <AddReviewModal />
    }

    let reviewId;
    const removeReview = (e) => {
        e.preventDefault();
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

export default NotSpotOwner
