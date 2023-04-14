<template>
  <ve-table
    id="ve-loading-container"
    ref="tableRef"
    class="collect-nsoc-ve-table"
    :columns="showTableColumns"
    :table-data="showTableData"
    v-bind="veoption"
  ></ve-table>
</template>

<script lang="ts">
import { VeTable, VeLocale } from "vue-easytable";
import zhCN from "vue-easytable/libs/locale/lang/zh-CN";
import { Vue, Component, Watch } from "vue-property-decorator";

import "./style/easytable-theme.less";
import { veLoading } from "vue-easytable";
import { ColumnFields, RowFields } from "./types/data-inter";
import {
  closeLoadingInstance,
  showLoadingInstance,
} from "./loading/loading-instance";

import VE_OPTIONS from "./loading/ve-config";
import { getRenderHeaderByType } from "./render/render-column";
Vue.prototype.$veLoading = veLoading;
VeLocale.use(zhCN);
@Component({
  components: {
    VeTable,
  },
  props: {
    tableColumns: {
      default: (): ColumnFields[] => [],
      type: Array,
    },
    tableData: {
      default: (): RowFields[] => [],
      type: Array,
    },
    veoption: {
      default: (): any => VE_OPTIONS,
      type: Object,
    },
    isCloseLoadingInstance: {
      // 是否关闭加载效果
      default: false,
      type: Boolean,
    },
    useDefaultRowIndex: {
      // 是否用默认的表格序号
      default: true,
      type: Boolean,
    },
    useDefaultAddCol: {
      // 是否用默认的添加列的行为
      default: false,
      type: Boolean,
    },
    noLoading: {
      // 不使用默认的加载动画
      default: false,
      type: Boolean,
    },
  },
})
export default class NVeTable extends Vue {
  public veoption = VE_OPTIONS;
  public loadingInstance = null; // 加载
  public startRowIndex = 0; // 当前开始渲染的行号

  get showTableData() {
    return this.$props.tableData;
  }

  get sourceTableColumns() {
    return this.$props.tableColumns;
  }

  get showTableColumns() {
    const data = [...this.$props.tableColumns];
    return this.loadingTable(data);
  }

  get showLoading() {
    return this.$props.isCloseLoadingInstance;
  }
  /**
   *  开启加载
   */
  public async mounted() {
    if (this.$props.noLoading) return;
    // this.loadingInstance = this.$veLoading({
    //   target: "#ve-loading-container",
    //   name: "wave",
    // });
    // showLoadingInstance(this.loadingInstance);
    // console.log(this.$veLoading);

    document.addEventListener("contextmenu", (e: MouseEvent) => {
      e.preventDefault();
    });
  }

  /**
   * 表格加载中
   */
  public loadingTable(data: any) {
    if (data.length === 0) return [];
    if (this.$props.useDefaultRowIndex && data[0].field !== "INDEX") {
      data.unshift({
        field: "INDEX",
        key: "INDEX",
        title: "#",
        width: 50,
        align: "center",
        fixed: "left",
        operationColumn: false,
        renderBodyCell: ({ rowIndex }: { rowIndex: number }) => {
          return ++rowIndex + this.startRowIndex;
        },
      });
    }
    if (
      this.$props.useDefaultAddCol &&
      data[data.length - 1].field !== "AddColumn"
    ) {
      data.push({
        field: "AddColumn",
        key: "AddColumn",
        title: "+",
        width: 50,
        columntype: "AddColumn",
        renderHeaderCell: getRenderHeaderByType,
      });
    }
    return data;
  }

  // 虚拟滚动处理行序号
  public virtualScrolling({ startRowIndex }: { startRowIndex: number }) {
    this.startRowIndex = startRowIndex;
  }

  @Watch("showLoading")
  public handleShowLoading(visible: boolean) {
    if (visible) {
      // closeLoadingInstance(this.loadingInstance);
    }
  }
}
</script>

