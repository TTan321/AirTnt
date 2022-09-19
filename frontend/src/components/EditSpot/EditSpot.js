import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSpot } from '../../store/spotsReducer';
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

    const onSubmit = (e) => {
        e.preventDefault();

        const ownerId = sessionUser.id;
        const payload = {
            "id": userSpot.id, name, address, city, country, state, lat, lng, description, price, ownerId, previewImageUrl
        }

        const editedSpot = dispatch(updateSpot(payload));
        console.log("EDITED SPOT DATA ", editedSpot)
        setShowModal(false);
    }

    return (
        <form className='spot-form' onSubmit={onSubmit}>
            <i className="fas fa-times cancel" onClick={() => setShowModal(false)} />
            <div className='edit-spot-form-container'>
                <div className='edit-spot-header'>
                    <h1 className='spot-header'>Edit listing for {userSpot.name}</h1>
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
                    <input
                        className='textbox'
                        type='text'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}>
                    </input>
                </div>
                <div className='edit-spot-buttons'>
                    <button className='listing-submit' type="submit">Submit Changes</button>
                </div>
            </div>
        </form>
    )
}

export default EditSpotForm;
