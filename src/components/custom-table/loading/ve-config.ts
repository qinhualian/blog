export interface ContextMenusType {
  type: string;
  label: string;
}
const VE_OPTIONS: any = {
  columnWidthResizeOption: {
    enable: true, // 列宽拖动
    minWidth: 30, // 列最小宽度
  },
  virtualScrollOption: {
    enable: true, // 是否开启虚拟滚动
  },
  cellSelectionOption: {
    enable: true, // 是否开启单元格选择
  },
  rowStyleOption: {
    stripe: true, // 	是否开启斑马纹
    clickHighlight: false, // 是否开启行click 背景高亮
    hoverHighlight: false, // 是否开启行hover 背景高亮
  },
  footerData: [
    {
      rowKey: "footerData9999",
      INDEX: "",
    },
  ],
  sortOption: {
    // 是否开启多字段排序
    multipleSort: true,
    sortChange: null,
  },
  clipboardOption: { copy: true, paste: true, cut: true, delete: true },
  //   contextmenuHeaderOption, // 表头的右键菜单
  //   contextmenuBodyOption, // 表格内容的右键菜单
  eventCustomOption: {
    headerCellEvents: null,
    footerRowEvents: null,
  },
  cellAutofillOption: {
    directionX: true,
    directionY: true,
  }, // 单元格自动填充
  borderX: true, // 边框
  borderY: true,
  scrollWidth: 0, // 表格滚动区域的宽（开始出滚动条的宽度）
  fixedHeader: true, // 是否固定表头，默认启用。需要和 `maxHeight`结合使用
  maxHeight: "100%", // 表格的最大高度
  rowKeyFieldName: "rowKey", // 指定 row key 的字段名称
  style: "width: 100%",
};

export default VE_OPTIONS;
