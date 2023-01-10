import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getSpotsReviews, getUserReviews, updateReview } from '../../store/ReviewsReducer';
import { getASpot } from '../../store/spotsReducer';
import './AddReview.css'


function EditReview({ setShowModal, id, review, stars, spotId }) {
    const dispatch = useDispatch();

    const [editReview, seteditReview] = useState(review);
    const [rating, setRating] = useState(stars);
    const [errors, setErrors] = useState([]);

    console.log("id: ", id)

    const onSubmit = async (e) => {
        e.preventDefault();

        const validateErrors = [];
        if (rating === 0) validateErrors.push("Star rating is required.");
        if (editReview.length === 0) validateErrors.push("Review cannot be empty.");
        if (editReview.length < 30) validateErrors.push("Review be atleast 30 characters long.");
        await setErrors(validateErrors);

        const payload = {
            "reviewId": id,
            "review": editReview,
            "stars": rating
        }

        console.log(errors.length)
        if (review.length > 29) {
            await dispatch(updateReview(payload));
            await dispatch(getUserReviews())
            setShowModal(false);
        };
    };

    return (
        <form onSubmit={onSubmit} className="review-form">
            <div className='review-form-header'>
                <i className="fas fa-times cancel-button" onClick={() => setShowModal(false)} />
                <h2 className='review-title'>Edit your review here</h2>
            </div>
            <div className='star-container'>
                <input
                    className='star-inputs'
                    type="checkbox"
                    id="r5"
                    name="stars"
                    value={5}
                    onChange={(e) => setRating(e.target.value)}
                    checked={+rating >= 5 ? true : false}
                />
                <label className='star-label' htmlFor="r5">&#9733;</label>
                <input
                    className='star-inputs'
                    type="checkbox"
                    id="r4"
                    name="stars"
                    value={4}
                    onChange={(e) => setRating(e.target.value)}
                    checked={+rating >= 4 ? true : false}
                />
                <label className='star-label' htmlFor="r4">&#9733;</label>
                <input
                    className='star-inputs'
                    type="checkbox"
                    id="r3"
                    name="stars"
                    value={3}
                    onChange={(e) => setRating(e.target.value)}
                    checked={+rating >= 3 ? true : false}
                />
                <label className='star-label' htmlFor="r3">&#9733;</label>
                <input
                    className='star-inputs'
                    type="checkbox"
                    id="r2"
                    name="stars"
                    value={2}
                    onChange={(e) => setRating(e.target.value)}
                    checked={+rating >= 2 ? true : false}
                />
                <label className='star-label' htmlFor="r2">&#9733;</label>
                <input
                    className='star-inputs'
                    type="checkbox"
                    id="r1"
                    name="stars"
                    value={Number(1)}
                    onChange={(e) => setRating(e.target.value)}
                    checked={+rating >= 1 ? true : false}
                />
                <label className='star-label' htmlFor="r1">&#9733;</label>
            </div>
            <div className='review-div'>
                <label htmlFor="review" />
                <textarea
                    className='review-textbox'
                    rows="5"
                    cols="51"
                    value={editReview}
                    placeholder="Type Review here"
                    onChange={(e) => seteditReview(e.target.value)}>
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

export default EditReview;
