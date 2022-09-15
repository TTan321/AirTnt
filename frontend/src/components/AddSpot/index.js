import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import AddSpotFormModal from "./AddSpotFormModal";
import { getAllSpots } from "../../store/spotsReducer";
import EditSpotFormModal from "../EditSpot/EditSpotFromModal";
import './UserSpot.css'


function UserSpots() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const allSpots = useSelector((state) => (state.spots))
    const allSpotsArray = Object.values(allSpots)
    const userSpots = allSpotsArray.filter((spot) => spot.ownerId === sessionUser?.id)

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch,])


    return (
        <>
            {userSpots && (
                <div className="user-spots-container">
                    <div>
                        <h1 className="users-spot-header ushead1">Hello {sessionUser.firstName}, welcome to AirTnt!</h1>
                        <div className="listing-mid-div">
                            <h2 className="users-spot-header ushead2">Your active listings</h2>
                            <AddSpotFormModal />
                        </div>
                        <div className="container">
                            {userSpots?.map(({ id, previewImage, avgRating, price, name }) => (
                                <div key={id} className="listings-spot-container">
                                    <div className="listing-details" onClick={() => history.push(`/spots/${id}`)}>
                                        <p className="listing-name">{name}</p>
                                        <img src={previewImage} alt="Listing" className="listing-images" />
                                        <div className="listing-body">
                                            <p className="l-p"><span className="listing-price">${price}</span> night </p>
                                            <p className="listing-avgRating"><i className="fas fa-star" /> {avgRating ? avgRating : 0}</p>
                                        </div>
                                    </div>
                                    <div className="buttons-container">
                                        <EditSpotFormModal />
                                        <button className="delete">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default UserSpots;
