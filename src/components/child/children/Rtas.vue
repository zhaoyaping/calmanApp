<template>
		<div class="historywarp" id="bos">

			<div id="top">
				<div id="myGif" v-show='f' style="width:100%;height:100%;background:rgba(255,255,255,0.8);z-index:1000;text-align: center;position:relative;top:150px;">
					<img src="@/assets/img/1.gif" style="width:30px;position:absolute;top:0px;opacity:0.5;left:48%;background:#fff;border-radius:10px;">
					<p style="position:absolute;top:50px;color:#767b76;width:20%;left:40%;text-align:center;font-size:14px;">加载...</p>
				</div>
				<div id="title">
					<p style="font-size:18px; color:green ;font-weight:500 ;text-align:center;margin:10px auto"><span>{{name1}}{{name}} </span><button @click='history()'>历史数据</button></p>
				</div>
				<p style="margin-top:10px">
					<span v-for="(items,index) in top" :class="[(index==0||index==1)&&type=='a' ?'Line':'next']">{{items.txt}}: <span style="color:green;" :id='items.column'></span> {{items.dw}}</span>
					<!-- 遍历top部数据，给每条数据加样式    显现实时数据的标签绑定id -->
				</p>
			</div>
			<h5 v-show='k'>暂无更多数据</h5>
			<div id="box">
				<img id="img" :src="'http://calman.jctmj.net'+data.img" alt="" style="width:80%; margin:0 auto;">
				<span id="left" @click='left(type)'></span>
				<span id="right" @click='right(type)'></span>
				<div id="float-warp">
					<p v-for="(items,index) in sign">
						<span :style='{position:"absolute",top:(items["t_y"]-0)*n+"px",left:(items["t_x"]-0)*n+"px"}'>
						<!-- 每个span绝对定位，将获取到的距离乘以比率即为在原图上的位置  （-80*n）是他原图测量位置有偏差 -->
							{{items.txt}}:
							<span style="color:green;" :id='items.column'></span>
							{{items.dw}}
						</span>
					</p>
				</div>
			</div>
			<div id="bottom" style="margin-bottom:60px;">
				<ul>
					<li class="test">缸号</li>
					<li class='txt'>缸温<br>℃</li>
					<li class='txt'>次级电压</li>
					<li class='txt'>爆震水平</li>
				</ul>
				<div style="width:100%">
					<p id="bot-Til">
						<span v-for="n in (num/2)" v-if="type=='a'" style="font-size:12px">{{2*n-1}}</span>
						<span v-for="n in (num/2)" v-if="type=='b'" style="font-size:12px">{{2*n}}</span>
					</p>
					<div id="bot-num" style="color:#33a933 ;font-size:16px">
						<p><span class="spam" v-for="(items,index) in gw" :style="{display:'inline-block',width:widths+'px',height:'100px'}" :id='items.column'></span></p><!-- :style="{display:'inline-block',width:widths[index],height:'200px'}",backgroundColor:'#086256'-->
						<p><span v-for="items in dy" :id='items.column' style="font-size:12px"></span></p>
						<p><span v-for="items in bz" :id='items.column' style="font-size:12px"></span></p>
					</div>
				</div>
			</div>
		</div>
