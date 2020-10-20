import auth, { login, logout, loginOnServer } from "./authSlice";
const generateAuthServerInstance: jest.Mock = require("../../api").generateAuthServerInstance;
jest.mock("../../api", () => ({
    generateAuthServerInstance: jest.fn(),
}));

const sampleUser = {
    username: "sampleUser",
    password: "123456"
}

describe("auth reducer", () => {
    it("should handle initial state", () => {
        const result = auth(undefined, { type: null }).authenticated;
        expect(result).toBeFalsy();
    })

    it("should be able to log a user IN (Client Side)", () => {
        const result = auth(undefined, { type: login.type, payload: {} }).authenticated;
        expect(result).toBeTruthy();
    })

    it("should be able to log a user OUT (Client Side)", () => {
        const result = auth({
            authenticated: true,
            accessToken: null,
            refreshToken: null
        }, { type: logout.type }).authenticated;
        expect(result).toBeFalsy();
    })
})
