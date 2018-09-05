<template>
  <div id="deviceList">

    <el-container style="border-bottom: 1px solid #cacaca" @click="goDevice()">
      <el-aside width="35%" style="height: 150px;padding: 40px 0 20px 20px;">
        <img style="width: 100%;height: 100%" src="../../images/carousel1.jpg" alt="">
      </el-aside>
      <el-main>
        <p>机组信息：dfdskjf</p>
        <p>今日发电量：dfdskjf</p>
      </el-main>
    </el-container>
    <el-container style="border-bottom: 1px solid #cacaca">
      <el-aside width="35%" style="height: 150px;padding: 40px 0 20px 20px;">
        <img style="width: 100%;height: 100%" src="../../images/carousel2.jpg" alt="">
      </el-aside>
      <el-main>
        <p>机组信息：dfdskjf</p>
        <p>今日发电量：dfdskjf</p>
      </el-main>
    </el-container><el-container style="border-bottom: 1px solid #cacaca">
    <el-aside width="35%" style="height: 150px;padding: 40px 0 20px 20px;">
      <img style="width: 100%;height: 100%" src="../../images/carousel3.jpg" alt="">
    </el-aside>
    <el-main>
      <p>机组信息：dfdskjf</p>
      <p>今日发电量：dfdskjf</p>
    </el-main>
  </el-container>
    <router-view/>
  </div>
</template>
<script>

</script>
