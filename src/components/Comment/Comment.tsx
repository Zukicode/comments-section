import { FC } from 'react';

import styles from './Comment.module.scss';

import { CommentContent } from 'components/CommentContent/CommentContent';
import { Evaluation } from 'components/Evaluation/Evaluation';

import { IUser } from 'models/IUser';

type Props = {
	id: number;
	score: number;
	user: IUser;
	replyingTo?: string;
	createdAt: number;
	content: string;
};

export const Comment: FC<Props> = ({
	id,
	content,
	score,
	user,
	replyingTo,
	createdAt,
}) => {
	return (
		<div className={styles.comment}>
			<Evaluation id={id} score={score} />
			<CommentContent
				id={id}
				content={content}
				user={user}
				replyingTo={replyingTo}
				createdAt={createdAt}
			/>
		</div>
	);
};
