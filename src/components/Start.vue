<template>
	<div>
		<h3>欢迎进入</h3>
		<h2>卡尔曼监控系统</h2>
	</div>
</template>
<script>
	import globalData from '@/assets/js/global.js'
	export default{
		data(){
			return{

			}
		},
		methods:{
			setCookie(statu) {
			    localStorage.setItem('statu',statu)
			},
			getCookie(name) {
			    let statu=localStorage.getItem('statu')
			    return statu;
  			}
		},
		mounted(){
			let getCook=this.getCookie('loginStatus')
			let that=this
			// console.log(getCook)
			let id = setTimeout(function(){ 
				if (getCook==null) {
					that.setCookie('1');
					that.$router.push({name:'Guide'})
				}else{
					that.setCookie('2');
					that.$router.push({name:'Login'})
				} 
        	},3000); 
		}
	}
</script>
<style scoped>
	div{
		width: 100%;
		height:70vh;
		background: white;
		color:green;
		text-align: center;
		padding-top:30vh;
	}
</style>
