export interface PhotoGalleryType<T> {
	count: number;
	list: T[];
}
export interface PhotoGalleryItemType {
	id: number | string;
	title: string;
	subsetId: number;
	createTime: string;
	introduce: string;
	cover: string;
	content: string[];
	viewCount: number;
	commentCount: number;
	praiseCount: number;
}
