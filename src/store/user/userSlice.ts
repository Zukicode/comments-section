import { createSlice } from '@reduxjs/toolkit';
import { IUser } from 'models/IUser';

import data from 'data/data.json';

export interface UserState {
	users: IUser[];
	currentUser: IUser;
}

const initialState: UserState = {
	users: data.users,
	currentUser: {
		image: {
			png: 'avatars/image-juliusomo.png',
			webp: 'avatars/image-juliusomo.webp',
		},
		username: 'juliusomo',
	},
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setNewUser: (state, action) => {
			state.currentUser = action.payload;
		},
	},
});

export const { setNewUser } = userSlice.actions;
export default userSlice.reducer;
