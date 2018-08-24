<template>
	<div>
		<header>
			<img src="../assets/img/loop.png" alt="" @click='loop'>
			{{title}}
			<img src="../assets/img/main.png" alt="">
		</header>
		<div class="help-warp">
			<p>卡尔曼智能电站监控平台</p>
			<p>{{txt}}</p>
			<p>{{tel}}</p>
			<a :href="('tel:'+tel) ">确定</a>
		</div>
	</div>
</template>
<script>
	import globalData from '../assets/js/global.js'
	export default{
		name:'Help',
		data(){
			return{
				title:'找回密码',
				txt:'',
				tel:''
			}
		},
		methods:{
			loop(){                         //点击返回上一页
				this.$router.go(-1);
			}
		},
		mounted(){
			$.post({url:globalData.host + 'User/PwdHelp',xhrFields:{withCredentials:true}}).then((res)=>{
	        	if(res.status==1){
					this.txt=res.data.txt
		        	this.tel=res.data.tel
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
.help-warp{
  	text-align: center;
  	width: 250px;
  	margin: 0 auto;
  	margin-top: 20px;
}
.help-warp p{
	line-height: 40px;
	margin:0 auto;
	padding: 0px;
}
.help-warp p:nth-of-type(1){
	margin:0 auto;
	padding-top:70px;
	text-align: center;
	font-size: 14px;
	color: green;
	background: url(../assets/img/logo.png) no-repeat center center;
}
.help-warp p:nth-of-type(2){
	font-size: 20px;
}
.help-warp p:nth-of-type(3){
	font-size: 20px;
	color: green;
}
.help-warp a{
	display: block;
	width: 150px;
	line-height: 40px;
	text-decoration: none;
	color: white;
	border-radius: 10px;
	background: green;
	text-align:center;
	margin: 0 auto;
	margin-top: 50px;
}
</style>