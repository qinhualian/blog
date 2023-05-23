<template>
  <div class="details-main-content">
    <div class="main-top">
      <div class="main-top-panel-box">
        <div id="container" class="main-top-panel" style="height: 100%; width: 100%"></div>
      </div>
      <details-node-active
        v-show="state.showSelectBox && !state.isClickTool"
        class="animate__animated animate__fadeInRight"
      ></details-node-active>
      <div class="main-top-upload"></div>
    </div>
    <div class="main-bottom"></div>
    <div v-show="state.showMenuBox" class="add-node-box" :style="{ ...menuPosition }">
      <el-input v-model="model.menuValue" placeholder="搜索数据类型" prefix-icon="el-icon-search">
      </el-input>
      <div class="wayList-box">
        <p v-for="item in wayList" :key="'way' + item" @click="handleMenuType(item)">
          {{ item }}
        </p>
      </div>
    </div>

    <!-- 修改节点弹窗 -->
    <edit-node
      v-if="state.showEditNodePopup"
      :title="selectCellList[0].data.title"
      @close="state.showEditNodePopup = false"
      @handleConfirm="handleEditNode"
    ></edit-node>
  </div>
</template>
<script lang="ts" src="./details-main.ts"></script>
<style lang="less" src="./details-main.less"></style>
