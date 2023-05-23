<template>
  <el-dialog
    v-bind="$attrs"
    :close-on-click-modal="false"
    :append-to-body="true"
    :destroy-on-close="true"
    :modal-append-to-body="true"
  >
    <!-- dialog-header -->
    <template slot="title">
      <div v-drag-panel="{ parentClass: 'el-dialog' }" class="drag-header"></div>
      <span class="el-dialog__title">{{ $attrs.title }}</span>
      <slot name="headers"></slot>
    </template>
    <!-- dialog-body -->
    <slot></slot>
    <!-- dialog-footer -->
    <template slot="footer">
      <slot name="footer"></slot>
    </template>
  </el-dialog>
</template>

<script lang="ts" src="./dialog.ts"></script>
