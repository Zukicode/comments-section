import { FC, useEffect, useState } from 'react';

import styles from './CommentContent.module.scss';

import { Controls } from 'components/Controls/Controls';
import { Edit } from 'components/Edit/Edit';

import { useActiveUser } from 'hooks/hooks';

import { IUser } from 'models/IUser';

import { postedTimeForComment } from 'utils/string/time';

type Props = {
	id: number;
	user: IUser;
	replyingTo?: string;
	createdAt: number;
	content: string;
};

export const CommentContent: FC<Props> = ({
	id,
	content,
	user,
	replyingTo,
	createdAt,
}) => {
	const isYou = useActiveUser(user.username);

	const [showEdit, setShowEdit] = useState<boolean>(false);

	const [time, setTime] = useState('');
	const today = new Date();

	useEffect(() => {
		const differenceInTime = today.getTime() - createdAt;
		setTime(postedTimeForComment(differenceInTime));
	}, []);

	const toggleEdit = () => setShowEdit(!showEdit);

	return (
		<div className={styles.content}>
			<div className={styles.header}>
				<div className={styles.textHeader}>
					<img src={user.image.png} alt={user.username} />
					<p className={styles.name}>{user.username}</p>
					<span className={styles.dateSend}>
						{time ? `${time} ago` : 'Loading...'}
					</span>
					{isYou && <span className={styles.you}>you</span>}
				</div>

				<Controls id={id} user={user.username} toggleEdit={toggleEdit} />
			</div>
			{isYou ? (
				showEdit ? (
					<Edit content={content} id={id} toggleEdit={toggleEdit} />
				) : (
					<p className={styles.text}>
						{replyingTo && (
							<span className={styles.username}>@{replyingTo} </span>
						)}
						{content}
					</p>
				)
			) : (
				<p className={styles.text}>
					{replyingTo && (
						<span className={styles.username}>@{replyingTo} </span>
					)}
					{content}
				</p>
			)}
		</div>
	);
};
