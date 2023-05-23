<template>
  <div class="node-active-box">
    <div class="step-box">
      <p
        v-for="(item, index) in stepList"
        :key="'stepname' + item"
        class="step-box__item"
        :class="{ 'step-box__item__active': stepList[currentStepActive] === item }"
      >
        <i>{{ index + 1 }}</i> <span class="title">{{ item }}</span>
      </p>
      <img src="@/assets/images/explore/step-arrow.png" class="arrow" />
    </div>
    <div class="content">
      <el-upload class="upload-box" drag action="">
        <img src="@/assets/images/explore/upload_excel.png" />
        <div class="el-upload__text">点击上传或将EXCEL拖到此处</div>
        <div class="el-upload__tip">默认识别第一个sheet文件</div>
      </el-upload>
      <div class="next-step-btn">
        <el-button type="primary" @click="handleNextStep">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component({})
  export default class DetailsNodeActive extends Vue {
    public stepList = ['选择EXCEL', '选择sheet']
    public currentStepActive = 0
    public handleNextStep() {
      this.currentStepActive++
    }
  }
</script>
<style lang="less">
  .node-active-box {
    width: 350px;
    height: calc(100% - 20px);
    border: 1px solid #0fab72;
    margin: 10px;
    position: absolute;
    right: 0;
    .step-box {
      width: 100%;
      height: 48px;
      background: #ffffff;
      box-shadow: 0 3px 6px 0 rgba(11, 99, 67, 0.06);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      cursor: default;
      .step-box__item {
        font-size: 16px;
        color: #999999;
        line-height: 21px;
        letter-spacing: 1px;
        display: flex;
        align-items: center;
        width: fit-content;
        > i {
          width: 24px;
          height: 24px;
          background: transparent;
          border: 1px solid #c7cfcc;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          color: #c7cfcc;
          font-family: '微软雅黑';
          margin-right: 10px;
          font-style: inherit;
        }
      }
      .step-box__item__active {
        font-weight: bold;
        color: #171a1d;
        > i {
          background: #1ec182;
          border: none;
          color: #fff;
        }
      }
      > img {
        position: absolute;
        right: 43%;
      }
    }
    .content {
      padding-top: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;
      height: calc(100% - 48px);
      .upload-box {
        width: 90%;
        .el-upload {
          width: 100%;
          .el-upload-dragger {
            padding-top: 40px;
            width: 100%;
            border: 1px dashed var(--color-primary);
            .el-upload__text {
              font-size: 14px;
              letter-spacing: 1px;
              margin: 10px 0;
              color: var(--color-primary);
            }
            .el-upload__tip {
              font-size: 12px;
              color: #bbc4c1;
              line-height: 16px;
            }
          }
        }
      }
      .next-step-btn {
        border-top: 1px solid rgba(15, 171, 114, 0.4);
        height: 70px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 20px;
      }
    }
  }
</style>
