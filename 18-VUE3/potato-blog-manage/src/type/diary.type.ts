export interface DiaryType<T> {
	count: number;
	list: T[];
}

export interface DiaryItemType {
	id: number | string;
	title: string;
	createTime: string;
	introduce: string;
	picture: string[];
}
