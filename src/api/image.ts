import { generateImageServerInstance } from ".";
import { s3 } from "./awsS3";

export async function listObjects() {
  await s3.listObjects((err, data) => {
    if (err) return console.log("error getting object from s3", err);
    console.log(data);
  });
}

export async function getObject(key: string) {
  await s3.getObject({ Key: key, Bucket: "simulation-images" }, (err, data) => {
    if (err) return console.log("Error finding image");
    return console.log(data);
  });
}

/*
interface imageData {
  simID: string;
  imgURL: string;
}

export const getSingleSimulationImage = async (
  accessToken: string,
  simID: string
): imageData => {};

export const getMultipleSimulationImages = async (
  accessToken: string,
  simIDArr: string[]
): imageData[] => {};

export const postSimulationImage = async (
  accessToken: string,
  simID: string,
  imageURL: string
) => {};
*/
