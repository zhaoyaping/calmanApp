<template>
	<div>
		<div>
			<header><img src="@/assets/img/loop.png" alt="">{{title}}<img src="@/assets/img/main.png" alt=""></header>
			<p @click='ChangPwd'><span>重置密码</span><!-- <img src="@/assets/img/67.png" alt="" @click='ChangPwd'> --></p>
			<p@click='Cancel'><span>注销</span><!-- <img src="@/assets/img/67.png" alt="" @click='Cancel'> --></p>
		</div>
	</div>
</template>
<script>
	import globalData from '@/assets/js/global.js';
	export default{
		name:'Setting',
		data(){
			return{
				title:'设置'
			}
		},
		methods:{
			Cancel(){           //点击注销发起请求并返回登陆页
				$.post({url:globalData.host + 'User/LogOut',xhrFields:{withCredentials:true}}).then((res)=>{
					if(res.status==1){
						this.$router.push('/')
					}else if(res.status==0){
						globalData.myAlert(res.msg)
					}else if(res.status==-1){
						this.$router.push({name:'Login'})
					}
				})
			},
			ChangPwd(){          //重置密码
				this.$router.push('/Newpwd')
				localStorage.removeItem('pwd')
			}
		},
	}
</script>
<style scoped>
header{
	width:100%;
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
p{ 
	font-size: 16px;
	line-height: 30px;
	border-bottom: 1px solid #e2e2e2;
	text-align: left;
	padding: 15px 15px;
	margin: 0px;
	color: black;
	position: relative;
}
p img{
	width: 10px;
	height: 15px;
	position: absolute;
	right:20px;
	top:20px;
}
</style>