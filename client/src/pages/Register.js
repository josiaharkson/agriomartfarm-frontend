import React from "react";

// Page Components
import AppBar from "../components/layout/AppBar";
import RegisterPageComponent from "./components/RegisterpageComponent";
const SignUp = () => {
  React.useEffect(() => {
    document.title = "Sign Up";
  }, []);
  return (
    <>
      <AppBar page="signup" />
      <RegisterPageComponent />
    </>
  );
};

export default SignUp;
