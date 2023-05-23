<template>
  <div class="home-page">
    <!-- <el-container>
      <HeadPage></HeadPage>
      <el-container>
        <HeadMain></HeadMain>

        <el-footer>Footer</el-footer>
      </el-container>
    </el-container> -->
  </div>
</template>

<!-- <script lang="ts" src="./home.ts">

</script> -->
<script>
  let count = 0
  const nums = [0, 1, 2, 3]

  nums.forEach((num) => {
    if (num) count += num
  })

  console.log(count)
</script>
<style lang="less" src="./home.less"></style>
