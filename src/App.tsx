import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <Router>
          <div className="App">
            <h1>Protected React Router</h1>
            <Route
              exact
              path="/"
              render={(props) => <AuthLayout {...props} isAuthed={true} />}
            />
            <Route
              exact
              path="/app"
              render={(props) => <Layout {...props} isAuthed={true} />}
            />
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
