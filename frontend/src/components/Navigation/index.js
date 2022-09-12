import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal/LoginModal';
import SignUpFormModel from '../SignUpFormModal/SignUpFormModel';
import AddSpotFormModal from '../AddSpot/AddSpotFormModal';
import airtnt from '../../images/airtnt-logo.png';
import './Navigation.css';

function Navigation({ isLoaded, user }) {
    // const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (user) {
        sessionLinks = (
            <div className='sessionLinks'>
                <AddSpotFormModal /> <ProfileButton user={user} />
            </div>
        );
    } else {
        sessionLinks = (
            <div className='sessionLinks'>
                <AddSpotFormModal />
                <LoginFormModal />
                <SignUpFormModel />
            </div>
        );
    }

    return (
        <div className='navBar'>
            <div className='navBar-Children'>
                <NavLink exact to="/" className="home" ><img src={airtnt} alt="Home" /></NavLink>

                <div className='nav-links'>
                    {isLoaded && sessionLinks}
                </div>
            </div>
        </div>
    );
}

export default Navigation;
