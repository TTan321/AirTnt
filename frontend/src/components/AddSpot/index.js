import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import AddSpotFormModal from "./AddSpotFormModal";
import { getAllSpots } from "../../store/spotsReducer";
import LoginFormModal from "../LoginFormModal/LoginForm";
import './UserSpot.css'


function UserSpots() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const allSpots = useSelector((state) => (state.spots))
    const allSpotsArray = Object.values(allSpots)
    const userSpots = allSpotsArray.filter((spot) => spot.ownerId === sessionUser?.id)

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch,])

    if (!sessionUser) {
        return <LoginFormModal />
    }
    else {

        return (
            <>
                <div>
                    <h1>{sessionUser.firstName}'s active listings</h1>
                    <AddSpotFormModal />
                </div>
                <div className="container">
                    {userSpots?.map(({ id, previewImage, city, state, avgRating, price }) => (
                        <NavLink to={`/spots/${id}`} key={id} className="spot-container">
                            <img src={previewImage} alt={""} className="images" />
                            <p>{city}, {state} stars{avgRating}</p>
                            <p>${price} night</p>
                        </NavLink>
                    ))}
                </div>
            </>
        )
    }
}

export default UserSpots;
