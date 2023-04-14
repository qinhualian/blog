import { ColumnFields } from "../types/data-inter";

/**
 * 渲染字段为 SINGLE_CHOICE 单选
 */
export function getSingleRenderCell(
  row: any,
  column: ColumnFields,
  h: any,
  disabled?: boolean
) {
  const model = row[column.field];
  return (
    <el-select
      size="small"
      filterable
      value={model}
      disabled={disabled}
      on-input={(val: string) => {
        row[column.field] = val;
      }}
      placeholder="请选择"
    >
      {column.source?.map((item: any) => (
        <el-option label={item} value={item}></el-option>
      ))}
    </el-select>
  );
}
