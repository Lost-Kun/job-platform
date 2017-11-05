<template>
  <div class="talentDetail">
    <div class="talentDetail_basicInfo">
			<div class="talentDetail_basicInfo_left">
				<div class="talentDetail_basicInfo_left_top">
					<div class="talentDetail_basicInfo_left_iconBox">
						<img class="talentDetail_basicInfo_left_iconImg" :src="talentInfo.HeadImageUrl"/>
					</div>
				</div>
				<div class="talentDetail_basicInfo_left_bottom">
					{{talentInfo.Name}}
				</div>
			</div>
			<div class="talentDetail_basicInfo_center">
				<div class="talentDetail_basicInfo_center_title">
					<div class="talentDetail_basicInfo_center_title_company">{{talentInfo.Job_company}}</div>
					<div class="talentDetail_basicInfo_center_title_position">{{talentInfo.Job_position}}</div>
					<div class="talentDetail_basicInfo_center_title_experience">{{talentInfo.Job_experience}}年</div>
				</div>
				<div class="talentDetail_basicInfo_center_rate">
					<div class="talentDetail_basicInfo_center_orderedNumber">
						已接单{{talentInfo.Ordered_number}}次
					</div>
					<el-rate
						v-model="talentInfo.Rating"
						disabled
						show-score
						text-color="#ff9900"
						score-template="{value}">
					</el-rate>
					<div class="talentDetail_basicInfo_center_rateNumber">({{rateNumber}}人评价)</div>
				</div>
				<div class="talentDetail_basicInfo_center_partTimePosition">
					<div class="talentDetail_basicInfo_center_partTimePosition_item">
						运营
					</div>
					<div class="talentDetail_basicInfo_center_partTimePosition_item">
						新媒体运营
					</div>
				</div>
			</div>
			<div class="talentDetail_basicInfo_right">
				<div class="talentDetail_basicInfo_right_item">日薪：{{talentInfo.Wage}}元/天</div>
				<div class="talentDetail_basicInfo_right_item">
					<a class="talentDetail_basicInfo_right_button">联系专家</a>
					<a class="talentDetail_basicInfo_right_fullButton">下单预约</a>
				</div>
			</div>
		</div>
    <div class="talentDetail_detailedInfo">
			<div class="talentDetail_detailedInfo_skill">

			</div>
			<div class="talentDetail_detailedInfo_experience">

			</div>
			<div class="talentDetail_detailedInfo_rate">

			</div>
		</div>
  </div>
</template>

<script>
export default {
	data(){
			return{
				talentInfo:{
					Name:'余温散尽ぺ',
					HeadImageUrl:'../static/images/baima.jpg',
					Job_company:'上海微创软件股份有限公司',
					Job_position:'.net开发工程师',
					Job_experience:12,
					Ordered_number:6,
					Rating:3.1,
					Wage:800
				},
				rateNumber:2345
			}
	},
	created(){

	}
}
</script>

<style>
.talentDetail{
  min-width: 1100px;
  margin: 0 auto;
  width: 80%; 
}

.talentDetail_basicInfo{
	position: relative;
	margin-top: 10px;
	height: 120px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.24), 0 0 6px 0 rgba(0,0,0,.08);
}

.talentDetail_basicInfo_left{
	position: absolute;
	top: 0;
	left: 0;
	width: 150px;
	bottom: 0;
}

.talentDetail_basicInfo_left_top{
	height: 70%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.talentDetail_basicInfo_left_iconBox{
	width: 60px;
	height: 60px;
	border-radius: 30px;
	overflow: hidden;
	border: 1px solid #C8C8E8;
}

.talentDetail_basicInfo_left_iconImg{
	width: 62px;
	height: 62px;
	margin-top: -1px;
	margin-left: -1px;
}

.talentDetail_basicInfo_left_bottom{
	width: 92%;
	height: 30%;
	margin: 0 auto;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.talentDetail_basicInfo_center{
	position: absolute;
	top: 0;
	left: 150px;
	right: 200px;
	bottom: 0;
}

.talentDetail_basicInfo_center_title{
	height: 30%;
  font-size: 16px;
  font-weight: bold;
}

.talentDetail_basicInfo_center_title_company{
	margin-top: 20px;
  float: left;
  max-width: 400px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.talentDetail_basicInfo_center_title_position{
  float: left;
  margin: 20px 20px 0 20px;
  max-width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.talentDetail_basicInfo_center_title_experience{
	margin-top: 20px;
  float: left;
  max-width: 40px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.talentDetail_basicInfo_center_rate{
	height: 35%;
	width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.talentDetail_basicInfo_center_orderedNumber{
	font-size: 14px;
	margin: -2px 30px 0 10px;
	color: #989DA2;
}

.talentDetail_basicInfo_center_rateNumber{
	font-size: 14px;
	margin: -2px 10px 0 20px;
	/* color: #989DA2; */
}

.talentDetail_basicInfo_center_partTimePosition{
	height: 35%;
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
}

.talentDetail_basicInfo_center_partTimePosition_item{
	padding: 0 5px;
	color: #989DA2;
	font-size: 13px;
	border: 1px solid #989DA2;
	border-radius: 4px;
	margin-right: 8px;
}

.talentDetail_basicInfo_right{
	position: absolute;
	top: 0;
	right: 0;
	width: 200px;
	bottom: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  font-size: 15px;
}

.talentDetail_basicInfo_right_item{
  width: 100%;
  font-size: 15px;
  font-weight: bold;
  margin: 5px auto;
}

.talentDetail_basicInfo_right_button{

}

.talentDetail_basicInfo_right_fullButton{
	
}

.talentDetail_detailedInfo{
	margin: 20px auto;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.24), 0 0 6px 0 rgba(0,0,0,.08);
}

.talentDetail_detailedInfo_skill{
	min-height: 165px;

}

.talentDetail_detailedInfo_experience{
	min-height: 165px;
}

.talentDetail_detailedInfo_rate{
	min-height: 165px;
}
</style>


