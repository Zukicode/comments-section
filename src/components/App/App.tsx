import { useEffect } from 'react';

import styles from './App.module.scss';

import { Comments } from 'components/Comments/Comments';
import { SelectUser } from 'components/SelectUser/SelectUser';
import { SendComment } from 'components/SendComment/SendComment';

import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { setComments } from 'store/comments/commentsSlice';

export const App = () => {
	const dispatch = useAppDispatch();
	const { comments } = useAppSelector(state => state.comments);

	useEffect(() => {
		if (localStorage.getItem('comments')) {
			const commentsFromLocalStorage: any = localStorage.getItem('comments');

			dispatch(setComments(JSON.parse(commentsFromLocalStorage)));
		}

		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		localStorage.setItem('comments', JSON.stringify(comments));
	}, [comments]);

	return (
		<div className={styles.application}>
			<Comments />
			<SendComment />
			<SelectUser />
		</div>
	);
};
