import { IComment } from 'models/IComment';

export function deleteCommentById(
	id: number | null,
	array: IComment[]
): IComment[] {
	let newArray: IComment[] = [];

	array.map(globalComment => {
		if (globalComment.id === id) {
			newArray = array.filter(comment => comment.id !== id);
		} else {
			if (globalComment.replies && globalComment.replies.length > 0) {
				let newComment: IComment | [] = [];

				for (let j = 0; j < globalComment.replies.length; j++) {
					const reply = globalComment.replies[j];

					if (reply.id === id) {
						newComment = globalComment;
						const newReplies = globalComment.replies.filter(
							comment => comment.id !== id
						);

						newComment.replies = newReplies;

						newArray = [...array].filter(comment => comment.id !== id);
					}
				}
			}
		}
	});

	return newArray;
}
