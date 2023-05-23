<template>
  <el-dialog
    title="修改名称"
    :visible="true"
    custom-class="details-main-edit-node"
    :before-close="close"
    width="500px"
  >
    <div class="content"><span>修改节点名称</span> <el-input v-model="showTitle"></el-input></div>
    <template slot="footer">
      <el-button type="light" @click="close">取消</el-button>
      <el-button type="'primary'" @click="handleConfirm()">确定</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  // import DraggableDialog from '@/components/draggable-dialog/dialog.vue'

  @Component({
    components: {
      // DraggableDialog
    },
    props: {
      title: {
        default: '',
        type: String
      }
    }
  })
  export default class DetailsMainEditNode extends Vue {
    public showTitle = this.$props.title
    public handleConfirm() {
      this.$emit('handleConfirm', this.showTitle)
      this.close()
    }
    public close() {
      this.$emit('close')
    }
  }
</script>

<style lang="less">
  .details-main-edit-node {
    .el-dialog__body {
      .content {
        > span {
          margin-bottom: 10px;
          display: block;
        }
      }
    }
  }
</style>
