import { ColumnFields } from "../types/data-inter";

/**
 *渲染字段为 NUMBER 数值
 */
export function getNumberRenderCell(row: any, column: ColumnFields, h: any) {
  let value = row[column.field]; // 页面上展示为字符串
  if (value === "" || value === undefined) {
    // 空值
  } else {
    if (value.length < 16 || typeof value === "number") {
      const num_value = Number(value);
      value = !isNaN(num_value)
        ? num_value?.toFixed((column?.accuracy || 1) - 1)
        : "";
      row[column.field] = value !== "" ? Number(row[column.field]) : ""; // 数据实际赋值为数字 (页面上展示为'2.00' 实际储存2)
    }
  }
  return <span>{value}</span>;
}
