<template>
  <div class="editProjectInfo">
		<div class="editProjectInfo_item editProjectInfo_spacing">
			{{promptInfo}}
		</div>
		<div class="editProjectInfo_item editProjectInfo_spacing">
			<div class="editProjectInfo_item_left">项目需求</div>
			<div class="editProjectInfo_item_right">
				<el-input style="width:90%" size="small" placeholder="请输入内容"></el-input>
			</div>
		</div>
		<div class="editProjectInfo_item editProjectInfo_spacing" style="height:150px;">
			<div class="editProjectInfo_item_left">具体描述</div>
			<div class="editProjectInfo_item_right">
				<el-input type="textarea" style="width:90%;margin-top:8px;" :rows="6" placeholder="请输入内容"></el-input>
			</div>
		</div>
		<div class="editProjectInfo_item editProjectInfo_spacing">
			<div class="editProjectInfo_itemHalf">
				<div class="editProjectInfo_itemHalf_left">项目日薪</div>
				<div class="editProjectInfo_itemHalf_right">
						<el-select placeholder="请选择" style="width:76%;" size="small">
							<el-option v-for="item in 10" :label="item" :value="item"></el-option>
						</el-select>
				</div>
			</div>
			<div class="editProjectInfo_itemHalf">
				<div class="editProjectInfo_itemHalf_left">项目工时</div>
				<div class="editProjectInfo_itemHalf_right">
						<el-select placeholder="请选择" style="width:76%;" size="small">
							<el-option v-for="item in 10" :label="item" :value="item"></el-option>
						</el-select>
				</div>
			</div>
		</div>
		<div class="editProjectInfo_item editProjectInfo_spacing">
			<div class="editProjectInfo_itemHalf">
				<div class="editProjectInfo_itemHalf_left">您的姓名</div>
				<div class="editProjectInfo_itemHalf_right">
					<el-input style="width:76%" size="small" placeholder="请输入内容"></el-input>
				</div>
			</div>
		</div>
		<div class="editProjectInfo_item editProjectInfo_spacing">
			<div class="editProjectInfo_itemHalf">
				<div class="editProjectInfo_itemHalf_left">联系方式</div>
				<div class="editProjectInfo_itemHalf_right">
					<el-input style="width:76%" size="small" placeholder="请输入内容"></el-input>
				</div>
			</div>
		</div>
		<div class="editProjectInfo_item editProjectInfo_spacing">
			<div class="editProjectInfo_itemHalf">
				<div class="editProjectInfo_itemHalf_left">验证码</div>
				<div class="editProjectInfo_itemHalf_right">
					<el-input style="width:76%" size="small" placeholder="请输入内容"></el-input>
				</div>
			</div>
		</div>
		<div class="editProjectInfo_submitBox editProjectInfo_spacing">
			<a class="editProjectInfo_submitBox_button">发布需求</a>
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
	margin: 18px auto;
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

.editProjectInfo_submitBox{
	position: relative;
	height: 40px;
	margin: 18px auto; 
	padding: 10px 0;
	display: flex;
	align-items: center;
	justify-content: center;
}

.editProjectInfo_submitBox_button{
	display: inline-block;
	text-align: center;
	width: 120px;
	height: 35px;
	line-height: 35px;
	border-radius: 5px;
	border: 1px solid #5A9AD5;
	background-color: #5A9AD5;
	color: #ffffff;
	cursor: pointer;
}

.editProjectInfo_submitBox_button:hover{
  color: #ffffff;
  background-color: #50A5F5;
  border: 1px solid #50A5F5;
}

@media screen and (max-width: 1366px){
  .eeditProjectInfo_spacing{
    margin: 18px auto;
  }
}

@media screen and (min-width: 1367px) and (max-width: 1600px){
  .editProjectInfo_spacing{
    margin: 32px auto;
  }
}

@media screen and (min-width: 1601px){
  .editProjectInfo_spacing{
    margin: 50px auto;
  }
}
</style>


