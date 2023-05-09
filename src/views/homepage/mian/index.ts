import { Component, Vue } from "vue-property-decorator";
import QBaseCard from "@/components/cards/base-card.vue";
@Component({
  components: {
    QBaseCard,
  },
})
export default class HeadMain extends Vue {
  public cardList = [
    { name: "A", labels: ["css"], imgSrcName: "封面背景图" },
    { name: "B", labels: ["css"], imgSrcName: "封面背景图" },
  ];
}
