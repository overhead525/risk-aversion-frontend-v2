import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/**
 * Layout Import
 */
import Layout from "./components/layout";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Protected React Router</h1>
        <Route
          exact
          path="/"
          render={(props) => <Layout {...props} isAuthed={true} />}
        />
      </div>
    </Router>
  );
}

export default App;
