import { ColumnFields } from "../../types/data-inter";

export interface HeaderCellEventsInter {
  column: ColumnFields;
  rowIndx: number;
}

//  自定义表头事件
export function headerCellEvents(this: any, { column }: HeaderCellEventsInter) {
  return {
    click: (event: MouseEvent) => this.handleOpenSelectByAdd(column, event),
    dblclick: (event: MouseEvent) =>
      this.dblclickHeaderCellEvents(column, event),
  };
}

// 自定义表格底部事件 disabled是否禁用
export function footerRowEvents(this: any, disabled?: boolean) {
  if (disabled) {
    return null;
  } else {
    return {
      click: () => this.handleAddRow(),
    };
  }
}
