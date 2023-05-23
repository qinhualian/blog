<template>
  <div class="details-header-content">
    <div class="task-title">
      <p><i class="el-icon-arrow-left"></i>任务标题</p>
    </div>
    <div class="task-tools">
      <img v-for="srcItem in imgList" :key="srcItem" :src="srcItem" alt="" />
    </div>
    <div class="task-history">
      <el-select v-model="stateValue" placeholder="请选择">
        <el-option v-for="item in stateOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <div class="task-history-right">
        <img src="@/assets/images/explore/历史数据.png" />
        <span>任务历史</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./details-header.ts"></script>
<style lang="less" src="./details-header.less"></style>
