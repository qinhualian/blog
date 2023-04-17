<template>
  <div class="easy-rich-text">
    <div class="operate_box">
      <div
        ref="formulaTextArea"
        contenteditable="true"
        class="expr_box"
        placeholder="请输入公式"
        @blur="blurExprBox"
      ></div>
    </div>
    <div class="info_box">
      <p
        v-for="item in formulaConfig"
        :key="item.fn"
        @dblclick="handleAddFn('函数', item)"
      >
        {{ item.fn }}
      </p>
    </div>
    <div class="info_box">
      <p
        v-for="item in tagList"
        :key="item.title"
        @dblclick="handleAddFn('标签', item)"
      >
        {{ item.title }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style lang="less" src="./index.less"></style>
