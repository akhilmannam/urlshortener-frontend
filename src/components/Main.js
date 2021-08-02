import React, { useEffect, useState } from "react";
import axios from "axios";
import validator from "validator";
import { useHistory, useParams } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import "../App.css";

function Main() {
	const history = useHistory();
	const params = useParams();
	const [longURL, setlongURL] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [urldata, seturlData] = useState([]);
	const [message, setMessage] = useState("");
	const [shortened, setShortened] = useState(false);
	const [status, setStatus] = useState(false);

	const validate = (value) => {
		if (validator.isURL(value)) {
			setErrorMessage("Valid");
		} else {
			setErrorMessage("Invalid");
		}
	};

	useEffect(() => {
		async function fetchData() {
			let response = await axios.get(
				`https://url-shortener-ak.herokuapp.com/urls/${params.id}`,
				{
					headers: {
						Accept: "application/json",
						Authorization:
							window.localStorage.getItem("login_token"),
					},
				}
			);
			seturlData(response.data.links);
		}
		fetchData();
		// eslint-disable-next-line
	}, [urldata]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (errorMessage === "Valid") {
			const url = { longURL };
			async function postURL() {
				let response = await axios.post(
					`https://url-shortener-ak.herokuapp.com/urls/${params.id}`,
					url,
					{
						headers: {
							Accept: "application/json",
							Authorization:
								window.localStorage.getItem("login_token"),
						},
					}
				);
				if (response.data.status === "success") {
					setMessage(response.data.message);
					setStatus(response.data.status);
				} else {
					setMessage(response.data.message);
					setStatus(response.data.status);
				}
			}
			postURL();
			setlongURL("");
			setShortened(true);
		} else {
			alert("Please enter valid URL");
		}
	};

	const handleLogout = () => {
		window.localStorage.removeItem("login_token");
		history.push("/login");
	};

	return (
		<>
			<div className="shorten">
				<div className="shorten_container">
					<button
						onClick={() => {
							handleLogout();
						}}
					>
						Logout
					</button>
					<form
						onSubmit={(e) => {
							handleSubmit(e);
						}}
					>
						<input
							required
							type="text"
							onChange={(e) => {
								validate(e.target.value);
								setlongURL(e.target.value);
							}}
							value={longURL}
							placeholder="Paste URL here"
						/>
						<button type="submit">Shorten URL</button>
						<span>{errorMessage}</span>
					</form>
					<Alert
						style={{ display: `${shortened ? "flex" : "none"}` }}
						severity={status ? "success" : "warning"}
					>
						{message}
					</Alert>
					{urldata.map((item, index) => (
						<div className="urls" key={index}>
							<h6>Long URL : {item.longURL} </h6>
							<h6>
								Short URL :{" "}
								<a
									href={`https://url-shortener-ak.herokuapp.com/${item.shortURL}+${index}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									{item.shortURL}
								</a>{" "}
							</h6>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default withRouter(Main);
