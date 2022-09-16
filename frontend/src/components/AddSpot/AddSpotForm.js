import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { createSpot, getAUsersSpots } from "../../store/spotsReducer";
import LoginFormModal from "../LoginFormModal/LoginForm";
import './AddSpotForm.css'
import { useHistory } from "react-router-dom";

function AddSpotForm({ setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [previewImageUrl, setPreviewImageUrl] = useState('');
    const [ownerId, setOwnerId] = useState(0);

    if (!sessionUser) {
        return <LoginFormModal />
    }


    const onSumbit = async (e) => {
        e.preventDefault();

        setOwnerId(sessionUser.id)

        const payload = {
            name, address, city, country, state, lat, lng, description, price, ownerId, previewImageUrl
        }

        await dispatch(createSpot(payload));
        setShowModal(false);
        await dispatch(getAUsersSpots());
        history.push('/hostspot');
        // console.log("NEW SPOT IS :", newSpot)

        // const getNewSpot = async () => {
        //     const spot = await newSpot;
        //     console.log("SPOT IS :", spot)
        //     console.log("Redirecting to new spot page")
        //     if (spot) {
        //     }
        //     // return <Redirect to={`/spots/${spot?.id}`} />
        //     // return spot;
        // }
        // getNewSpot();
        // const spot = getNewSpot();
        // if (spot) {
        // }
    }


    return (
        <>
            <div className="add-spot-header">
                <p className="cancel-button" onClick={() => setShowModal(false)}><i className="fas fa-times" /> </p>
                <h1 className="h1">Add new listing</h1>
            </div>
            <form className="add-spot-form" onSubmit={onSumbit}>
                <div>
                    <h2>Host your property</h2>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}>
                        </input>
                    </div>
                    <div>
                        <label htmlFor="address">Address:</label>
                        <input
                            type='text'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}>
                        </input>
                    </div>
                    <div>
                        <label htmlFor="city">City:</label>
                        <input
                            type='text'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}>
                        </input>
                    </div>
                    <div>
                        <label htmlFor="state">State:</label>
                        <input
                            type='text'
                            value={state}
                            onChange={(e) => setState(e.target.value)}>
                        </input>
                    </div>
                    <div>
                        <label htmlFor="country">Country:</label>
                        <input
                            type='text'
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}>
                        </input>
                    </div>
                    <div>
                        <label htmlFor="lat">Latitude</label>
                        <input
                            type='number'
                            value={lat}
                            onChange={(e) => setLat(e.target.value)}>
                        </input>
                    </div>
                    <div>
                        <label htmlFor="lng">Longitude:</label>
                        <input
                            type='number'
                            value={lng}
                            onChange={(e) => setLng(e.target.value)}>
                        </input>
                    </div>
                    <div>
                        <label htmlFor="description">Description:</label>
                        <input
                            type='text'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}>
                        </input>
                    </div>
                    <div>
                        <label htmlFor="price">Price:</label>
                        <input
                            type='number'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}>
                        </input>
                    </div>
                    <div>
                        <label htmlFor="previewImageUrl">Image Url for Preview:</label>
                        <input
                            type='text'
                            value={previewImageUrl}
                            onChange={(e) => setPreviewImageUrl(e.target.value)}>
                        </input>
                    </div>
                    <button className="submit" type="submit">Submit</button>
                </div>
            </form>
        </>
    )
}


export default AddSpotForm;
