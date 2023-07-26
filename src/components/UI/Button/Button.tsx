import { FC } from 'react';

import styles from './Button.module.scss';

type Props = {
	children: React.ReactNode;
	handleClick: () => void;
};

export const Button: FC<Props> = ({ children, handleClick }) => {
	return (
		<button className={styles.button} onClick={handleClick}>
			{children}
		</button>
	);
};
