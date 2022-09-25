import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import './LoginModal.css';

function LoginFormModal({ showLogin, setShowLogin, setShowMenu }) {

    return (
        <>
            {showLogin && (
                <Modal contentClassName="modal" onClose={() => setShowLogin(false)} >
                    <LoginForm setShowLogin={setShowLogin} setShowMenu={setShowMenu} />
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;
