import { Component, Vue } from "vue-property-decorator";
import BorderBar from "../project/echarts/bar/border-bar.vue";
import HeadPage from "./head/index.vue";

@Component({
  components: {
    HeadPage,
    BorderBar,
  },
})
export default class HomePage extends Vue {}
