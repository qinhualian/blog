<template>
  <div class="q-project-animation-battery">
    <div class="battery"></div>
    <div class="battery-wave">
      <div class="wave" v-for="waveItem in 3" :key="'waveItem' + waveItem"></div>
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component({
    components: {}
  })
  export default class AnimationBattery extends Vue {
    // 使用 filter: hue-rotate() 对渐变色彩进行色彩过渡变换动画
    //CSS 实现波浪效果  https://www.cnblogs.com/coco1s/p/7197662.html
  }
</script>
<style lang="less">
  .q-project-animation-battery {
    --battery-bg: #fff;
    width: 200px;
    height: 300px;
    position: relative;
    // 电池头部
    &::before {
      content: '';
      position: absolute;
      top: -20px;
      height: 20px;
      width: 50px;
      background: rgba(255, 255, 255, 0.88);
      left: calc(50% - 25px);
      border-radius: 5px 5px 0 0;
    }
    .battery {
      z-index: 1;
      overflow: hidden;
      width: 100%;
      height: 100%;
      background-color: var(--battery-bg);
      position: relative;
      border-radius: 15px 15px 5px 5px;
      box-shadow: 0 0 5px 2px rgba(255, 255, 255, 0.22);
      // 电池电量主体
      &::after {
        content: '';
        width: 100%;
        height: 100%;
        left: 0;
        top: 90%;
        position: absolute;
        background: linear-gradient(to bottom, #7abcff 0%, #00bcd4 44%, #2196f3 100%);
        box-shadow: 0 14px 28px rgba(33, 150, 243, 0), 0 10px 10px rgba(9, 188, 215, 0.08);
        animation: charging 10s linear infinite; // 电量颜色  匀速 循环
        filter: hue-rotate(90deg);
      }
      @keyframes charging {
        50% {
          box-shadow: 0 14px 28px rgba(0, 150, 136, 0.83), 0px 4px 10px rgba(9, 188, 215, 0.4); // 叠加后的低电量颜色
        }
        95% {
          top: 5%;
          filter: hue-rotate(0deg);
          border-radius: 0 0 5px 5px;
          box-shadow: 0 14px 28px rgba(4, 188, 213, 0.2), 0 10px 10px rgba(9, 188, 215, 0.08);
        }
        100% {
          top: 0%;
          filter: hue-rotate(0deg);
          border-radius: 15px 15px 5px 5px;
          box-shadow: 0 14px 28px rgba(4, 188, 213, 0), 0 10px 10px rgba(9, 188, 215, 0.4);
        }
      }
    }

    // 模拟波浪
    .battery-wave {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      border-radius: 15px 15px 5px 5px;
      overflow: hidden;

      .wave {
        position: absolute;
        width: 450px;
        height: 450px;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 45% 47% 44% 42%;
        bottom: 20px;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: 1;
        animation: move 10s linear infinite;
      }
      .wave:nth-child(2) {
        border-radius: 38% 46% 43% 47%;
        transform: translate(-50%, 0) rotate(-135deg);
      }

      .wave:nth-child(3) {
        border-radius: 42% 46% 37% 40%;
        transform: translate(-50%, 0) rotate(-135deg);
      }
      @keyframes move {
        100% {
          transform: translate(-50%, -270px) rotate(720deg);
        }
      }
    }
  }
</style>
