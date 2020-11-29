import setupForm, {
  initialState,
  SetupFormState,
  getFormProperty,
  updateSetupForm,
} from "./setupFormSlice";

import { partialSF } from "./testData";

describe("setupForm reducer", () => {
  it("should handle initial state", () => {
    const result = setupForm(undefined, { type: null });
    const expected = initialState;
    expect(result).toStrictEqual(expected);
  });

  it("should be able to update all properties of the state at once", () => {});

  it("should be able to update a few properties", () => {
    const result = setupForm(initialState, {
      type: updateSetupForm.type,
      payload: partialSF.payload,
    });
    const expected = partialSF.stateResult;
    expect(result).toStrictEqual(expected);
  });
});
