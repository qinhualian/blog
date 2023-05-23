import { Graph } from '@antv/x6'
import { Clipboard } from '@antv/x6-plugin-clipboard'
import { Dnd } from '@antv/x6-plugin-dnd'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import { Scroller } from '@antv/x6-plugin-scroller'
import { Selection } from '@antv/x6-plugin-selection'
import { Snapline } from '@antv/x6-plugin-snapline'
import { register } from '@antv/x6-vue-shape'
import { Component, Vue, Watch } from 'vue-property-decorator'

import DetailsNodeActive from './details-node-active/details-node-active.vue'
import CustomBaseNode from './node-components/base-node.vue'
import EditNode from './popup/edit-node.vue'

import { WayEnum } from '../details-aside/aside-data'

import {
  GraphConfig,
  getPortsGroups,
  getPortsItems,
  ToolsTypeEnum,
  createDownstream,
  styleConfig,
  createEdge,
  removeNode,
  getRandomId
} from './graph-config'
import { MainStore } from './main-store'

import type { Cell } from '@antv/x6'
import 'animate.css'

register({
  shape: 'custom-base-node',
  width: styleConfig.nodeWidth,
  height: styleConfig.nodeHeight,
  component: CustomBaseNode,
  ports: {
    groups: {
      ...getPortsGroups(['left', 'right'])
    }
  }
})
interface StateInter {
  [key: string]: boolean
}

@Component({
  components: { DetailsNodeActive, EditNode },
  props: {
    dragNode: {
      default: () => {},
      type: Object
    }
  }
})
export default class DetailsMain extends Vue {
  public graph: Graph | undefined
  public dnd: Dnd | undefined
  public wayList = WayEnum
  public selectCellList: Cell[] = []

  public state: StateInter = {
    showSelectBox: false,
    showMenuBox: false,
    isClickTool: false,
    showEditNodePopup: false
  }
  public model = {
    menuValue: ''
  }
  public menuPosition = {
    left: '0px',
    top: '0px'
  }
  public currentNode: Node | undefined

  get addDragNode(): any {
    return this.$props.dragNode
  }

  get showToolInfo(): { type: ToolsTypeEnum; e: MouseEvent | undefined } {
    return MainStore.state.nodeToolsClickInfo
  }

  public mounted() {
    this.initGraphUse()
    if (!this.graph) return
    // 点击结点事件
    this.graph.on('node:selected', ({ node }: { node: Node }) => {})

    // 取消节点点击事件
    this.graph.on('node:unselected', ({ node }: { node: Node }) => {
      this.NodeUnselect(node)
    })

    this.graph.on('node:click', ({ node }: { node: Node }) => {
      this.NodeSelect(node)
    })
    this.graph.on('cell:mouseenter', ({ cell }: { cell: Cell }) => {
      if (!cell.isNode()) {
        cell.addTools([
          {
            name: 'button-remove',
            args: { distance: 100 }
          }
        ])
      }
    })
    this.graph.on('cell:mouseleave', ({ cell }: { cell: Cell }) => {
      cell.removeTools()
    })

    const node1 = this.graph.addNode({
      id: '122',
      shape: 'custom-base-node',
      x: 100,
      y: 100,
      data: {
        title: '测试',
        type: WayEnum.EXCEL
      },
      ports: {
        items: getPortsItems([getRandomId(), getRandomId()])
      }
    })
    const node2 = this.graph.addNode({
      id: '344',
      shape: 'custom-base-node',
      x: 700,
      y: 400,
      data: {
        title: '测试',
        type: WayEnum.EXCEL
      },
      ports: {
        items: getPortsItems([getRandomId(), getRandomId()])
      }
    })
    createEdge(node1, node2, this.graph)
    // this.graph.addEdge({
    //   source: node1,
    //   target: node2,
    // })
  }

  /**
   * NodeSelect
   */
  public NodeSelect(node: Node) {
    if (this.state.isClickTool) return
    this.state.showSelectBox = true
    this.currentNode = node
  }

  /**
   * NodeUnselect
   */
  public NodeUnselect(node: Node) {
    this.currentNode = undefined
    this.state.showSelectBox = false
    this.state.isClickTool = false
    this.state.showMenuBox = false
  }

  /**
   * handleMenuType
   */
  public handleMenuType(type: string) {
    this.state.showMenuBox = false
    createDownstream(type, this.selectCellList[0], this.graph)
  }

  /**
   * startDrag 开始拖拽
   */
  public startDrag({ e, title }: { e: MouseEvent; title: WayEnum }) {
    if (!this.graph) return
    const item1 = getPortsItems([getRandomId(), getRandomId()])

    const node = this.graph.createNode({
      shape: 'custom-base-node',
      data: {
        title,
        type: title
      },
      ports: {
        items: item1
      }
    })
    if (!this.dnd) return
    this.dnd.start(node, e)
  }

  /**
   * initGraphUse
   */
  public initGraphUse() {
    this.graph = new Graph({
      container: document.getElementById('container') as HTMLElement,
      ...GraphConfig
    })
    this.graph
      .use(
        new Snapline({
          enabled: true
        })
      )
      .use(
        new Keyboard({
          enabled: true
        })
      )
      .use(
        new Selection({
          enabled: true,
          showNodeSelectionBox: true,
          pointerEvents: 'none'
        })
      )
      .use(
        new Clipboard({
          enabled: true
        })
      )
      .use(
        new Scroller({
          enabled: true,
          pannable: true
        })
      )
    if (!this.graph) return

    // 复制粘贴快捷键
    this.graph.bindKey(['meta+c', 'ctrl+c'], () => {
      if (!this.graph) return
      const cells = this.graph.getSelectedCells()
      if (cells.length) {
        this.graph.copy(cells)
      }
      return false
    })
    this.graph.bindKey(['meta+v', 'ctrl+v'], () => {
      if (!this.graph) return
      if (!this.graph.isClipboardEmpty()) {
        const cells = this.graph.paste({ offset: 32 })
        this.graph.cleanSelection()
        this.graph.select(cells)
      }
      return false
    })

    this.dnd = new Dnd({
      target: this.graph
    })
  }

  public handleEditNode(title: string) {
    this.selectCellList[0].setData({
      ...this.selectCellList[0].data,
      title
    })
  }

  @Watch('addDragNode', { deep: true })
  public changeDragNode({ e, title }: { e: MouseEvent; title: WayEnum }) {
    this.startDrag({ e, title })
  }

  @Watch('showToolInfo', { deep: true })
  // 节点向外传递 点击的工具
  public changeToolsClickInfo(nodeToolsClickInfo: {
    type: ToolsTypeEnum
    e: MouseEvent | undefined
  }) {
    this.state.isClickTool = true
    const e = nodeToolsClickInfo.e
    if (!this.graph || !e) return
    this.selectCellList = this.graph.getSelectedCells()
    switch (nodeToolsClickInfo.type) {
      case ToolsTypeEnum.ADD:
        this.state.showMenuBox = true
        this.menuPosition.left = e.clientX + 60 + 'px'
        this.menuPosition.top = e.clientY - 80 + 'px'
        break
      case ToolsTypeEnum.DELETE:
        removeNode(this.selectCellList[0].id, this.graph)
        break
      case ToolsTypeEnum.EDIT:
        this.state.showEditNodePopup = true
        break
      default:
        break
    }
  }
}
