import { configureStore } from '@reduxjs/toolkit';

import commentsSlice from './comments/commentsSlice';
import userSlice from './user/userSlice';

export const store = configureStore({
	reducer: {
		user: userSlice,
		comments: commentsSlice,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
