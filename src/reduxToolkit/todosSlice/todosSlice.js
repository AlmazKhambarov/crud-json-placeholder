import { createSlice } from "@reduxjs/toolkit";
import { Get_all_todos } from "../extraReducer";
const initialState = {
    todosData: [],
    error: null,
    loading: false,
}
const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(Get_all_todos.pending, (state, action) => {
                state.loading = true
            })
            .addCase(Get_all_todos.fulfilled, (state, action) => {
                state.loading = false
                state.todosData = action.payload
            })
            .addCase(Get_all_todos.rejected, (state, action) => {
                state.error = action.error.message
            })
    }
})
export const { } = todosSlice.actions;
export default todosSlice.reducer