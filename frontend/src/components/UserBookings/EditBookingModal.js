import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditBooking from './EditBooking';


function EditBookingModal({ id, booking }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="Add-Review" onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditBooking setShowModal={setShowModal} id={id} booking={booking} />
                </Modal>
            )}
        </>
    );
}

export default EditBookingModal;
