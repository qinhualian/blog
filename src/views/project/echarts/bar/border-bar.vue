<template>
  <div class="echarts-border-bar">
    <div class="chart" ref="chart"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as echarts from "echarts";
@Component
export default class BorderBar extends Vue {
  public showData = [
    {
      label: "8:00",
      value: 50,
    },
    {
      label: "9:00",
      value: 55,
    },
    {
      label: "10:00",
      value: 20,
    },
    {
      label: "11:00",
      value: 32,
    },
    {
      label: "12:00",
      value: 12,
    },
  ];
  public colors = {
    "内层柱形图渐变-底部颜色": "rgba(40,189,244,0.5)",
    "内层柱形图渐变-顶部颜色": "#28BDF4",
    "外层柱形图-边框色": "#28BDF4",
    "外层柱形-填充色": "transparent",
    "菱形-边框色": "#28BDF4",
    "菱形-填充色": "transparent",
  };
  public symbols = [
    "path://M66.1,35.7L100,49.8v128.7l-33.9-12.7L66.1,35.7z", //左边
    "path://M133.9,35.7L100,49.8v128.7l33.9-12.7V35.7z", //右边
    "path://M66.1,35.7L100,21.5l33.9,14.1L100,49.8L66.1,35.7z", //菱形
  ];
  public maxData = 0;
  public mounted() {
    const chartRef: any = this.$refs.chart;
    const myChart = echarts.init(chartRef);
    const option = this.getCustomBarOption();
    myChart.setOption(option);
  }
  public getCustomBarOption() {
    this.maxData =
      Math.max(
        ...this.showData.map((item) => {
          return item.value;
        })
      ) + 10;
    return {
      grid: {
        containLabel: true,
        left: 0,
        right: 0,
        bottom: " 5%",
        top: " 5%",
      },
      tooltip: {
        trigger: "axis",
        show: false,
      },
      xAxis: {
        type: "category",
        show: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: "rgba(40,189,244,0.5)",
            width: 1,
            type: "solid",
          },
        },
        axisLabel: {
          color: "#fff",
          fontSize: 38,
          margin: 30,
        },
        data: this.showData.map((item) => {
          return item.label;
        }),
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          type: "pictorialBar",
          symbol: "rect",
          symbolSize: [3, "100%"],
          symbolOffset: [0, 15],
          data: Array(this.showData.length).fill(this.maxData),
          z: 10,
          itemStyle: {
            color: this.colors["外层柱形图-边框色"],
            borderColor: this.colors["外层柱形图-边框色"],
            borderWidth: 1,
          },
        },
        {
          type: "pictorialBar",
          symbol: "rect",
          symbolSize: [3, "100%"],
          symbolOffset: [25, 5],
          data: Array(this.showData.length).fill(this.maxData),
          z: 10,
          itemStyle: {
            color: this.colors["外层柱形图-边框色"],
            borderWidth: 1,
          },
        },
        {
          type: "pictorialBar",
          symbol: "rect",
          symbolSize: [3, "100%"],
          symbolOffset: [-25, 5],
          data: Array(this.showData.length).fill(this.maxData),
          z: 10,
          itemStyle: {
            color: this.colors["外层柱形图-边框色"],
            borderWidth: 1,
          },
        },
        // //菱形顶部框
        {
          name: "",
          type: "pictorialBar",
          symbolSize: [50, 25],
          symbolOffset: [0, -21],
          silent: true,
          symbol: this.symbols[2],
          // data: topBorderData
          data: Array(this.showData.length).fill(this.maxData),
          //  value: maxData,
          symbolPosition: "end",
          itemStyle: {
            color: this.colors["菱形-填充色"],
            borderColor: this.colors["菱形-边框色"],
            borderWidth: 20,
          },
        },

        // // //菱形底部实体
        {
          name: "",
          type: "pictorialBar",
          symbolSize: [50, 25],
          symbolOffset: [0, 22],
          silent: true,
          z: 12,
          symbol: this.symbols[2],
          data: Array(this.showData.length).fill(this.maxData),
          itemStyle: {
            color: this.colors["内层柱形图渐变-底部颜色"],
            borderColor: this.colors["菱形-边框色"],
            borderWidth: 30,
          },
        },
        // // //菱形顶部实体
        {
          name: "",
          type: "pictorialBar",
          symbolSize: [50, 25],
          symbolOffset: [0, -13],
          z: 16,
          silent: true,
          symbol: this.symbols[2],
          symbolPosition: "end",
          itemStyle: {
            color: this.colors["菱形-边框色"],
            borderColor: this.colors["菱形-边框色"],
          },
          data: this.showData,
          animationDuration: 1000,
          animationDelay: function (idx: any) {
            // 越往后的数据延迟越大
            return idx * 500;
          },
        },

        // // //柱形实体
        {
          type: "bar",
          silent: true,
          barWidth: 50,

          z: 13,
          data: this.showData,
          animationDuration: 1000,

          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 1,
              x2: 0,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: this.colors["内层柱形图渐变-顶部颜色"], // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: this.colors["内层柱形图渐变-底部颜色"], // 100% 处的颜色
                },
              ],
            },
          },
          animationDelay: function (idx: any) {
            // 越往后的数据延迟越大
            return idx * 500;
          },
        },
      ],
    };
  }
}
</script>
<style lang="less">
.echarts-border-bar {
  width: 800px;
  height: 500px;
  background-color: #000;
  .chart {
    width: 100%;
    height: 100%;
  }
}
</style>
