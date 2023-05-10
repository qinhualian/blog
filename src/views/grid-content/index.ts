import { Component, Vue } from 'vue-property-decorator'
import AnimationBattery from '../project/animation/battery/battery.vue'

enum componentStopEnum {
  BOTTOM = 'bottom',
  CENTER = 'center'
}

interface componentInter {
  name: string
  stop?: string
}

@Component({
  components: { AnimationBattery }
})
export default class GridContent extends Vue {
  public componentStopEnum = componentStopEnum
  public componentsList: componentInter[] = [
    { name: 'AnimationBattery', stop: componentStopEnum.BOTTOM }
  ]
}
