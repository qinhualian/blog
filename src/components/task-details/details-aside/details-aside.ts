import { Component, Vue } from 'vue-property-decorator'

import { WayEnum } from './aside-data'

@Component({
  components: {}
})
export default class DetailsAside extends Vue {
  public getIconUrl(icon: string) {
    const url = '../../../assets/images/explore/' + icon + '.png'
    return ' background:  url(' + url + ') no-repeat center;'
  }
  public queryValue = ''
  public curOpenMenu: string[] = []
  public menuList = [
    { title: '数据导入' },
    { title: '数据信息查看' },
    { title: '数据处理' },
    { title: '可视化' },
    { title: '数据导出' }
  ]
  public wayList = WayEnum

  /**
   * handleCollapse
   */
  public handleCollapse(curOpenMenu: string[]) {
    this.curOpenMenu = curOpenMenu
  }

  /**
   * handlemMousedown
   */
  public handleMousedown(e: MouseEvent, title: WayEnum) {
    this.$emit('startDrag', { e, title })
  }
}
