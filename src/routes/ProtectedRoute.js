import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuth } from "../components/context";

function ProtectedRoute({ component: Component, ...rest }) {
	return (
		<Route
			{...rest}
			render={(props) =>
				window.localStorage.getItem("login_token") && isAuth() ? (
					<Component />
				) : (
					<Redirect
						to={{
							pathname: "/",
							state: { from: props.location },
						}}
					/>
				)
			}
		/>
	);
}

export default ProtectedRoute;
