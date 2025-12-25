export interface PhotoGallery<T> {
	count: number;
	list: T[];
}
export interface PhotoGalleryItem {
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
