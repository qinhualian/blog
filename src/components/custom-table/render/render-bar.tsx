import { ColumnFields } from "../types/data-inter";

/**
 * 渲染字段为 PROGRESS_BAR 进度条
 */
export function getBarRenderCell(row: any, column: ColumnFields, h: any) {
  let model = row[column.field];
  const show = !isNaN(Number(model)) && Number(model) > 0;
  if (show) {
    model = Number(model);
    model = model > 100 ? 100 : model < 0 ? 0 : model;
    return (
      <el-progress
        text-inside={true}
        stroke-width={15}
        percentage={model}
        color={column.color}
      ></el-progress>
    );
  } else {
    row[column.field] = "";
    return <span></span>;
  }
}
