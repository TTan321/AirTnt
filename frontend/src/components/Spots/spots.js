import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllSpots } from "../../store/spotsReducer";
import './spots.css';

function Spots() {
    const history = useHistory();
    const dispatch = useDispatch();

    const allSpots = useSelector((state) => (state.spots));
    const spots = Object.values(allSpots);

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    return (
        <div className="outer-spots-container">
            <div className="all-spots-container">
                {spots.map(({ id, previewImage, city, state, avgRating, price }) => (
                    <div onClick={() => history.push(`/spots/${id}`)} key={id} className="spot-container">
                        <img src={previewImage} alt={"Preview Spot"} className="images" />
                        <div className="spotsDescription">
                            <p className="allSpotsP1">{city}, {state}</p>
                            <p className="allSpotsP2">
                                <span className="all-spots-star"> &#9733;</span>
                                &nbsp;{!!avgRating ? avgRating.toFixed(2) : "0"}
                            </p>
                        </div>
                        <p className="allSpotsP3"><span className="price">${price}</span> night</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Spots;
