import { Component, Vue } from 'vue-property-decorator'

import DetailsAside from './details-aside/details-aside.vue'
import DetailsHeader from './details-header/details-header.vue'
import DetailsMain from './details-main/details-main.vue'

import type { WayEnum } from './details-aside/aside-data'

@Component({
  components: { DetailsHeader, DetailsAside, DetailsMain }
})
export default class TaskDetails extends Vue {
  public dragNode = {}
  public startDrag({ e, title }: { e: MouseEvent; title: WayEnum }) {
    this.dragNode = { e, title }
  }
}
