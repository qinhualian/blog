import { selectionRangeIndexesType } from "../diff-attribute";

interface SelectionDataInter {
  [key: string]: string;
  rowKey: string;
}

export interface AutoFillInter {
  direction: string;
  sourceSelectionRangeIndexes: selectionRangeIndexesType;
  targetSelectionRangeIndexes: selectionRangeIndexesType;
  sourceSelectionData: SelectionDataInter[];
  targetSelectionData: SelectionDataInter[];
}

// 自动填充
export function beforeAutofill(
  this: any,
  { targetSelectionRangeIndexes }: AutoFillInter
) {
  if (
    this.tableColumns &&
    this.tableColumns[targetSelectionRangeIndexes.startColIndex]?.columntype ===
      "FORMULA"
  ) {
    this.$message("公式列数据不能修改");
    return false;
  }
}
