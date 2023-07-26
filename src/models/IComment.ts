import { IReply } from './IReply';

export interface IComment {
	id: number;
	content: string;
	createdAt: number;
	replies: IReply[];
	score: number;
	user: {
		image: {
			png: string;
			webp: string;
		};
		username: string;
	};
}
