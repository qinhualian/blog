// 表格排序改变时
export function sortChange(this: any, params: any) {
  const sortFieldList: string[] = [];
  const sortTypeList: any[] = [];
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      sortFieldList.push(key);
      sortTypeList.push(value);
    }
  });
  // 记录排序的内容
  if (sortFieldList.length > 0) {
    this.sortChangeInfo = { isSortChange: true, sortFieldList, sortTypeList };
  } else {
    this.sortChangeInfo = {
      isSortChange: false,
      sortFieldList: [],
      sortTypeList: [],
    };
  }
}
