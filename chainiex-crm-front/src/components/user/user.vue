<template>
	<div>欢迎{{name}}</div>
</template>

<script>
export default{
	data(){
		return{
			name:localStorage.getItem('username')?localStorage.getItem('username'):null,
		}
	}
}
</script>

<style>
</style>