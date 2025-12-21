export interface ArticleResponseType<T> {
	count: number;
	list: T[];
}

export interface ArticleItemType {
	id: number | string;
	cover: string;
	title: string;
	createTime: string;
	label: string[];
	introduce: string;
	viewCount: number | string;
	commentCount: number | string;
	praiseCount: number | string;
	region: string;
	state: number;
	subsetId: number | string;
}
