import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSpot, getAUsersSpots } from '../../store/spotsReducer';
import "./EditSpot.css"


function EditSpotForm({ userSpot, setShowModal }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const [name, setName] = useState(userSpot.name);
    const [address, setAddress] = useState(userSpot.address);
    const [city, setCity] = useState(userSpot.city);
    const [state, setState] = useState(userSpot.state);
    const [country, setCountry] = useState(userSpot.country);
    const [lat, setLat] = useState(userSpot.lat);
    const [lng, setLng] = useState(userSpot.lng);
    const [description, setDescription] = useState(userSpot.description);
    const [price, setPrice] = useState(userSpot.price);
    const [previewImageUrl, setPreviewImageUrl] = useState(userSpot.previewImage);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const validateErrors = [];
        if (address.length === 0) validateErrors.push("Street address is required");
        if (city.length === 0) validateErrors.push("City is required");
        if (state.length === 0) validateErrors.push("State is required");
        if (country.length === 0) validateErrors.push("Country is required");
        if (name.length > 50) validateErrors.push("Name must be less than 50 characters");
        if (description.length === 0) validateErrors.push("Description is required");
        if (price === null) validateErrors.push("Price per day is required");
        if (lat === null) validateErrors.push("Latitude is required")
        if (lng === null) validateErrors.push("Longitude is required")
        setErrors(validateErrors);
    }, [address, city, state, country, name, lat, lng, description, price])

    const onSubmit = async (e) => {
        e.preventDefault();

        const ownerId = sessionUser.id;
        const payload = {
            "id": userSpot.id, name, address, city, country, state, lat, lng, description, price, ownerId, previewImageUrl
        }


        await dispatch(updateSpot(payload));
        await dispatch(getAUsersSpots());
        setShowModal(false);

    }

    return (
        <form className='spot-form' onSubmit={onSubmit}>
            <div className='edit-spot-form-container'>
                <div className='edit-spot-header'>
                    <i className="fas fa-times edit-spot-cancel" onClick={() => setShowModal(false)} />
                    <h1 className='edit-spot-title'>Edit listing</h1>
                </div>
                <h2 id="spot-name">{name} Details:</h2>
                <input
                    id="name-field"
                    className='edit-spot-inputs'
                    type='text'
                    value={name}
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}>
                </input>
                <div className='location-div'>
                    <div className='address-div'>
                        <input
                            className='edit-spot-inputs'
                            type='text'
                            value={address}
                            placeholder="Address"
                            onChange={(e) => setAddress(e.target.value)}>
                        </input>
                    </div>
                    <div className='location-div2'>
                        <div className='city'>
                            <input
                                id="city"
                                className='edit-spot-inputs'
                                type='text'
                                value={city}
                                placeholder="City"
                                onChange={(e) => setCity(e.target.value)}>
                            </input>
                        </div>
                        <div className='state'>
                            <input
                                className='edit-spot-inputs'
                                type='text'
                                value={state}
                                placeholder="State"
                                onChange={(e) => setState(e.target.value)}>
                            </input>
                        </div>
                        <div className='country'>
                            <input
                                className='edit-spot-inputs'
                                type='text'
                                value={country}
                                placeholder="Country"
                                onChange={(e) => setCountry(e.target.value)}>
                            </input>
                        </div>
                    </div>
                </div>
                <div className='lat-long-div'>
                    <div className='lat'>
                        <input
                            className='edit-spot-inputs'
                            type='number'
                            value={lat}
                            placeholder="Latitude"
                            onChange={(e) => setLat(e.target.value)}>
                        </input>
                    </div>
                    <div className='long'>
                        <input
                            className='edit-spot-inputs'
                            type='number'
                            value={lng}
                            placeholder="Longitude"
                            onChange={(e) => setLng(e.target.value)}>
                        </input>
                    </div>
                </div>
                <div className='price-div'>
                    <div className='price-field'>
                        <input
                            className='edit-spot-inputs'
                            type='number'
                            value={price}
                            placeholder="Price"
                            onChange={(e) => setPrice(e.target.value)}>
                        </input>
                    </div>
                </div>
                <div>
                    <input
                        className='edit-spot-inputs'
                        type='text'
                        value={previewImageUrl}
                        placeholder="Image Url for Preview"
                        onChange={(e) => setPreviewImageUrl(e.target.value)}>
                    </input>
                </div>
                <div>
                    <textarea
                        rows="5"
                        cols="51"
                        className='textbox'
                        value={description}
                        placeholder="Description"
                        onChange={(e) => setDescription(e.target.value)}>
                    </textarea>
                </div>
                <div className="edit-spot-errors">
                    {errors.map((error, idx) => (
                        <p key={idx} >{error}</p>
                    ))}
                </div>
                <div className='edit-spot-buttons'>
                    <button className='listing-submit' type="submit" disabled={!!errors.length} >Submit Changes</button>
                </div>
            </div>
        </form>
    )
}

export default EditSpotForm;
