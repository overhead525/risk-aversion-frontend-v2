import Axios, { AxiosInstance } from "axios";
import * as secrets from "../secrets";

interface AuthServerOptions {
    headers: {
        [key: string]: string;
    }
}

export const generateAuthServerInstance = (options: AuthServerOptions): AxiosInstance => {
    const {
        headers = {}
    } = options;

    return Axios.create({
        baseURL: `${secrets.AUTH_SERVER_URL}`,
        timeout: 1500,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        }
    });
}