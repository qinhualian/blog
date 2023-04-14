import { ColumnFields } from "../types/data-inter";

/**
 *渲染字段为 TEXT 文本
 */
export function getTextRenderCell(row: any, column: ColumnFields, h: any) {
  row[column.field] = row[column.field] || "";
  return <span>{row[column.field]}</span>;
}
