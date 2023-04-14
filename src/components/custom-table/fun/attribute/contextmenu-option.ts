import { beforeShowClickType } from "../diff-attribute";

// 表头右键菜单出现前
export function beforeShowHeader(
  this: any,
  { selectionRangeIndexes }: beforeShowClickType
) {
  if (
    selectionRangeIndexes.endColIndex - selectionRangeIndexes.startColIndex !==
    0
  ) {
    this.veoption.contextmenuHeaderOption.contextmenus[0].disabled = true;
  } else {
    this.veoption.contextmenuHeaderOption.contextmenus[0].disabled = false;
  }
  const num =
    selectionRangeIndexes.endColIndex - selectionRangeIndexes.startColIndex + 1;
  this.veoption.contextmenuHeaderOption.contextmenus[2].label =
    "向左边插入" + num + "列";
  this.veoption.contextmenuHeaderOption.contextmenus[3].label =
    "向右边插入" + num + "列";
}

// 表格内容 右键菜单出现前
export function beforeShowBody(
  this: any,
  { isWholeRowSelection, selectionRangeIndexes }: beforeShowClickType
) {
  // 行关联是否禁用
  this.veoption.contextmenuBodyOption.contextmenus.forEach((item: any) => {
    item.disabled = item.type === "LINK_ROW" && !isWholeRowSelection;
  });
  if (
    this.showTableData[selectionRangeIndexes.endRowIndex].MARK?.relationList
      ?.length &&
    this.veoption.contextmenuBodyOption.contextmenus.length === 6
  ) {
    this.veoption.contextmenuBodyOption.contextmenus.push({
      type: "LINK_ROW_INFO",
      label: "行关联详情",
    });
  }
  if (
    !this.showTableData[selectionRangeIndexes.endRowIndex].MARK?.relationList
      ?.length &&
    this.veoption.contextmenuBodyOption.contextmenus.length === 7
  ) {
    this.veoption.contextmenuBodyOption.contextmenus.pop();
  }
}
