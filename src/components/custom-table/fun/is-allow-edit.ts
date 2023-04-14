// 是否允许出编辑框 以下这些类型不需要出现编辑框
export function isAllowEdit(columntype: string) {
  return ![
    "MULTIPLE_CHOICE",
    "AddColumn",
    "INDEX",
    "SINGLE_CHOICE",
    "DATE",
    "FORMULA",
  ].includes(columntype);
}
