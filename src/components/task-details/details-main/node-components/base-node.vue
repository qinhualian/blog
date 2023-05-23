<template>
  <div class="custom-base-node" :style="{ ...size }">
    <span class="left-icon">
      <!-- <i :style="getIconUrl(type)"></i> -->
      <i class="el-icon-setting"></i>
    </span>

    <p class="title">{{ showTitle || '节点测试' }}</p>
    <p class="tools">
      <span
        class="el-icon-circle-plus-outline"
        @click="(e) => handleTools(toolsTypeEnum.ADD, e)"
      ></span>
      <span class="el-icon-edit" @click="(e) => handleTools(toolsTypeEnum.EDIT, e)"></span>
      <span class="el-icon-delete" @click="(e) => handleTools(toolsTypeEnum.DELETE, e)"></span>
    </p>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  import { WayEnum } from '../../details-aside/aside-data'
  import { getIconUrl, styleConfig, ToolsTypeEnum } from '../graph-config'
  import { MainStore } from '../main-store'

  @Component({
    components: {},
    inject: ['getNode']
  })
  export default class CustomBaseNode extends Vue {
    public getIconUrl = getIconUrl
    public type = WayEnum.EXCEL

    public size = {
      width: styleConfig.nodeWidth + 'px',
      height: styleConfig.nodeHeight + 'px'
    }
    public toolsTypeEnum = ToolsTypeEnum
    public currentNode: any = ''
    public showTitle = ''
    public mounted() {
      this.currentNode = (this as any).getNode()
      this.showTitle = this.currentNode?.data?.title
      this.type = this.currentNode?.data?.type
      this.currentNode.on('change:data', ({ current }: any) => {
        this.showTitle = current.title
        this.type = current.type
      })
    }

    public handleTools(type: ToolsTypeEnum, e: MouseEvent) {
      MainStore.commit('changeTools', { type, e })
    }
  }
</script>
<style lang="less">
  .custom-base-node {
    position: relative;
    width: 150px;
    height: 65px;
    overflow: hidden;
    display: flex;
    background: linear-gradient(180deg, #ffffff 0%, #ffffff 100%);
    border: 2px solid #dae3df;
    .left-icon {
      position: absolute;
      display: flex;
      width: 55px;
      height: 55px;
      border-radius: 50%;
      align-items: center;
      // border: 2px solid #dae3df;
      top: 3px;
      left: 0;
      z-index: 10;
      > i {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .title {
      width: 100%;
      padding-right: 20px;
      font-weight: bold;
      color: #00c47c;
      font-size: 16px;
      letter-spacing: 1px;
      text-shadow: 0 4px 2px rgba(0, 255, 173, 0.14);
      display: flex;
      height: 50%;
      justify-content: flex-end;
      align-items: center;
    }
    .tools {
      width: 100%;
      height: 50%;
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      padding-bottom: 5px;
      font-size: 20px;
      cursor: pointer;
      z-index: 100;
      > span {
        margin: 0 5px;
        &:hover {
          color: var(--color-primary);
        }
      }
    }
  }
</style>
