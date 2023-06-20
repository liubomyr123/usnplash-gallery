import { configureStore, combineReducers } from '@reduxjs/toolkit';

import galleryList from '../../screens/GalleryHome/slice';
import currentImage from '../../screens/GalleryDetails/slice';

const rootReducer = combineReducers({
  currentImage,
  galleryList
});

export const store = configureStore({
  reducer: rootReducer,
});
