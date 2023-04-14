<template>
  <div class="home">
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

<script lang="ts" src="./home.ts"></script>
