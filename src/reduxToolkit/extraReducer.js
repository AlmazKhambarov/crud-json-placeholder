import { createAsyncThunk, isAsyncThunkAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { GET_ALL_POSTS, GET_ALL_USERS, GET_ALL_COMMENTS, POST_SAVED_DATA, GET_ALL_TODOS, GET_ALL_PHOTOS } from "../services/api";

export const get_all_postss = createAsyncThunk('get/allposts', async () => {
    return axios({
        method: 'GET',
        url: GET_ALL_POSTS,
    }).then(res => res.data)
})

export const Get_all_users = createAsyncThunk('get/allusers', async () => {
    return axios({
        method: 'GET',
        url: GET_ALL_USERS,
    }).then(res => res.data)
})
export const getPostsComment = createAsyncThunk('get/allPost/comments', async (postId) => {
    return axios({
        method: 'GET',
        url: `${GET_ALL_COMMENTS}/${postId}/comments`,
    }).then(res => res.data)
})
export const savedDatas = createAsyncThunk('saved', async (paylaod) => {
    return axios({
        method: 'POST',
        url: POST_SAVED_DATA,
        data: paylaod
    }).then(res => res.data)
})
export const Get_saved_data = createAsyncThunk('get/savedData', async (paylaod) => {
    return axios({
        method: 'GET',
        url: POST_SAVED_DATA,
    }).then(res => res.data)
})
export const deleteSavedPost = createAsyncThunk('delete/saved/post', async (paylaod) => {
    return await axios.delete(`${POST_SAVED_DATA}/${paylaod}`).then(res => res.data)
})

export const Get_all_todos = createAsyncThunk('get/todos', async () => {
    return axios({
        method: "GET",
        url: GET_ALL_TODOS
    }).then(res => res.data)
})



export const Get_all_photos = createAsyncThunk('get/all/photos', (state, action)=>{
    return axios({
        method:'GET',
        url:GET_ALL_PHOTOS,
    }).then(res=>res.data)
})
// const getDataFromLocalStorage = () => {
//     const storedData = localStorage.getItem('postsData');
//     return storedData ? JSON.parse(storedData) : null;
// };

// export const storeDataInLocalStorage = (data) => {
//     localStorage.setItem('postsData', JSON.stringify(data));
// };

// export const get_all_posts = createAsyncThunk('get/allposts', async (_, { getState }) => {
//     const storedData = getDataFromLocalStorage();

//     if (storedData) {
//         return storedData;
//     } else {
//         try {
//             const response = await axios.get(GET_ALL_POSTS);
//             const data = response.data;
//             const currentState = getState();
//             const existingData = currentState.posts.data;

//             if (!existingData || JSON.stringify(existingData) !== JSON.stringify(data)) {
//                 storeDataInLocalStorage(data);
//                 return data;
//             }
//             return existingData;
//         } catch (error) {
//             // Handle error if the API request fails
//             throw new Error('Failed to fetch data from the server');
//         }
//     }
// });
