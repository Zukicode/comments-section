import { FC } from 'react';

import styles from './SelectUser.module.scss';

import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { setNewUser } from 'store/user/userSlice';

import { IUser } from 'models/IUser';

export const SelectUser: FC = () => {
	const dispatch = useAppDispatch();

	const { users } = useAppSelector(state => state.user);

	const handleChangeUser = (user: IUser) => {
		dispatch(setNewUser(user));
	};

	return (
		<div className={styles.selectUser}>
			{users.map(user => (
				<button
					key={user.username}
					onClick={() => handleChangeUser(user)}
					className={styles.user}
				>
					<img src={user.image.png} alt={user.username} />
				</button>
			))}
		</div>
	);
};
