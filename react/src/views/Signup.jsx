import { Link } from "react-router-dom";
import { useRef } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProviders";

export const Signup = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const { setUser, setToken } = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };
        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                }
            });
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <form className="form" onSubmit={onSubmit}>
                <h1 className="title">Sign up for free</h1>
                <input ref={nameRef} placeholder="Full Name" />
                <input ref={emailRef} type="email" placeholder="Email Adress" />
                <input
                    ref={passwordRef}
                    type="password"
                    placeholder="Password"
                />
                <input
                    ref={passwordConfirmationRef}
                    type="password"
                    placeholder="Password Confirmation"
                />
                <button className="btn btn-block">Sign in</button>
                <p className="message">
                    Already registered? <Link to="/login">Log in</Link>
                </p>
            </form>
        </div>
    );
};
