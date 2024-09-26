import {React, useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import {useLogin} from '../../hooks/useLogin'

function LoginComponent() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async(e) =>{
        e.preventDefault()
        await login(email, password)
    }

    return (
        <div className="ltn__login-area pb-65">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title-area text-center">
                            <h1 className="section-title">Sign In <br />To  Your Account</h1>
                            
                            {/* <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. <br />
                                Sit aliquid,  Non distinctio vel iste.</p> */}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        
                        <div className="account-login-inner">
                        
                            <form onSubmit={handleSubmit} className="ltn__form-box contact-form-box">
                            {error && <p style={{ color: 'red' }}>*{error}</p>}
                                <input type="text" name="email" placeholder="Email*" 
                                value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                <input type="password" name="password" placeholder="Password*" 
                                value={password} onChange={(e)=>setPassword(e.target.value)}/>
                                <div className="btn-wrapper mt-0">
                                    <button disabled={isLoading} className="theme-btn-1 btn btn-block" type="submit">SIGN IN</button>
                                    <br/><br/>
                                    <center><p>OR</p></center>
                                    <Link to="/auth/google" className="google-signin-btn">
                                        <button disabled={isLoading} className="btn btn-block" type="button" style={{ border: '1px solid #ccc', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)' }}>
                                            <img height={50} width={150} src={`../../assets/dashboard/img/google.png`} alt="Google" className="google-icon" />
                                        </button>
                                    </Link>
                                </div>
                                <div className="go-to-btn mt-20">
    
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="account-create text-center pt-50">
                            <h4>DON'T HAVE AN ACCOUNT?</h4>
                            <div className="btn-wrapper">
                                <Link reloadDocument to="/signup"><a className="theme-btn-1 btn black-btn">CREATE ACCOUNT</a></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginComponent;