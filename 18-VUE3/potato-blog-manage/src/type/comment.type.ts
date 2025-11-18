import type { UserType } from './user.type';

export interface CommentResponseType<T> {
	total: number;
	list: T[];
}
export interface CommentItemType {
	id: number | string;
	content: string;
	likeCount: number;
	report: number;
	createTime: string;
	user: UserType;
}
