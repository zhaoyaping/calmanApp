<template>
	<div>
		<header><img src="@/assets/img/loop.png" alt="" @click='loop'>{{title}}<img src="@/assets/img/main.png" alt=""></header>
		<div class="setPWD">
			<p>卡尔曼智能电站监控平台</p>
			<p><img src="@/assets/img/Locked.png"alt=""><input type="password" placeholder="输入原密码" v-model="np3"></p>
			<p><img src="@/assets/img/Locked.png"alt=""><input type="password" placeholder="新密码" v-model="np1"></p>
			<p><img src="@/assets/img/Locked.png"alt=""><input type="password" placeholder="确认密码" v-model="np2"></p>
			<p><button @click="suRe">确&nbsp;&nbsp;认</button></p>
		</div>
	</div>
</template>
<script>
	import globalData from '@/assets/js/global.js';
	export default{
		name:'Newpwd',
		data(){
			return{
				title:'重置密码',
				np1:'',
				np2:'',
				np3:'',
				key:''
			}
		},
		methods:{
			loop(){
				//点击返回上一页
				this.$router.go(-1);
			},
			suRe(){
				let d=this.$md5(this.np3).toUpperCase()
				console.log(d)
				let c=d+this.key
				console.log(c)
				let a=this.$md5(c).toUpperCase()
				console.log(a)
				if(this.np1==""||this.np2==""||this.np3==''){
			        globalData.myAlert("密码不能为空")
			    }else if(this.np1===this.np2){		//判断前后两次输入密码是否相同
					let NewPwd= this.np1                
					let b=this.$md5(NewPwd).toUpperCase()             //密码加密
					let date={'oldpwd':a,'newpwd':b}               //键值对形式传数据
					$.post({url:globalData.host +'User/NewPwd',data:date,xhrFields:{withCredentials:true}}).then((res)=>{
						if(res.status==1){
							globalData.myAlert("密码修改成功，请重新登录")
							this.$router.push('/')
						}else if(res.status==0){
							globalData.myAlert(res.msg)
						}else if(res.status==-1){
							this.$router.push({name:'Login'})
						}
					})
				}else{
					globalData.myAlert("两次输入密码不同，请从新输入")
				}
			}
		},
		mounted(){
			let that=this
			$.post({url:globalData.host + 'User/PwdInit',xhrFields:{withCredentials:true}}).then((res)=>{
				if(res.status==1){
					that.key=res.data.pwdkey
				}else if(res.status==0){
					globalData.myAlert(res.msg)
				}else if(res.status==-1){
					this.$router.push({name:'Login'})
				}
			})
		}
	}
</script>
<style scoped>
header{
	width: 100%;
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
.setPWD{
  	text-align: center;
  	width: 250px;
  	margin: 0 auto;
}
.setPWD p:nth-of-type(1){
	margin:0 auto;
	padding-top:65px;
	line-height: 50px;
	text-align: center;
	font-size: 14px;
	color: green;
	background: url(../../../assets/img/logo.png) no-repeat center center;
}
.setPWD p{
	width: 250px;
	height: 40px;
	margin: 10px auto;
	line-height: 40px;
	font-size: 14px;
	text-align: left;
}
.setPWD p img{
	width: 30px;
	height: 30px;
	position: relative;
	top:10px;
}
.setPWD p input{
	background:transparent; 
	width: 80%;
	height:30px;
	border:none;
	border-bottom: 1px solid #44b76f;
	margin-left: 10px;
	outline: none;
	font-size: 16px;
}
button{
	  display: block;width: 250px;
	  height: 40px;
	  line-height: 40px;
	  margin: 40px auto;
	  border:none;
	  border-radius: 20px;
	  background-color: green;
	  color: #fff;
	  font-size: 20px;
	  font-weight: 100;
	  outline: none;
	  margin-bottom: 5px;
}
</style>