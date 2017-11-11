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
		<div class="editProjectInfo_item" style="height:150px;">
			<div class="editProjectInfo_item_left">具体描述</div>
			<div class="editProjectInfo_item_right">
				<el-input type="textarea" style="width:90%;margin-top:8px;" :rows="6" placeholder="请输入内容"></el-input>
			</div>
		</div>
		<div class="editProjectInfo_item">
			<div class="editProjectInfo_itemHalf">
				<div class="editProjectInfo_itemHalf_left">项目日薪</div>
				<div class="editProjectInfo_itemHalf_right">
						<el-select placeholder="请选择" style="width:78%;" size="small">
							<el-option v-for="item in 10" :label="item" :value="item"></el-option>
						</el-select>
				</div>
			</div>
			<div class="editProjectInfo_itemHalf">
				<div class="editProjectInfo_itemHalf_left">项目工时</div>
				<div class="editProjectInfo_itemHalf_right">
						<el-select placeholder="请选择" style="width:78%;" size="small">
							<el-option v-for="item in 10" :label="item" :value="item"></el-option>
						</el-select>
				</div>
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
	height: 40px;
	margin: 10px auto;
	line-height: 40px;
	font-size: 16px;
	text-align: left;
}

.editProjectInfo_itemHalf{
	position: relative;
	float: left;
	width: 50%;
	min-height: 40px;
}

.editProjectInfo_item_left{
	float: left;
	width: 10%;
	min-height: 40px;
}

.editProjectInfo_item_right{
	float: left;
	width: 90%;
	min-height: 40px;
}

.editProjectInfo_itemHalf_left{
	float: left;
	width: 20%;
	min-height: 40px;
}

.editProjectInfo_itemHalf_right{
	float: left;
	width: 80%;
	min-height: 40px;
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


