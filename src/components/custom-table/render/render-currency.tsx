import { ColumnFields } from "../types/data-inter";

/**
 * 渲染字段为 CHINESE_CURRENCY 国币
 */
export function getCurrencyRenderCell(row: any, column: ColumnFields, h: any) {
  let model = row[column.field];
  const show = !isNaN(Number(model)) && Number(model) !== 0;
  if (show) {
    const showModel = Number(model).toFixed((column?.accuracy || 1) - 1); // 页面上展示为字符串
    model = Number(Number(model).toFixed((column?.accuracy || 1) - 1)); // 数据实际赋值为数字 (页面上展示为'2.00' 实际储存2)
    row[column.field] = Number(row[column.field]); // 数据实际赋值为数字 (页面上展示为'2.00' 实际储存2)
    return (
      <span>
        {column.symbol}&nbsp;
        {showModel}
      </span>
    );
  } else {
    row[column.field] = "";
    return <span></span>;
  }
}
