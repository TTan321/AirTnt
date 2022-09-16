import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddSpotForm from './AddSpotForm';

function AddSpotFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="add-spot-button" onClick={() => setShowModal(true)}>Add New Listing</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddSpotForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default AddSpotFormModal;
