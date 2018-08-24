<template>
<div id="farth">
	<div id="boxs">
		<header>
			<img src="@/assets/img/loop.png" alt="" @click='loop'>
			{{name}}
			<img src="@/assets/img/main.png" alt="">
		</header>
		<p id="p1">历史数据折线图</p>
		<div v-show='k'  style="width:100%;height:100%;background:rgba(255,255,255,0.8);z-index:1000;text-align: center;position:relative;top:60px;">
			<img src="@/assets/img/1.gif" style="width:30px;position:absolute;top:5%;opacity:0.5;left:48%;background:#fff;border-radius:10px;">
			<p style="position:absolute;top:10%;color:#767b76;width:20%;left:40%;text-align:center;font-size:14px;">加载中...</p>
		</div>
		<p id="p2"><b>————</b> {{name1}}{{name}}</p>
		<div id="main" style="weight:100vh;height:500px;margin: 0 auto;">
			<p style="margin:0 auto; margin-top:50px ;color:#656060" v-show='f'>暂无更多数据</p>
		</div>
	</div>
</div>
</template>
<script>
	import globalData from '@/assets/js/global.js'
	export default{
		data(){
			return{
				name:this.$route.query.name,                         //设备名
				name1:this.$route.query.name1,                       //项目名
				id:this.$route.query.id,                             //设备id
				parameter: [],
            	parameter1: [],
            	parameter2: [],
            	parameter3: [],
            	parameter4: [],
            	parameter5: [],
            	parameter6: [],
            	str:'',
            	inte:'',
            	f:false,
            	k:false
			}
		},
		methods:{
			loop(){                                                 //返回事件
				clearInterval(this.inte)
				this.$router.go(-1);
			},
			current(){                                              //加载数据
				let d=new Date();
				let h = d.getHours(); 
				let m = d.getMinutes(); 
				let se = d.getSeconds(); 
				this.str=(h<10 ? "0"+ h : h)+':'+(m<10 ? "0" + m : m)+':'+(se<10 ? "0" +se : se);
			},
			mycharts(){
				let date = {'id' : this.id}, columnArr = [];
				this.k=true
				$.post({url:globalData.host + 'Device/History', data:date,xhrFields:{withCredentials:true}}).then((res)=>{
					// console.log(res)
					this.k=false                                                 //一次请求成功
					if(res.status == 1){
						// if(res.msg=="")
							this.parameter = res.data.hname
							// console.log(this.parameter)
		                    for (let i = 0; i < res.data.hname.length; i++) {        
		                        columnArr[i] = res.data.hname[i].column;
		                    }
		                    // console.log(this.parameter)
		                    let parameter0 = []
		                    let parameter1 = []
		                    let parameter2 = []
		                    let parameter3 = []
		                    let parameter4 = []
		                    let parameter5 = []
		                    // 遍历拿到的数据，拿出数据
		                    if(res.data.data.length==0){                 //没有历史数据
		                    	for(let i=0;i<30;i++){
		                    		parameter0.push(0)
		                    		this.parameter1=parameter0
		                    		parameter1.push(0)
		                    		this.parameter2=parameter1
		                    		parameter2.push(0)
		                    		this.parameter3=parameter2
		                    		parameter3.push(0)
		                    		this.parameter4=parameter3
		                    		parameter4.push(0)
		                    		this.parameter5=parameter4
		                    		parameter5.push(0)
		                    		this.parameter6=parameter5
		                    	}
		                    	// console.log(this.parameter1)
		                    	// return
			                }else{                                      //有历史数据
			                    for (let i = 0; i < res.data.data.length; i=i+2) {
			                    // for (let i = 0; i < 30; i++) {
			                    	// console.log(res.data.data.length)
			                        parameter0.push(res.data.data[i][res.data.hname[0].column])
			                        this.parameter1 = parameter0
			                        
			                        parameter1.push(res.data.data[i][res.data.hname[1].column])
			                        this.parameter2 = parameter1
			                        
			                        parameter2.push(res.data.data[i][res.data.hname[2].column])
			                        this.parameter3 = parameter2

			                        parameter3.push(res.data.data[i][res.data.hname[3].column])
			                        this.parameter4 = parameter3

			                        parameter4.push(res.data.data[i][res.data.hname[4].column])
			                        this.parameter5 = parameter4

			                        parameter5.push(res.data.data[i][res.data.hname[5].column])
			                        this.parameter6 = parameter5
			                    }

		                    }
			                this.current()
							let myChart = this.$echarts.init(document.getElementById('main'))         
					        let option = {                                                            //图表配置设置
					            grid: {                                                               //定位图表
					                left:'30%',
					                top:'30%'
					            },
					            legend: {                                                             //图例
					            	show:true,
					                data:[this.parameter[0].txt, this.parameter[1].txt, this.parameter[2].txt, this.parameter[3].txt, this.parameter[4].txt, this.parameter[5].txt]
					            },
					            xAxis:[                                                               //X轴信息
						            {
						                axisLabel:{rotate:30,interval:4},
						                axisLine:{onZero: false,lineStyle:{color:'green'}},
						                type: 'category',
						                boundaryGap: true,
						                data:[
						                    "-60s","-58s","-56s","-54s","-52s","-50s","-48s","-46s","-44s","-42s","-40s","-38s","-36s","-34s","-32s","-30s","-28s","-26s","-24s","-22s","-20s","-18s","-16s","-14s","-12s","-10s","-8s","-6s","-4s","-2s",this.str,
						                ]
						            },
								    {
			                            type: 'category',
			                            boundaryGap: true,
			                            show:false,
			                            data: (function (){
			                                let res = [];
			                                let len = 10;
			                                while (len--) {
			                                    res.push(10 - len - 1);
			                                }
			                                return res;
			                            })()
			                        }
		                        ],
					            yAxis: [                                                              //Y轴信息
					                {
					                	axisLabel:{
					                		rotate:90,
					                		show:true,
					                	},
					                	axisLine: {show:true},
					                	axisTick: {show:true},
					                    type: 'value',
					                    scale: true,
					                    name:this.parameter[0].txt+'/℃',
					                    // name:'袁冰洁',
					                    nameLocation:'end',
					                    max:100,
					                    min:0,
					                    nameRotate:90,
					                    boundaryGap: [0.1, 0.1]
					                },
					                {
					                	axisLabel:{
					                		rotate:90,
					                	},
					                    type: 'value',
					                    scale: true,
					                    name:this.parameter[1].txt+'/KPa',
					                    // name:'牛哦彭真',
					                    nameLocation:'end',
					                    nameRotate:90,
					                    max:500,
					                    min:0,
					                    position: 'left',
					                    offset: 30,
					                    boundaryGap: [0.2, 0.2]
					                },
					                {
					                	axisLabel:{
					                		rotate:90,
					                	},
					                    type: 'value',
					                    scale: true,
					                    name:this.parameter[2].txt+'/KW',
					                    nameLocation:'end',
					                    max:2000,
					                    min:0,
					                    nameRotate:90,
					                    position: 'left',
					                    offset: 60,
					                    boundaryGap: [0.3, 0.3]
					                },
					                {
					                	axisLabel:{
					                		rotate:90,
					                	},
					                    type: 'value',
					                    scale: true,
					                    name:this.parameter[3].txt+'/%',
					                    nameLocation:'end',
					                    nameRotate:90,
					                    max:100,
					                    min:0,
					                    position: 'left',
					                    offset: 90,
					                    boundaryGap: [0.4, 0.4]
					                },
					                {
					                	axisLabel:{
					                		rotate:90,
					                	},
					                    type: 'value',
					                    scale: true,
					                    name:this.parameter[4].txt+'/%',
					                    nameLocation:'end',
					                    nameRotate:90,
					                    max:100,
					                    min:0,
					                    position: 'left',
					                    offset: 120,
					                    boundaryGap: [0.5, 0.5]
					                },
					                {
					                	axisLabel:{
					                		rotate:90,
					                	},
					                    type: 'value',
					                    scale: true,
					                    name:this.parameter[5].txt+'/%',
					                    nameLocation:'end',
					                    nameRotate:90,
					                    max:100,
					                    min:0,
					                    position: 'left',
					                    offset: 150,
					                    boundaryGap: [0.6, 0.6]
					                }
					            ], 
					            series: [                                                             //数据配置
					                {
					                    name: this.parameter[0].txt,
					                    smooth:0,               //平滑曲线
					                    symbol:'rectangle',     //去除标注圆点
					                    type:'line',
					                    yAxisIndex: 0,
					                    label:{
					                    	normal:{
					                    		show:true
					                    	}
					                    },
					                    data:(this.parameter1)
					                },
					                {
					                    name: this.parameter[1].txt,
					                    smooth:0,
					                    type:'line',
					                    symbol:'rectangle',
					                    yAxisIndex: 1,
					                    label:{
					                    	normal:{
					                    		show:true
					                    	}
					                    },
					                    data:(this.parameter2)
					                },
					                {
					                    name: this.parameter[2].txt,
					                    smooth:0,
					                    symbol:'rectangle',
					                    type:'line',
					                    yAxisIndex: 2,
					                    label:{
					                    	normal:{
					                    		show:true
					                    	}
					                    },
					                    data:(this.parameter3)
					                },
					                {
					                    name: this.parameter[3].txt,
					                    type:'line',
					                    symbol:'rectangle',
					                    smooth:0,
					                    yAxisIndex: 3,
					                    label:{
					                    	normal:{
					                    		show:true
					                    	}
					                    },
					                    data:(this.parameter4)
					                },
					                {
					                    name: this.parameter[4].txt,
					                    type:'line',
					                    symbol:'rectangle',
					                    smooth:0,
					                    yAxisIndex: 4,
					                    label:{
					                    	normal:{
					                    		show:true
					                    	}
					                    },
					                    data:(this.parameter5)
					                },
					                {
					                    name: this.parameter[5].txt,
					                    type:'line',
					                    symbol:'rectangle',
					                    smooth:0,
					                    yAxisIndex: 5,
					                    label:{
					                    	normal:{
					                    		show:true
					                    	}
					                    },
					                    data:(this.parameter6)
					                }
					            ]
					        };
				        	app.count = 14;
				        	let that=this
				        	that.inte=setInterval(function (){
				        		that.current()
					        	// let that = this
	                        	let data = {'type': 'H'}
	                        	// 请求实时数据
	                       		 $.post({url:globalData.host + 'Device/GetData', data:data,xhrFields:{withCredentials:true}}).then((res) => {
		                        	if (res.status == 1) {  
		                            	let axisData =that.str;
		                            	let data0 = option.series[0].data
		                            	let data1 = option.series[1].data
			                            let data2 = option.series[2].data
			                            let data3 = option.series[3].data
			                            let data4 = option.series[4].data
			                            let data5 = option.series[5].data

			                            data0.shift();
			                            data0.push(res.data[columnArr[0]]);
			                            // data0.push(parseInt(Math.random()*100));
			                            data1.shift();
			                            data1.push(res.data[columnArr[1]]);
			                            // data1.push(parseInt(Math.random()*500));
			                            data2.shift();
			                            data2.push(res.data[columnArr[2]]);
			                            // data2.push(parseInt(Math.random()*2000));
			                            data3.shift();
			                            data3.push(res.data[columnArr[3]]);
			                            // data3.push(parseInt(Math.random()*100));
			                            data4.shift();
			                            data4.push(res.data[columnArr[4]]);
			                            // data4.push(parseInt(Math.random()*100));
			                            data5.shift();
			                            data5.push(res.data[columnArr[5]]);
			                            // data5.push(parseInt(Math.random()*100));
			                            option.xAxis[0].data.pop();
			                            option.xAxis[0].data.push(axisData);                     // 重新配置图表信息,获取实时数据
			                            // console.log(data0)
			                            // console.log(data1)
			                            // console.log(data2)
			                            // console.log(data3)
			                            // console.log(data4)
			                            // console.log(data5)
			                            myChart.setOption(option);
		                        	}else if(res.status==0){
										clearInterval(that.inte)
										globalData.myAlert(res.msg)
									}else if(res.status==-1){
										mui.plusReady(function(){
        									plus.key.removeEventListener("backbutton",function(){});
        									plus.screen.lockOrientation("portrait-primary");
      									});
										that.$router.push({name:'Login'})
									}
	                        	})
	                    	}, 2000);
	                    // if(res.msg=="执行成功"){
				   			myChart.setOption(option);
	                    // }else{
	                    	// return
	                    // }
					}else if(res.status==0){
						clearInterval(this.inte)
						this.f=true
					}else if(res.status==-1){
						mui.plusReady(function(){
        					plus.key.removeEventListener("backbutton",function(){});
        					plus.screen.lockOrientation("portrait-primary");
      					});
						that.$router.push({name:'Login'})
					}
				})
				
			}
		},
		mounted(){ 
			this.mycharts()
			mui.plusReady(function(){
        		plus.key.removeEventListener("backbutton",function(){});
      		})
      		window.clearInterval(window.intre)
			window.intre=null
		}
	}
</script>
<style scoped>
	#farth{
		width:100vw;
		height:100vh;
	}
	#boxs{
		width: 100%;
		height: 100%;
	}
	header{
		width: 100%;
		font-size: 16px;
		margin: 0;
		line-height:50px;
		height: 50px;
		background: #7fd8a8;
		color: white;
	}
	header img:nth-of-type(1){
		width:30px;
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
	#p1{
		font-size: 18px;
		margin-bottom: 5px;
	}
	#p2{
		margin: 0 10% 0 30%;
	    font-size: 12px;
	    width: 65%;
	    text-align: right;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    overflow: hidden;
	}
</style>