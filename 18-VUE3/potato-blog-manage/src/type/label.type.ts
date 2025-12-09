export interface LabelType {
	id: number | string;
	name: string;
	value: number;
	createTime: string;
}

export interface LabelRow extends LabelType {
	isExclude: boolean;
	originalName?: string;
	_dirty?: boolean;
	createTime: string;
}