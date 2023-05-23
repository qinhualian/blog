<template>
  <div class="details-aside-content">
    <div class="aside-query">
      <el-input v-model="queryValue" placeholder="请输入内容" suffix-icon="el-icon-search">
      </el-input>
    </div>
    <div class="aside-menu">
      <el-collapse @change="handleCollapse">
        <el-collapse-item v-for="item in menuList" :key="item.title" :name="item.title">
          <template slot="title">
            <i
              class="item__arrow"
              :class="{
                'el-icon-caret-bottom': curOpenMenu.includes(item.title),
                'el-icon-caret-right': !curOpenMenu.includes(item.title)
              }"
            ></i>
            {{ item.title }}
          </template>
          <div class="aside-collapse-active">
            <div
              v-for="wayItem in wayList"
              :key="wayItem"
              class="way-box"
              @mousedown="(e) => handleMousedown(e, wayItem)"
            >
              <!-- <img :src="`@assets/images/explore/'${wayItem}'.png'`" alt="" /> -->
              <i :style="getIconUrl(wayItem)"></i>
              <span>{{ wayItem }}</span>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script lang="ts" src="./details-aside.ts"></script>
<style lang="less" src="./details-aside.less"></style>
