import { Component, Vue } from 'vue-property-decorator'

// import img4 from '@/assets/images/explore/发布色块.png'
// import img1 from '@/assets/images/explore/播放按钮1.png'
// import img2 from '@/assets/images/explore/播放按钮2.png'
// import img3 from '@/assets/images/explore/编辑色块.png'

@Component({
  components: {}
})
export default class DetailsHeader extends Vue {
  // public imgList = [img1, img2, img3, img4]
  public imgList = []
  public stateValue = '编辑态'
  public stateOptions = ['编辑态', '111', '222']
}
