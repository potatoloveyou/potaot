export interface StateType {
	id: number | string;
	name: string;
	value: number;
	createTime: string;
}

export interface StateRow extends StateType {
	isExclude: boolean;
	originalName?: string;
	_dirty?: boolean;
}

export interface GroupingType {
	count: number;
	list: StateType[];
}
