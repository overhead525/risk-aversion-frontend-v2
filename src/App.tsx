import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";

/**
 * Layout Import
 */
import Layout from "./components/layout";
import AuthLayout from "./components/authLayout";
import Loader from "./components/loader";

function App() {
  const [redirect, setRedirect] = useState(<></>);

  const handleVisitApp = () => {
    setRedirect(<Redirect to="/app" />);
  };

  const handleVisitAuthentication = () => {
    setRedirect(<Redirect to="/auth" />);
  };

  const handleVisitHome = () => {
    setRedirect(<Redirect to="/" />);
  };

  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <Router>
          <div className="App">
            <h1>Protected React Router</h1>
            <br />
            <button onClick={handleVisitApp}>Go to App</button>
            <br />
            <button onClick={handleVisitAuthentication}>
              Go to Authentication
            </button>
            <br />
            <button onClick={handleVisitHome}>Go Home</button>
            <br />
            <br />
            {redirect}
            <Route exact path="/">
              <h4>Home Page</h4>
            </Route>
            <Route
              exact
              path="/auth"
              render={(props) => <AuthLayout {...props} />}
            />
            <Route
              exact
              path="/app"
              render={(props) => <Layout {...props} />}
            />
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
