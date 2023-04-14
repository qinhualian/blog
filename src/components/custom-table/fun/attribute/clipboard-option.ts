import { afterMenuClickType } from "../diff-attribute";

// 粘贴或者剪切后 记录修改的行
export function afterPasteCut(
  this: any,
  { selectionRangeIndexes }: afterMenuClickType
) {
  for (
    let i = selectionRangeIndexes.startRowIndex;
    i <= selectionRangeIndexes.endRowIndex;
    i++
  ) {
    this.handlerecordEditRowIDList(
      this.showTableData ? this.showTableData[i] : this.tableData[i]
    );
  }
}

export function beforePasteCut(
  this: any,
  { selectionRangeIndexes }: afterMenuClickType
) {
  for (
    let i = selectionRangeIndexes.startColIndex;
    i <= selectionRangeIndexes.endColIndex;
    i++
  ) {
    if (this.tableColumns && this.tableColumns[i]?.columntype === "FORMULA") {
      this.$message("公式列数据不能修改");
      return false;
    }
  }
}
