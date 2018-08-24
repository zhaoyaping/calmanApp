<template>
	<div id="box">
		<header>
			<input type="search" placeholder="请输入项目名" v-model="search" @keyup.enter="Search()" id="search">
		</header>
		<div id="list-warp">
			<p>卡尔曼智能电站监控平台</p>
		</div>
		
		<v-touch id="bos">
			<ul id="list" style="margin-bottom:80px;">
				<li v-for="(items,index) in monitor"> 
					<div>
						<p><span class="sps" @click="more(items.id)">{{items.name}}</span><img :class='{img:true,cur:ok[index]}' @click='show(index,items,items.name)' src="@/assets/img/03.png" alt=""></p>
						<!-- <p v-show='k'>没有更多数据</p> -->
						<ul v-show="index==i&& ok[index]">
							<li v-for="(item,index) in items.device">
								<span class="sp">{{item.name}}</span>  <!--  @click='device(item.id,items.id,item.name)'-->      
								<span>&nbsp;&nbsp;今日发电&nbsp;&nbsp;{{item.jtfdl}}KW/h&nbsp;</span>
								<img v-if='item.zx==1' src="@/assets/img/0002.png" alt="">
								<!--根据返回数据中设备状态呈现不同图片-->
								<img v-if='item.zx==0' src="@/assets/img/68.png" alt="">
								<span><img src="@/assets/img/67.png" alt="" @click='next(item.id,items.id,item.name,items.name)'></span>
							</li>
							<li style="text-align:center;color:green" @click="more(items.id)" v-show="items.device.length>=10">查看更多</li>
						</ul>
					</div>
				</li>
				<li v-show='k' style="line-height:40px;color:#656060">没有更多数据</li>
			</ul>
			<div v-show='f'  style="width:100%;background:rgba(255,255,255,0.8);z-index:1000;text-align: center;position:relative;border:none;">
				<img src="@/assets/img/1.gif" style="width:10%;position:absolute;top:0px;opacity:0.5;left:45%;background:#fff;border-radius:10px;">
				<p style="position:absolute;top:50px;color:#767b76;width:60%;left:20%;text-align:center;font-size:14px;">加载中...</p>
			</div>
		</v-touch>
		<!-- <div id="myGif" v-show='f' style="width:100%;height:100%;background:rgba(255,255,255,0.8);z-index:1000;text-align: center;position:fixed;left:0;top:0;">
			<img src="@/assets/img/1.gif" style="width:10%;position:absolute;top:5%;opacity:0.5;left:45%;background:#fff;border-radius:10px;">
		</div> -->
	</div>
