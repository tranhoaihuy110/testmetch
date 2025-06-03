export interface IRadioProp {
    id: string; // Unique ID for the radio button
    name: string; // Group name for the radio button
    value: string; // Value of the radio button
    checked: boolean; // Whether the radio button is checked
    label: string; // Label text for the radio button
    onChange: (value: string) => void; // Handler for when the radio button is toggled
    className?: string; // Optional custom classes for styling
  }
  