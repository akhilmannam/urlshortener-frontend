import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import "../App.css";
import { Button, TextField } from "@material-ui/core";

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
					<TextField
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						id="outlined-basic"
						label="Email"
						variant="filled"
					/>
					<br />
					<TextField
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						id="outlined-basic"
						label="Password"
						variant="filled"
					/>
					<br />

					<Button variant="contained" color="secondary" type="submit">
						Sign Up
					</Button>
				</form>
				<Alert
					style={{ display: `${signed ? "flex" : "none"}` }}
					severity={status ? "success" : "error"}
				>
					{message}
				</Alert>
				<h5>Already have an account?</h5>
				<Button
					variant="contained"
					color="secondary"
					onClick={() => {
						history.push("/login");
					}}
				>
					Login
				</Button>
			</div>
		</div>
	);
}

export default Registration;
