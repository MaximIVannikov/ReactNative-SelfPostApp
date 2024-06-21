import { configureStore } from '@reduxjs/toolkit';
import { postReducer } from './reducers/post';

const store = configureStore({
	reducer: {
		post: postReducer,
	},
});

export default store;
