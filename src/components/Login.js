import { useNavigate, Link, useLocation } from "react-router-dom";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig.js';
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from "firebase/auth";
import { useEffect, useState } from "react";

const Login = ({ page }) => {
    const app = initializeApp(firebaseConfig);
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isUserExist, setUserExist] = useState(false);
    const [isEmailUsed, setIsEmailUsed] = useState(false);
    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);

    const auth = getAuth();

    const validation = (fieldName, value) => {
        switch (fieldName) {
            case 'email':
                return value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            case 'password':
                return value.length >= 6;
            default:
                break;
        }
    };

    const onClickHandler = (e) => {
        e.preventDefault(); 

        if (!validation('email', email) || !validation('password', password)) {
            setEmailValid(validation('email', email));
            setPasswordValid(validation('password', password));
            return;
        }

        if (page) {
            signInWithEmailAndPassword(auth, email, password).then(auth => {
                if (auth) {
                    navigate('/dashboard')
                }
            })
                .catch(error => setUserExist(true));
            //user not found
        }
        else {
            createUserWithEmailAndPassword(auth, email, password).then(auth => {
                if (auth) {
                    navigate('/dashboard')
                }
            })
                .catch(error => setIsEmailUsed(true));
        }

    }

    useEffect(() => {
        setUserExist(false);
        setIsEmailUsed(false);
    }, [location]);
    return (
        <div className="login">
            <div className="holder">
                <h1 className="text-white">{page ? 'SignIn' : 'Register'}</h1>
                <br />
                <form>
                    <input className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                    {!emailValid && <p className="text-danger">Email is invalid/blank</p>}
                    <input className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                    {!passwordValid && <p className="text-danger">Password is invalid/blank</p>}
                    <button className="form-control btn btn-danger btn-block" onClick={onClickHandler}>{page ? 'SignIn' : 'Register'}</button>
                    <br />
                    {
                        page && <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className="form-check-label text-white" htmlFor="flexCheckDefault">
                                Remember Me
                            </label>
                        </div>
                    }
                </form>
                <br />
                <br />
                {isUserExist && <p className="text-danger">User does not exist | Go to SignUp</p>}
                {isEmailUsed && <p className="text-danger">Email  Already in Use | Go to SignIN</p>}
                <div className="login-form-other">
                    <div className="login-signup-now">
                        {page ? 'New to Netflix?' : 'Existing User'} &nbsp;
                        <Link className=" " to={page ? '/register' : '/login'} >{page ? 'Sign Up Now' : 'Sign In'}</Link>
                    </div>
                </div>
            </div>
            <div className="shadow"></div>
            <img className="concord-img vlv-creative" src="https://assets.nflxext.com/ffe/siteui/vlv3/6e32b96a-d4be-4e44-a19b-1bd2d2279b51/ee068656-14b9-4821-89b4-53b4937d9f1c/IN-en-20220516-popsignuptwoweeks-perspective_alpha_website_small.jpg" alt="" />
        </div>
    )
}

export default Login
