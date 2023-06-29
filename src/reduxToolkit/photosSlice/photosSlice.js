import { createSlice } from "@reduxjs/toolkit";
import { Get_all_photos } from "../extraReducer";
const initialState = {
    error: null,
    loading: false,
    photosData: []
}
const photosSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        deletePostReducer: (state, action) => {
            state.photosData = state.photosData.filter(el => el.id != action.payload)
            state.deleteAction = 'deleted'
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(Get_all_photos.pending, (state, action) => {
                state.loading = true
            })
            .addCase(Get_all_photos.fulfilled, (state, action) => {
                state.loading = false;
                state.photosData = action.payload
            })
            .addCase(Get_all_photos.rejected, (state, action) => {
                state.error = action.payload
            })
    }
})

export const {deletePostReducer} = photosSlice.actions
export default photosSlice.reducer