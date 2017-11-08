<template>
	<div class="projectDetail">
    <div class="projectDetail_basicInfo">
			<div class="projectDetail_basicInfo_left">
				<div class="projectDetail_basicInfo_left_top">{{projectInfo.Name}}</div>
				<div class="projectDetail_basicInfo_left_center">
					<div class="projectDetail_basicInfo_left_center_wage">日薪：{{projectInfo.Wage}}元/天</div>
					<div class="projectDetail_basicInfo_left_center_length">预计工期：{{projectInfo.Length}}天</div>
				</div>
				<div class="projectDetail_basicInfo_left_bottom">发布者：{{employerInfo.Name}}</div>
			</div>
			<div class="projectDetail_basicInfo_right">
				<div class="projectDetail_basicInfo_right_item">总价：{{projectInfo.Wage*projectInfo.Length}}元</div>
				<div class="projectDetail_basicInfo_right_item">
					<a class="projectDetail_basicInfo_right_button projectDetail_button_full">立即投递</a>
					<span class="projectDetail_basicInfo_right_span">已有{{deliveriesNumber}}人投递</span>
				</div>
			</div>
		</div>
		<div class="projectDetail_descripInfo">
			<div class="projectDetail_descripInfo_descrip">
				<div class="projectDetail_descripInfo_title">项目描述</div>
				<div class="projectDetail_descripInfo_content" v-html="projectInfo.Desp"></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  data(){
		return {
			projectInfo:{
				Project_ID: 1,
				Name: '消费信息分享评论网站搭建',
				Desp: '需要开发一个消费信息分享+用户评论的网站，主要是手机端访问.比如有些商品有便宜打折的信息，展示这个商品，同时用户可以点评。',
				Wage: 800,
				Length: 20,
				State: 0,
				Employer_ID: 1
			},
			employerInfo:{
				Name:'张天雪'
			},
			deliveriesNumber: 234
		}
	}
}
</script>

<style>
.projectDetail{
	position: relative;
	min-width: 1100px;
	margin: 0 auto;
	width: 80%;
}

.projectDetail_basicInfo{
	position: relative;
	margin-top: 15px;
	height: 120px;
	box-shadow: 0 2px 4px 0 rgba(0,0,0,.24), 0 0 6px 0 rgba(0,0,0,.08);
}

.projectDetail_basicInfo_left{
	position: absolute;
	top: 0;
	left: 30px;
	right: 260px;
	bottom: 0;
	text-align: left;
}

.projectDetail_basicInfo_left_top{
	margin-top: 10px;
	height: 30%;
	line-height: 30px;
  font-size: 16px;
  font-weight: bold;
}

.projectDetail_basicInfo_left_center{
	height: 28%;
	font-size: 15px;
}

.projectDetail_basicInfo_left_center_wage{
  float: left;
  max-width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.projectDetail_basicInfo_left_center_length{
	float: left;
  margin: 0 20px;
  max-width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.projectDetail_basicInfo_left_bottom{
	height: 30%;
	font-size: 15px;
}

.projectDetail_basicInfo_right{
	position: absolute;
	top: 0;
	right: 0;
	width: 250px;
	bottom: 0;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-content: center;
	font-size: 15px;
}

.projectDetail_basicInfo_right_item{
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  margin: 10px auto;
}

.projectDetail_basicInfo_right_button{
  display: inline-block;
  width: 70px;
  height: 25px;
  line-height: 25px;
  border-radius: 3px;
  border: 1px solid #5A9AD5;
  color: #5A9AD5;
  cursor: pointer;
  margin-right: 10px;
  font-size: 14px;
  font-weight: normal;
}

.projectDetail_basicInfo_right_button:hover{
  color: #118EF7;
  border: 1px solid #118EF7;
}

.projectDetail_button_full{
  background-color: #5A9AD5;
  color: #ffffff;
}

.projectDetail_button_full:hover{
  color: #ffffff;
  background-color: #50A5F5;
  border: 1px solid #50A5F5;
}

.projectDetail_basicInfo_right_span{
  font-size: 14px;
  color: #D5D5D5;
}

.projectDetail_descripInfo{
	margin: 15px auto;
	padding-bottom: 5px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.24), 0 0 6px 0 rgba(0,0,0,.08);
}

.projectDetail_descripInfo_descrip{
	min-height: 300px;
}

.projectDetail_descripInfo_title{
	height: 50px;
	line-height: 50px;
	text-align: left;
	padding-left: 20px;
	font-size: 16px;
	font-weight: bold;
}

.projectDetail_descripInfo_content{
	width: 90%;
	margin: 10px auto 30px auto;
	font-size: 15px;
	line-height: 1.8;
	text-align: left;
}
</style>


