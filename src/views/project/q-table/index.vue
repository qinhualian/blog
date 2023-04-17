<template>
  <div class="q-table">
    <n-ve-table
      ref="tableRef"
      :table-columns="tableColumns"
      :table-data="tableData"
      :is-close-loading-instance="isCloseLoadingInstance"
      :veoption="veoption"
      :use-default-add-col="true"
    >
    </n-ve-table>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style lang="less" src="./index.less"></style>
