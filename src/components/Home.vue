<template>
	<div>
		<div>
			<router-view/>
		</div>
		<ul class="nav_box" :style="{top:toop+'px'}"><!-- -->
			<li id="routeMap" @click='Show(0)' :class="{active:choose[0]}">
				<span class="icon_box icon_index"></span>
				<span>首页</span>
			</li>
			<li id="routeMonitor" @click='Show(1)' :class="{active:choose[1]}">
				<span class="icon_box icon_mointor"></span>
				<span>监控</span>
			</li>
			<li id="routeSetting" @click='Show(2)' :class="{active:choose[2]}">
				<span class="icon_box icon_setting"></span>
				<span>设置</span>
			</li>
		</ul>
	</div>
</template>
<script>
	export default{
		name:'Home',
		data(){
			return{
				toop:localStorage.getItem('top'),
				top:'',
				date:[
					{name:'Map',title:'首页',src1:'require("@/assets/img/img/64.png")',src2:'require("@/assets/img/04.png")'},
					{name:'Monitor',title:'监控',src1:'require("@/assets/img/0.png")',src2:'require("@/assets/img/65.png")'},
					{name:'Setting',title:'设置',src1:'require("@/assets/img/66.png")',src2:'require("@/assets/img/01.png")'}
				],
				choose:[true,false,false]
			}
		},
		methods:{
			Show(index){
				let name=this.date[index].name
				for(let i = 0 ; i < this.choose.length ; i++){
					this.choose[i] = false;
				}
				this.$set(this.choose, index, true);
				this.$router.push({name:name})
			}
		},
		mounted(){
			let path = (this.$route.path).substr(1);
			// console.log(path)
			let index = $('.nav_box li').index($('#route'+path));
			for(let i = 0 ; i < this.choose.length ; i++){
				this.choose[i] = false;
			}
			this.$set(this.choose, index, true);		
		}
	}
</script>
<style scoped>
	ul{
		background: white;
		display: flex;
		position: fixed;
		/*bottom: 0px;*/
		width: 100%;
		margin: 0px;
		padding:0px;
		border-top: 1px solid #bbbbbb;
	}
	li{
		float: left;
		list-style:none;
		width: 33.3%;
		text-align: center;
		font-size: 14px;
		position: relative;
		height:57px;
		padding-bottom:3px;
	}
	li:hover{
		cursor:pointer;
	}
	.icon_box{
		display: block;
		width: 90%;
		height: 27px;
		margin: 5px auto auto auto;
	}
	.icon_index{
		background:url('../assets/img/64.png') no-repeat center;
		background-size:26px auto;
	}
	.icon_mointor{
		background: url('../assets/img/0.png') no-repeat center;
		background-size:30px auto;
	}
	.icon_setting{
		background: url('../assets/img/66.png') no-repeat center;
		background-size:26px auto;
	}
	li.active .icon_index{
		background-image: url('../assets/img/04.png');
	}
	li.active .icon_mointor{
		background-image: url('../assets/img/65.png');
	}
	li.active .icon_setting{
		background-image: url('../assets/img/01.png');
	}
	li.active span{
		color:#28883a;
	}
</style>