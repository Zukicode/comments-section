import { FC, useState } from 'react';

import styles from './SendComment.module.scss';

import { Button } from 'components/UI/Button/Button';

import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { createComment } from 'store/comments/commentsSlice';

export const SendComment: FC = () => {
	const [commentValue, setCommentValue] = useState<string>('');
	const { currentUser } = useAppSelector(state => state.user);

	const dispatch = useAppDispatch();

	const handleCreateComent = () => {
		if (!commentValue && commentValue.length <= 0) return;

		const newComment = {
			id: Math.random(),
			content: commentValue,
			createdAt: new Date().getTime(),
			score: 0,
			user: {
				...currentUser,
			},
			replies: [],
		};

		dispatch(createComment(newComment));
		setCommentValue('');
	};

	return (
		<div className={styles.sendComment}>
			<img src={currentUser.image.png} alt={currentUser.username} />
			<textarea
				value={commentValue}
				onChange={e => setCommentValue(e.target.value)}
				autoFocus
				placeholder='Add a comment...'
			/>
			<Button handleClick={handleCreateComent}>Send</Button>
		</div>
	);
};
