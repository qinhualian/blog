import { Shape, StringExt } from '@antv/x6'

import type { Graph, Cell } from '@antv/x6'

export const styleConfig = {
  lineColor: '#9DE3C8', // 连接线颜色
  portsBoderColor: '#DAE3DF', // 连接点的边框色
  portsFillColor: '#00C867', // 连接点的填充色
  nodeWidth: 200, // 节点的宽度
  nodeHeight: 60 // 节点的高度
}

export enum ToolsTypeEnum {
  ADD = 'ADD',
  EDIT = 'EDIT',
  DELETE = 'DELETE'
}
// 节点位置信息
interface Position {
  x: number
  y: number
}

const lineConfig = {
  stroke: styleConfig.lineColor,
  strokeWidth: 2,
  targetMarker: {
    name: 'block',
    width: 12,
    height: 8
  }
}
export const GraphConfig = {
  background: {
    // color: '#F2F7FA',
  },
  mousewheel: {
    enabled: true,
    zoomAtMousePosition: true,
    modifiers: 'ctrl',
    minScale: 0.5,
    maxScale: 3
  },
  connecting: {
    router: 'manhattan',
    connector: {
      name: 'rounded',
      args: {
        radius: 8
      }
    },
    anchor: 'center',
    connectionPoint: 'anchor',
    allowBlank: false,
    snap: {
      radius: 20
    },

    createEdge() {
      return new Shape.Edge({
        attrs: {
          line: lineConfig
        },
        zIndex: 0
      })
    }
  },
  highlighting: {
    magnetAdsorbed: {
      name: 'stroke',
      args: {
        attrs: {
          fill: 'transparent',
          stroke: '#5F95FF'
        }
      }
    }
  }
}

// 连接桩的统一样式
export const getPortsGroups = (positions: string[]) => {
  let groups = {}
  positions.forEach((item) => {
    groups = Object.assign(groups, {
      [item]: {
        position: item,
        attrs: {
          circle: {
            magnet: true,
            stroke: styleConfig.portsBoderColor,
            fill: styleConfig.portsFillColor,
            r: 5
          }
        }
      }
    })
  })
  return groups
}

// 连接桩的每一项

export const getPortsItems = (ids: string[]): any[] => {
  const items: any[] = []
  const positions = ['left', 'right']
  ids.forEach((id, index) => {
    items.push({
      id,
      group: positions[index]
    })
  })
  return items
}
/**
 * 根据起点初始下游节点的位置信息
 * @param node 起始节点
 * @param graph
 * @returns
 */
export const getDownstreamNodePosition = (node: any, graph: Graph, dx = 250, dy = 100) => {
  // 找出画布中以该起始节点为起点的相关边的终点id集合
  const downstreamNodeIdList: string[] = []
  graph.getEdges().forEach((edge: any) => {
    if (edge.source.cell === node.id) {
      downstreamNodeIdList.push(edge.target.cell)
    }
  })
  // 获取起点的位置信息
  const position = node.getPosition()
  let minX = Infinity
  let maxY = -Infinity
  graph.getNodes().forEach((graphNode) => {
    if (downstreamNodeIdList.indexOf(graphNode.id) > -1) {
      const nodePosition = graphNode.getPosition()
      // 找到所有节点中最左侧的节点的x坐标
      if (nodePosition.x < minX) {
        minX = nodePosition.x
      }
      // 找到所有节点中最x下方的节点的y坐标
      if (nodePosition.y > maxY) {
        maxY = nodePosition.y
      }
    }
  })

  return {
    x: minX !== Infinity ? minX : position.x + dx,
    y: maxY !== -Infinity ? maxY + dy : position.y
  }
}
// 创建下游的节点和边
export const createDownstream = (title: string, source: Cell, graph: Graph | undefined) => {
  if (graph) {
    // 获取下游节点的初始位置信息
    const position = getDownstreamNodePosition(source, graph)
    // 创建下游节点
    const target = createNode(title, graph, position) as Cell
    // 创建该节点出发到下游节点的边
    createEdge(source, target, graph)
  }
}

/**
 * 创建节点并添加到画布
 * @param type 节点类型
 * @param graph
 * @param position 节点位置
 * @returns
 */
export const createNode = (title: string, graph: Graph, position?: Position) => {
  if (!graph) {
    return {}
  }
  let newNode = {}
  const id = StringExt.uuid()
  const node = {
    id,
    shape: 'custom-base-node',
    width: styleConfig.nodeWidth,
    height: styleConfig.nodeHeight,
    x: position?.x,
    y: position?.y,
    ports: getPortsItems([getRandomId(), getRandomId()]),
    data: {
      title,
      type: title
    }
  }
  newNode = graph.addNode(node)
  return newNode
}

/**
 * 创建边并添加到画布
 * @param source
 * @param target
 * @param graph
 */
export const createEdge = (source: any, target: any, graph: Graph | undefined) => {
  const edge = {
    id: StringExt.uuid(),
    source: {
      cell: source.id || '',
      port: source.port.ports[1].id
    },
    target: {
      cell: target.id,
      port: target.port.ports[0].id
    },
    zIndex: -1,
    data: {
      source,
      target
    },
    attrs: {
      line: lineConfig
    }
  }
  if (graph) {
    graph.addEdge(edge)
  }
}

/**
 * 删除节点
 * @param id
 * @param graph
 */
export const removeNode = (id: string, graph: Graph | undefined) => {
  if (graph) {
    graph.removeNode(id)
  }
}

export function getRandomId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// const iconPath: Dictionary<{ default: string }> = import.meta.glob(
//   '@/assets/images/explore/*.{png,svg}',
//   { eager: true }
// )

// const dataCollectIcons = Object.fromEntries(
//   Object.entries(iconPath).map(([k, v]) => [k.match(/explore\/(.+)\.(svg|png)$/)![1], v.default])
// )

/**
 *  获取工具栏icon
 * @param icon icon文件的名称
 * @param changeColor 作为svg图 可以在样式中修改颜色
 *
 */
export function getIconUrl(icon: string, changeColor?: boolean) {
  // const url = dataCollectIcons[icon]
  const url = '@/assets/images/explore/' + icon + '.png'
  if (changeColor) {
    return '-webkit-mask: url(' + url + ') no-repeat center;'
  } else {
    return ' background:  url(' + url + ') no-repeat center;'
  }
}
