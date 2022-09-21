import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import HostLoginForm from './HostLoginForm';
import '../LoginFormModal/LoginModal.css';

function HostLoginModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <p className='host-spot-login' onClick={() => setShowModal(true)}>Become a host</p>
            {showModal && (
                <Modal contentClassName="modal" onClose={() => setShowModal(false)} >
                    <HostLoginForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default HostLoginModal;
