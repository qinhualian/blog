<template>
  <div class="q-components-base-card">
    <img src="@/assets/images/homepage/封面背景图.jpg" />
    <div class="content">
      <p class="name">{{ showCardCard.name }}</p>
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  @Component({
    props: {
      cardCard: {
        type: Object,
        default: () => {
          return { name: '测试', labels: ['未知'], imgSrcName: '封面背景图' }
        }
      }
    }
  })
  export default class QBaseCard extends Vue {
    get showCardCard() {
      return this.$props.cardCard
    }
  }
</script>
<style lang="less">
  .q-components-base-card {
    --card-bg: #fff;
    --color-shadow: #babecc;
    --card-box-shadow: -5px -5px 20px #fff, 5px 5px 20px var(--color-shadow);
    --card-box-shadow-hover: 0 12px 16px 16px rgba(7, 17, 27, 0.09);
    margin: 30px 0;
    display: flex;
    align-items: center;
    overflow: hidden;
    height: 18em;
    border-radius: 8px;
    background: var(--card-bg);
    box-shadow: var(--card-box-shadow);
    transition: all 0.3s;
    width: 100%;
    &:hover {
      box-shadow: -2px -2px 5px var(--card-bg), 2px 2px 5px var(--color-shadow);
    }
    &:active {
      box-shadow: inset 1px 1px 2px var(--color-shadow), inset -1px -1px 2px var(--card-bg);
    }
    > img {
      transition: all 0.5s;
      width: 40%;
      height: 100%;
      min-width: 200px;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
</style>
