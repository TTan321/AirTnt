import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { csrfFetch } from '../../store/csrf';
import { getAllSpots, loadSpots } from "../../store/spotsReducer";
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
                {allSpotsArray?.map(({ id, previewImage, city, state, avgRating }) => (
                    <div key={id}>
                        <div className="Spot">
                            {previewImage}
                            <p>{city}, {state} stars{avgRating}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Spots;
