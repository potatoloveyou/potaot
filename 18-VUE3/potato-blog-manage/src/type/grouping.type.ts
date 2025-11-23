export interface StateType {
	id: number | string;
	name: string;
	value: number;
	createTime: string;
}

export interface GroupingType {
	count: number;
	list: StateType[];
}
