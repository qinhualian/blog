import { ColumnFields } from "../types/data-inter";

/**
 * 渲染字段为 LINK 链接
 */
export function getLinkRenderCell(row: any, column: ColumnFields, h: any) {
  const content = row[column.field];
  if (content) {
    return (
      <a href={content} target="_blank">
        {content}
      </a>
    );
  } else {
    row[column.field] = "";
    return <span></span>;
  }
}
