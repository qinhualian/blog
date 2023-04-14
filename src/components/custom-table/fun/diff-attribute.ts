import { ColumnFields, RowFields } from "../types/data-inter";
import { beforeAutofill } from "./attribute/cell-auto-fill-option";
import { afterPasteCut, beforePasteCut } from "./attribute/clipboard-option";
import {
  beforeShowHeader,
  beforeShowBody,
} from "./attribute/contextmenu-option";
import {
  footerRowEvents,
  headerCellEvents,
  HeaderCellEventsInter,
} from "./attribute/event-custom-option";
import { sortChange } from "./attribute/sort-option";
import {
  virtualScrollInter,
  virtualScrolling,
} from "./attribute/virtual-scroll-option";

export interface selectionRangeIndexesType {
  endColIndex: number;
  endRowIndex: number;
  startColIndex: number;
  startRowIndex: number;
}
export interface selectionRangeKeysType {
  endColKey: string;
  endRowKey: number | string;
  startColKey: string;
  startRowKey: number | string;
}
export interface afterMenuClickType {
  type: string;
  selectionRangeKeys: selectionRangeKeysType;
  selectionRangeIndexes: selectionRangeIndexesType;
}

export interface beforeShowClickType {
  isWholeRowSelection: boolean;
  selectionRangeKeys: selectionRangeKeysType;
  selectionRangeIndexes: selectionRangeIndexesType;
}
export interface CellValueChangeType {
  row: RowFields;
  column: ColumnFields;
  changeValue: any;
}

// 表配置
export function getInitVEoption(this: any) {
  const common_veoption = getCommonVeoption.call(this, this.veoption);
  this.veoption = {
    ...common_veoption,
    eventCustomOption: {
      headerCellEvents: (data: HeaderCellEventsInter) =>
        headerCellEvents.call(this, data),
      footerRowEvents: () => footerRowEvents.call(this),
    },
    contextmenuHeaderOption: {
      ...this.veoption.contextmenuHeaderOption,
      afterMenuClick: this.afterHeaderMenuClickByHeader,
      beforeShow: (data: beforeShowClickType) =>
        beforeShowHeader.call(this, data),
    },
    contextmenuBodyOption: {
      ...this.veoption.contextmenuBodyOption,
      afterMenuClick: this.afterHeaderMenuClickByBody,
      beforeShow: (data: beforeShowClickType) =>
        beforeShowBody.call(this, data),
    },
    sortOption: {
      ...this.veoption.sortOption,
      sortChange: (data: any) => sortChange.call(this, data),
    },
    virtualScrollOption: {
      ...this.veoption.virtualScrollOption,
      scrolling: (data: virtualScrollInter) =>
        virtualScrolling.call(this, data),
    },
    cellAutofillOption: {
      ...this.veoption.clipboardOption,
      beforeAutofill: (data: any) => beforeAutofill.call(this, data),
    },
  };

  return this.veoption;
}

function getCommonVeoption(this: any, veoption: any) {
  veoption = {
    ...this.veoption,
    clipboardOption: {
      ...this.veoption.clipboardOption,
      afterPaste: (data: afterMenuClickType) => afterPasteCut.call(this, data),
      afterCut: (data: afterMenuClickType) => afterPasteCut.call(this, data),
      beforePaste: (data: afterMenuClickType) =>
        beforePasteCut.call(this, data),
      beforeCut: (data: afterMenuClickType) => beforePasteCut.call(this, data),
    },
    editOption: {
      // beforeCellValueChange: (data: CellValueChangeType) =>
      //   beforeCellValueChange.call(this, data),
      // afterCellValueChange: (data: CellValueChangeType) =>
      //   afterCellValueChange.call(this, data),
    },
  };
  return veoption;
}
