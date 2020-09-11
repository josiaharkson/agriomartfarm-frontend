import React from "react";

// Page Components
import AppBar from "../components/layout/AppBar";
import LoginPageComponent from "./components/LoginpageComponent";

const Login = () => {
	React.useEffect(() => {
		document.title = "Login";
	}, []);
	return (
		<>
			<AppBar page="login" />
			<LoginPageComponent />
		</>
	);
};

export default Login;
