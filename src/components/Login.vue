<template>
		<div id="bg" :style="{height:top+'px'}">
			<header><img src="../assets/img/loop.png" alt="">{{title}}<img src="../assets/img/main.png" alt=""></header>
		    <div class="login-warp">
		    	  <p>卡尔曼智能电站监控平台</p>
			      <i v-show="showTiShi">{{tishi}}</i>
			      <p>
			      	<img src="../assets/img/User.png" alt="">
			      	<input type="text" placeholder="请输入用户名" v-model="user">
			      </p>
			      <p>
			        <img src="../assets/img/Locked.png"alt="">
			        <input type="password" placeholder="请输入密码" v-model="pwd" >
			      </p>
			      <button v-on:click="login">登录</button>
			      <p>
			        <input type="checkbox" id="checkbox" checked="checked" ><label for="checkbox">记住密码</label>
			        <router-link to="Help">忘记密码?</router-link>
			      </p>
		    </div>
	  </div>
</template>
<script>
import globalData from '../assets/js/global.js'
export default {
	  name:'Login',
	  data () {
		    return {
		    	  title:'登录',
			      user:'',
			      pwd:'',
			      tishi:'',
			      pwdKey:'',
			      showTiShi:false,
			      top:$(window).height()
		    }
	  },
	  mounted () {
	        //判断cookie
	        this.user=localStorage.getItem('user')
	        this.pwd=localStorage.getItem('pwd')
	        let that = this;           //修改this指向
	        //请求初始化密钥
	        $.post({url:globalData.host + 'User/PwdInit',xhrFields:{withCredentials:true}}).then((res)=>{
	        	that.pwdKey=res.data.pwdkey//将获取到的密钥保存到pwdKey中
	        })
	        if(!localStorage.getItem('top')){
	      		localStorage.setItem('top',$(window).height()-60)
	        }
	  },
	  methods:{	    //点击登录之后的方法
		    login(){
		    	let re1=/^[a-zA-Z0-9_]{3,20}$/;        //帐号是否合法(字母开头，允许4-20字节，允许字母数字下划线)
			      if(this.user==""||this.pwd==""){
			        	globalData.myAlert("请输入用户名密码")
			      }else if(!re1.test(this.user)){
			      		globalData.myAlert("用户名格式错误")
			      }else{
				        let b=this.$md5(this.pwd)
				        let c=b.toUpperCase()
				        let bb =c+this.pwdKey
				        let a=(this.$md5(bb)).toUpperCase()
				        let data={'user':this.user,'pwd':a}
				        $.post({url:globalData.host + 'User/Login',data:data,xhrFields:{withCredentials:true}}).then((res)=>{
					          if(res.status=="1"){
						            // this.tishi=res.msg;
						            // this.showTiShi=true
						            globalData.myAlert("登录成功")
						            if($('#checkbox').is(':checked')==true){            //判断复选框是否被选中
						            	localStorage.setItem('user',this.user)    	    //选中时，设置cookie
						            	localStorage.setItem('pwd',this.pwd)        	//选中时，设置cookie
						            }else{
						            	localStorage.removeItem('pwd')               	//未选中清除cookie
						            }
						            this.$router.push('Home')
					          }else{
						            // this.tishi=res.msg
						            // this.showTiShi=true
						            globalData.myAlert(res.msg)
					          }
			        	})
		      	  }
	    	}
	  }
}
</script>
<style scoped>
#bg{
	background: url(../assets/img/bg.png);
	width: 100vw;
	height:100vh;
}
header{
	font-size: 16px;
	margin: 0;
	line-height:50px;
	background: #7fd8a8;
	color: white;
}
header img:nth-of-type(1){
	width: 30px;
	height:30px;
	position: absolute;
	left:10px;
	top:10px;
}
header img:nth-of-type(2){
	width: 25px;
	height:25px;
	position: absolute;
	right:15px;
	top:12px;
}
.login-warp{
  	text-align: center;
  	width: 250px;
  	margin: 0 auto;
  	margin-top: 20px;
}
.login-warp p:nth-of-type(1){
	margin:0 auto;
	padding-top:70px;
	line-height: 40px;
	text-align: center;
	font-size: 16px;
	color: green;
	background: url(../assets/img/logo.png) no-repeat center center;
}
.login-warp p{
	width: 250px;
	height: 40px;
	margin: 10px auto;
	line-height: 40px;
	font-size: 16px;
	text-align: left;
}
.login-warp p img{
	width: 30px;
	height: 30px;
	position: relative;
	top:10px;
}
.login-warp p input{
	background:transparent;
	width: 80%;
	height:30px;
	border:none;
	border-bottom: 1px solid #44b76f;
	margin-left: 10px;
	outline: none;
	font-size: 14px;
}
#checkbox{
	display: inline-block;
	height: 15px;
	width: 15px;
	margin: 15px 2px 15px 15px;
}
.login-warp p:nth-of-type(4){
	margin-top: 0px;
	height: 30px;
	font-size: 14px;
	color: #41b883;
}
p a{
	float: right;
	color: red;
	font-size: 14px;
}
i{color: red;}
button{
	  display: block;
	  width: 250px;
	  height: 40px;
	  line-height: 40px;
	  margin: 30px auto 0px;
	  border:none;
	  outline: none;
	  border-radius: 20px;
	  background-color: #278839;
	  color: #fff;
	  font-size: 20px;
	  margin-bottom: 5px;
}
</style>
