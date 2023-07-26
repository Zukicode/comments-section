import { FC, useEffect, useState } from 'react';

import styles from './Edit.module.scss';

import { Button } from 'components/UI/Button/Button';

import { useAppDispatch } from 'hooks/hooks';
import { editComment } from 'store/comments/commentsSlice';

type Props = {
	id: number;
	content: string;
	toggleEdit: () => void;
};

export const Edit: FC<Props> = ({ id, content, toggleEdit }) => {
	const dispatch = useAppDispatch();
	const [editValue, setEditValue] = useState<string>(content);

	const handleChangeComment = () => {
		if (editValue.length === 0) return;

		dispatch(editComment({ id, content: editValue }));
		toggleEdit();
	};

	useEffect(() => {
		setEditValue(content);
	}, [content]);

	return (
		<div className={styles.edit}>
			<textarea
				value={editValue}
				onChange={e => setEditValue(e.target.value)}
				placeholder='Edit here...'
				autoFocus
			/>
			<Button handleClick={handleChangeComment}>UPDATE</Button>
		</div>
	);
};
