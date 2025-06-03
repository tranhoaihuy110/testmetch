/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableCell, TableRow } from "../../index";
import { ActionButtons } from "../action-buttons/action-buttons.table";
import { ITableRowComponentProps } from "./index";

export const TableRowComponent = <T,>({
  item,
  columns,
  onEdit,
  onDelete,
  onDetail,

}: ITableRowComponentProps<T>) => {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={String(column.key)}
          className="px-5 py-3 text-theme-sm text-gray-700 dark:text-gray-300"
        >
          {column.key === "actions" ? (
            <ActionButtons
              item={item}
              onEdit={onEdit}
              onDelete={onDelete}
              onDetail={onDetail}

            />
          ) : column.render ? (
            column.render(item)
          ) : (
            (item[column.key] as any)
          )}
        </TableCell>
      ))}
    </TableRow>
  );
};
