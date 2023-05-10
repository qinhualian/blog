import { Component, Vue } from 'vue-property-decorator'
import HeadPage from './head/index.vue'

@Component({
  components: {
    HeadPage
  }
})
export default class HomePage extends Vue {}
