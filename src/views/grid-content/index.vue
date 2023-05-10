<template>
  <div class="q-grid-content">
    <div class="q-grid-content__box">
      <div
        class="card-item"
        :class="{ 'stop-bottom-item': (cardItem.stop = componentStopEnum.BOTTOM) }"
        v-for="(cardItem, index) in componentsList"
        :key="'cardItem' + index"
      >
        <component :is="cardItem.name"></component>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="less" src="./index.less"></style>
