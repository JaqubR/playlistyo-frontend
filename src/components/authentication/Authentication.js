import './Authentication.css';
import { useState } from "@hookstate/core";
import Field from "../controls/Field";
import PrimaryButton from "../controls/PrimaryButton";
import { ReactComponent as Logo } from '../../img/logo.svg';
import axios from "axios";
import { URL, axiosConfig } from "../../AxiosConfig";
import { isAuthenticatedState } from "../../GlobalStates";

function Authentication() {

    const isAuthenticated = useState(isAuthenticatedState);

    function authenticateUser(e) {
        e.preventDefault();
        e.stopPropagation();
        errorMessage.set('');
        axios.post(
            `${URL}${hasAnAccount.get() ? 'login' : 'register'}`,
            {
                "email": email.get(),
                "password": password.get()
            },
            axiosConfig
        )
            .then(res => {
                if (res.status === 200) isAuthenticated.set(true);
            })
            .catch(err => {
                if (err.response) errorMessage.set(err.response.data.message);
            });
    }

    const hasAnAccount = useState(false);
    const email = useState('');
    const password = useState('');
    const errorMessage = useState('');

    return (
        <div className="authentication-container">
            <Logo />
            <div className="input-list">
                <h2 className="authentication-heading">
                    {hasAnAccount.get() ? 'Log in' : 'Sign up'}
                </h2>
                <form onSubmit={authenticateUser}>
                    <Field value={email} placeholder="E-mail" type="email" />
                    <Field value={password} placeholder="Password" type="password" />
                    <PrimaryButton label={hasAnAccount.get() ? 'Log in' : 'Register'} type="submit" />
                </form>
                {errorMessage.get() && <p className="error-message">{errorMessage.get()}</p>}
                <p className="auth-type" onClick={() => hasAnAccount.set(currentState => !currentState)}>{hasAnAccount.get() ? 'Not registered yet? Sign up now!' : 'Already registered? Sign in using your account!'}</p>
            </div>
        </div>
    );
}

export default Authentication;