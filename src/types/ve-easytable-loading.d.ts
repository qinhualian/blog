import type { veLoading } from "vue-easytable";

declare module "vue/types/vue" {
  interface Vue {
    $veLoading: veLoading;
  }
}
