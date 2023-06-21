import { configureStore, combineReducers } from '@reduxjs/toolkit';

// import galleryList from '../../screens/GalleryHome/slice';
import { unsplashApi } from '../../screens/GalleryHome/api';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

const rootReducer = combineReducers({
  // galleryList,
  [unsplashApi.reducerPath]: unsplashApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false
  }).concat(unsplashApi.middleware),
});

setupListeners(store.dispatch);
