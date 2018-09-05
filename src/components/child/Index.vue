<template>
  <div id="index">
    <el-card shadow="never">
      CALMAN
    </el-card>
    <div class="block">
      <el-carousel trigger="click" height="150px">
        <!--<el-carousel-item v-for="(img , index) in imgArray" :key="index">-->
          <!--<h3><img style="width: 100%;height: 136px" :src="img" alt=""></h3>-->
        <!--</el-carousel-item>-->
        <el-carousel-item v-for="item in 4" :key="item">
          <h3>{{item}}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-col :span="6">
      <el-card shadow="hover">
        通知
      </el-card>
    </el-col>
    <el-col :span="18">
      <el-card shadow="hover">
        暂无通知
      </el-card>
    </el-col>
    <el-col :span="6">
      <div  @click="goMonitorIndex()">
      <el-card shadow="hover">
        <i class="el-icon-document"></i>
        <br>监控
      </el-card>
      </div>
    </el-col>
    <el-col :span="6">
      <el-card shadow="hover">
        <i class="el-icon-time"></i>
        <br>分析
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card shadow="hover">
        <i class="el-icon-bell"></i>
        <br>报表
      </el-card>
    </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <i class="el-icon-service"></i>
          <br>诊断
        </el-card>
      </el-col>
    <el-col :span="6">
      <el-card shadow="hover">
        <i class="el-icon-printer"></i>
        <br>智控
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card shadow="hover">
        <i class="el-icon-edit"></i>
        <br>培训
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card shadow="hover">
        <i class="el-icon-date"></i>
        <br> 安防
      </el-card>
    </el-col>
    <router-view/>
  </div>
</template>
<script>
  export default{
      data(){
          return{
            imgArray:[
                 '/static/img/carousel1.0bfa248.jpg',
                 '/static/img/carousel2.e723fb6.jpg',
                 '/static/img/carousel3.0cb64e2.jpg',
                 '/static/img/carousel4.a2e2e70.jpg',
              ],
          }
      },
    methods:{
      goMonitorIndex(){
        this.$router.push({name:'MonitorIndex'});
      }
    }
  }
</script>
<style scoped>
  #index i{
    font-size: 30px;
  }
</style>
