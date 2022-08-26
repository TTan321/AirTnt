import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteSpotAtId } from "../../store/spotsReducer";
import AddSpotFormModal from "../AddSpot/AddSpotFormModal";
import { getASpot } from "../../store/spotsReducer";
import './SpotDetails.css'
import { getSpotsReviews } from "../../store/ReviewsReducer";
import { restoreCSRF } from "../../store/csrf";

const SpotDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();

    const spot = useSelector((state) => (state.spots[spotId]));
    const sessionUser = useSelector(state => state.session.user);
    let reviews = useSelector((state) => (state.reviews))
    reviews = Object.values(reviews);
    // console.log("SPOT ", spot)
    // console.log("REVIEWS", reviews);

    let count = reviews.length

    useEffect(() => {
        dispatch(getASpot(spotId))
    }, [dispatch])

    useEffect(() => {
        dispatch(getSpotsReviews(spotId))
    }, [dispatch])


    if (sessionUser && sessionUser.id === spot?.ownerId) {


        const edit = (e) => {
            e.preventDefault();

            return <AddSpotFormModal />
        }

        const deleteSpot = (e) => {
            e.preventDefault();

            dispatch(deleteSpotAtId(spotId))
            history.push('/hostspot')
        }

        return (
            <>
                <div className="spot">
                    <div>
                        <h1>{spot?.name}</h1>
                        <img src={spot?.previewImage} className="image" alt={"Spot preview"} />
                        <p>{spot?.description} ${spot?.price} night</p>
                        <button onClick={edit}>Edit</button>
                        <button onClick={deleteSpot}>Delete</button>
                    </div>
                    <div className="reviews">
                        <h2>Stars {spot?.avgRating} {count} Reviews</h2>
                        {reviews?.map(({ id, User, createdAt, review }) => (
                            <div key={id}>
                                {User.firstName} {createdAt}
                                <div>{review}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <div className="spot">
                    <div>
                        <h1>{spot?.name}</h1>
                        <img src={spot?.previewImage} className="image" alt={"Spot preview"} />
                        <p>{spot?.description} ${spot?.price} night Rating {spot?.avgRating}</p>
                    </div>
                    <div className="reviews">
                        <h2>Stars {spot?.avgRating} {count} Reviews</h2>
                        {reviews?.map(({ id, User, createdAt, review }) => (
                            <div key={id} className="review">
                                <div className="user">
                                    <div>{User.firstName} {User.lastName}</div>
                                    <div> {createdAt}</div>
                                </div>
                                <div className="description">{review}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        )
    }
}

export default SpotDetails;
