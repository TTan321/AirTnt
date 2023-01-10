import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteBooking from './DeleteBooking';


function DeleteBookingModal({ id }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="Add-Review" onClick={() => setShowModal(true)}>Cancel Booking</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteBooking setShowModal={setShowModal} id={id} />
                </Modal>
            )}
        </>
    );
}

export default DeleteBookingModal;
