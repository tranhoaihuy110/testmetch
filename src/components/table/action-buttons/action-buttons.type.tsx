
export interface IActionButtonsProps<T> {
  item: T;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onDetail?: (item: T) => void;
}