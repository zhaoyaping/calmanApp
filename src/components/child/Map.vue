<template>
	<div id="container">
		<div id="allMap"></div>
		<router-view/>
	</div>
</template>
<script>
	import globalData from '@/assets/js/global.js';
	export default{
		name:'Map',
		data(){
			return{
				maplist:'',
				maps:'',
				l:''
			}
		},
		methods:{
			map(){                                                         //初始化地图
				let map=new BMap.Map("allMap");                            //创建map实例
				map.centerAndZoom(new BMap.Point(113.533, 37.883),8);      //初始化地图，设置中心点坐标和地图级别
				map.setCurrentCity("yang");                                //设置地图显示的城市，此项是必须设置的
				map.enableScrollWheelZoom(true);                           //开启鼠标滚轮缩放
				this.maps=map            
			},
			paint(){                                                       //获取数据库数据并标注
				let p=this.maplist;                                        //保存数据
				let l=this.l                                               //数据长度
				let myIcon1=this.createIcon(1);                            //调用方法，创建自定义图标（1/2）为自定义参数创建不同图标
				let myIcon2=this.createIcon(2);
				for(let i=0;i<l;i++){
					let point=new BMap.Point(p[i].longitude,p[i].latitude);    //获取当前项目中的经纬度定点
					let id=p[i].id                                             //保存项目id
					let markers
					if(p[i].authority=="1"){                                   //判断是否为当前用户名下项目
						markers=new BMap.Marker(point,{icon:myIcon1});     //定义标注点及标注图片
						let that=this;
						markers.addEventListener("click",function(){          //添加点击事件，跳转项目详情页
							that.$router.push({name:'Details',query:{id:id}});//路由传参当前项目id
							});
					}else{
						markers=new BMap.Marker(point,{icon:myIcon2});
						markers.addEventListener("click",function(){
							globalData.myAlert("该项目为他人所有，您无权查看！",function(){})
						})                  
					}
					this.maps.addOverlay(markers);
					let label=new BMap.Label(i+1,{offset:new BMap.Size(14,5)});
					label.setStyle({
						color : "#FFF",
						backgroundColor:'transparent',//文本背景色
						borderColor:'transparent',//文本框边框色
						fontSize : "13px",
						height : "20px",
						lineHeight : "20px",
						fontFamily:"微软雅黑"
					});
					markers.setLabel(label);
				}
			},
			createIcon(n){                                                   //创建自定义标注图
				let make
				if(n==1){
					make=require("@/assets/img/mark1.png")                   //make引入此处文件
				}else if(n==2){
					make=require("@/assets/img/mark2.png");
				}
				let icon=new BMap.Icon(make,new BMap.Size(40,40),{anchor: new BMap.Size(20, 40),imageOffset:new BMap.Size(0,0)});                                                    //创建自定义地图标注
				return icon;
			}
		},
		mounted(){
			this.map();
			let that=this
			$.post({url:globalData.host + 'Project/GetMapList',xhrFields:{withCredentials:true}}).then((res)=>{ 
	        	if(res.status==1){
					that.maplist=res.data
	        		that.l=that.maplist.length                                  //将获取到的数据长度保存
	        		that.paint(); 
				}else if(res.status==0){
					globalData.myAlert(res.msg)
				}else if(res.status==-1){
					this.$router.push({name:'Login'})
				}                                              //调用方法，地图初始化
	      	})
		}
	}
</script>
<style scoped>
	#allMap{
		width:100vw;
		height: 100vh;
	}
</style>