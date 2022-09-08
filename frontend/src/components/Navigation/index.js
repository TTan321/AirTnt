import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal/LoginModal';
import SignUpFormModel from '../SignUpFormModal/SignUpFormModel';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            < ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
                <LoginFormModal />
                <SignUpFormModel />
            </>
        );
    }

    return (
        <ul className='navBar'>
            <li className='nav-links'>
                <NavLink exact to="/" className={"nav-links home"} >Home</NavLink>
                <NavLink exact to="/hostspot" className={"nav-links host-link"}>Become a Host</NavLink>
                {isLoaded && sessionLinks}
            </li>
        </ul>
    );
}

export default Navigation;
