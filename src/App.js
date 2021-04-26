import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Main from "./components/Main";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Topbar from "./components/Topbar";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
	return (
		<Router>
			<Topbar></Topbar>
			<Switch>
				<Route path="/" component={Registration} exact />
				<Route path="/login" component={Login} exact />
				<ProtectedRoute path="/shortener/:id" component={Main} exact />
			</Switch>
		</Router>
	);
}

export default App;
