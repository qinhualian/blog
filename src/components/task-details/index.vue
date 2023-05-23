<template>
  <div class="dv-data-explore-task-details">
    <el-container>
      <el-header class="details-header" style="height: 50px">
        <details-header></details-header>
      </el-header>
      <el-container>
        <el-aside width="300px" class="details-aside">
          <details-aside @startDrag="startDrag"></details-aside>
        </el-aside>
        <el-main class="details-main">
          <details-main :drag-node="dragNode"></details-main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="less" src="./index.less"></style>
