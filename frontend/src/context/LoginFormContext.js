import { createContext, useContext, useState } from 'react';

export const LoginContext = createContext();

export const useLogin = () => useContext(LoginContext);

export default function LoginProvider({ children }) {

    const [showModal, setShowModal] = useState(false);

    return (
        <LoginContext.Provider value={{ showModal, setShowModal }}>
            {children}
        </LoginContext.Provider>
    );
}
