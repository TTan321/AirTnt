import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateSpot } from '../../store/spotsReducer';
import LoginFormModal from '../LoginFormModal/LoginForm';

function EditSpot() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const spot = useSelector((state) => (state.spots[spotId]));

    const [name, setName] = useState(spot.name);
    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [country, setCountry] = useState(spot.country);
    const [lat, setLat] = useState(spot.lat);
    const [lng, setLng] = useState(spot.lng);
    const [description, setDescription] = useState(spot.description);
    const [price, setPrice] = useState(spot.price);
    const [previewImageUrl, setPreviewImageUrl] = useState(spot.previewImage);

    const onSubmit = (e) => {
        e.preventDefault();

        const ownerId = sessionUser.id;
        const payload = {
            "id": spotId, name, address, city, country, state, lat, lng, description, price, ownerId, previewImageUrl
        }

        const editedSpot = dispatch(updateSpot(payload));
        console.log("EDITED SPOT DATA ", editedSpot)
        // spot.previewImage =
        // history.push(`/spots/${spotId}`)
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <h1>Edit your listing</h1>
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
                <button type="submit">Submit Property Details</button>
            </div>
        </form>
    )
}

export default EditSpot;
