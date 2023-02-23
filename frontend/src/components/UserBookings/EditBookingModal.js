import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditBooking from './EditBooking';


function EditBookingModal({ id, booking }) {
    const [showModal, setShowModal] = useState(false);

    const openForm = () => {
        let currentDate = new Date()
        let checkOut = `${booking.endDate.slice(0, 4)}-${booking.endDate.slice(5, 7)}-${booking.endDate.slice(8, 10)}`
        if (new Date(checkOut) < currentDate) {
            alert("Cannot edit past bookings")
            setShowModal(false)
            return
        } else {
            setShowModal(true)
        }
    }

    return (
        <>
            <button className='edit' onClick={openForm}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditBooking setShowModal={setShowModal} id={id} booking={booking} />
                </Modal>
            )}
        </>
    );
}

export default EditBookingModal;
