import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllSpots } from "../../store/spotsReducer";
import './spots.css';

function Spots() {
    const dispatch = useDispatch();
    const allSpots = useSelector((state) => (state.spots))
    console.log("ALLSPOTS STATE: ", allSpots)
    const allSpotsArray = Object.values(allSpots)


    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])



    return (
        <>
            <div className="container">
                {allSpotsArray?.map(({ id, previewImage, city, state, avgRating, price }) => (
                    <NavLink to={`/spots/${id}`} key={id} className="spot-container">
                        <img src={previewImage} alt={""} className="images" />
                        <p>{city}, {state} stars{avgRating?.toFixed(2)}</p>
                        <p>${price} night</p>
                    </NavLink>
                ))}
            </div>
        </>
    )
}

export default Spots;
