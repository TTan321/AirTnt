import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import './LoginModal.css';

function LoginFormModal({ setShowMenu }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <p onClick={() => setShowModal(true)}>Log In</p>
            {showModal && (
                <Modal contentClassName="modal" onClose={() => setShowModal(false)} >
                    <LoginForm setShowModal={setShowModal} setShowMenu={setShowMenu} />
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;
