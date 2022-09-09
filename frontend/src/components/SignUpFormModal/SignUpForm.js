import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { useHistory } from 'react-router-dom'
import xfavicon from '../../images/X-favicon.ico'
import './SignupForm.css'
import LoginFormModal from "../LoginFormModal/LoginModal";

function SignUpForm({ setShowModal }) {
    let history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return (dispatch(sessionActions.signup({ firstName, lastName, email, username, password })), history.push("/"))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <>
            <div className="signup-header">
                <button className="cancel-button" onClick={() => setShowModal(false)} ><img src={xfavicon} alt="cancel" /></button>
                <h1 className="h1-signup">Sign Up</h1>
            </div>
            <h2 className="h2-signup">Welcome to AirTnT</h2>
            <form className="form" onSubmit={handleSubmit}>
                <input
                    className="first-name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    required
                />
                <input
                    className="last-name"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    required
                />
                <input
                    className="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                    required
                />
                <input
                    className="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    className="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <input
                    className="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    required
                />
                <div className="error-container">
                    {errors.map((error, idx) => <p className="errors" key={idx}>! {error}</p>)}
                </div>
                <button className="submit-button" type="submit">Submit</button>
            </form>
            <LoginFormModal />
        </>
    );
}

export default SignUpForm;
