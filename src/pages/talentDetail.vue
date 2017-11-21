<template>
  <div class="talentDetail">
    <div class="talentDetail_basicInfo">
			<div class="talentDetail_basicInfo_left">
				<div class="talentDetail_basicInfo_left_top">
					<div class="talentDetail_basicInfo_left_iconBox">
						<img class="talentDetail_basicInfo_left_iconImg" :src="talentInfo.HeadImgUrl||defultHeadImage"/>
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
						{{talentInfo.Position}}
					</div>
				</div>
			</div>
			<div class="talentDetail_basicInfo_right">
				<div class="talentDetail_basicInfo_right_item">日薪：{{talentInfo.Wage}}元/天&nbsp;&nbsp;</div>
				<div class="talentDetail_basicInfo_right_item" style="margin-top:10px;">
					<a class="talentDetail_basicInfo_right_button" @click="contactWorker">联系专家</a>
					<a @click="orderTalent(talentInfo)" :class="['talentDetail_basicInfo_right_button','talentDetail_button_full',talentInfo.State === 1?'talentDetail_button--disable':'']">{{talentInfo.State === 1?'已被预约':'下单预约'}}</a>
				</div>
			</div>
		</div>
    <div class="talentDetail_detailedInfo">
			<div class="talentDetail_detailedInfo_skill">
				<div class="talentDetail_detailedInfo_title">掌握技能</div>
				<div class="talentDetail_detailedInfo_content" v-html="talentInfo.Skills"></div>
			</div>
			<div class="talentDetail_detailedInfo_experience">
				<div class="talentDetail_detailedInfo_title">项目经验</div>
				<div class="talentDetail_detailedInfo_content" v-html="talentInfo.Projects"></div>
			</div>
			<div class="talentDetail_detailedInfo_rate">
				<div class="talentDetail_detailedInfo_title">用户评价</div>
				<div class="talentDetail_detailedInfo_content">
					<div class="talentDetail_detailedInfo_rate_item" v-for="rateItem in rateList">
						<div class="talentDetail_detailedInfo_rate_item_left">
							<div class="talentDetail_detailedInfo_rate_item_left_icon">
								<img class="talentDetail_detailedInfo_rate_item_left_iconImg" :src="rateItem.HeadImgUrl||defultHeadImage"/>
							</div>
						</div>
						<div class="talentDetail_detailedInfo_rate_item_center">
							<div class="talentDetail_detailedInfo_rate_item_center_name">
								{{rateItem.Name}}
							</div>
							<div class="talentDetail_detailedInfo_rate_item_center_comment">
								{{rateItem.Comment}}
							</div>
						</div>
						<div class="talentDetail_detailedInfo_rate_item_right">
							<div class="talentDetail_detailedInfo_rate_item_right_riqi">
								{{rateItem.Riqi}}
							</div>
							<div class="talentDetail_detailedInfo_rate_item_right_rating">
								<el-rate
									v-model="rateItem.Rating"
									disabled
									show-score
									text-color="#ff9900"
									score-template="{value}">
								</el-rate>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
export default {
	data(){
			return{
				talentId: null,
				defultHeadImage:'../static/images/defaultHeadImg.jpg',
				talentInfo:{},
				rateNumber:0,
				rateList:[],
      			isLogin:false,
				userType: null
			}
	},
	created(){
		this.talentId = this.$route.query.id;
    	this.checkLogin();
   	    window.bus.$on('checkLogin',this.checkLogin);
		this.getTalentInfo();
		this.getRatingList();
	},
	methods:{
		//检验用户登录
		checkLogin(){   
			let strCookie = document.cookie;
			let arrCookie = strCookie.split(";");
			let userId = '';
			let userType = '';
			for(let i = 0; i< arrCookie.length; i++){
				let cookieItemArr = arrCookie[i].replace(/(^\s*)|(\s*$)/g,'').split('=');
				if(cookieItemArr[0] && cookieItemArr[0] === 'userId'){
				userId = cookieItemArr[1];
				}
				if(cookieItemArr[0] && cookieItemArr[0] === 'userType'){
				userType = cookieItemArr[1];
				}
			}
			if(userId !== '' && userType !== ''){
				this.isLogin = true;
				this.userType = parseInt(userType);
			}else{
				this.isLogin = false;
				this.userType = null;
			}
		},
		getTalentInfo(){
			this.$http.post('/talent/getEmployeeInfo',{employeeId: this.talentId}).then((res) => {
				let result = res.data;
				if(result.success){
					this.talentInfo = result.data;
					this.talentInfo.Skills = result.data.Skills.replace(/\n/g,'<br>');
					this.talentInfo.Projects = result.data.Projects.replace(/\n/g,'<br>');
				}
			})
		},
		getRatingList(){
			this.$http.post('/talent/getRatingList',{employeeId: this.talentId}).then((res) => {
				let result = res.data;
				if(result.success){
					this.rateList = result.data;
				}
			})
		},
		contactWorker(){
			this.$contactWoker();
		},
		orderTalent(talentInfo){
			if(talentInfo.State === 0){
				if(this.isLogin){
					if(this.userType === 0){
						this.$alert('该账号为设计师，请登录雇主账号',{lockScroll:false});
						return;
					}
					this.$router.push({
						path:'/homePage/editProjectInfo',
						query:{
						id:talentInfo.Employee_ID
						}
          			});
				}else{
					this.$login();
				}
			}
		}
	}
}
</script>

