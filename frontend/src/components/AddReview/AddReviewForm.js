import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { addAReview, getSpotsReviews } from '../../store/ReviewsReducer';
import { getASpot } from '../../store/spotsReducer';
import './AddReview.css'


function AddReview({ setShowModal }) {
    const [review, setReview] = useState('');
    const [stars, setStars] = useState('');
    const { spotId } = useParams();
    // console.log(spotId)

    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = (e) => {
        e.preventDefault();

        const payload = {
            review, stars, spotId
        }

        dispatch(addAReview(payload));
        dispatch(getSpotsReviews(payload.spotId));
        dispatch(getASpot(payload.spotId))
        setShowModal(false)
        history.push(`/spots/${spotId}`);
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <h1>Your Review For Spot</h1>
                <div>
                    <label htmlFor="stars">stars:</label>
                    <select
                        type='number'
                        value={stars}
                        onChange={(e) => setStars(e.target.value)}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="review">review:</label>
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}>
                    </textarea>
                </div>
                <button type="submit">Submit Review</button>
            </div>
        </form>
    )
}

export default AddReview;
