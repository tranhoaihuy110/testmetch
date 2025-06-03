 interface IOption {
  value: string;
  label: string;
}

export interface ISelectProps {
  options: IOption[];
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  defaultValue?: string;
}