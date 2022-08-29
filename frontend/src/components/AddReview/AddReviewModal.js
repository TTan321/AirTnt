import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddReview from './AddReviewForm';

function AddReviewModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Add Review</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddReview />
                </Modal>
            )}
        </>
    );
}

export default AddReviewModal;
