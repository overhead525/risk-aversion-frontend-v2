import React, { useState } from "react";
import "carbon-components/css/carbon-components.min.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  Link,
} from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";

import "./ra_App.scss";

/**
 * Layout Import
 */
import { PrimaryLayout } from "./stories/Layout.stories";
import AuthLayout from "./components/authLayout";
import Loader from "./components/loader";
import { WhichScreen } from "./components/layout";

function App() {
  const [redirect, setRedirect] = useState(<></>);

  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <Router>
          <div className="App">
            {redirect}
            <Route exact path="/">
              <h4>Home Page</h4>
              <Link to="/app">Go to App</Link>
            </Route>
            <Route
              exact
              path="/auth"
              render={(props) => <AuthLayout {...props} />}
            />
            <Route
              exact
              path="/app"
              render={(props) => (
                <PrimaryLayout {...props} is={WhichScreen.DASHBOARD} />
              )}
            />
            <Route
              exact
              path="/app/sim-setup"
              render={(props) => (
                <PrimaryLayout {...props} is={WhichScreen.SETUP} />
              )}
            />
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
