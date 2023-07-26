export interface IReply {
	id: number;
	content: string;
	createdAt: number;
	replyingTo: string;
	score: number;
	user: {
		image: {
			png: string;
			webp: string;
		};
		username: string;
	};
}
