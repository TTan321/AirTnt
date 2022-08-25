import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route } from "react-router-dom";
import { getAllSpots } from "../../store/spotsReducer";
import SpotDetails from "../SpotDetails/SpotDetails";
import './spots.css';

function Spots() {
    const dispatch = useDispatch();
    const allSpots = useSelector((state) => (state.spots))
    const allSpotsArray = Object.values(allSpots)

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])



    return (
        <>
            <div className="Spots">
                {allSpotsArray?.map(({ id, previewImage, city, state, avgRating, price }) => (
                    <NavLink to={`/spots/${id}`} key={id} className="Spot">
                        <img src={previewImage} className="images" />
                        <p>{city}, {state} stars{avgRating}</p>
                        <p>${price} night</p>
                    </NavLink>
                ))}
            </div>
        </>
    )
}

export default Spots;
