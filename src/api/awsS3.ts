import AWS from "aws-sdk";

const bucketName = "simulation-images";

// Create a new service object
export const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: bucketName },
});
