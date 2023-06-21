import { configureStore, combineReducers } from '@reduxjs/toolkit';

import galleryList from '../../screens/GalleryHome/slice';

const rootReducer = combineReducers({
  galleryList
});

export const store = configureStore({
  reducer: rootReducer,
});
