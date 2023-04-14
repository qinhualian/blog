import { Component, Vue } from "vue-property-decorator";
import VE_OPTIONS from "../components/custom-table/loading/ve-config";
import NVeTable from "../components/custom-table/index.vue";
import { getInitVEoption } from "@/components/custom-table/fun/diff-attribute";

import {
  ColumnFields,
  RowFields,
} from "@/components/custom-table/types/data-inter";
import { getFormatData } from "@/components/custom-table/fun/get-format-data";
@Component({
  components: {
    NVeTable,
  },
})
export default class HelloWorld extends Vue {
  public veoption = VE_OPTIONS;
  public isCloseLoadingInstance = false;
  public tableColumns: ColumnFields[] = [];
  public tableData: RowFields[] = [];

  public ceated() {
    this.veoption = getInitVEoption.call(this);
  }
  public mounted() {
    const info = getFormatData();
    this.tableColumns = info.tableColumns;
    this.tableData = info.tableData;
    setTimeout(() => {}, 500);
    // this.isCloseLoadingInstance = true;
  }
}
