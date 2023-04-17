<template>
  <div class="puzzle-check">
    <div class="jigsaw">
      <div class="check-child" :class="{ 'slide-drag': slide }"></div>
    </div>
    <div class="drag" @mouseout="handleRecover">
      <div
        @mouseenter="slide = false"
        class="drag-child"
        :class="{ 'slide-drag': slide }"
        @mousedown="handleChangeModuleSize"
      >
        <i class="el-icon-arrow-right"></i>
        <i class="el-icon-arrow-right"></i>
        <i class="el-icon-arrow-right"></i>
      </div>
      <span>按住左边按钮向右拖动完成上方图像验证</span>
    </div>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="less" src="./index.less"></style>
