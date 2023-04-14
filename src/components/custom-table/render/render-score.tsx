import { ColumnFields } from "../types/data-inter";

/**
 * 渲染字段为 SCORE 评分
 */
export function getScoreRenderCell(row: any, column: ColumnFields, h: any) {
  let model = row[column.field];
  console.log(model, row, column.field);
  const show = !isNaN(Number(model)) && Number(model) > 0;
  if (show) {
    model = Number(model);
    model = model > 5 ? 5 : model < 0 ? 0 : model;
    return (
      <el-rate
        v-model={model}
        disabled
        text-color="#FF9900"
        disabled-void-color="#C6D1DE"
      ></el-rate>
    );
  } else {
    row[column.field] = "";
    return <span></span>;
  }
}
