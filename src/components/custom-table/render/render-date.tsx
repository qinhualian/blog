import { ColumnFields } from "../types/data-inter";

/**
 * 渲染字段为 DATE 日期
 */
export function getDateRenderCell(
  row: any,
  column: ColumnFields,
  h: any,
  disabled?: boolean
) {
  // 校验有效日期 防止复制错误的日期类型进来
  const model = isValidDate(row[column.field]);
  return (
    <el-date-picker
      size="small"
      type={column.dateType}
      value={model}
      on-input={(val: any) => {
        row[column.field] = val;
      }}
      disabled={disabled}
      format={getShowFormatdate(column)}
      value-format="yyyy-MM-dd HH:mm:ss"
      placeholder="选择日期"
    ></el-date-picker>
  );
}

export function getShowFormatdate(column: ColumnFields) {
  let format = column.normalFormat;
  switch (column.dateType) {
    case "month":
      format = column.monthFormat;
      break;
    case "datetime":
      format =
        column.normalFormat + (column.HHFormat ? " HH:mm:ss" : " hh:mm:ss");
      break;
    default:
      format = column.normalFormat;
      break;
  }
  return format || "yyyy-MM-dd";
}

function isValidDate(value: string) {
  if (!value) return;
  let newValue = "";
  if (
    value.length === 19 ||
    value.length === 16 ||
    value.length === 7 ||
    value.length === 10
  ) {
    const date = new Date(value.substring(0, value.length === 16 ? 7 : 10));
    if (date instanceof Date) {
      newValue = isValidTime(value);
    } else {
      newValue = isValidYear(value);
    }
  }
  if (value.length === 20 || value.length === 11 || value.length === 8) {
    newValue = isValidYear(value);
  }
  return newValue;
}

function isValidYear(value: string) {
  let newValue = "";
  let date = value;
  if (value.length === 20 || value.length === 16) {
    date = value.substring(
      0,
      value.length === 16 ? 7 : value.length === 20 ? 11 : 10
    );
  }
  const ch_date = new RegExp(
    /^[0-9]{4}年(([0][1-9])|([1][1-2]))月((0[1-9])|(1[0-9])|(2[0-9])|(3[0-1]))日$/
  );
  const ch_date2 = new RegExp(/^[0-9]{4}年(([0][1-9])|([1][1-2]))月$/);
  if (ch_date.test(date) || ch_date2.test(date)) {
    if (value.length !== 20 && value.length !== 16) {
      newValue = date;
    } else {
      newValue = isValidTime(value);
    }
  }
  return newValue;
}

function isValidTime(value: string) {
  let newValue = "";
  const time_reg = new RegExp(/^(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/);
  if (value.length === 19 || value.length === 16 || value.length === 20) {
    const time = value.substring(value.length - 8, value.length);
    if (time_reg.test(time)) {
      newValue = value;
    }
  } else {
    newValue = value;
  }
  return newValue;
}
