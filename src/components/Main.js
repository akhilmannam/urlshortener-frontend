import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../App.css';
import validator from 'validator';
import { useHistory, useParams } from 'react-router';

function Main() {

	const history = useHistory();
	const params = useParams();
    const [longURL, setlongURL] = useState('');
	const [errorMessage, setErrorMessage] = useState('')
	const [urlData, seturlData] = useState([])

    useEffect(() => {
		async function fetchData(){
			let response = await axios.get(`http://localhost:3001/urls/${params.id}`, {
				headers : {
					Accept: 'application/json',
					Authorization : window.localStorage.getItem('login_token')
				}
			})
			seturlData(response.data.links);
		}	
		fetchData();
    }, [params.id])
    
	const validate = (value) => {  
		if (validator.isURL(value)) {
			setErrorMessage('Valid')
		} 
		else {
			setErrorMessage('Invalid')
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if(errorMessage === 'Valid'){
			const url = { longURL }
			async function postURL(){
				await axios.post(`http://localhost:3001/urls/${params.id}`, url, {
					headers : {
						Accept: 'application/json',
						Authorization : window.localStorage.getItem('login_token')
					}
				})
			}
			postURL();		
			setlongURL('');
		}
		else{
			alert('Please enter valid URL');
		}
	}

	const handleLogout = () => {
		window.localStorage.removeItem('login_token');
		history.push('/login');
	}

    return (
		<>
			<div className="shorten">
				<div className="shorten_container">
					<button onClick={handleLogout}>Logout</button>
					<form onSubmit={handleSubmit}>
						<input required type="text" onChange={(e) => {validate(e.target.value); setlongURL(e.target.value)}} value={ longURL } placeholder='Paste URL here'/>
						<button type='submit'>Shorten URL</button>
						<span>{errorMessage}</span>
					</form>
					<h4>Your links</h4>
					<table>
						<tbody>
							<tr>
								<th>Long URL</th>
								<th>Short URL</th>
							</tr>
						{
							urlData.length > 0 && urlData.map((e, index) => (
								<tr key={index}>
									<td>{e.longURL}</td>
									<td><a href={`http://localhost:3001/${e.shortURL}+${index}`} target="_blank" rel="noopener noreferrer">{e.shortURL}</a></td>
								</tr>
							))
						}
						</tbody>
					</table>
				</div>
			</div>
		</>
    )
}

export default Main
