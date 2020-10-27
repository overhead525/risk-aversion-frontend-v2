import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";

import { generateResourceServerInstance } from "../../api";

export interface ResourceState {
  images: [{ simID: string; data: string }] | null;
}

export const initialState: ResourceState = {
  images: null,
};

interface SetImagesPayload {
  images: [{ simID: string; data: string; contentType: string }];
}

export const resourceSlice = createSlice({
  name: "resource",
  initialState,
  reducers: {
    setImages: (state, action: PayloadAction<SetImagesPayload>) => {
      if (action.payload.images) {
        state.images = action.payload.images;
      }
      console.log(state);
    },
  },
});

export const { setImages } = resourceSlice.actions;

export const retrieveSimulationImage = (
  accessToken: string,
  simID: string
): AppThunk => async (dispatch: Dispatch) => {
  const resourceServerInstance = generateResourceServerInstance({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  try {
    const response = await resourceServerInstance.get(`/image/${simID}`);
    const rawImageData: {
      img: {
        data: string;
        contentType: string;
      };
    } = response.data;
    dispatch(
      setImages({
        images: [
          {
            simID,
            data: rawImageData.img.data,
            contentType: rawImageData.img.contentType,
          },
        ],
      })
    );
  } catch (error) {
    console.error("Could not request the image");
  }
};

export default resourceSlice.reducer;
