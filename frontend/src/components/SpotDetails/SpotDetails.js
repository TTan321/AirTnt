import { NavLink, Redirect, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import './SpotDetails.css'

const SpotDetails = () => {
    const { spotId } = useParams();
    console.log(spotId)
    const spot = useSelector((state) => (state.spots[spotId]));
    const sessionUser = useSelector(state => state.session.user);
    console.log(sessionUser)

    const onClick = (e) => {
        e.previewDefault();

        return <NavLink to="/spots/:spotId/edit" />
    }

    return (
        <div className="spot">
            <h1>{spot.name}</h1>
            <img src={spot.previewImage} className="image" alt={"Spot preview"} />
            <p>{spot.description} ${spot.price} night Rating {spot.avgRating}</p>
            <button onclick={onClick}>Edit</button>
        </div>
    )
}

export default SpotDetails;
