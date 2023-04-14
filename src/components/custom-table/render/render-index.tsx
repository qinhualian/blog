/**
 * 渲染字段 列序号
 */
export function getIndexRenderCell(rowIndex: number, getStartRowIndex?: any) {
  const startRowIndex = getStartRowIndex ? getStartRowIndex() : 0;
  return <span class="body-cell-index">{startRowIndex + rowIndex + 1}</span>;
}
