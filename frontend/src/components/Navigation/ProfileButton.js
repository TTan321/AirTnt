import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import LoginFormModal from "../LoginFormModal/LoginModal";
import SignUpFormModel from "../SignUpFormModal/SignUpFormModel";
import './ProfileButton.css'
import HostLoginModal from "../AddSpot/HostLoginModal";

function ProfileButton({ user }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    // const openMenu = () => {
    //     if (showMenu) return;
    //     setShowMenu(true);
    // };

    // useEffect(() => {
    //     if (!showMenu) return;

    //     const closeMenu = () => {
    //         setShowMenu(false);
    //     };

    //     document.addEventListener('click', closeMenu);

    //     return () => document.removeEventListener("click", closeMenu);
    // }, [showMenu]);

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
                        <li>{user.username}</li>
                        <li className="user-email">{user.email}</li>
                        <li className="user-reviews-menu" onClick={reviews}>My Reviews</li>
                        <li className="user-listings-menu" onClick={hostspot}>My Active Listings</li>
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
                        <li><LoginFormModal setShowMenu={setShowMenu} /></li>
                        <li><SignUpFormModel setShowMenu={setShowMenu} /></li>
                    </ul>
                )}
            </div>
        )
    }
}

export default ProfileButton;
