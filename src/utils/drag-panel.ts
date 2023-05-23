// usages: v-drag.topRight = "{ parentClass: 'parentClass', zIndex: false }"
// mode : transform, topLeft, topRight, bottomLeft, bottomRight

import _ from 'lodash'

const CLASS_DISABLE_DRAG = 'disableDrag'

const _orderSiblings = function (siblings: HTMLElement[], targetEl: HTMLElement) {
  siblings = _.sortBy(siblings, (p: { style: { zIndex: string | number } }) => +p.style.zIndex || 0)
  const elements = [...siblings, targetEl]
  let elIndexes = elements.map((p) => +p.style.zIndex || 0)
  elIndexes = _.sortedUniq(elIndexes)
  elIndexes.sort((a, b) => a - b)

  let indexer = 0
  elements.forEach((p, idx) => {
    if (idx >= elIndexes.length) {
      indexer++
    } else {
      indexer = elIndexes[idx]
    }
    p.style.zIndex = indexer.toString()
  })
}

const _getSiblings = function (e: HTMLElement) {
  // for collecting siblings
  const siblings: any = []
  // if no parent, return no sibling
  if (!e.parentNode) {
    return siblings
  }
  // first child of the parent node
  let sibling = e.parentNode.firstChild

  // collecting siblings
  while (sibling) {
    if (sibling instanceof HTMLElement && sibling !== e) {
      const position = window.getComputedStyle(sibling).position
      if (position === 'absolute' || position === 'relative') {
        siblings.push(sibling)
      }
    }
    sibling = sibling.nextSibling
  }
  return siblings
}

const eventHandler = {
  mousedown: (e: MouseEvent) => {}
}

export default {
  bind(el: HTMLElement, binding: any, vnode: any, oldVnode: any) {
    let isDragging = false
    const { parentClass: targetClass, zIndex: adjustZIndex }: any = binding.value || {}
    let mode = binding.arg //  v-drag:xxx
    if (!mode) {
      // v-drag.xxx
      mode = binding.modifiers.bottomRight
        ? 'bottomRight'
        : binding.modifiers.bottomLeft
        ? 'bottomLeft'
        : binding.modifiers.topRight
        ? 'topRight'
        : binding.modifiers.topLeft
        ? 'topLeft'
        : ''
    }

    let oldCursor: string

    // 监听document是因为如果监听元素el的话鼠标太快移出元素后就会失效

    eventHandler.mousedown = (event: any) => {
      event.preventDefault()
      event.stopPropagation()
      /* eslint no-bitwise: ["error", { "allow": ["&"] }] */
      if ((event.buttons & 1) !== 1) {
        /* 非左键，则忽略 */
        return
      }
      if (el.classList.contains(CLASS_DISABLE_DRAG)) {
        return
      }

      oldCursor = el.style.cursor
      el.style.cursor = 'move'
      isDragging = true
      let targetEl = el
      if (targetClass) {
        let parent = el.parentNode
        while (parent instanceof HTMLElement && parent.classList) {
          if (parent.classList.contains(targetClass)) {
            targetEl = parent
            break
          }
          parent = parent.parentNode
        }
      }

      targetEl.dataset.dragged = 'true'

      /* 计算父节点的 scale */
      const scale = { x: 1, y: 1 }
      let parent = el.parentNode
      while (parent instanceof HTMLElement && parent.tagName !== 'BODY') {
        const cssStyles = window.getComputedStyle(parent)
        let arg
        if (cssStyles.transform && cssStyles.transform !== 'none') {
          arg =
            /matrix\(([\d|.]+),\s*[\d|.]+,\s*[\d|.]+,\s*([\d|.]+),\s*[\d|.]+,\s*[\d|.]+\)/g.exec(
              cssStyles.transform
            )
          if (arg) {
            scale.x *= +arg[1]
            scale.y *= +arg[2]
          } else {
            arg = /matrix3d\(([\d|.]+),\s*[^)]+\)/g.exec(cssStyles.transform)
            if (arg) {
              scale.x *= +arg[1]
              scale.y *= +arg[1]
            }
          }
        }
        parent = parent.parentNode
      }

      let parentWidth: number, parentHeight: number
      if (!mode) {
        /*
          mode为空时，如果width 和 height没有设置的话，移动时无法保证长宽不变，
          所以要设置dom的width 和 height
          如果同时设置了left, right, width , 则right不生效。
          所以如果要移动dom的话，必须设置width和height
        */
        const cssStyles = window.getComputedStyle(targetEl)
        if (targetEl.style.width === '') {
          targetEl.style.width = cssStyles.width
        }
        if (targetEl.style.height === '') {
          targetEl.style.height = cssStyles.height
        }
      } else {
        parentWidth = targetEl?.offsetParent?.clientWidth || 0
        parentHeight = targetEl?.offsetParent?.clientHeight || 0
      }

      const { clientX: x, clientY: y } = event
      const pointX = targetEl.offsetLeft
      const pointY = targetEl.offsetTop

      if (adjustZIndex) {
        const siblings = _getSiblings(targetEl)
        _orderSiblings(siblings, targetEl)
      }

      // console.log("down", event, el.className)

      const mousemove = (e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (e.clientY) {
          /* eslint no-bitwise: ["error", { "allow": ["&"] }] */
          isDragging = isDragging && (e.buttons & 1) === 1
        }
        if (isDragging) {
          // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
          const safeEdge = 15
          const pt = {
            x: Math.max(Math.min(e.clientX, document.body.clientWidth - safeEdge), safeEdge),
            y: Math.max(Math.min(e.clientY, document.body.clientHeight - safeEdge), safeEdge)
          }

          const deltaX = (pt.x - x) / scale.x
          const deltaY = (pt.y - y) / scale.y

          // console.log("move", pt, deltaX, deltaY, scale.x, scale.y)

          switch (mode) {
            case 'topRight':
              targetEl.style.top = deltaY + pointY + 'px'
              targetEl.style.right = -deltaX + parentWidth - targetEl.clientWidth - pointX + 'px'
              break
            case 'bottomLeft':
              targetEl.style.left = deltaX + pointX + 'px'
              targetEl.style.bottom = -deltaY + parentHeight - targetEl.clientHeight - pointY + 'px'
              break
            case 'bottomRight':
              targetEl.style.right = -deltaX + parentWidth - targetEl.clientWidth - pointX + 'px'
              targetEl.style.bottom = -deltaY + parentHeight - targetEl.clientHeight - pointY + 'px'
              break
            case 'topLeft':
            default:
              targetEl.style.left = deltaX + pointX + 'px'
              targetEl.style.top = deltaY + pointY + 'px'

              break
          }
        }
      }
      const mouseup = (e: MouseEvent) => {
        // console.log("up", e)
        e.preventDefault()
        e.stopPropagation()
        isDragging = false
        el.style.cursor = oldCursor
        window.removeEventListener('mousemove', mousemove)
        window.removeEventListener('mouseup', mouseup)
      }
      window.addEventListener('mousemove', mousemove)
      window.addEventListener('mouseup', mouseup)
    }

    el.addEventListener('mousedown', eventHandler.mousedown)
  },
  inserted() {},
  update(el: any, binding: any, vnode: any, oldVnode: any) {},
  componentUpdated(el: any, binding: any, vnode: any, oldVnode: any) {},
  unbind(el: any) {
    if (eventHandler.mousedown) {
      el.removeEventListener('mousedown', eventHandler.mousedown)
    }
  }
}
