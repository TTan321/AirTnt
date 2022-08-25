import { NavLink, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteSpotAtId } from "../../store/spotsReducer";

import './SpotDetails.css'

const SpotDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();

    const spot = useSelector((state) => (state.spots[spotId]));
    const sessionUser = useSelector(state => state.session.user);

    const onClick = (e) => {
        e.previewDefault();

        return <NavLink to="/spots/:spotId/edit" />
    }


    if (sessionUser && sessionUser.id === spot.ownerId) {
        const deleteSpot = (e) => {
            e.preventDefault();

            dispatch(deleteSpotAtId(spotId))
            history.push('/hostspot')
        }
        return (
            <div className="spot">
                <h1>{spot.name}</h1>
                <img src={spot.previewImage} className="image" alt={"Spot preview"} />
                <p>{spot.description} ${spot.price} night Rating {spot.avgRating}</p>
                <button>Edit</button>
                <button onClick={deleteSpot}>Delete</button>
            </div>
        )
    }
    else {
        return (
            <div className="spot">
                <h1>{spot.name}</h1>
                <img src={spot.previewImage} className="image" alt={"Spot preview"} />
                <p>{spot.description} ${spot.price} night Rating {spot.avgRating}</p>
            </div>
        )
    }
}

export default SpotDetails;
