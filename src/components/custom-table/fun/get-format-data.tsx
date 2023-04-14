import { ColumnFields, RowFields } from "../types/data-inter";
import { isAllowEdit } from "./is-allow-edit";

import {
  getRenderCellByType,
  getRenderHeaderByType,
} from "../render/render-column";
interface CustomFieldsInter {
  icon: string;
  columntype: columntypeEnum;
  title: string;
  [key: string]: string | number | string[];
}

enum columntypeEnum {
  TEXT = "TEXT",
  SINGLE_CHOICE = "SINGLE_CHOICE",
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  DATE = "DATE",
  LINK = "LINK",
  NUMBER = "NUMBER",
  CHINESE_CURRENCY = "CHINESE_CURRENCY",
  SCORE = "SCORE",
  PROGRESS_BAR = "PROGRESS_BAR",
}

//  列的类型
export const FieldsTypeList: CustomFieldsInter[] = [
  {
    icon: "multiple-lines-text",
    columntype: columntypeEnum.TEXT,
    title: "文本",
  },
  {
    icon: "icon_selection",
    columntype: columntypeEnum.SINGLE_CHOICE,
    source: [],
    title: "单选",
  },
  {
    icon: "icon_checkbox",
    columntype: columntypeEnum.MULTIPLE_CHOICE,
    source: [],
    title: "多选",
  },
  {
    icon: "icon_date",
    columntype: columntypeEnum.DATE,
    title: "日期",
    dateType: "date", // 日期选择器的类型 date年月日 month年月 datetime年月日时间
  },
  { icon: "link", columntype: columntypeEnum.LINK, title: "链接" },
  {
    icon: "icon_number",
    columntype: columntypeEnum.NUMBER,
    accuracy: 1,
    title: "数值",
  },
  {
    icon: "icon_money",
    columntype: columntypeEnum.CHINESE_CURRENCY,
    accuracy: 1,
    symbol: "",
    title: "货币",
  },
  {
    icon: "icon-score",
    columntype: columntypeEnum.SCORE,
    title: "评分",
  },
  {
    icon: "icon-progress-bar",
    columntype: columntypeEnum.PROGRESS_BAR,
    color: "#67c23a",
    title: "进度条",
  },
];

export function getFormatData(disabled = false): any {
  const tableColumns: ColumnFields[] = FieldsTypeList.map(
    (item: CustomFieldsInter, index: number) => {
      item.renderBodyCell;
      return {
        field: item.columntype,
        key: item.columntype + "_" + index,
        title: item.title,
        width: 200,
        edit: disabled ? false : isAllowEdit(item.columntype),
        hide: true,
        sortBy: "",
        columntype: item.columntype,
        renderBodyCell: getRenderCellByType,
        renderHeaderCell: getRenderHeaderByType,
      };
    }
  );
  const tableData: RowFields[] = [];
  for (let i = 0; i < 15; i++) {
    tableData.push({
      TEXT: "You can't edit",
      DATE: "1900-05-20",
      MULTIPLE_CHOICE: ["1"],
      CHINESE_CURRENCY: 200,
      SCORE: 2,
      PROGRESS_BAR: 30,
      SINGLE_CHOICE: "a",
      NUMBER: "5",
      rowKey: i,
    });
  }

  return { tableColumns, tableData };
}
