import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from 'store/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useActiveUser = (user: string) => {
	const { currentUser } = useAppSelector(state => state.user);

	return currentUser.username === user ? true : false;
};
