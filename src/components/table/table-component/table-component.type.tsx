export interface IColumn<T> {
  key: keyof T;
  header: string;
  render?: (item: T) => React.ReactNode;
}

export interface ITableComponentProps<T> {
  data: T[];
  columns: IColumn<T>[];
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  onDetail:(item: T) => void;
  sortConfig: { key: keyof T | null; direction: "asc" | "desc" };
  handleSort: (key: keyof T) => void;

}