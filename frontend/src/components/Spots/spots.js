import React from "react";
import { useHistory } from "react-router-dom";
import star from '../../images/star-favicon.png'
import './spots.css';

function Spots({ spots, user }) {
    const history = useHistory();

    console.log(user)

    const redirect = (id) => {
        history.push(`/spots/${id}`)
    }

    return (
        <div className="all-spots-container">
            {spots.map(({ id, previewImage, city, state, avgRating, price }) => (
                <div onClick={() => redirect(id)} key={id} className="spot-container">
                    <img src={previewImage} alt={"Preview Spot"} className="images" />
                    <div className="spotsDescription">
                        <p className="allSpotsP1">{city}, {state}</p>
                        <p className="allSpotsP2"><span className="all-spots-star"><img src={star} alt="Stars" /> </span> {!!avgRating ? avgRating.toFixed(2) : "0"} </p>
                    </div>
                    <p className="allSpotsP3"><span className="price">${price}</span> night</p>
                </div>
            ))}
        </div>
    )
}

export default Spots;
