<template>
    <div class="welcome">
      	Hello Vue!
    </div>
</template>
<script>
export default {
	name:'Hello',
	created(){
		this.$dialog({
			title:'提示',
			message:'欢迎使用~'
		})
	}
}
</script>
<style lang="scss">
	.welcome{
		text-align: center;
		padding: 100px 0px;
		font-size: 18px;
	}
</style>