import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignUpForm from './SignUpForm';

function SignUpFormModel({ setShowMenu }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <p onClick={() => setShowModal(true)} >Sign Up</p>
            {
                showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <SignUpForm setShowModal={setShowModal} setShowMenu={setShowMenu} />
                    </Modal>
                )
            }
        </>
    );
}

export default SignUpFormModel;
