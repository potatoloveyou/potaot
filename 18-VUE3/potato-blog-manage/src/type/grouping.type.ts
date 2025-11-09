export interface State {
	id: number | string;
	name: string;
	value: number;
}

export interface Grouping {
	count: number;
	list: State[];
}
