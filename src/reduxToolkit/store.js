// import { configureStore, combineReducers} from "@reduxjs/toolkit";
import { SosTwoTone } from '@mui/icons-material';
import postsSlice  from './PostsSlice/postsSlice'
import todosSlice from './todosSlice/todosSlice';
// import storage from 'redux-persist/lib/storage';
// import { 
//   persistStore,
//    persistReducer,
//    FLUSH,
//    REHYDRATE,
//    PAUSE,
//    PERSIST,
//    PURGE,
//    REGISTER,
//  } from 'redux-persist'
// const rootReducer = combineReducers({
//     posts:postsSlice,
// })

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer  = persistReducer(persistConfig, rootReducer)


// const store = configureStore({
//     reducer:persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// })
// export const persistor = persistStore(store)
// export default store



import { configureStore } from "@reduxjs/toolkit";
import photosSlice from './photosSlice/photosSlice';
const store = configureStore({
  reducer:{
    posts:postsSlice,
    todos:todosSlice,
    photos:photosSlice,
  }
})
export default store;