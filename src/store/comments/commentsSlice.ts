import { createSlice } from '@reduxjs/toolkit';

import initialComments from 'data/data.json';

import { IComment } from 'models/IComment';
import { IReply } from 'models/IReply';

import { deleteCommentById } from 'utils/data/deleteCommentById';

export interface CommentsState {
	comments: IComment[];
	showDeleteModal: boolean;
	idForDelete: number | null;
	isShowReply: boolean;
	idReply: null | number;
	isReplyingTo: string;
	newReply: any;
}

const initialState: CommentsState = {
	comments: initialComments.comments,
	showDeleteModal: false,
	idForDelete: null,
	isShowReply: false,
	idReply: null,
	isReplyingTo: '',
	newReply: null,
};

export const commentsSlice = createSlice({
	name: 'comments',
	initialState,
	reducers: {
		deleteComment: (state, action) => {
			state.showDeleteModal = true;
			if (action.payload) {
				const newArr = deleteCommentById(state.idForDelete, state.comments);
				state.comments = newArr;
			}
			state.showDeleteModal = false;
			state.idForDelete = null;
		},
		handleToggleModal: (state, action) => {
			state.idForDelete = action.payload.id;
			state.showDeleteModal = action.payload.isDelete;
		},
		createComment: (state, action) => {
			state.comments.push(action.payload);
		},
		setComments: (state, action) => {
			state.comments = action.payload;
		},
		showReplyInComment: (state, action) => {
			state.comments.map(globalComment => {
				if (globalComment.id === action.payload) {
					if (state.idReply !== action.payload) {
						state.isShowReply = true;
					} else {
						state.isShowReply = !state.isShowReply;
					}

					state.isReplyingTo = globalComment.user.username;
					state.idReply = action.payload;
				} else {
					if (globalComment.replies && globalComment.replies.length > 0) {
						for (let j = 0; j < globalComment.replies.length; j++) {
							const reply = globalComment.replies[j];

							if (reply.id === action.payload) {
								if (state.idReply !== globalComment.id) {
									state.isShowReply = true;
								} else {
									state.isShowReply = !state.isShowReply;
								}

								state.isReplyingTo = reply.user.username;
								state.idReply = globalComment.id;
							}
						}
					}
				}
			});
		},
		addComment: (state, action) => {
			if (action.payload.id) {
				let oldReply = (state.newReply = state.comments.find(
					comment => comment.id === action.payload.id
				));

				let newReply: IReply = {
					id: Math.random(),
					content: action.payload.contentReply,
					createdAt: new Date().getTime(),
					replyingTo: state.isReplyingTo,
					score: 0,
					user: { ...action.payload.currentUser },
				};

				oldReply?.replies.push(newReply);
			}

			state.isShowReply = false;
			state.isReplyingTo = '';
		},
		editComment: (state, action) => {
			state.comments.map((comment, index) => {
				if (comment.id === action.payload.id) {
					let oldComment = comment;
					oldComment.content = action.payload.content;

					state.comments[index] = oldComment;
				} else {
					if (comment.replies && comment.replies.length > 0) {
						for (let j = 0; j < comment.replies.length; j++) {
							const reply = comment.replies[j];

							if (reply.id === action.payload.id) {
								reply.content = action.payload.content;
							}
						}
					}
				}
			});
		},
		setNewScore: (state, action) => {
			state.comments.map((comment, index) => {
				if (comment.id === action.payload.id) {
					state.comments[index].score = action.payload.voted;
				}
			});
		},
	},
});

export const {
	deleteComment,
	handleToggleModal,
	createComment,
	setComments,
	showReplyInComment,
	addComment,
	editComment,
	setNewScore,
} = commentsSlice.actions;
export default commentsSlice.reducer;
