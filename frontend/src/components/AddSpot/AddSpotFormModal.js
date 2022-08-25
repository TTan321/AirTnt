import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddSpotForm from './AddSpotForm';

function AddSpotFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>New Listing</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddSpotForm />
                </Modal>
            )}
        </>
    );
}

export default AddSpotFormModal;
