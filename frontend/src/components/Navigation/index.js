import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal/LoginModal';
import SignUpFormModel from '../SignUpFormModal/SignUpFormModel';
import airtnt from '../../images/airtnt-logo.png';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector((state) => (state.session.user));
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <div className='sessionLinks'>
                <ProfileButton user={sessionUser} />
            </div>
        );
    } else {
        sessionLinks = (
            <div className='sessionLinks'>
                <ProfileButton user={sessionUser} setShowLogin={setShowLogin} setShowSignUp={setShowSignUp} />
                <LoginFormModal showLogin={showLogin} setShowLogin={setShowLogin} />
                <SignUpFormModel showSignUp={showSignUp} setShowSignUp={setShowSignUp} />
            </div>
        );
    }

    return (
        <div className='navBar'>
            <div className='inner-nav-container'>
                <div className='home-container'>
                    <NavLink exact to="/" className="home" ><img id="logo" src={airtnt} alt="Home" /></NavLink>
                </div>
                <div className='profile-container'>
                    {isLoaded && sessionLinks}
                </div>
            </div>
        </div>
    );
}

export default Navigation;
