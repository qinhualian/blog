import { Component, Vue } from 'vue-property-decorator'

@Component
export default class PuzzleCheck extends Vue {
  public slide = false
  public handleChangeModuleSize() {
    const moveDiv: any = document.getElementsByClassName('drag-child')[0]
    const checkchild: any = document.getElementsByClassName('check-child')[0]
    document.onmousemove = function (e) {
      const pageX = e.pageX + 20 > 400 ? 400 : e.pageX - 20 < 0 ? 0 : e.pageX - 20
      if (e.pageX > 0 && e.pageX < 370) {
        moveDiv.style.transform = `translateX(${pageX}px)`
        checkchild.style.transform = `translateX(${pageX}px)`
      }
    }
    document.onmouseup = (e) => {
      if (e.pageX >= 275 && e.pageX <= 285) {
        this.$message.success('成功校验')
      }
      e.stopPropagation()
      document.onmousemove = null
      document.onmouseup = null
    }
  }
  public handleRecover() {
    this.slide = true
    const moveDiv: any = document.getElementsByClassName('drag-child')[0]
    const checkchild: any = document.getElementsByClassName('check-child')[0]
    moveDiv.style.transform = `translateX(0px)`
    checkchild.style.transform = `translateX(0px)`
  }
}
