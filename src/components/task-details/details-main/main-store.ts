import { Vue } from 'vue-property-decorator'

import Vuex from 'vuex'
import { ToolsTypeEnum } from './graph-config'
Vue.use(Vuex)
interface stateInter {
  nodeToolsClickInfo: {
    type: ToolsTypeEnum
    e: MouseEvent | undefined
  }
}

export const MainStore = new Vuex.Store({
  state: {
    nodeToolsClickInfo: {
      type: ToolsTypeEnum.ADD,
      e: undefined
    }
  },
  mutations: {
    changeTools(state: stateInter, info: { type: ToolsTypeEnum; e: MouseEvent | undefined }) {
      state.nodeToolsClickInfo = info
    }
  }
})
