<template>
<div id="farth">
	<div id="boxs">
		<header>
			<img src="@/assets/img/loop.png" alt="" @click='loop'>
			<div>
				<span>{{title}}&nbsp;&nbsp;&nbsp;——</span>
				<div id="select">
					<p @click='down()'><span>{{name}}</span><img src="@/assets/img/down.png" alt="" :class="[f?'cur':'new']"></p>
					<div class="sel_down_box" v-show="ll">
						<span v-for="(item,index) in option" @click='Chang(index)' v-show='f'>{{item}}</span>
					</div>
				</div>
			</div>
			<img src="@/assets/img/main.png" alt="">
		</header>
		<router-view :key='flag'></router-view>
	</div>	
</div>
</template>
<script>
	import globalData from '@/assets/js/global.js';
	export default{
		name:'Rta',
		data(){
			return{
				title:'实时监控',
				uid:this.$route.query.uid,       //当前页面接收到的设备id
				pid:this.$route.query.pid,       //项目id
				name:this.$route.query.name,     //设备名
				name1:this.$route.query.name1,     //项目名
				msg:'',               //sesstion
				option:[],            //当前项目下所有的设备名
				ids:[],               //当前项目下所有的设备id
				f:false,               //状态
				flag:1,
				ll:false,
			}
		},
		methods:{
			start(){
				$("#boxs")[0].scrollIntoView();
				$.post({url:globalData.host +'Project/GetDevList', data:{id:this.pid},xhrFields:{withCredentials:true}}).then((res)=>{
					console.log(res.data)
					for(var i=0;i<res.data.length;i++){
						// console.log(res.data[i].name)
						this.option.push(res.data[i].name)
					}
				})
			},
			loop(){
				mui.plusReady(function(){
        			plus.screen.lockOrientation("portrait-primary");
      			})
				this.$router.go(-2)
			},
			down(){                           //点击收放下拉菜单
				this.ll=!this.ll
				this.f=!this.f
			},
			Chang(n){                         //点击设备切换
				this.f=!this.f
				this.ll=!this.ll
				this.name=this.option[n]
				this.$router.replace({
					name:'Rtas',
					query:{
						pid:this.pid,
						uid:this.ids[n],
						name:this.name,
						name1:this.name1
					}
				})
				this.$router.go(0)
				this.flag++
				// alert(this.name)
			},
			// resize(){                         //强制横屏
			// 		let box=$("#boxs");
			// 		let width=$(window).width();//获取窗口宽度
			// 		let height=$(window).height();//获取窗口高度
			// 		let max=width>height ? width :height;
			// 		let min=width>height ? height :width;
			// 		box.css({'width':max+'px'});
			// }
		},
		created(){
			mui.init()                              //初始化mui框架
			let that=this
			mui.plusReady(function(){               //mui基座准备好之后 
        		plus.screen.lockOrientation("landscape-primary");     //横屏锁定
        		plus.key.addEventListener("backbutton",function(){    //基座返回按键监听事件
	        		plus.screen.unlockOrientation();                  //解锁
	        		plus.screen.lockOrientation("portrait-primary");  //锁竖屏
	        		that.$router.go(-1)                               //返回
	        		plus.key.removeEventListener("backbutton",function(){}); //移除监听事件
	      		},false);
      		})
			let msg1=localStorage.getItem(this.pid)                   //获取本地缓存
			let b=$.parseJSON(msg1)
			// console.log(b)
			let arr=new Array;
			let arr1=new Array;
			for(let i=0;i < b.length;i++){                           //遍历得到该项目下的设备相关信息
				if(b[i].id==this.uid){
					this.msg=b[i]
				}
				arr.push(b[i].name)                                  //缓存的设备名
				arr1.push(b[i].id)                                   //项目设备ID
			};
			// this.option=arr
			// console.log(this.option)
			this.ids=arr1
		},
		mounted(){
			// console.log(this.option)
			this.start()
			this.$router.push({
				name:'Rtas',
				query:{
					pid:this.pid,
					uid:this.uid,
					name:this.name,
					name1:this.name1
				}
			})
			$(function(){                                          //文字溢出处理
				let length_txt=6;
				if($("#sp").text().length>length_txt){
					$("#sp").text($("#sp").text().substring(0,length_txt))
					$("#sp").text($("#sp").text()+'...')
				}
			})
			// this.resize()
		},
		destoryed(){
			clearInterval(window.intre)
			window.intre=null
			// window.alert(null)
			// window.console.log(null)
		}
	}
</script>
<style scoped>
#farth{
	width:100vw;
	height:120vh;
}
#boxs{
	width: 100%;
	height: 100%;
}
/*@media screen and (orientation:portrait){
	#boxs{
		transform-origin:0 0;
		transform: rotate(90deg) translateY(-200%);
	}
}*/
header{
	width:100%;
	font-size: 16px;
	margin: 0;
	height: 40px;
	background: #7fd8a8;
	color: white;
	padding-top: 10px;
	/*overflow: hidden;*/
}
header > img:nth-of-type(1){
	width: 30px;
	height:30px;
	position: absolute;
	left:10px;
	top:10px;
}
header>span{
	display: inline-block;
	width: 120px;
	height: 30px;
	line-height: 30px;
	vertical-align: middle;
}
header > img:nth-of-type(2){
	width: 25px;
	height:25px;
	position: absolute;
	right:15px;
	top:13px;
}
header>div{
	width: 100%;
	margin:0 auto;
	text-align: center;
}
header>div span:first-child{
	vertical-align: top;
	display: inline-block;
	height: 30px;
	line-height: 30px;
}
#select{
	display: inline-block;
	height: 30px;
	line-height: 30px;
	max-width: 65%;
	position: relative;
}
#select p{
	margin: 0px;
	padding: 0px;
	text-indent: 0.2rem;
	text-align: left;
	overflow: hidden;
}
#select p img{
	width: 15px;
	height:15px;
	vertical-align: middle;
	margin-left: 3px;
}
#select p span{
	display: inline-block;
	max-width: 60vw;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.sel_down_box{
	position: absolute;
	z-index: 9999999;
	width: 100%;
	height:200px;
	overflow: hidden;
	overflow-y: scroll;
	background: #7fd8a8;
}
.sel_down_box span{
	display: block;
	text-indent:0.5rem;
	background: #7fd8a8;
	width: 100%;
	text-align: left;
	height: 30px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
#select span{
	font-size: 14px;
}
.cur{
	transform:rotate(180deg);
}
.new{
	transform: rotate(0deg);
}
</style>