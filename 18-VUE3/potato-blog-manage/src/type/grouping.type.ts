export interface StateType {
	id: number | string;
	name: string;
	value: number;
}

export interface GroupingType {
	count: number;
	list: StateType[];
}
