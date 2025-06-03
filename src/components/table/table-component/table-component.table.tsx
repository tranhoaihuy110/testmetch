import { Table, TableBody } from "../../index";
import { TableHeader } from "../table-header/table-header.table";
import { TableRowComponent } from "../table-row-component/table-row-component.table";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";

import { ITableComponentProps } from "./index";

export const TableComponent = <T,>({
  data,
  columns,
  onEdit,
  onDelete,
  onDetail,
  sortConfig,
  handleSort,
}: ITableComponentProps<T>) => {
  const renderSortIcon = (key: keyof T) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? (
        <ArrowUp size={14} className="inline ml-1" />
      ) : (
        <ArrowDown size={14} className="inline ml-1" />
      );
    }
    return <ArrowUpDown size={14} className="inline ml-1 text-gray-400" />;
  };

  return (
    <Table>
      <TableHeader
        columns={columns}
        onSort={handleSort}
        renderSortIcon={renderSortIcon}
      />
      <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
        {data.map((item, index) => (
          <TableRowComponent
            key={index}
            item={item}
            columns={columns}
            onEdit={onEdit}
            onDelete={onDelete}
            onDetail={onDetail}
          />
        ))}
      </TableBody>
    </Table>
  );
};
