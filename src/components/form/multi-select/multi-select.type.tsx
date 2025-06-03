export interface IOption {
  value: string;
  text: string;
}

export interface IMultiSelectProps {
  label: string;
  options: IOption[];
  defaultSelected?: string[];
  onChange?: (selected: string[]) => void;
  disabled?: boolean;
}