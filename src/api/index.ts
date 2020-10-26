import Axios, { AxiosInstance } from "axios";
import * as secrets from "../secrets";

interface ServerOptions {
  headers: {
    [key: string]: string;
  };
}

export const generateAuthServerInstance = (
  options: ServerOptions
): AxiosInstance => {
  const { headers = {} } = options;

  return Axios.create({
    baseURL: `${secrets.AUTH_SERVER_URL}`,
    timeout: 1500,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
};

export const generateSimulationServerInstance = (
  options: ServerOptions
): AxiosInstance => {
  const { headers = {} } = options;

  return Axios.create({
    baseURL: `${secrets.SIM_SERVER_URL}`,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
};

export const generateResourceServerInstance = (
  options: ServerOptions
): AxiosInstance => {
  const { headers = {} } = options;

  return Axios.create({
    baseURL: `${secrets.RESOURCE_SERVER_URL}`,
    timeout: 4000,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
};
