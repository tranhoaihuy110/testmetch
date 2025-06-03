import { ReactNode } from "react";
// Props for Table
export interface ITableProps {
  children: ReactNode; // Table content (thead, tbody, etc.)
  className?: string; // Optional className for styling
}

// Props for TableHeader
export interface ITableHeaderProps {
  children: ReactNode; // Header row(s)
  className?: string; // Optional className for styling
}

// Props for TableBody
export interface ITableBodyProps {
  children: ReactNode; // Body row(s)
  className?: string; // Optional className for styling
}

// Props for TableRow
export interface ITableRowProps {
  children: ReactNode; // Cells (th or td)
  className?: string; // Optional className for styling
}

// Props for TableCell
export interface ITableCellProps {
  children: ReactNode; // Cell content
  isHeader?: boolean; // If true, renders as <th>, otherwise <td>
  className?: string; // Optional className for styling
}
