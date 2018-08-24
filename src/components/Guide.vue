<template>
	<div id="box">
		<v-touch v-on:swipeleft='left()' v-on:swiperight='right()' :class="[choose?'Left':'Right']"></v-touch>
	</div>
</template>
<script>
	import globalData from '@/assets/js/global.js'
	export default{
		data(){
			return{
				choose:true
			}
		},
		methods:{
			left(){
				if($('.Left').length>0){
					this.choose=!this.choose
				}else if($('.Right').length>0){
					this.$router.push({name:'Login'})
				}
			},
			right(){
				if ($('.Right').length>0) {
					this.choose=!this.choose
				}else{
					return
				}
			}
		}
	}
</script>
<style scoped>
	div{
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}
	.Left{
		width: 100%;
		height:100%;
		background: url(../assets/img/guide1.jpg) center center no-repeat;
		background-size: cover;
	}
	.Right{
		width: 100%;
		height:100%;
		background: url(../assets/img/guide2.jpg) center center no-repeat;
		background-size: cover;
	}
</style>