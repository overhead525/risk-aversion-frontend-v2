import sim, {
  setSimulation,
  SimConfigObject,
  SimResultObject,
  initialState as pureInitialState,
} from "./simSlice";

const sampleSimulationConfig: SimConfigObject = {
  principal: 100000,
  riskDecimal: 0.01,
  rewardDecimal: 0.05,
  winDecimal: 0.55,
  lossDecimal: 0.45,
  breakEvenDecimal: 0.25,
  numOfTrades: 55,
  numOfSimulations: 10000,
};

const sampleName = "Trading Up";

const sampleSimulationResult: SimResultObject = {
  simName: sampleName,
  simID: "f784a245-8387-4e2d-87df-beca6cb3eef2",
  maxPortfolio: 295012.85,
  minPortfolio: 92110.68,
};

describe("sim reducer", () => {
  it("should handle initial state", () => {
    const result = sim(undefined, { type: null });
    const expected = {
      executed: null,
      simName: null,
      configurations: [],
      config: null,
      simulations: [],
    };
    expect(result).toStrictEqual(expected);
  });

  it("should be able to update simName", () => {
    const initialState = {
      ...pureInitialState,
      executed: true,
    };
    const sampleAction = {
      type: setSimulation.type,
      payload: { simName: sampleName },
    };
    const result = sim(initialState, sampleAction);
    expect(result.simName).toBe(sampleName);
  });

  it("should be able to update individual properties within config", () => {
    const initialState = {
      ...pureInitialState,
      config: sampleSimulationConfig,
    };
    const sampleAction = {
      type: setSimulation.type,
      payload: {
        config: {
          principal: 20000,
          winDecimal: 0.65,
          lossDecimal: 0.35,
        },
      },
    };
    const result = sim(initialState, sampleAction);
    expect(result.config?.principal).toBe(20000);
    expect(result.config?.winDecimal).toBe(0.65);
    expect(result.config?.lossDecimal).toBe(0.35);
  });

  it("should update execute property", () => {
    const sampleAction = {
      type: setSimulation.type,
      payload: {
        executed: true,
      },
    };
    const result = sim(undefined, sampleAction);
    expect(result.executed).toBeTruthy();
  });

  it("should update configurations state property", () => {
    const initialState = {
      ...pureInitialState,
      configurations: [sampleSimulationConfig],
    };
    const sampleAction = {
      type: setSimulation.type,
      payload: {
        configurations: [
          {
            principal: 20000,
            riskDecimal: 0.03,
            rewardDecimal: 0.09,
            winDecimal: 0.75,
            lossDecimal: 0.25,
            breakEvenDecimal: 0.1,
            numOfTrades: 35,
            numOfSimulations: 6789,
          },
        ],
      },
    };
    const result = sim(initialState, sampleAction);
    expect(
      result.configurations.includes(sampleAction.payload.configurations[0])
    );
  });

  it("should update simulations state property", () => {
    const initialState = {
      ...pureInitialState,
      simulations: [sampleSimulationResult],
    };
    const sampleAction = {
      type: setSimulation.type,
      payload: {
        simulations: [
          {
            simName: "Lessons Learned",
            simID: "e5aa4664-3b07-41d0-937f-a6bca9017469",
            maxPortfolio: 295012.85,
            minPortfolio: 92274.47,
          },
        ],
      },
    };
    const result = sim(initialState, sampleAction);
    expect(result.simulations.includes(sampleAction.payload.simulations[0]));
  });
});
