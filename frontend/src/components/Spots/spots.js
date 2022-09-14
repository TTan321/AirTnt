import React from "react";
import { useHistory } from "react-router-dom";
import './spots.css';

function Spots({ spots }) {
    const history = useHistory();

    return (
        <div className="outer-spots-container">
            <div className="all-spots-container">
                {spots.map(({ id, previewImage, city, state, avgRating, price }) => (
                    <div onClick={() => history.push(`/spots/${id}`)} key={id} className="spot-container">
                        <img src={previewImage} alt={"Preview Spot"} className="images" />
                        <div className="spotsDescription">
                            <p className="allSpotsP1">{city}, {state}</p>
                            <p className="allSpotsP2">
                                <span className="all-spots-star"><i className="fas fa-star" />
                                </span> {!!avgRating ? avgRating.toFixed(2) : "0"}
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
