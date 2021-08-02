import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import "../App.css";

function Registration() {
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const [status, setStatus] = useState(false);
	const [signed, setSigned] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		const registration = { email, password, links: [] };
		async function postRegistrationData() {
			let response = await axios.post(
				"https://url-shortener-ak.herokuapp.com/register",
				registration
			);
			if (response.data.status === "success") {
				setMessage(response.data.message);
				setStatus(response.data.status);
			} else {
				setMessage(response.data.message);
				setStatus(response.data.status);
			}
		}
		postRegistrationData();
		setEmail("");
		setPassword("");
		setSigned(true);
	};

	return (
		<div className="registration">
			<div className="registration_container">
				<form onSubmit={handleSubmit}>
					<label htmlFor="email">Email</label>
					<input
						id="email"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter your email"
						type="email"
					/>
					<label htmlFor="password">Password</label>
					<input
						id="password"
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Enter your password"
						type="password"
					/>
					<button>Sign Up</button>
				</form>
				<Alert
					style={{ display: `${signed ? "flex" : "none"}` }}
					severity={status ? "success" : "error"}
				>
					{message}
				</Alert>
				<h5>Already have an account?</h5>
				<button
					onClick={() => {
						history.push("/login");
					}}
				>
					Login
				</button>
			</div>
		</div>
	);
}

export default Registration;
