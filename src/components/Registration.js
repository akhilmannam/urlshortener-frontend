import axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import '../App.css';

function Registration() {

    const history = useHistory();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
		e.preventDefault();
		const registration = { email, password, links : [] }
		async function postRegistrationData(){
			await axios.post('https://url-shortener-ak.herokuapp.com/register', registration)
		}
		postRegistrationData();		
		setEmail('');
        setPassword('');
	}

    return (
        <div className="registration">
            <div className="registration_container">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input id='email' required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" type="email"/>
                    <label htmlFor="password">Password</label>
                    <input id='password' required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" type="password"/>
                    <button>Sign Up</button>
                </form>
                <h5>Already have an account?</h5>
                <button onClick={() => {history.push('/login')}}>Login</button>
            </div>
        </div>
    )
}

export default Registration
