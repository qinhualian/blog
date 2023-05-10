<template>
  <div class="homepage-mian">
    <div class="homepage-mian__item homepage-mian__cover">
      <div class="homepage-mian__cover__arrow"><down-outlined /></div>
    </div>
    <div class="homepage-mian__item homepage-mian__card">
      <div class="content">
        <div class="content__mian">
          <QBaseCard
            :card-data="cardItem"
            v-for="cardItem in cardList"
            :key="cardItem.name"
          ></QBaseCard>
        </div>

        <div class="content__side"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="less" src="./index.less"></style>
