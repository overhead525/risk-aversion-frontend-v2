import profile, {
  setProfile,
  ProfileState,
  SetProfileActionPayload,
} from "./profileSlice";

const initialState: ProfileState = {
  firstName: null,
  lastName: null,
  tradingHabits: {
    risk: null,
    reward: null,
    lossPercentage: null,
    winPercentage: null,
  },
  goalPortfolio: null,
};

const sampleSetProfileActionPayload: SetProfileActionPayload = {
  firstName: "Malcolm",
  lastName: "Gladwell",
  tradingHabits: {
    risk: 0.1,
    reward: 0.3,
    lossPercentage: 0.3,
    winPercentage: 0.7,
  },
  goalPortfolio: 31000,
};

describe("profile reducer", () => {
  it("should handle initial state", () => {
    const result = profile(undefined, { type: null });
    const expected = initialState;
    expect(result).toStrictEqual(expected);
  });

  it("should be able to completely update the state", () => {
    const sampleAction = {
      type: setProfile.type,
      payload: sampleSetProfileActionPayload,
    };
    const result = profile(initialState, sampleAction);
    expect(result).toStrictEqual(sampleSetProfileActionPayload);
  });
});