<style lang="less">
.collect-nsoc-ve-table,
#ve-loading-container {
  border: 1px #1ec283 solid;
  background-color: #89d8be;
  width: fit-content !important;
  max-width: 100%;
  height: 100%;
  .ve-table {
    height: 100%;
    border: none;
    .ve-table-container {
      .ve-table-content-wrapper {
        .ve-table-body-tr {
          .ve-table-body-td {
            padding: 0 10px !important;
          }
          td[col-key^="DATE"] {
            .el-date-editor {
              width: 100%;
              height: 100%;
              > input {
                width: 100%;
                height: 100%;
                border: none;
                background-color: transparent;
                padding-left: 0;
                text-align: center;
              }
              .el-input__prefix {
                display: none;
              }
              .el-input__suffix {
                display: flex;
                align-items: center;
              }
            }
          }
          td[col-key^="NUMBER"] {
            > input {
              width: 100%;
              height: 100%;
              border: none;
              background-color: transparent;
            }
            input[type="number"]::-webkit-inner-spin-button,
            input[type="number"]::-webkit-outer-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
          }
          td[col-key^="SCORE"] {
            span {
              display: inline;
            }
          }
          td[col-key^="CHINESE_CURRENCY"] {
            padding: 0;
            input {
              width: 100%;
              border: none;
              background-color: transparent;
            }
          }
          td[col-key^="LINK"] {
            position: relative;
            .render_link {
              display: flex;
              width: 100%;
              align-items: center;
              justify-content: center;
              height: 100%;
              a {
                margin-right: 10px;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .el-popover__reference-wrapper {
                display: flex;
                width: 100%;
                align-items: center;
                i {
                  position: absolute;
                  right: 10px;
                  font-weight: bold;
                  visibility: hidden;
                  cursor: pointer;
                }
              }
            }
            &:hover {
              i {
                visibility: visible !important;
              }
            }
          }
        }
        .ve-table-header {
          .ve-table-header-tr {
            .ve-table-header-th {
              .ve-table-sort {
                position: absolute;
                right: 10px;
                top: 8px;
              }
              .header-title {
                display: flex;
                align-items: center;
                justify-content: center;
                width: calc(100% - 20px);
                .header-cell {
                  height: 19px;
                  width: 19px;
                  margin-right: 10px;
                }
                .header-title-style {
                  font-size: 10px;
                  transform: scale(3);
                  color: #1ec283;
                }
                .header-cell-text {
                  background: url("../../assets/images/custom-table/multiple-lines-text.svg")
                    center no-repeat;
                }
                .header-cell-bar {
                  background: url("../../assets/images/custom-table/icon-progress-bar.svg")
                    center no-repeat;
                }
                .header-cell-score {
                  background: url("../../assets/images/custom-table/icon-score.svg")
                    center no-repeat;
                }
                .header-cell-link {
                  background: url("../../assets/images/custom-table/link.svg")
                    center no-repeat;
                }
                .header-cell-date {
                  background: url("../../assets/images/custom-table/icon_date.svg")
                    center no-repeat;
                }
                .header-cell-currency {
                  background: url("../../assets/images/custom-table/icon_money.svg")
                    center no-repeat;
                }
                .header-cell-single {
                  background: url("../../assets/images/custom-table/icon_selection.svg")
                    center no-repeat;
                }
                .header-cell-multiple {
                  background: url("../../assets/images/custom-table/icon_checkbox.svg")
                    center no-repeat;
                }
                .header-cell-number {
                  background: url("../../assets/images/custom-table/icon_number.svg")
                    center no-repeat;
                }
              }
            }
            .ve-table-fixed-left,
            .ve-table-last-column {
              .header-title {
                width: 100%;
              }
            }
          }
        }
        .ve-table-footer {
          .ve-table-footer-tr {
            .ve-table-fixed-left {
              &::before {
                content: "\e6d9";
                transform: scale(1.6);
                font-weight: bold;
                color: #1ec283;
                font-family: element-icons;
                display: block;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
  .ve-loading-spin-container {
    position: fixed;
    .ve-loading-spin {
      .ve-loading-wave-rect {
        background-color: #f49a41 !important;
      }
    }
  }
}
.collect-nsoc-ve-table__has_footer,
#ve-loading-container {
  height: calc(100% - 40px);
}
</style>
