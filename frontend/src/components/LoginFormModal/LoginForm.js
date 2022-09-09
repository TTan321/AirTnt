import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import xfavicon from '../../images/X-favicon.ico'
import './LoginModal.css';
import SignUpFormModel from "../SignUpFormModal/SignUpFormModel";
import SignUpForm from "../SignUpFormModal/SignUpForm";

function LoginForm({ setShowModal }) {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password })).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }
        );
    };

    const logInDemo = (e) => {
        e.preventDefault();

        return dispatch(sessionActions.login({ "credential": "Demo-lition", "password": "password" }))
    };

    return (
        <>
            <div className="header-div">
                <button className="cancel-button" onClick={() => setShowModal(false)}> <img src={xfavicon} alt="cancel" /></button>
                <h1 className="h1">Log In</h1>
            </div>
            <form className="form" onSubmit={handleSubmit}>
                <h2 className="h2">Welcome to AirTnT</h2>
                <div className="login-input-container">
                    {!!errors.length && (
                        <div className="login-errors-container">
                            {errors.map((error, idx) => (
                                <p className="login-errors" key={idx}>! {error}</p>
                            ))}
                        </div>
                    )}
                    <input
                        className="login"
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        placeholder="Username or Email"
                        required
                    />
                    <input
                        className="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                </div>
                <div className="login-button-container">
                    <button className="submit" type="submit" >Log In</button>
                    <button className="demo-user" onClick={logInDemo} >Demo User</button>
                </div>
            </form>
        </>
    );
}

export default LoginForm;
