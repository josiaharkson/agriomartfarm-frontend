import React, { Suspense } from "react";
import { connect } from "react-redux";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import IsLoading from "./components/IsLoading";

import { getCurrentUser, validateToken } from "./services/authService";
import { authorizeUser, logout } from "./store/actions/authActions";

// HOC
import PrivateRouteWrapper from "./components/HOC/PrivateRouteWrapper";

function LoadPageComponent(name) {
  const Component = React.lazy(() => import(`./pages/${name}`));
  return Component;
}

function App(props) {
  const [loadingUser, setLoadingUser] = React.useState(true);

  React.useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      // Authenticate token
      (async () => {
        // Validate User LocalStorage token
        const getUser = await validateToken();
        if (getUser.success) {
          // IF TOKEN VALID - Authorize user and set up persistence
          props.authorizeUser(getUser.user);
          setLoadingUser(false);
        } else {
          // IF TOKEN IS NOT VALID OR HAS EXPIRED - Logout, remove token and clean redux state
          props.logout();
          setLoadingUser(false);
        }
      })();
    } else {
      setLoadingUser(false);
    }
  }, [props]);

  const Home = LoadPageComponent("Home");
  const Login = LoadPageComponent("Login");
  const Register = LoadPageComponent("Register");
  const Dashboard = LoadPageComponent("Dashboard");
  const Market = LoadPageComponent("Market");
  const ERROR_404 = LoadPageComponent("ERROR_404");

  return (
    <Router>
      {loadingUser ? (
        <IsLoading iconSize={50} />
      ) : (
        <Switch>
          <Route exact path="/">
            <Suspense fallback={<IsLoading />}>
              <Home />
            </Suspense>
          </Route>

          <Route path="/login">
            <Suspense fallback={<IsLoading />}>
              <Login />
            </Suspense>
          </Route>

          <Route path="/signup">
            <Suspense fallback={<IsLoading />}>
              <Register />
            </Suspense>
          </Route>

          <Route path="/dashboard">
            <PrivateRouteWrapper>
              <Suspense fallback={<IsLoading />}>
                <Dashboard />
              </Suspense>
            </PrivateRouteWrapper>
          </Route>

          <Route path="/market">
            <Suspense fallback={<IsLoading />}>
              <Market />
            </Suspense>
          </Route>

          <Route path="*">
            <Suspense fallback={<IsLoading />}>
              <ERROR_404 />
            </Suspense>
          </Route>
        </Switch>
      )}
    </Router>
  );
}

export default connect(null, { logout, authorizeUser })(App);
