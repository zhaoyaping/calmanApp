<template>
	<div id="box">
		<header>
			<img src="@/assets/img/loop.png" alt="" @click='loop'>
			{{title}}
			<img src="@/assets/img/main.png" alt="">
		</header>
		<img :src="'http://calman.jctmj.net'+data.cover" alt="" style="width:100%;height:100%;">
		<div class="Details">
			<p>项目名称：  <span class="sps">{{data.name}}</span></p>
			<p>所属客户：  <span class="sps">{{data.user}}</span></p>
			<p>项目地址：  <span class="sps">{{data.address}}</span></p>
			<p>总装机容量：<span class="sps">{{data.allload}}</span></p>
			<p>在线功率：  <span class="sps">{{data.power}}</span></p>
		</div>
		<h5 v-show='f' style="color:#656060">暂无更多数据</h5>
		<v-touch id="device">
			<div id="list">     
				<!--items是原始数据数组,而item 是数组中每个迭代元素的指代别名-->
				<p v-for="item in device">
					<span @click='details(item.id,item.name)'class="sp">{{item.name}}</span>
					<span>
						今日发电&nbsp;&nbsp;{{item.jtfdl}}KW/h&nbsp;&nbsp;&nbsp;
						<img v-if="item.zx==1" src="@/assets/img/0002.png">
						<img v-else="item.zx==0" src="@/assets/img/68.png">
					</span>
					<img src="@/assets/img/67.png" alt="" @click='next(item.id,item.name)'>
				</p>
				<p v-show='k' style="line-height:50px;"><span style="display:inline-block;width:100%;text-align:center;color:#656060">暂无更多数据</span></p>
			</div>
			<div v-show='M'  style="width:100%;height:100%;background:rgba(255,255,255,0.8);z-index:-1000;text-align: center;position:relative;">
				<img src="@/assets/img/1.gif" style="width:10%;position:absolute;top:0px;opacity:0.5;left:45%;background:#fff;border-radius:10px;">
				<p style="position:absolute;top:80px;color:#767b76;width:30%;left:35%;text-align:center;font-size:14px;border-bottom:none;display:inline-block;">加载中...</p>
			</div>    
		</v-touch>	
	</div>
</template>

<script>
	import globalData from '@/assets/js/global.js';
	export default{
    	name:'Details',
		data(){
			return{
				title:'项目详情',
				id:this.$route.query.id,      //获取到路由传的参数
				data:'',                      //后台获取到的数据
				device:[],                    //该项目下的所有设备
				n:0,                          //数据过多时分页的页数（指当前）
				choose:true,                  //添加变量控制用户短时间内不能进行多次请求
				f:false,
				k:false,
				M:false,
			}
		},
		methods:{
			handleScroll(){
  				var h=$(window).height();                   //窗口高度
                var c = $(window).scrollTop();              //滚动高度
                var wh = $('#box').height();                //文档高度
                let l=wh-h+60
 				// console.log("容器高度",h)
 				// console.log("滚动高度",c)
 				// console.log("数据高度",wh)
 				// console.log("差",l)
                if (c>=l&&l>0&&this.device.length>=10){     //如果滚动高度大于差值且数据中设备超过十个
                    this.more(this.n)                       //添加新数据
                } 
			},
			loop(){                   //返回方法
				//点击返回上一页
				this.$router.go(-1);
			},
			details(n,name){         //跳转设备详情
				this.$router.push({name:'Device',query:{uid:n,pid:this.id,name:name,name1:this.data.name}})
			},
			next(n,name){            //跳转实时监控
				this.$router.push({name:'Rta',query:{uid:n,pid:this.id,name:name,name1:this.data.name}})
			},
			more(n){                 //向后台发请求
				if(!this.k){
					this.M=true
				}
				if(this.choose){
                    this.choose=!this.choose //变量致反，禁止短时间内用户多次上拉发请求
					this.n=++this.n          //页数增加
					// console.log(this.n)
					let date={'id':this.id,'curPage':this.n}        //项目ID和页数
					let that=this
					$.post({url:globalData.host +'Project/Details', data:date,xhrFields:{withCredentials:true}}).then((res)=>{
						this.M=false
						if(res.status==1){
							if(res.data.device.length==0){
								this.k=true
								this.choose=!this.choose
							}else if(that.n==1){
								that.data=res.data
								that.device=res.data.device        //保存所有设备
								let a=that.id
								let arr1=JSON.stringify(that.device)
								localStorage.setItem(a,arr1) 
								let arr=localStorage.getItem(a)
							}else{           //如果页数大于2，则设备数据添加到之前数组中
								for (var i = 0; i <res.data.device.length; i++) {
									that.device.push(res.data.device[i])
									let a=that.id
									let arr1=JSON.stringify(that.device)
									localStorage.setItem(a,arr1)      //设置本地缓存
									let arr=localStorage.getItem(a)
								}
							}
							this.choose=!this.choose
						}else if(res.status==0){
							this.f=true
							window.removeEventListener('touchend',  this.handleScroll)
						}else if(res.status==-1){
							this.$router.push({name:'Login'})
						}
					})	
				}
				
			}
		},
		mounted(){
			this.more(0)
			window.addEventListener('touchend', this.handleScroll)
		},
		destroyed(){
			window.removeEventListener('touchend',this.handleScroll)
		}
	}
</script>
<style scoped>
	/* .sps{
		display: inline-block;
	    	line-height:15px;
	    	padding-top: 10px;
		width:160px;
		white-space: nowrap;
		text-overflow: ellipsis;
		-o-text-overflow:ellipsis;
		overflow: hidden;
	}
	.sp{
		display: inline-block;
	    	line-height:15px;
	    	text-align: left;
		width:100px;
		white-space: nowrap;
		text-overflow: ellipsis;
		-o-text-overflow:ellipsis;
		overflow: hidden;
	} */
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
.Details{
	width: 90%;
	margin:0 auto;
	text-align: left;
}
.Details p{
	font-size: 16px;
	border-bottom: 1px solid  #d2d2d2;
	display: inline-block;
	width: 100%;
	padding: 0px ;
	margin:0px;
	line-height:45px;
	vertical-align: middle;
	white-space: nowrap;
	text-overflow: ellipsis;
	-o-text-overflow: ellipsis;
	overflow: hidden;
}
#device{
	background: #f1f1f1;
	padding-top:10px;
	margin-bottom:80px;
}
#device div{
	background: white;
	
}
#device div p{
	list-style: none;
	height: 50px;
	margin: 0;
	padding:0;
	width: 90%;
	position: relative;
	margin:0 auto;
	border-bottom: 3px solid #f1f1f1;
	display: flex;
}
#device div p span{
	line-height: 45px;
}
#device div p span:nth-of-type(1){
	width: 40%;
	text-align: left;
	white-space: nowrap;
	text-overflow: ellipsis;
	-o-text-overflow: ellipsis;
	overflow: hidden;
}
#device div p span:nth-of-type(2){
	text-indent: 1rem;
	/*float: left;*/
	color: #d2d2d2;
	font-size: 14px;
}
#device div p span img{
	width: 12px;
	height:12px;
}
#device div p>img{
	width: 12px;height: 15px;
	position: absolute;
	right: 12px;
	top:18px;
}
</style>