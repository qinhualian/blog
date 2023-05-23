// node modules
import { defineComponent } from 'vue'

// components && directives
import DragPanel from '@/utils/drag-panel'

const BORDER_WIDTH = 3

export default defineComponent({
  directives: {
    DragPanel
  },
  inheritAttrs: false,
  props: {
    skipBlurEffect: {
      type: Boolean,
      /* dialog 修改完bug后才可以放出来, 改为 false */
      default: false
    }
  },
  created() {
    if (!this.skipBlurEffect) {
      const id = 'y-' + Math.random().toString().slice(2)
      const app = document.getElementById('app')
      if (app) {
        app.dataset.dialog = app.dataset.dialog || '' + id

        this.$once('hook:beforeDestroy', () => {
          app.dataset.dialog = (app.dataset.dialog || '').replaceAll(id, '')
        })
      }
    }
  },
  mounted() {
    const observer = new ResizeObserver(() => this.onResize())
    observer.observe(this.$el)
    this.$once('hook:beforeDestroy', () => {
      observer.unobserve(this.$el)
    })
  },
  methods: {
    onResize() {
      const wrapper = this.$el as HTMLElement
      if (wrapper && !wrapper?.dataset.drag) {
        const dlgDom = this.$el.childNodes[0] as HTMLElement
        dlgDom.style.top =
          Math.round((wrapper.clientHeight - dlgDom.clientHeight) / 2) - BORDER_WIDTH + 'px'
        dlgDom.style.left =
          Math.round((wrapper.clientWidth - dlgDom.clientWidth) / 2) - BORDER_WIDTH + 'px'
      }
    }
  }
})
