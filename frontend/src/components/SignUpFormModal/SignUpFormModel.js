import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignUpForm from './SignUpForm';

function SignUpFormModel({ showSignUp, setShowSignUp, setShowMenu }) {


    return (
        <>
            {
                showSignUp && (
                    <Modal onClose={() => setShowSignUp(false)}>
                        <SignUpForm setShowSignUp={setShowSignUp} setShowMenu={setShowMenu} />
                    </Modal>
                )
            }
        </>
    );
}

export default SignUpFormModel;
