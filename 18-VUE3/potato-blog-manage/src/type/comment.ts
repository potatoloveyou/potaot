import type { User } from './user';

export interface CommentResponse<T> {
	total: number;
	list: T[];
}
export interface CommentItem {
	id: number | string;
	content: string;
	likeCount: number;
	report: number;
	createTime: string;
	user: User;
}