import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import AddSpotFormModal from "./AddSpotFormModal";
import { getAUsersSpots } from "../../store/spotsReducer";
import EditSpotFormModal from "../EditSpot/EditSpotFromModal";
import { deleteSpotAtId } from "../../store/spotsReducer";
import './UserSpot.css'


function UserSpots() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const allSpots = useSelector((state) => (state.spots));
    const userSpots = Object.values(allSpots);

    useEffect(() => {
        dispatch(getAUsersSpots());
    }, [dispatch]);

    const deleteSpot = async (spotId) => {
        await dispatch(deleteSpotAtId(spotId));
        await dispatch(getAUsersSpots());
    }

    if (!sessionUser) return (history.push('/'));

    return (
        <>
            {allSpots && sessionUser && (
                <div className="user-spots-page-container">
                    <div className="user-spots-header-container">
                        <h1 className="users-spot-header ushead1">Hello {sessionUser.firstName}, welcome to AirTnt!</h1>
                        <div className="listing-mid-div">
                            <h2 className="users-spot-header ushead2">Your active listings</h2>
                            <AddSpotFormModal />
                        </div>
                    </div>
                    <div className="user-spots-container">
                        {userSpots?.map(({ id, previewImage, price, name, description, city, state, country }) => (
                            <div key={id} className="listings-spot-container">
                                <div className="listing-details" onClick={() => history.push(`/spots/${id}`)}>
                                    <p className="listing-name">{name}</p>
                                    <img src={previewImage} alt="Listing" className="listing-images" />
                                    <div className="listing-body">
                                        <p className="l-p"><span className="edit-location">{city}, {state ? state : country} </span></p>
                                        <p className="l-p"><span className="listing-price">${price}</span> night </p>
                                    </div>
                                    <div className="edit-description">
                                        <p>{description}</p>
                                    </div>
                                </div>
                                <div className="buttons-container">
                                    <EditSpotFormModal userSpot={userSpots.find(spot => spot.id === id)} />
                                    <button className="delete" onClick={() => deleteSpot(id)} >Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
            }
        </>
    )
}

export default UserSpots;
