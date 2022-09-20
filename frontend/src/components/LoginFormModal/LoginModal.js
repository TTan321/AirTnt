import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useLogin } from '../../context/LoginFormContext';
import LoginForm from './LoginForm';
import './LoginModal.css';

function LoginFormModal({ setShowMenu }) {
    const { showModal, setShowModal } = useLogin();

    return (
        <>
            <p className='Login-menu' onClick={() => setShowModal(true)}>Log In</p>
            {showModal && (
                <Modal contentClassName="modal" onClose={() => setShowModal(false)} >
                    <LoginForm setShowModal={setShowModal} setShowMenu={setShowMenu} />
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;
