<template>
  <div class="editProjectInfo">
		<div class="editProjectInfo_item">
			{{promptInfo}}
		</div>
		<div class="editProjectInfo_item">
			<div class="editProjectInfo_item_left">项目需求</div>
			<div class="editProjectInfo_item_right">
				<el-input style="width:90%" size="small" placeholder="请输入内容"></el-input>
			</div>
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
	min-height: 40px;
	margin: 10px auto;
	line-height: 40px;
	font-size: 16px;
	text-align: left;
}

.editProjectInfo_item_left{
	position: absolute;
	top: 0;
	left: 0;
	width: 10%;
	min-height: 40px;
	/* line-height: 40px; */
}

.editProjectInfo_item_right{
	position: absolute;
	top: 0;
	right: 0;
	width: 90%;
	min-height: 40px;
	/* line-height: 40px; */
}

@media screen and (max-width: 1366px){
  .eeditProjectInfo_spacing{
    margin: 30px auto;
  }
}

@media screen and (min-width: 1367px) and (max-width: 1600px){
  .editProjectInfo_spacing{
    margin: 55px auto;
  }
}

@media screen and (min-width: 1601px){
  .editProjectInfo_spacing{
    margin: 90px auto;
  }
}
</style>


