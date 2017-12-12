<template>
	<div>
		<list class="Layout-left"></list>
		<router-view class="Layout-right"></router-view>
	</div>
</template>

<script>
import leftlist from './../components/comm/left'

export default {
	data(){
		return{
			
		}
	},
	components:{
		list:leftlist
	}
}
</script>

<style scoped>
.Layout-left{
	height: 100%;
	position: fixed;
	top: 0px;
	left: 0px;
	width: 220px;
	background: #324157;
}
.Layout-right{
	margin-left:230px;
	padding: 50px;
}
</style>