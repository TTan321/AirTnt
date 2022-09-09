import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignUpForm from './SignUpForm';

function SignUpFormModel() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <p onClick={() => setShowModal(true)} >Sign Up</p>
            {
                showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <SignUpForm setShowModal={setShowModal} />
                    </Modal>
                )
            }
        </>
    );
}

export default SignUpFormModel;
