import { FC } from 'react';

import styles from './Comments.module.scss';

import { AddReply } from 'components/AddReply/AddReply';
import { Comment } from 'components/Comment/Comment';
import { ModalDelete } from 'components/ModalDelete/ModalDelete';

import { useAppSelector } from 'hooks/hooks';

type Props = {};

export const Comments: FC<Props> = () => {
	const { comments, showDeleteModal, idReply, isShowReply } = useAppSelector(
		state => state.comments
	);

	return (
		<div className={styles.comments}>
			{showDeleteModal && <ModalDelete />}

			{comments.map(commentData => (
				<div key={commentData.id} className={styles.fullComment}>
					<Comment {...commentData} />

					{commentData.id === idReply && isShowReply === true ? (
						<AddReply commentData={commentData} />
					) : (
						''
					)}

					{commentData.replies && (
						<div className={styles.replies}>
							<span className={styles.divider}>
								<div className={styles.line}></div>
							</span>

							<div className={styles.replyList}>
								{commentData.replies.map(reply => (
									<Comment key={reply.id} {...reply} />
								))}
							</div>
						</div>
					)}
				</div>
			))}
		</div>
	);
};
