import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal/LoginModal';
import SignUpFormModel from '../SignUpFormModal/SignUpFormModel';
import AddSpotFormModal from '../AddSpot/AddSpotFormModal';
import airtnt from '../../images/airtnt-logo.png';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector((state) => (state.session.user));
    const history = useHistory();

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
                <ProfileButton user={sessionUser} />
            </div>
        );
    }

    return (
        <div className='navBar'>
            <div className='inner-nav-container'>
                <div className='home-container'>
                    <NavLink exact to="/" className="home" ><img src={airtnt} alt="Home" /></NavLink>
                </div>
                <div className='profile-container'>
                    {isLoaded && sessionLinks}
                </div>
            </div>
        </div>
    );
}

export default Navigation;
