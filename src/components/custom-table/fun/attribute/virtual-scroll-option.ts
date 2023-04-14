export interface virtualScrollInter {
  startRowIndex: number;
  visibleStartIndex: number;
  visibleEndIndex: number;
  visibleAboveCount: number;
  visibleBelowCount: number;
}

// 开启虚拟滚动的表格 滚动事件
export function virtualScrolling(
  this: any,
  { startRowIndex }: virtualScrollInter
) {
  this.startRowIndex = startRowIndex;
}