</template>
<script>
	import globalData from '@/assets/js/global.js'
	export default{
		data(){
			return{
				wendu:[],                                  //实时温度
				widths:'',                                 //canvas宽度
				uid:this.$route.query.uid,                 //设备id
				pid:this.$route.query.pid,                 //项目id
				name:this.$route.query.name,               //设备名
				name1:this.$route.query.name1,             //项目名
				data:'',                                   //第一次请求获取到所有数据
				top:'',                                    //top中的数据
				bz:'',                                     //爆震水平数据
				gw:[],                                     //缸温数据
				dy:'',                                     //次级电压数据
				sign:'',                                   //图片标注
				width1:0,                                  //图片展示宽度
				width2:0,                                  //图片本身宽度
				n:1,                                       //原图与展示图大小比率
				num:'',									   //缸数
				type:'a',                                  //正面
				intre:'',
				f:false,
				k:false
			}
		},
		methods:{
			history(){                                     //跳转折线图
				clearInterval(window.intre)
				window.intre=null
				this.$router.push({name:'History',query:{name:this.name,name1:this.name1,id:this.uid}})
			},
			loadd(){                                       //第一次请求
				let date={'id':this.uid,'type':this.type}
				let width1=$("#img").width()
				let screenHeight = $(window).height();
				let screenWidth = $(window).width();
				let maxWidth = screenHeight > screenWidth ? screenHeight : screenWidth;
				// this.width1=width1                         //获取展示图宽度
				this.width1 = maxWidth * 0.95 * 0.8
				let that=this
				// $.post({url:globalData.host + 'Device/test',data:date,xhrFields:{withCredentials:true}}).then()//数据分组
				$.post({url:globalData.host + 'Device/Current',data:date,xhrFields:{withCredentials:true}}).then((res)=>{
					that.f=false
					if(res.status==1){
						this.data=res.data                 //保存数据
						this.addd()                        //引用addd方法获取原图宽度及比例
						this.top=res.data.tab.top          //保存top部数据
						this.gw=res.data.tab.gw            //保存缸温数据
						this.bz=res.data.tab.bz            //保存爆震数据
						this.dy=res.data.tab.dy            //保存电压数据
						this.sign=res.data.sign            //保存图标注释数据
						this.num=res.data.cylinder-0       //保存缸数
						this.getData('C')                  //执行第二次请求，获取实时数据
						window.intre=setInterval(function(){that.getData('C')},2000)//加定时器，两秒请求一次实时数据
					}else if(res.status==0){
						clearInterval(window.intre)
						window.intre=null
						this.k=true
					}else if(res.status==-1){
						clearInterval(window.intre)
						window.intre=null
						mui.plusReady(function(){
        					plus.screen.lockOrientation("portrait-primary");
      					})
						this.$router.push({name:'Login'})
					}
				})
			},
			care(){                                         //温度计绘制
				this.widths=$('.spam').width()              //获取父元素宽度
				let widthBar=(this.widths)*0.3              //温度计宽度
				this.ofst=-(this.widths-widthBar)/2       //轴线偏移量
				for (let i = 0; i < this.gw.length; i++) {
					let id=this.gw[i]['column']                //获取父元素ID
					// this.widths.push($('#'+this.gw[i]['column']).width())//获取宽度
					if(!document.getElementById(id)){            //父元素span存在时执行
						return
					}
					let myChart = this.$echarts.init(document.getElementById(id))  //初始化图表插件
					let data = [20];
		    		let xMax =650;                                   //最大值
					let axisColor = '#fff';                          //轴线颜色
					let option = {                                   //图标配置項
						grid: {                                      //图表位置
						    left: '0',
						    right: '0',
						    bottom: '25%',
						    top:'10%' ,
						    containLabel: true
						},
						yAxis: [{                                     //Y轴信息
							min:0,
							max:650,
							position:'left',
							offset:this.ofst,
							axisTick: {
								show: true,
								inside:true,
							},
							axisLabel: {
								show:false,
								inside:true,
							},
							axisLine:{
								lineStyle:{
								    color:'black',
								}
							},
							splitLine: {
								show: false,
							},
							splitNumber :10,
							scale:true,
						}],
						xAxis: [{                                     //X轴信息
							type: 'category',
							axisLine: {
								show: false
							},
						}],
						series: [                                     //数据信息
							{
								type: 'bar',
								barWidth: widthBar,
								itemStyle: {
									normal: {
								        color: 'rgba(220,220,220,0.8)',
								    }
								},
								barGap: '-100%',
								data: data.map(function(d) {
								    return xMax
								}),
							},
							{
								type: 'bar',
								barWidth: widthBar,
								label: {
								    normal: {
								        color:'green',
								        show: true,
								        position: 'bottom',
								        formatter: function(o){
								            return o.value;
								        },
								    }
								},
								data: [{
								    value: this.wendu[i],
								    itemStyle: {
										normal: {
											barBorderRadius: [0, 0, 0, 0],
											color:'rgba(176,255,64,0.6)'
											// color:'#B1FE40',
										}
									}
								}],
							}
						]
					};
					myChart.setOption(option);                        //绘制图表
				}
			},
			left(n){                                        //点击左侧按钮事件
				if (n=='a') {
					return
				} else {
					this.type='a'
					clearInterval(window.intre)
					window.intre=null
					this.loadd()
				}
			},
			right(n){                                       //点击右侧按钮事件
				if (n=='a') {
					this.type='b'
					clearInterval(window.intre)
					window.intre=null
					this.loadd()
				} else {
					return
				}
			},
			addd(){                                        //获取实时图片所对应图片
				let img=new Image();                       //实例化image对象
				img.src='http://calman.jctmj.net'+this.data.img   //规划此对象的路径  注意http://localhost在打包时需可加可不加，本地运行需删除
				let that=this
				img.onload=function(){                     //图片加载完成后执行
					let width2=img.width                   //获取原图宽度
					that.width2=width2
					that.n=that.width1/that.width2         //获取比例
				}
			},
			getData(n){                                    //二次请求获取实时数据
				let date={'type':n}                        //订阅实时监控
				this.wendu=[]

				// $.ajaxSetup({async : false});
				$.ajax({type:'post',url:globalData.host + 'Device/GetData',data:date,xhrFields:{withCredentials:true}}).then((res)=>{
					let AllArr=res.data
					if(res.status == 1) {
						for(let key in AllArr) {           //遍历获取到的数据
							for(let i in AllArr[key]) {
								if(key=='gw'){             //判断是否为缸温

									this.wendu.push(AllArr[key][i])  //若果是缸温就添加到数据组
									// let a=parseInt(Math.random()*650)
									// this.wendu.push(a)
								}else{
                  if(key=='sign'){
                    if(i == 'ymzxqwzzl'){AllArr[key][i]=AllArr[key][i]*0.01}
                    if(i == 'ptfwzl'){AllArr[key][i] = AllArr[key][i]*0.01}
                    if(i == 'jyyl'){AllArr[key][i] = AllArr[key][i]/2}
                    if(i == 'wglfdjjyyl'){AllArr[key][i] = AllArr[key][i]/2}
                    if(i == 'wlzyqckyl'){AllArr[key][i] = AllArr[key][i]*0.1}
                    if(i == 'kqjqwd'){AllArr[key][i] = AllArr[key][i]*0.1}
                    if(i == 'jqzgkqyl'){AllArr[key][i] = AllArr[key][i]*0.1}
                    if(i == 'tezcwljqk'){AllArr[key][i] = AllArr[key][i]*0.1}
                    if(i == 'teycpqk'){AllArr[key][i] = AllArr[key][i]*0.1}
                  };
                  if(key=='top'){
                    if (i == 'fdjpjglyz') { AllArr[key][i] = AllArr[key][i]*0.01}
                    if (i == 'jldy') {AllArr[key][i] = AllArr[key][i]*10}
                    if (i == 'fdjzs') {AllArr[key][i] = AllArr[key][i]/2}
                    if (i == 'jldpl') {AllArr[key][i] = AllArr[key][i]*0.01}
                    if (i == 'qtyll') {AllArr[key][i] = AllArr[key][i]*1.6}
                    if (i == 'rywd') {AllArr[key][i] = AllArr[key][i]*0.1}
                    if (i == 'ryyl') {AllArr[key][i] = AllArr[key][i]/2-95}
                    if (i == 'ryfyc') {AllArr[key][i] = AllArr[key][i]*0.1}n
                    if (i == 'qtyll') {AllArr[key][i] = AllArr[key][i]*1.6}
                    if (i == 'jyyl') {AllArr[key][i] = AllArr[key][i]/2}
                    if (i == 'rybl') {AllArr[key][i] = AllArr[key][i]*0.1}
                    if (i == 'sjfdjdhzs') {AllArr[key][i] = AllArr[key][i]*0.1}
                    if (i == 'jylqqyc') {AllArr[key][i] = AllArr[key][i]/2}
                    if (i == 'jqzgkqll') {AllArr[key][i] = AllArr[key][i]*1.6}
                    if (i == 'xdcdy1') {AllArr[key][i]= AllArr[key][i]/2}
                  }
									$("#"+i).text(AllArr[key][i]);//将获取到的数据添加到对应的标签内
								}
							}
						}
						this.care()

					}else if(res.status==0){
						clearInterval(window.intre)
						window.intre=null
						globalData.myAlert(res.msg)
					}else if(res.status==-1){
						clearInterval(window.intre)
						window.intre=null
						mui.plusReady(function(){
        					plus.screen.lockOrientation("portrait-primary");
      					})
						this.$router.push({name:'Login'})
					}
				});
			}
		},
		mounted(){
			this.f=true
			this.loadd()            //加载数据
		},
		destoryed(){
			clearInterval(window.intre)
			window.intre=null
		},
	}
