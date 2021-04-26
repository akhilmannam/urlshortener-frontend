import React, { createContext, useState } from "react";
export const AuthContext = createContext();

export const isAuth = () =>
	window.localStorage.getItem("login_token")
		? window.localStorage.getItem("login_token")
		: false;

export const AuthProvider = ({ children }) => {
	const [isAuth, setIsAuth] = useState(false);
	return (
		<AuthContext.Provider value={{ isAuth, setIsAuth }}>
			{children}
		</AuthContext.Provider>
	);
};
