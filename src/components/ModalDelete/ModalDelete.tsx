import { FC } from 'react';

import styles from './ModalDelete.module.scss';

import { useAppDispatch } from 'hooks/hooks';
import { deleteComment } from 'store/comments/commentsSlice';

export const ModalDelete: FC = () => {
	const dispatch = useAppDispatch();

	const handleDeleteModal = (isDelete: boolean) => {
		dispatch(deleteComment(isDelete));
	};

	return (
		<div className={styles.modal}>
			<div className={styles.content}>
				<h1>Delete comment</h1>
				<p>
					Are you sure you want delete this comment? This will remove the
					comment and can't be undone.
				</p>

				<div className={styles.buttons}>
					<button onClick={() => handleDeleteModal(false)}>NO, CANCEL</button>
					<button onClick={() => handleDeleteModal(true)}>YES, DELETE</button>
				</div>
			</div>
		</div>
	);
};
