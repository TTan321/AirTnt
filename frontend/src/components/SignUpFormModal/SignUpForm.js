import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import './SignupForm.css'

function SignUpForm({ setShowSignUp }) {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors([]);

        if (password !== confirmPassword) {
            setErrors(['Confirm Password field must be the same as the Password field']);
            return
        }

        const newUser = await dispatch(sessionActions.signup({ firstName, lastName, email, username, password })).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });

        if (newUser) {
            setShowSignUp(false)
        }
    };

    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            <div className="signup-header">
                <i className="fas fa-times signup-cancel" onClick={() => setShowSignUp(false)} />
                <h1 className="h1-signup">Sign Up</h1>
            </div>
            <h2 className="h2-signup">Welcome to AirTnT</h2>
            <div className="signup-form-inner-div">
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
                    placeholder="Email"
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
                    {errors.map((error, idx) => <p className="errors" key={idx}>{error}</p>)}
                </div>
                <button className="submit-button" type="submit">Submit</button>
            </div>
        </form>
    );
}

export default SignUpForm;
