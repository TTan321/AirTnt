import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { addAReview, getSpotsReviews } from '../../store/ReviewsReducer';
import { getASpot } from '../../store/spotsReducer';
import './AddReview.css'


function AddReview({ setShowModal }) {
    const dispatch = useDispatch();
    const { spotId } = useParams();

    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState([]);


    const onSubmit = async (e) => {
        e.preventDefault();

        const validateErrors = [];
        if (stars === 0) validateErrors.push("Star rating is required.");
        if (review.length === 0) validateErrors.push("Review cannot be empty.");
        if (review.length < 30) validateErrors.push("Review be atleast 30 characters long.");
        await setErrors(validateErrors);

        const payload = {
            review, stars, spotId
        }

        console.log(errors.length)
        if (review.length > 29) {
            await dispatch(addAReview(payload));
            await dispatch(getSpotsReviews(payload.spotId));
            await dispatch(getASpot(payload.spotId));
            setShowModal(false);
        };
    };

    return (
        <form onSubmit={onSubmit} className="review-form">
            <div className='review-form-header'>
                <i className="fas fa-times cancel-button" onClick={() => setShowModal(false)} />
                <h2 className='review-title'>Add your review here</h2>
            </div>
            <div className='star-container'>
                <input
                    className='star-inputs'
                    type="checkbox"
                    id="r5"
                    name="stars"
                    value={5}
                    onChange={(e) => setStars(e.target.value)}
                    checked={+stars >= 5 ? true : false}
                />
                <label className='star-label' htmlFor="r5">&#9733;</label>
                <input
                    className='star-inputs'
                    type="checkbox"
                    id="r4"
                    name="stars"
                    value={4}
                    onChange={(e) => setStars(e.target.value)}
                    checked={+stars >= 4 ? true : false}
                />
                <label className='star-label' htmlFor="r4">&#9733;</label>
                <input
                    className='star-inputs'
                    type="checkbox"
                    id="r3"
                    name="stars"
                    value={3}
                    onChange={(e) => setStars(e.target.value)}
                    checked={+stars >= 3 ? true : false}
                />
                <label className='star-label' htmlFor="r3">&#9733;</label>
                <input
                    className='star-inputs'
                    type="checkbox"
                    id="r2"
                    name="stars"
                    value={2}
                    onChange={(e) => setStars(e.target.value)}
                    checked={+stars >= 2 ? true : false}
                />
                <label className='star-label' htmlFor="r2">&#9733;</label>
                <input
                    className='star-inputs'
                    type="checkbox"
                    id="r1"
                    name="stars"
                    value={Number(1)}
                    onChange={(e) => setStars(e.target.value)}
                    checked={+stars >= 1 ? true : false}
                />
                <label className='star-label' htmlFor="r1">&#9733;</label>
            </div>
            <div className='review-div'>
                <label htmlFor="review" />
                <textarea
                    className='review-textbox'
                    rows="5"
                    cols="51"
                    value={review}
                    placeholder="Type Review here"
                    onChange={(e) => setReview(e.target.value)}>
                </textarea>
            </div>
            <div className='review-errors-div'>
                {errors.map((error, idx) => (
                    <p key={idx} >{error}</p>
                ))}
            </div>
            <button className='Submit-Review' type="submit">Submit Review</button>
        </form>
    )
}

export default AddReview;
