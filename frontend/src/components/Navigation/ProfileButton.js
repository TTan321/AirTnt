import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './ProfileButton.css'
import HostLoginModal from "../AddSpot/HostLoginModal";

function ProfileButton({ user, setShowLogin, setShowSignUp }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const reviews = (e) => {
        e.preventDefault();
        setShowMenu(showMenu === false ? true : false);
        return history.push('/reviews')
    }

    const hostspot = (e) => {
        e.preventDefault();
        setShowMenu(showMenu === false ? true : false);
        return history.push('/hostspot')
    }

    const bookings = (e) => {
        e.preventDefault();
        setShowMenu(showMenu === false ? true : false);
        return history.push('/bookings')
    }

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        setShowMenu(showMenu === false ? true : false);
    };

    if (user) {
        return (
            <div className="profile-container">
                <p className="become-a-host" onClick={() => history.push('/hostspot')}>Become a host</p>
                <button className="profile-button" onClick={() => setShowMenu(showMenu === false ? true : false)}>
                    <i className="fas fa-bars" />
                    <i className="fas fa-user-circle fa-2x" />
                </button>
                {showMenu && (
                    <ul className="profile-dropdown">
                        <li className="username-menu-li"><span id="username-menu">{user.username}</span></li>
                        <li className="user-email-li"><span id="user-email">{user.email}</span></li>
                        <li className="user-reviews-menu" onClick={reviews}><span id="my-review">My Reviews</span></li>
                        <li className="user-listings-menu" onClick={hostspot}><span id="My-Active-Listings">My Active Listings</span></li>
                        <li className="user-listings-menu" onClick={bookings}><span id="My-Active-Listings">My Bookings</span></li>
                        <li className="menu-logout">
                            <button className="logout-button" onClick={logout}>Log Out</button>
                        </li>
                    </ul>
                )}
            </div>
        )
    } else {
        return (
            <div className="profile-container">
                <HostLoginModal />
                <button className="profile-button" onClick={() => setShowMenu(showMenu === false ? true : false)}>
                    <i className="fas fa-bars" />
                    <i className="fas fa-user-circle fa-2x" />
                </button>
                {showMenu && (
                    <ul className="profile-dropdown">
                        <p className='Login-menu' onClick={() => setShowLogin(true)}><span id='login'>Log In</span></p>
                        <p className='SignUp-menu' onClick={() => setShowSignUp(true)} ><span id='signup'>Sign Up</span></p>
                    </ul>
                )}
            </div>
        )
    }
}

export default ProfileButton;
