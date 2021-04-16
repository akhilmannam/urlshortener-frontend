import axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from 'react-router';
import '../App.css';

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('');

    return (
        <div className='login'> 
            <div className='login_container'>
                <form onSubmit={ async (e) => {
                    e.preventDefault();
                    const login = { email, password }
                    let response = await axios.post('http://localhost:3001/login', login);
                    window.localStorage.setItem('login_token', response.data.token);
                    //console.log(response.data);
                    setMessage(response.data.message);
                        if(response.data.message === 'Allow'){
                            history.push(`/shortener/${response.data.id}`);
                        }
                        else{
                            history.push('/login');
                        }
                    setEmail('');
                    setPassword('');
                }
                }>
                    <label htmlFor="email">Email</label>
                    <input required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" type="email" id='email'/>
                    <label htmlFor="password">Password</label>
                    <input required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" type="password" id='password'/>
                    <button type='submit'>Login</button><br/>
                    <span>{message}</span>
                </form>
                <h5>Don't have an account?</h5>
                <button onClick={() => {history.push('/')}}>Sign Up</button>
            </div>
        </div>
    )
}

export default Login
