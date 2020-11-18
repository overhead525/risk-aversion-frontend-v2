import {
  convertRawProfile,
  composeRadarData,
  marketProfile,
  parseStringAsTitle,
} from "./helpers";

describe("test my helpers for trading profile chart", () => {
  test("convertRawProfile correctly converts decimals to percentages for all properties", () => {
    const expected = {
      risk: 20,
      reward: 40,
      winPercentage: 35,
      lossPercentage: 65,
    };
    expect(convertRawProfile(marketProfile)).toEqual(expected);
  });

  test("composeRadarData creates data that can be used by IBM Carbon radar chart", () => {
    const convertedProfile = {
      risk: 20,
      reward: 40,
      winPercentage: 35,
      lossPercentage: 65,
    };
    const expected = [
      {
        trader: "Market",
        attribute: "Risk",
        score: 20,
      },
      {
        trader: "Market",
        attribute: "Reward",
        score: 40,
      },
      {
        trader: "Market",
        attribute: "Win Percentage",
        score: 35,
      },
      {
        trader: "Market",
        attribute: "Loss Percentage",
        score: 65,
      },
    ];
    expect(composeRadarData(convertedProfile)).toEqual(expected);
  });

  test("parseStringAsTitle works correctly", () => {
    const rawString = "winPercentage";
    const expectedFinalString = "Win Percentage";

    expect(parseStringAsTitle(rawString)).toBe(expectedFinalString);
  });

  test("parseStringAsTitle works correctly 2", () => {
    const rawString = "walkBackPercentage";
    const expectedFinalString = "Walk Back Percentage";

    expect(parseStringAsTitle(rawString)).toEqual(expectedFinalString);
  });
});
