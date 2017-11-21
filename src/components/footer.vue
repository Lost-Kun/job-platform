<template>
	<div class="footer">
		<div class="footer_nav">
			<a @click="searchTalents">浏览人才</a>
			<span>|</span> 
			<a @click="searchProjects">发现项目</a>
			<span>|</span>
			<a @click="contactWorker">联系专员</a>
		</div>
		<div class="footer_companyInfo">
			<a>© 2017 北京XX科技有限公司 京ICP备17056420号-1</a>
		</div>
	</div>
</template>

<script>
export default {
	methods:{
		searchTalents(){
			this.$router.push('/homePage/talent');
		},
		searchProjects(){
			this.$router.push('/homePage/project');
		},
		contactWorker(){
			this.$contactWoker();
		}
	}
}
</script>

<style>
.footer{
  	width: 100%;
	height: 60px;
	background-color: #202020;
	color: #ffffff;
	font-size: 14px;
}

.footer_nav{
	height: 28px;
	display: flex;
	justify-content: center;
	align-items: flex-end;
}

.footer_companyInfo{
	height: 28px;
	margin-top: 4px;
	display: flex;
	justify-content: center;
	align-items: flex-start;
}

.footer_nav a{
	cursor: pointer;
}

.footer_nav span{
	margin: 2px 3px;
}
</style>


