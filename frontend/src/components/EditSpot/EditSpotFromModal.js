import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSpotForm from './EditSpot';

function EditSpotFormModal({ userSpot }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="edit" onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditSpotForm userSpot={userSpot} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default EditSpotFormModal;
