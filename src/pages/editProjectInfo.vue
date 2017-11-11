<template>
  <div class="editProjectInfo">
		<div class="editProjectInfo_item">
			{{promptInfo}}
		</div>
		<div class="editProjectInfo_item">
			<div class="editProjectInfo_item_left"></div>
			<div class="editProjectInfo_item_right"></div>
		</div>
  </div>
</template>

<script>
export default {
	data(){
		return {
			promptInfo:"发布需求后，专员将在2小时内为您推荐知名设计师为您工作。如您对设计师的服务不满意，可以无条件退款。"
		}
	}
}
</script>

<style>
.editProjectInfo{
  min-width: 900px;
	padding: 10px 0;
  margin: 0 auto;
  width: 70%; 
}

.editProjectInfo_item{
	position: relative;
	height: 40px;
	margin: 10px auto;
	line-height: 40px;
	font-size: 16px;
	text-align: left;
}
</style>


