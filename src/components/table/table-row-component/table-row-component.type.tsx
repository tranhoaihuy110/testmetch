interface IColumn<T> {
  key: keyof T;
  header: string;
  render?: (item: T) => React.ReactNode;
}

export interface ITableRowComponentProps<T> {
  item: T;
  columns: IColumn<T>[];
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  onDetail:(item: T) => void;

}
