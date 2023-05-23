import TaskDetails from '@/components/task-details/index.vue'
import { Component, Vue } from 'vue-property-decorator'
import HeadPage from './head/index.vue'
import HeadMain from './mian/index.vue'
@Component({
  components: {
    HeadPage,
    HeadMain,
    TaskDetails
  }
})
export default class HomePage extends Vue {}