<style>
.talentDetail{
	position: relative;
  	min-width: 1100px;
  	margin: 0 auto;
  	width: 80%; 
}

.talentDetail_basicInfo{
	position: relative;
	margin-top: 15px;
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

.talentDetail_basicInfo_right_button:hover{
  color: #118EF7;
  border: 1px solid #118EF7;
}

.talentDetail_button_full{
  background-color: #5A9AD5;
  color: #ffffff;
}

.talentDetail_button_full:hover{
  color: #ffffff;
  background-color: #50A5F5;
  border: 1px solid #50A5F5;
}

.talentDetail_button--disable{
  border: 1px solid #D5D5D5;
  background-color: #D5D5D5;
  color: #ffffff;
}

.talentDetail_button--disable:hover{
  border: 1px solid #D5D5D5;
  background-color: #D5D5D5;
  color: #ffffff;
}

.talentDetail_detailedInfo{
	margin: 15px auto;
	padding-bottom: 5px;
  	box-shadow: 0 2px 4px 0 rgba(0,0,0,.24), 0 0 6px 0 rgba(0,0,0,.08);
}

.talentDetail_detailedInfo_title{
	height: 50px;
	line-height: 50px;
	text-align: left;
	padding-left: 20px;
	font-size: 16px;
	font-weight: bold;
}

.talentDetail_detailedInfo_content{
	width: 90%;
	margin: 10px auto 30px auto;
	font-size: 15px;
	line-height: 1.8;
	text-align: left;
	/* white-space: pre; */
}

.talentDetail_detailedInfo_skill{
	min-height: 165px;
	border-bottom: 1px solid #E1E1E1;
}

.talentDetail_detailedInfo_experience{
	min-height: 165px;
	border-bottom: 1px solid #E1E1E1;
}

.talentDetail_detailedInfo_rate{
	min-height: 165px;
}

.talentDetail_detailedInfo_rate_item{
	position: relative;
	height: 60px;
	margin: 18px auto;
}

.talentDetail_detailedInfo_rate_item_left{
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	width: 80px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.talentDetail_detailedInfo_rate_item_left_icon{
	width: 52px;
	height: 52px;
	border-radius: 26px;
  	overflow: hidden;
  	border: 1px solid #C8C8E8;
}

.talentDetail_detailedInfo_rate_item_left_iconImg {
    width: 54px;
    height: 54px;
    margin-top: -1px;
    margin-left: -1px;
}

.talentDetail_detailedInfo_rate_item_center{
	position: absolute;
	top: 0;
	left: 80px;
	bottom: 0;
	right: 200px;
	font-size: 14px;
}

.talentDetail_detailedInfo_rate_item_center_name{
	height: 50%;
	text-align: left;
	padding: auto 10px;
	font-weight: bold;
}

.talentDetail_detailedInfo_rate_item_center_comment{
	height: 50%;
	text-align: left;
	padding: auto 10px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.talentDetail_detailedInfo_rate_item_right{	
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	width: 250px;
	text-align: left;
	font-size: 14px;
}

.talentDetail_detailedInfo_rate_item_right_riqi{
	height: 50%;
}

.talentDetail_detailedInfo_rate_item_right_rating{
	height: 50%;
}
</style>


