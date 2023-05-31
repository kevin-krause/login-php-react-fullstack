import { createContext, useContext, useState } from "react";

const StateContex = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem("ACESS_TOKENs"));
    // const [token, _setToken] = useState(123);

    const setToken = (token) => {
        _setToken(token);

        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN", token);
        }
    };

    return (
        <StateContex.Provider
            value={{
                user,
                token,
                setUser,
                setToken,
            }}
        >
            {children}
        </StateContex.Provider>
    );
};

export const useStateContext = () => useContext(StateContex);
