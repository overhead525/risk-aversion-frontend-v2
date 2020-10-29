import React, { useState } from "react";
import "carbon-components/css/carbon-components.min.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import AWS from "aws-sdk";
import { bytesToBase64 } from "byte-base64";
import { S3Image } from "./components/s3Image";

import "./ra_App.scss";

/**
 * Layout Import
 */
import { PrimaryLayout } from "./stories/Layout.stories";
import AuthLayout from "./components/authLayout";
import Loader from "./components/loader";

function App() {
  const [redirect, setRedirect] = useState(<></>);
  const [someImage, setSomeImage] = useState(<img />);
  const [someVideo, setSomeVideo] = useState(<video />);

  const handleVisitApp = () => {
    setRedirect(<Redirect to="/app" />);
  };

  const handleVisitAuthentication = () => {
    setRedirect(<Redirect to="/auth" />);
  };

  const handleVisitHome = () => {
    setRedirect(<Redirect to="/" />);
  };

  const constructS3ObjectLink = (key: string, bucketName: string) => {
    // @ts-ignore
    const parsedKey = key.replaceAll(" ", "+");
    return `https://${bucketName}.s3.amazonaws.com/${key}`;
  };

  const handleS3Test = async () => {
    AWS.config.region = "us-east-1"; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "us-east-1:52652e27-0ee2-4bd1-a23a-add86a4da8e1",
    });

    const s3 = new AWS.S3({
      apiVersion: "2006-03-01",
      params: { Bucket: "simulation-images" },
    });

    await s3.listObjects((err, data) => {
      if (err) return console.log("error getting object from s3", err);
      console.log(data);
    });

    await s3.getObject(
      { Key: "me-in-the-woods.jpg", Bucket: "simulation-images" },
      (err, data) => {
        if (err) return console.log("Error finding image");
        const imgUInt8 = data.Body;
        const videoParams = {
          Key:
            "Ichimoku Day Trading Strategy _ Cloud Trading Explained (For Beginners).mp4",
          Bucket: "simulation-images",
        };
        setSomeImage(
          <img
            src={`data:image/png;base64, ${
              //@ts-ignore
              bytesToBase64(imgUInt8)
            }`}
          />
        );
        setSomeVideo(
          <video controls width="690" height="360">
            <source
              type="video/mp4"
              src={`${constructS3ObjectLink(
                videoParams.Key,
                videoParams.Bucket
              )}`}
            />
          </video>
        );
      }
    );
  };

  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <Router>
          <div className="App">
            <h1>Protected React Router</h1>
            <br />
            {someImage}
            <br />
            {someVideo}
            <br />
            <S3Image
              width={50}
              height={100}
              Key="me-in-the-woods.jpg"
              Bucket="simulation-images"
            />
            <br />
            <button onClick={handleS3Test}>Get S3</button>
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
              render={(props) => <PrimaryLayout {...props} />}
            />
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
