import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import Alert from "@material-ui/lab/Alert";
import "../App.css";
import { Button, TextField } from "@material-ui/core";

function Login() {
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const [logged, setLogged] = useState(false);

	return (
		<div className="login">
			<div className="login_container">
				<form
					onSubmit={async (e) => {
						e.preventDefault();
						const login = { email, password };
						let response = await axios.post(
							"https://url-shortener-ak.herokuapp.com/login",
							login
						);
						window.localStorage.setItem(
							"login_token",
							response.data.token
						);

						setMessage(response.data.message);
						if (response.data.message === "Allow") {
							history.push(`/shortener/${response.data.id}`);
						} else {
							history.push("/login");
						}
						setEmail("");
						setPassword("");
						setLogged(true);
					}}
				>
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
						Login
					</Button>
					<br />
					<Alert
						style={{ display: `${logged ? "flex" : "none"}` }}
						severity="error"
					>
						{message}
					</Alert>
				</form>
				<h5>Don't have an account?</h5>
				<Button
					variant="contained"
					color="secondary"
					onClick={() => {
						history.push("/");
					}}
				>
					Sign Up
				</Button>
			</div>
		</div>
	);
}

export default Login;
