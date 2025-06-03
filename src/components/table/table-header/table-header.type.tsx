export interface IColumn<T> {
  key: keyof T;
  header: string;
  render?: (item: T) => React.ReactNode;
}

export interface ITableHeaderProps<T> {
  columns: IColumn<T>[];
  onSort: (key: keyof T) => void;
  renderSortIcon: (key: keyof T) => React.ReactNode;
}