import { Component, Vue } from "vue-property-decorator";
import HeadPage from "./head/index.vue";
import HeadMain from "./mian/index.vue";

@Component({
  components: {
    HeadPage,
    HeadMain,
  },
})
export default class HomePage extends Vue {}
