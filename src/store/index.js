import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { postReducer } from './reducers/post';

const store = configureStore({
	reducer: {
		post: postReducer,
	},
	middleware: () => [thunk],
});

export default store;
