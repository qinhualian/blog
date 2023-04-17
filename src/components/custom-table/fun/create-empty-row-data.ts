import { getRandomId } from "@/comment-fun/random-id";
import { ColumnFields, RowFields } from "../types/data-inter";

// 创建一列空行
export function createEmptyRowData(tableColumns: ColumnFields[]): RowFields {
  const rowData: any = {
    rowKey: getRandomId(),
  };
  tableColumns.forEach((column) => {
    if (Object.prototype.hasOwnProperty.call(column, "field")) {
      rowData[column.field] = "";
    }
  });
  return rowData;
}
