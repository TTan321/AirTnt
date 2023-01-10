import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getASpot } from "../../store/spotsReducer";
import { getSpotsReviews } from "../../store/ReviewsReducer";
import SpotOwner from "./SpotOwner";
import NotSpotOwner from "./NotSpotOwner";
import './SpotDetails.css'

const SpotDetails = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();

    const sessionUser = useSelector(state => state.session.user);
    const spot = useSelector((state) => (state.spots[spotId]));
    const allReviews = useSelector((state) => (state.reviews))
    const reviews = Object.values(allReviews);


    useEffect(() => {
        dispatch(getASpot(spotId))
    }, [dispatch, spot])

    useEffect(() => {
        dispatch(getSpotsReviews(spotId))
    }, [dispatch, reviews.length])

    if (sessionUser && sessionUser?.id === spot?.ownerId) {
        <SpotOwner spot={spot} reviews={reviews} />
    }
    else {
        <NotSpotOwner reviews={reviews} sessionUser={sessionUser} spot={spot} spotId={spotId} />
    }
}

export default SpotDetails;
