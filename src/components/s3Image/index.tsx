import React, { useEffect, useState } from "react";
import AWS from "aws-sdk";
import { bytesToBase64 } from "byte-base64";

export interface S3ImageProps {
  Key: string;
  Bucket: string;
  width: number;
  height: number;
}

export const S3Image: React.FC<S3ImageProps> = ({
  Key,
  Bucket,
  width,
  height,
}) => {
  AWS.config.region = "us-east-1"; // Region
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-east-1:52652e27-0ee2-4bd1-a23a-add86a4da8e1",
  });

  const s3 = new AWS.S3({
    apiVersion: "2006-03-01",
    params: { Bucket: "simulation-images" },
  });

  const placeholder = (
    <img width={width} height={height} src="./placeholder.png" />
  );
  const errorPlaceholder = (
    <img width={width} height={height} src="./errorPlaceholder.png" />
  );
  const [image, setImage] = useState(placeholder);

  const renderImageFromS3 = async () => {
    await s3.getObject({ Key, Bucket }, (err, data) => {
      if (err) return setImage(errorPlaceholder);
      const imgUInt8 = data.Body;
      console.log("got a response");
      return setImage(
        <img
          width={width}
          height={height}
          src={`data:image/png;base64, ${
            //@ts-ignore
            bytesToBase64(imgUInt8)
          }`}
        />
      );
    });
  };

  useEffect(() => {
    renderImageFromS3();
  }, []);

  return image;
};
