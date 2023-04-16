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
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState("");
    // const [previewImageUrl, setPreviewImageUrl] = useState('');
    const [image, setImage] = useState(null);
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
            name, address, city, country, state, lat, lng, description, price, ownerId, image
        }

        if (name.length < 50) {
            await dispatch(createSpot(payload));
            await dispatch(getAUsersSpots());
            setShowModal(false);
        }
    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };


    return (
        <>
            <form className="add-spot-form" onSubmit={onSumbit}>
                <div className="add-spot-form-container">
                    <div className="add-spot-header">
                        <i className="fas fa-times add-spot-cancel" onClick={() => setShowModal(false)} />
                        <h1 className="add-spot-title">Add new listing</h1>
                    </div>
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
                        {/* <input
                            className='edit-spot-inputs'
                            type='text'
                            value={previewImageUrl}
                            placeholder="Image Url for Preview"
                            onChange={(e) => setPreviewImageUrl(e.target.value)}>
                        </input> */}
                        <input
                            type="file"
                            onChange={updateFile}
                        />
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
                    <div className="add-spot-errors">
                        {errors.map((error, idx) => (
                            <p key={idx} >{error}</p>
                        ))}
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
