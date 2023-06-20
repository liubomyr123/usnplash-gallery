import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface CurrentImageState {
    currentImage: string
};

const initialState: CurrentImageState = {
    currentImage: "Initial message",
};

const currentImageSlice = createSlice({
    name: "currentImage",
    initialState,
    reducers: {
        setCurrentImage(state, action: PayloadAction<{ currentImage: string }>) {
            state.currentImage = action.payload.currentImage
        }
    }
});

export const { setCurrentImage } = currentImageSlice.actions;
export default currentImageSlice.reducer;