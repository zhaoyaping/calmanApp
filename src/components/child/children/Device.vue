<template>
	<div id="boxs" style="padding-bottom:100px">
		<header>
			<img src="@/assets/img/loop.png" alt="" @click='loop'>
			{{title}}
			<img src="@/assets/img/main.png" alt="">
		</header>
		<div class="device-warp">
			
			<p>设备名称：{{this.data.name}}</p>
			<p>设备类型：{{this.data.type}}</p>
			<p>设备接入时间：{{this.data.created}}</p>
			<button @click='next()'>实时查看</button>
		</div>
	</div>
</template>
<script>
	import globalData from '@/assets/js/global.js';
	export default{
		name:'Device',
		data(){
			return{
				title:'设备详情',
				uid:this.$route.query.uid,
				pid:this.$route.query.pid,
				name:this.$route.query.name,
				name1:this.$route.query.name1,
				data:''
			}
		},
		methods:{
			loop(){
				this.$router.go(-1)

			},
			next(){
				this.$router.push({name:'Rta',query:{uid:this.uid,pid:this.pid,name:this.name,name1:this.name1}})
			}
		},
		mounted(){
			$("#boxs")[0].scrollIntoView();
			let date={'id':this.uid}
			let that=this
			$.post({url:globalData.host + 'Device/Details', data:date,xhrFields:{withCredentials:true}}).then((res)=>{
				if(res.status==1){
					that.data=res.data
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
.device-warp{
	width: 100%;
}
.device-warp p{
	margin: 0 auto;
	padding:0px 5%;
	width: 90%;
	text-align: left;
	line-height: 50px;
	height: 50px;
	white-space: nowrap;
	text-overflow: ellipsis;
	-o-text-overflow: ellipsis;
	overflow: hidden;
	border-bottom: 1px solid #e2e2e2;
}
.device-warp button{
	width: 250px;
	line-height: 50px;
	background: green;
	border-radius: 10px;
	border:none;
	outline: none;
	margin-top: 300px;
	color: white;
	font-size: 20px;
}
</style>