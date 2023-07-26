import { FC, useState } from 'react';

import styles from './AddReply.module.scss';

import { Button } from 'components/UI/Button/Button';

import { IComment } from 'models/IComment';

import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { addComment } from 'store/comments/commentsSlice';

type Props = {
	commentData: IComment;
};

export const AddReply: FC<Props> = ({ commentData }) => {
	const dispatch = useAppDispatch();

	const [replyValue, setReplyValue] = useState<string>('');

	const { currentUser } = useAppSelector(state => state.user);
	const { isReplyingTo } = useAppSelector(state => state.comments);

	const handleCreateReply = () => {
		dispatch(
			addComment({ id: commentData.id, contentReply: replyValue, currentUser })
		);
	};

	return (
		<div className={styles.addReply}>
			<img src={currentUser.image.png} alt={currentUser.username} />
			<textarea
				value={replyValue}
				onChange={e => setReplyValue(e.target.value)}
				autoFocus
				placeholder={isReplyingTo ? `@${isReplyingTo}` : 'Add a comment...'}
			/>
			<Button handleClick={handleCreateReply}>Reply</Button>
		</div>
	);
};
