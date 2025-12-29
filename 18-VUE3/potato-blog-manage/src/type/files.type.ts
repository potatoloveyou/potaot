export interface FileType<T> {
  count: number;
  list: T[];
}

export interface FileItemType {
  id: number;
  url: string;
  fileName: string;
  format: string;
  subsetId: string;
}