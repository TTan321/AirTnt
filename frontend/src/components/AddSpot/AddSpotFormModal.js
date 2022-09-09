import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddSpotForm from './AddSpotForm';

function AddSpotFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <p onClick={() => setShowModal(true)}>Become a Host</p>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddSpotForm />
                </Modal>
            )}
        </>
    );
}

export default AddSpotFormModal;
