import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import airtnt from '../../images/airtnt-logo.png';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector((state) => (state.session.user));

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
