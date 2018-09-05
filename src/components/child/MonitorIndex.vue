<template>
  <div id="monitorIndex">
    <el-col :span="24">
      <el-card shadow="hover">
        气罐
      </el-card>
    </el-col>
    <el-col :span="24">
      <el-card shadow="hover">
        预处理
      </el-card>
    </el-col>
    <el-col :span="24">
      <div @click="goDetails()">
      <el-card shadow="hover">
        燃气发电机
      </el-card>
      </div>
    </el-col>
    <el-col :span="24">
      <el-card shadow="hover">
        余热锅炉
      </el-card>
    </el-col>
    <el-col :span="24">
      <el-card shadow="hover">
        汽轮机组
      </el-card>
    </el-col>
    <el-col :span="24">
      <el-card shadow="hover">
        电气系统
      </el-card>
    </el-col>
    <router-view/>
  </div>
</template>
<script>
  export default{
      data(){
          return{

          }
      },
    methods:{
      goDetails(){
        this.$router.push({name:'Details',query:{id:58}});
      }
    }
  }
</script>
