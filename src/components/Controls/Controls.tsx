import { FC } from 'react';

import styles from './Controls.module.scss';

import deleteIcon from 'assets/images/icon-delete.svg';
import editIcon from 'assets/images/icon-edit.svg';
import replyIcon from 'assets/images/icon-reply.svg';

import { useActiveUser, useAppDispatch } from 'hooks/hooks';
import {
	handleToggleModal,
	showReplyInComment,
} from 'store/comments/commentsSlice';

type Props = {
	id: number;
	user: string;
	toggleEdit: () => void;
};

export const Controls: FC<Props> = ({ id, user, toggleEdit }) => {
	const dispatch = useAppDispatch();
	const isYou = useActiveUser(user);

	const handleClickDeleteComment = () => {
		dispatch(handleToggleModal({ id, isDelete: true }));
	};

	const handleClickReplyComment = () => {
		dispatch(showReplyInComment(id));
	};

	return (
		<div className={styles.controls}>
			{isYou ? (
				<>
					<button onClick={handleClickDeleteComment} className={styles.delete}>
						<span className={styles.icon}>
							<img src={deleteIcon} alt='Delete' />
						</span>
						Delete
					</button>

					<button onClick={toggleEdit}>
						<span className={styles.icon}>
							<img src={editIcon} alt='Edit' />
						</span>
						Edit
					</button>
				</>
			) : (
				<button onClick={handleClickReplyComment}>
					<span className={styles.icon}>
						<img src={replyIcon} alt='Reply' />
					</span>
					Reply
				</button>
			)}
		</div>
	);
};
