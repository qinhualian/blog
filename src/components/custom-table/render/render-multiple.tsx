import { ColumnFields } from "../types/data-inter";

/**
 * 渲染字段为 MULTIPLE_CHOICE 多选
 */
export function getMultipleRenderCell(
  row: any,
  column: ColumnFields,
  h: any,
  disabled?: boolean
) {
  let model = row[column.field];
  try {
    model = JSON.parse(row[column.field]);
  } catch (error) {
    model = [];
  }
  return (
    <el-select
      size="small"
      filterable
      multiple
      disabled={disabled}
      value={model}
      on-input={(val: string) => {
        row[column.field] = JSON.stringify(val);
      }}
      placeholder="请选择"
    >
      {column.source?.map((item: any) => (
        <el-option label={item} value={item}></el-option>
      ))}
    </el-select>
  );
}
