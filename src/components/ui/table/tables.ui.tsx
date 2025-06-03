import {
  ITableProps,
  ITableHeaderProps,
  ITableBodyProps,
  ITableRowProps,
  ITableCellProps,
} from "./index";

// Table Component
const Table: React.FC<ITableProps> = ({ children, className }) => {
  return <table className={`min-w-full  ${className}`}>{children}</table>;
};

// TableHeader Component
const TableHeader: React.FC<ITableHeaderProps> = ({ children, className }) => {
  return <thead className={className}>{children}</thead>;
};

// TableBody Component
const TableBody: React.FC<ITableBodyProps> = ({ children, className }) => {
  return <tbody className={className}>{children}</tbody>;
};

// TableRow Component
const TableRow: React.FC<ITableRowProps> = ({ children, className }) => {
  return <tr className={className}>{children}</tr>;
};

// TableCell Component
const TableCell: React.FC<ITableCellProps> = ({
  children,
  isHeader = false,
  className,
}) => {
  const CellTag = isHeader ? "th" : "td";
  return <CellTag className={` ${className}`}>{children}</CellTag>;
};

export { Table, TableHeader, TableBody, TableRow, TableCell };
