import { Component, Vue } from 'vue-property-decorator'
import { getInitVEoption } from '@/components/custom-table/fun/diff-attribute'

import { ColumnFields, RowFields } from '@/components/custom-table/types/data-inter'
import { getFormatData } from '@/components/custom-table/fun/get-format-data'
import { createEmptyRowData } from '@/components/custom-table/fun/create-empty-row-data'
import NVeTable from '@/components/custom-table/index.vue'
import VE_OPTIONS from '@/components/custom-table/loading/ve-config'
@Component({
  components: {
    NVeTable
  }
})
export default class QTable extends Vue {
  public veoption = VE_OPTIONS
  public isCloseLoadingInstance = false
  public tableColumns: ColumnFields[] = []
  public tableData: RowFields[] = []
  public ceated() {}
  public mounted() {
    const info = getFormatData()
    this.tableColumns = info.tableColumns
    this.tableData = info.tableData
    this.veoption = getInitVEoption.call(this)
  }

  /**
   * 末尾添加空行
   */
  public handleAddRow() {
    this.tableData.push(createEmptyRowData(this.tableColumns))
  }
}
