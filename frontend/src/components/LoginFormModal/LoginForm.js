import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginModal.css';

function LoginForm() {
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
                <h1 className="h1">Log In</h1>
            </div>
            <form className="form" onSubmit={handleSubmit}>
                <h2 className="h2">Welcome to AirTnT</h2>
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
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <button className="submit" type="submit">Log In</button>
                <button className="demo-user" onClick={logInDemo}>Demo User</button>
            </form>
        </>
    );
}

export default LoginForm;
