import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { createSpot, getAUsersSpots } from "../../store/spotsReducer";
import LoginFormModal from "../LoginFormModal/LoginForm";
import './AddSpotForm.css'

function AddSpotForm({ setShowModal }) {
    const dispatch = useDispatch();
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
    const [ownerId, setOwnerId] = useState(sessionUser.id);
    const [errors, setErrors] = useState([]);


    if (!sessionUser) {
        return <LoginFormModal />
    }

    const onSumbit = async (e) => {
        e.preventDefault();

        const validateErrors = [];
        if (address.length === 0) validateErrors.push("Street address is required");
        if (city.length === 0) validateErrors.push("City is required");
        if (state.length === 0) validateErrors.push("State is required");
        if (country.length === 0) validateErrors.push("Country is required");
        if (name.length > 50) validateErrors.push("Name must be less than 50 characters");
        if (description.length === 0) validateErrors.push("Description is required");
        if (price === null || price === 0) validateErrors.push("Price cannot be 0 or empty");
        if (lat === null || lat === 0) validateErrors.push("Latitude cannot be 0 or empty")
        if (lng === null || lng === 0) validateErrors.push("Longitude cannot be 0 or empty")
        setErrors(validateErrors);

        const payload = {
            name, address, city, country, state, lat, lng, description, price, ownerId, previewImageUrl
        }

        if (name.length < 50) {
            await dispatch(createSpot(payload));
            await dispatch(getAUsersSpots());
            setShowModal(false);
        }
        // console.log("NEW SPOT IS :", newSpot)
    }


    return (
        <>
            <form className="add-spot-form" onSubmit={onSumbit}>
                <i className="fas fa-times cancel" onClick={() => setShowModal(false)} />
                <div className="add-spot-form-container">
                    <div className="add-spot-header">
                        <h1 className="h1">Add new listing</h1>
                    </div>
                    <div className="add-spot-errors">
                        {errors.map((error, idx) => (
                            <p key={idx} >{error}</p>
                        ))}
                    </div>
                    <label className="spot-labels" htmlFor="name">Name:</label><br />
                    <input
                        className='edit-spot-inputs'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}>
                    </input>
                    <div className='location-div'>
                        <div className='address-div'>
                            <label className="spot-labels" htmlFor="address">Address:</label>
                            <input
                                className='edit-spot-inputs'
                                type='text'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}>
                            </input>
                        </div>
                        <div className='location-div2'>
                            <div className='city'>
                                <label className="spot-labels" htmlFor="city">City:</label><br />
                                <input
                                    className='edit-spot-inputs'
                                    type='text'
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}>
                                </input>
                            </div>
                            <div className='state'>
                                <label className="spot-labels" htmlFor="state">State:</label>
                                <input
                                    className='edit-spot-inputs'
                                    type='text'
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}>
                                </input>
                            </div>
                            <div className='country'>
                                <label className="spot-labels" htmlFor="country">Country:</label>
                                <input
                                    className='edit-spot-inputs'
                                    type='text'
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}>
                                </input>
                            </div>
                        </div>
                    </div>
                    <div className='lat-long-div'>
                        <div className='lat'>
                            <label className="spot-labels" htmlFor="lat">Latitude:</label>
                            <input
                                className='edit-spot-inputs'
                                type='number'
                                value={lat}
                                onChange={(e) => setLat(e.target.value)}>
                            </input>
                        </div>
                        <div className='long'>
                            <label className="spot-labels" htmlFor="lng">Longitude:</label>
                            <input
                                className='edit-spot-inputs'
                                type='number'
                                value={lng}
                                onChange={(e) => setLng(e.target.value)}>
                            </input>
                        </div>
                    </div>
                    <div className='price-div'>
                        <div className='price-field'>
                            <label className="spot-labels" htmlFor="price">Price:</label><br />
                            <input
                                className='edit-spot-inputs'
                                type='number'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}>
                            </input>
                        </div>
                    </div>
                    <div>
                        <label className="spot-labels" htmlFor="previewImageUrl">Image Url for Preview:</label>
                        <input
                            className='edit-spot-inputs'
                            type='text'
                            value={previewImageUrl}
                            onChange={(e) => setPreviewImageUrl(e.target.value)}>
                        </input>
                    </div>
                    <div>
                        <label className="spot-labels" htmlFor="description">Description:</label>
                        <textarea
                            className='textbox'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}>
                        </textarea>
                    </div>
                    <div className="add-spot-button-div">
                        <button className="add-spot-submit" type="submit" >Submit</button>
                    </div>
                </div>
            </form>
        </>
    )
}


export default AddSpotForm;
