import { Vue } from "vue-property-decorator";
import { ColumnFields, RowFields } from "../types/data-inter";
import { getAddColumnRenderCell } from "./render-addcolumn";
import { getBarRenderCell } from "./render-bar";
import { getCurrencyRenderCell } from "./render-currency";
import { getDateRenderCell } from "./render-date";
import { getIndexRenderCell } from "./render-index";
import { getLinkRenderCell } from "./render-link";
import { getMultipleRenderCell } from "./render-multiple";
import { getNumberRenderCell } from "./render-number";
import { getScoreRenderCell } from "./render-score";
import { getSingleRenderCell } from "./render-single";
import { getTextRenderCell } from "./render-text";

export interface renderCellType {
  row: RowFields;
  column: ColumnFields;
  rowIndex: number;
  disabled?: boolean;
  getStartRowIndex?: any;
  h: any;
}
/**
 * 管理不同类型的渲染方法
 */
export const renderCellMap = new Map([
  [
    {
      columntype: "INDEX",
    },
    ({ rowIndex, getStartRowIndex }: any) =>
      getIndexRenderCell(rowIndex, getStartRowIndex),
  ],
  [
    {
      columntype: "AddColumn",
    },
    () => getAddColumnRenderCell(),
  ],
  [
    {
      columntype: "TEXT",
    },
    ({ row, column, h }: any) => getTextRenderCell(row, column, h),
  ],
  [
    {
      columntype: "NUMBER",
    },
    ({ row, column, h }: any) => getNumberRenderCell(row, column, h),
  ],
  [
    {
      columntype: "DATE",
    },
    ({ row, column, h, disabled }: any) =>
      getDateRenderCell(row, column, h, disabled),
  ],
  [
    {
      columntype: "SCORE",
    },
    ({ row, column, h }: any) => getScoreRenderCell(row, column, h),
  ],
  [
    {
      columntype: "PROGRESS_BAR",
    },
    ({ row, column, h }: any) => getBarRenderCell(row, column, h),
  ],
  [
    {
      columntype: "CHINESE_CURRENCY",
    },
    ({ row, column, h }: any) => getCurrencyRenderCell(row, column, h),
  ],
  [
    {
      columntype: "LINK",
    },
    ({ row, column, h }: any) => getLinkRenderCell(row, column, h),
  ],
  [
    {
      columntype: "MULTIPLE_CHOICE",
    },
    ({ row, column, h, disabled }: any) =>
      getMultipleRenderCell(row, column, h, disabled),
  ],
  [
    {
      columntype: "SINGLE_CHOICE",
    },
    ({ row, column, h, disabled }: any) =>
      getSingleRenderCell(row, column, h, disabled),
  ],
]);
/**
 * 渲染表头入口
 */
export function getRenderHeaderByType({ column }: any, h: any): any {
  let icon_class = "";
  switch (column.columntype) {
    case "CHINESE_CURRENCY":
      icon_class = "header-cell-currency"; // 自定义
      break;
    case "NUMBER":
      icon_class = "header-cell-number";
      break;
    case "PROGRESS_BAR":
      icon_class = "header-cell-bar";
      break;
    case "SCORE":
      icon_class = "header-cell-score";
      break;
    case "LINK":
      icon_class = "header-cell-link";
      break;
    case "SINGLE_CHOICE":
      icon_class = "header-cell-single";
      break;
    case "MULTIPLE_CHOICE":
      icon_class = "header-cell-multiple";
      break;
    case "DATE":
      icon_class = "header-cell-date";
      break;
    case "TEXT":
      icon_class = "header-cell-text";
      break;
    case "AddColumn":
      icon_class = "";
      break;
    default:
      break;
  }
  return (
    <span class="header-title">
      {icon_class ? <i class={"header-cell " + icon_class}></i> : <span></span>}
      <span
        class={column.columntype === "AddColumn" ? "header-title-style" : ""}
      >
        {" "}
        {column.title}
      </span>
    </span>
  );
}

/**
 * 渲染单元格入口
 * columntype 列的类型
 * row 该行数据
 * column 该列数据
 * rowIndex 该行位置
 * disabled 是否只读
 * fn 一个方法(handlerecordEditRowIDList)用于数据修改时 记录该行到recordEditRowIDList数据中 可以局部保存数据
 */
export function getRenderCellByType(
  { row, column, rowIndex }: any,
  h: any
): any {
  const action = [...renderCellMap.entries()].filter(([key, value]) => {
    return key.columntype === column.columntype;
  });
  if (!action[0]) return;
  return action[0][1]({
    row,
    column,
    rowIndex,
    h,
  });
}