</script>
<style scoped>
	.historywarp{
		font-size: 8px;
		font-weight: 900;
	}
	.historywarp #top{
		width:100%;
		margin: 10px auto;
		padding: 0px;
		text-align: center;
		position: relative;
	}
	#top p{
		display: inline-block;
		width:90%;
		text-align: left;
		position: relative;
	}
	#top #title p span{
		display: inline-block;
		width: 60%;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	#top #title button{
		width: 100px;
		height:30px;
		border:none;
		font-size: 16px;
		color: white;
		border-radius: 5px;
		background: green;
		position: absolute;
		/*right:0px;*/
	}
	.next{
		display: inline-block;
		width:25%;
		text-align:center;
		line-height:20px;
		border:1px solid #e2e2e2;
		box-sizing: border-box;
	}
	.Line{
		display: inline-block;
		width: 50%;
		text-align:center;
		line-height:20px;
		border:1px solid #e2e2e2;
		box-sizing: border-box;
	}
	#box{
		width: 95%;
		margin: 0 auto;
		position: relative;
	}
	#box img{
		width: 100%;
		height: 100%;
	}
	#box #float-warp{
		position:absolute;
		width: 80%;
		left:10%;
		overflow: visible;
		top:0px;
	}
	#box #float-warp p{
		margin: 0 auto;
		padding:0px;
	}
	#box #float-warp p span{
		font-size:6px;
		white-space:nowrap;
	}
	#bottom{
		display: flex;
		width:90%;
		margin: 10px auto;
		padding: 0px;
	}
	#bottom #bot-Til{
		width: 100%;
		height:35px;
		display: flex;
		text-align: center;
		margin: 0px;
		padding: 0px;
	}
	#bottom #bot-Til span{
		flex:1;
		line-height: 35px;
		border:1px solid #e2e2e2;
		box-sizing: border-box;
	}
	#bottom ul{
		list-style:none;
		width:40px;
		margin: 0;
		padding: 0;
		text-align: center;
	}
	#bottom ul li:nth-child(2){
		height:100px;
		padding-top:30px;
	}
	#bottom ul .txt{
		height:75px;
		margin: 0 auto;
		display: block;
		padding: 10px 15px;
		border:1px solid #e2e2e2;
		box-sizing: border-box
	}
	#bottom ul .test{
		width: 40px;
		text-align:center;
		height:35px;
		line-height: 35px;
		border:1px solid #e2e2e2;
		box-sizing: border-box;
	}
	#bot-num{
		margin: 0px;
	}
	#bot-num p {
		display: flex;
		margin: 0;
	}
	#bot-num p span{
		flex: 1;
		height: 75px;
		display: inline-block;
		text-align:center;
		line-height:75px;
		border:1px solid #e2e2e2;
		box-sizing: border-box;
	}
	#left{
		position:absolute;
		z-index: 9;
		top:48%;
		left:0;
		width: 32px;
		height: 32px;
		background: url(../../../assets/img/left.png) no-repeat;
	}
	#right{
		position:absolute;
		z-index: 9;
		top:48%;
		right:0;
		width: 32px;
		height: 32px;
		background: url(../../../assets/img/right.png) no-repeat;
	}
</style>
