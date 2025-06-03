export interface IRadioProps {
    id: string; // Unique ID for the radio button
    name: string; // Radio group name
    value: string; // Value of the radio button
    checked: boolean; // Whether the radio button is checked
    label: string; // Label for the radio button
    onChange: (value: string) => void; // Handler for value change
    className?: string; // Optional additional classes
    disabled?: boolean; // Optional disabled state for the radio button
  }