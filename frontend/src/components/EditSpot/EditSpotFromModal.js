import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSpot from './EditSpot';

function EditSpotFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="edit" onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditSpot />
                </Modal>
            )}
        </>
    );
}

export default EditSpotFormModal;