</template>
<script>  
	import globalData from '@/assets/js/global.js';
	export default{
		name:'Monitor',
		data(){
			return{
				search:'',
				monitor:'',                      //保存获取到的数据
				p:true,
				i:'',                            //自定义参数关联p和ul
				ok:[],
				b:'',                            //保存点击的状态点一次展开，再点收起
				n:1,                             //保存页数 
				choose:true,                     //防止短时间内多次请求
				f:false,
				k:false,
				// l:false
			}
		},
		methods:{
			handleScroll(){                      //上拉刷新事件
  				let h=$(window).height();
                let c = $(window).scrollTop();
                let wh = $('#box').height();
                let l=wh-h+60
                // console.log(wh)
                // console.log(h)
                // console.log(l)
                // console.log(c)

                if (c>=l&&l>0&&this.monitor.length>=10){
                	this.n=1+this.n
                    this.top(this.n)
                } 
			},
			show(index,msg){                     //点击倒三角展开列表
				let id=msg.id
				let arr=JSON.stringify(msg.device)
				// console.log(msg)
				localStorage.setItem(id,arr)
				let asd=localStorage.getItem(id)
				this.i=index;
				this.$set(this.ok ,index, !this.ok[index])
				$(".img").removeClass('cur').eq(ele).addClass('cur')
				let ele=$(".img")[index]
				$('.img').removeClass('cur')
				$(ele).addClass('cur');   

			},
			more(id){                            //跳转项目详情
				this.$router.push({name:'Details',query:{id:id}})
			},
			top(n){                             //上拉刷新请求
				window.addEventListener('touchend', this.handleScroll)
				if(this.choose){
                    this.choose=!this.choose
					// this.n=1+this.n
					// console.log(this.n)
					let data={'curPage':this.n}          //页面页数
					let that=this
					this.f=true
					$.post({url:globalData.host + 'Project/GetMyList',data:data,xhrFields:{withCredentials:true}}).then((res)=>{
						this.f=false
						if(res.status==1){
							if(that.n==1){
								// console .log(res)
								that.monitor=res.data;
								for (let i = 0; i < that.monitor.length; i++) {
									that.ok[i]=false                        //所有状态为隐藏
								}
							}else{
								for (let i = res.data.length - 1; i >= 0; i--) {
									that.monitor.push(res.data[i])
								}
							}
							this.choose=!this.choose
						}else if(res.status==0){
							this.k=true
							window.removeEventListener('touchend',  this.handleScroll)
						}else if(res.status==-1){
							this.$router.push({name:'Login'})
						}
					})
				}
				
			},

			next(n1,n2,name,name1){               //跳转实时监控
				this.$router.push({name:'Rta',query:{uid:n1,pid:n2,name:name,name1:name1}})
			},
			Search(){                             //搜索框事件
				// let re1=/^(?!.*[%\'\"?])/ ;
				// let re1=/^[A-Za-z0-9\u4e00-\u9fa5]+$/ ;
				this.f=true
				// if(!re1.test(this.user)){
			 //      		globalData.myAlert("项目名格式错误")
			 //      		this.f=false
			 //    }else{
				var ser=this.search.replace(/['"]/g);
				// console.log(ser)
				// if(ser.indexOf("'") = -1){
					this.upload({'key':ser})
				// }
			},
			upload(n){                           //加载数据
		 		window.addEventListener('touchend', this.handleScroll)
				let that=this
				that.f=true
				$.post({url:globalData.host + 'Project/GetMyList',data:n,xhrFields:{withCredentials:true}}).then((res)=>{
					that.f=false
					if(res.status==1){
						this.k=false;
						that.monitor=res.data;
						for (let i = that.monitor.length - 1; i >= 0; i--) {
							that.ok[i]=false                        //所有状态为隐藏
						}
						let item=JSON.stringify(res.data)
					}else if(res.status==0){
						window.removeEventListener('touchend',  this.handleScroll)
						this.k=true
						that.monitor=''
					}else if(res.status==-1){
						this.$router.push({name:'Login'})
					}
				})
			}
		},
		mounted(){
			this.upload(0)
			if(window.intre){
				clearInterval(window.intre)
				window.intre=null
			}
			
			// mui.init()
			// mui.plusReady(function(){
   //      		plus.key.removeEventListener("backbutton",function(){});
   //    		})
		},
		destroyed(){
			window.removeEventListener('touchend',this.handleScroll)
		}
	}
</script>
<style scoped>
	/*.sps{
		display: inline-block;
    	height:30px;
    	padding-top: 10px;
		width:160px;
		white-space: nowrap;
		text-overflow: ellipsis;
		-o-text-overflow:ellipsis;
		overflow: hidden;
	}
	.sp{
		display: inline-block;
    	height:30px;
    	padding-top: 10px;
		width:85px;
		white-space: nowrap;
		text-overflow: ellipsis;
		-o-text-overflow:ellipsis;
		overflow: hidden;
	}*/
	header{
		width: 100%;
		height: 60px;
		background: #7fd8a8
	}
	header input{
		width: 90%;
		height: 40px;
		text-indent: 2rem;
		outline: none;
		border:none;
		border-radius: 8px;
		margin: 10px auto 0px;
		background:white url(../../assets/img/search.png) no-repeat 10px center;
		background-size:1rem;
	}
	/* 头部结束 */
	#list-warp p{
		margin:0px;
		font-size: 18px;
		color: green;
		line-height:40px;
		padding-top: 60px;
		background: url(../../assets/img/logo.png) no-repeat center;
		background-size: 100px 40px;
	}
	/* logo标题结束 */
	#list{
		margin:0px;
		padding: 0px;
		list-style: none;
		width: 100%
	}
	#list li{
		width: 100%;
		border-top:1px solid #e2e2e2;
	}
	#list li div{
		border-bottom:6px solid #e2e2e2; 
	}
	#list li div p{
		width:90%;
		padding: 0px 5% 0px 5%;
		margin:0px auto;
		text-align: left;
		color: green;
		position: relative;
		line-height: 45px;
	}
	#list li div p span{
		display: inline-block;
		width: 90%;
		white-space: nowrap;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
		overflow: hidden;
		vertical-align: middle;
	}
	#list li div p img{
		width: 15px;
		height: 10px;
		position: absolute;
		right:20px;
		top:20px;
		transform:rotate(180deg)
	}
	#list li div ul{
		list-style:none;
		margin: 0px;
		padding:0px;
	}
	#list li div ul li {
		width: 85%;
		padding: 0px 10% 0px 5%;
		margin:0px auto;
		text-align: left;
		position: relative;
		line-height: 45px;
	}
	#list li div ul li>img{
		width: 12px;
		height: 12px;
	}
	#list li div ul li span:nth-of-type(1){
		font-size: 14px;
		color: black;
		display: inline-block;
		width: 40%;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		vertical-align: middle;
	}
	#list li div ul li span:nth-of-type(2){
		font-size: 14px;
		color: #c2c2c2;
	}
	#list li div ul li span:nth-of-type(3){
		position: absolute;
		right:20px;
	}
	#list li div ul li span img{
		width: 10px;
		height: 15px;
		position: relative;
	}
	#list li div p img.cur{
		transform: rotate(0deg);
	}
</style>