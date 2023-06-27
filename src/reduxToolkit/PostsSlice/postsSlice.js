import { createSlice } from "@reduxjs/toolkit";
import { Get_all_users, deletePosts, getPostsComment, get_all_posts, get_all_postss, paginationQuery } from "../extraReducer";
import { use } from "i18next";

const initialState = {
    loading: null,
    error: null,
    succsess: '',
    postsData: [],
    users: [],
    postCommentData: [],
    padinationQuery: null
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost:(state, action)=>{
            state.postsData.push(action.payload)
        },  
        deletePostReducer: (state, action) => {
            state.postsData = state.postsData.filter(el => el.id != action.payload)
            state.deleteAction = 'deleted'
        },
        paginations: (state, action) => {
            state.padinationQuery = 'succsess'
        },
        updatePosts: (state, action) => {
        const {id, body} = (action.payload)

            const existingData = state.postsData.find(el=>el.id ==id)
            if(existingData){
                existingData.body = body
            }
            const existinguser = state.users.find(el => el.id == action.payload.userId)
            if (existinguser) {
                console.log(existinguser.username)
                existinguser.username = action.payload.username
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_all_postss.pending, (state) => {
                state.loading = true;
            })
            .addCase(get_all_postss.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.postsData = payload;
            }).addCase(get_all_postss.rejected, (state, action) => {
                state.error = action.error.message;
            })
        builder
            .addCase(getPostsComment.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPostsComment.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.postCommentData = payload
            }).addCase(getPostsComment.rejected, (state, action) => {
                state.error = action.error.message;
            })
        builder
            .addCase(Get_all_users.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(Get_all_users.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.users = payload
            }).addCase(Get_all_users.rejected, (state, action) => {
                state.error = action.error.message
            })
    }
})
export const { paginationReducer, deletePostReducer, paginations, updatePosts } = postsSlice.actions
export default postsSlice.reducer