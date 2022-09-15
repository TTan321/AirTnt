import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteAReview, getUserReviews } from "../../store/ReviewsReducer";
import "./UserReviews.css";

function UserReviews() {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user);
    const userReviews = useSelector(state => state.reviews);
    const reviewsArray = Object.values(userReviews);
    // console.log("userReviews: ", reviewsArray[0].Images[0].url)


    useEffect(() => {
        dispatch(getUserReviews())
    }, [dispatch]);

    if (!user) return history.push('/');

    const deleteReview = (id) => {
        dispatch(deleteAReview(id));
    }



    if (!userReviews) return null;
    // else if (reviewsArray && !reviewsArray[0].Spot) return null;
    return (
        <>
            {reviewsArray && (
                <div className="user-reviews-page">
                    <div className="reviews-title">
                        <h1>Your past reviews</h1>
                    </div>
                    <div className="user-reviews">
                        {reviewsArray.map(({ id, review, stars, createdAt, Spot: { name, city, state, country } }) => (
                            < div className="review-container" key={id} >
                                <div className="user-review-header">
                                    <h2 className="spot-name">{name}</h2>
                                    <p className="review-address">{city} {state}, {country}</p>
                                </div>
                                <div className="review-rating">
                                    <span>
                                        <i className="fas fa-star" /> {stars}
                                    </span>
                                    {createdAt.slice(0, 10)}
                                </div>
                                <div className="review-body">{review}</div>
                                <div className="delete-review-container">
                                    <button className="delete-review-button" onClick={() => deleteReview(id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
            }
        </>
    );
};

export default UserReviews;
