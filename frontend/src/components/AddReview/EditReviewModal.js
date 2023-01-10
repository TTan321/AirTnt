import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditReview from './EditReview';
import './AddReview.css'

function EditReviewModal({ id, review, stars, spotId }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="delete-review-button" onClick={() => setShowModal(true)}>Edit Review</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditReview setShowModal={setShowModal} id={id} review={review} stars={stars} spotId={spotId} />
                </Modal>
            )}
        </>
    );
}

export default EditReviewModal;
