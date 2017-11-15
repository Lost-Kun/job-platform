<template>
  <div class="editTalentInfo">
    <div class="editTalentInfo_item editTalentInfo_spacing">
      <div class="editTalentInfo_item_title">
        <div class="editTalentInfo_item_title_text">个人信息
          <div class="editTalentInfo_item_title_text_tooltips">（私密信息，不公开展示）</div>
        </div>
      </div>
      <div class="editTalentInfo_item_contentItem">
				<div class="editTalentInfo_item_contentItem_item">
					<div class="editTalentInfo_item_contentItem_item_left">您的昵称</div>
					<div class="editTalentInfo_item_contentItem_item_right">
						<el-input v-model="Name" style="width:90%" size="small" placeholder="请输入内容"></el-input>
					</div>
				</div>
				<div class="editTalentInfo_item_contentItem_item">
					<div class="editTalentInfo_item_contentItem_item_left">您的手机</div>
					<div class="editTalentInfo_item_contentItem_item_right">
						<el-input v-model="Mobile" style="width:90%" size="small" placeholder="请输入内容"></el-input>
					</div>
				</div>
      </div>
    </div>
    <div class="editTalentInfo_item editTalentInfo_spacing">
      <div class="editTalentInfo_item_title">
        <div class="editTalentInfo_item_title_text">兼职要求
        </div>
      </div>
      <div class="editTalentInfo_item_contentItem">
				<div class="editTalentInfo_item_contentItem_item">
					<div class="editTalentInfo_item_contentItem_item_left">兼职岗位</div>
					<div class="editTalentInfo_item_contentItem_item_right">
						<el-select v-model="Position" placeholder="请选择" style="width:90%;" size="small">
							<el-option v-for="item in PositionList" :label="item" :value="item"></el-option>
						</el-select>
					</div>
				</div>
				<div class="editTalentInfo_item_contentItem_item">
					<div class="editTalentInfo_item_contentItem_item_left">兼职日薪</div>
					<div class="editTalentInfo_item_contentItem_item_right">
						<el-select v-model="Wage" placeholder="请选择" style="width:90%;" size="small">
							<el-option v-for="item in WageList" :label="item" :value="item"></el-option>
						</el-select>
					</div>
				</div>
      </div>
    </div>
    <div class="editTalentInfo_item editTalentInfo_spacing">
      <div class="editTalentInfo_item_title">
        <div class="editTalentInfo_item_title_text">工作经历
        </div>
      </div>
      <div class="editTalentInfo_item_contentItem">
				<div class="editTalentInfo_item_contentItem_item">
					<div class="editTalentInfo_item_contentItem_item_left">工作单位</div>
					<div class="editTalentInfo_item_contentItem_item_right">
						<el-input v-model="Job_company" style="width:90%" size="small" placeholder="请输入内容"></el-input>
					</div>
				</div>
				<div class="editTalentInfo_item_contentItem_item">
					<div class="editTalentInfo_item_contentItem_item_left">工作职位</div>
					<div class="editTalentInfo_item_contentItem_item_right">
						<el-input v-model="Job_position" style="width:90%" size="small" placeholder="请输入内容"></el-input>
					</div>
				</div>
      </div>
      <div class="editTalentInfo_item_contentItem">
				<div class="editTalentInfo_item_contentItem_item">
					<div class="editTalentInfo_item_contentItem_item_left">工作经验</div>
					<div class="editTalentInfo_item_contentItem_item_right">
						<el-select v-model="Job_experience" placeholder="请选择" style="width:90%;" size="small">
							<el-option v-for="item in 15" :label="item" :value="item"></el-option>
						</el-select>
					</div>
				</div>
				<div class="editTalentInfo_item_contentItem_item">
					<div class="editTalentInfo_item_contentItem_item_left">所在地区</div>
					<div class="editTalentInfo_item_contentItem_item_right">
						<el-select v-model="Job_city" placeholder="请选择" style="width:42%;" size="small">
							<el-option v-for="item in PositionAreaList" :label="item.name" :value="item.name"></el-option>
						</el-select>
						<el-select v-model="Job_district" placeholder="请选择" style="width:42%;margin-left:6%;" size="small">
							<el-option v-for="item in regionList" :label="item.name" :value="item.name"></el-option>
						</el-select>
					</div>
				</div>
      </div>
    </div>
		<div class="editTalentInfo_promptBox editTalentInfo_spacing" v-show="!showSuppleInfoFlag">
			<div class="editTalentInfo_promptBox_left">
				<i class="el-icon-circle-check" style="cursor: pointer;" @click="showSuppleInfo"></i>
			</div>
			<div class="editTalentInfo_promptBox_right">是否补充详细信息，增加接单成功率</div>
		</div>
		<div class="editTalentInfo_otherInfo" v-show="showSuppleInfoFlag">
			<div class="editTalentInfo_item editTalentInfo_spacing">
				<div class="editTalentInfo_item_title">
					<div class="editTalentInfo_item_title_text">教育经历
					</div>
				</div>
				<div class="editTalentInfo_item_contentItem">
					<div class="editTalentInfo_item_contentItem_item">
						<div class="editTalentInfo_item_contentItem_item_left">就读学校	</div>
						<div class="editTalentInfo_item_contentItem_item_right">
							<el-input v-model="Edu_school" style="width:90%" size="small" placeholder="请输入内容"></el-input>
						</div>
					</div>
					<div class="editTalentInfo_item_contentItem_item">
						<div class="editTalentInfo_item_contentItem_item_left">所在系别</div>
						<div class="editTalentInfo_item_contentItem_item_right">
							<el-input v-model="Edu_department" style="width:90%" size="small" placeholder="请输入内容"></el-input>
						</div>
					</div>
				</div>
				<div class="editTalentInfo_item_contentItem">
					<div class="editTalentInfo_item_contentItem_item">
						<div class="editTalentInfo_item_contentItem_item_left">最高学历	</div>
						<div class="editTalentInfo_item_contentItem_item_right">
							<el-select v-model="Edu_degree" placeholder="请选择" style="width:90%;" size="small">
								<el-option v-for="item in degreeList" :label="item" :value="item"></el-option>
							</el-select>
						</div>
					</div>
				</div>
			</div>
			<div class="editTalentInfo_item editTalentInfo_spacing">
				<div class="editTalentInfo_item_title">
					<div class="editTalentInfo_item_title_text">技能与作品
          				<div class="editTalentInfo_item_title_text_tooltips">（建议您认真填写，可提高接单概率）</div>
					</div>
				</div>
				<div class="editTalentInfo_otherInfo_contentItem">
					<div class="editTalentInfo_otherInfo_contentItem_left">
						掌握技能
					</div>
					<div class="editTalentInfo_otherInfo_contentItem_right">
						<el-input v-model="Skills" type="textarea" style="width:95%;" :rows="5" placeholder="请输入内容"></el-input>
					</div>
				</div>
				<div class="editTalentInfo_otherInfo_contentItem">
					<div class="editTalentInfo_otherInfo_contentItem_left">
						项目经验
					</div>
					<div class="editTalentInfo_otherInfo_contentItem_right">
						<el-input v-model="Projects" type="textarea" style="width:95%;" :rows="5" placeholder="请输入内容"></el-input>
					</div>
				</div>
			</div>
			<!-- <div class="editTalentInfo_item editTalentInfo_spacing">
				<div class="editTalentInfo_item_title">
					<div class="editTalentInfo_item_title_text">专业社区展示
					</div>
				</div>
				<div class="editTalentInfo_otherInfo_contentItem" style="height:40px;">
					<div class="editTalentInfo_otherInfo_contentItem_left">
						Githud
					</div>
					<div class="editTalentInfo_otherInfo_contentItem_right">
						<el-input style="width:95%" size="small" placeholder="请输入内容"></el-input>
					</div>
				</div>
				<div class="editTalentInfo_otherInfo_contentItem" style="height:40px;">
					<div class="editTalentInfo_otherInfo_contentItem_left">
						Linkedin
					</div>
					<div class="editTalentInfo_otherInfo_contentItem_right">
						<el-input style="width:95%" size="small" placeholder="请输入内容"></el-input>
					</div>
				</div>
				<div class="editTalentInfo_otherInfo_contentItem" style="height:40px;">
					<div class="editTalentInfo_otherInfo_contentItem_left">
						知乎
					</div>
					<div class="editTalentInfo_otherInfo_contentItem_right">
						<el-input style="width:95%" size="small" placeholder="请输入内容"></el-input>
					</div>
				</div>
			</div> -->
		</div>
		<div class="editTalentInfo_submitBox editTalentInfo_spacing">
			<a class="editTalentInfo_submitBox_button">提交</a>
		</div>
  </div>
</template>

<script>
export default {
	data(){
		return {
			PositionList: ['JAVA工程师','前端工程师','算法工程师'],
			WageList: Array.apply(null, { length: 16 }).map((item, index) => {return 500+index*100}),
			PositionAreaList:[
				{
					name:'北京',
					children:[
						{
							name:'海淀区'
						},
						{
							name:'朝阳区'
						}
					]
				},
				{
					name:'上海',
					children:[
						{
							name:'黄埔区'
						},
						{
							name:'徐汇区'
						}
					]
				}
			],
			degreeList: ['本科', '硕士', '博士'],
			showSuppleInfoFlag: false,
			Name: '',
			Mobile: '',
			Position: null,
			Wage: null,
			Job_company:'',
			Job_position:'',
			Job_experience: null,
			Job_city: '北京',
			Job_district: '海淀区',
			Edu_school:'',
			Edu_department:'',
			Edu_degree:'',
			Skills:'',
			Projects:''
		}
	},
	computed:{
		regionList(){
			let selectedArea = this.Job_city;
			let areaList = this.PositionAreaList;
			let resultList = [];
			for(let i = 0; i<areaList.length; i++){
				if(areaList[i].name === selectedArea){
					resultList = areaList[i].children;
				}
			}
			this.Job_district = resultList[0].name;
			return resultList;
		}
	},
	methods:{
		showSuppleInfo(){
			this.showSuppleInfoFlag = true;
		},
		saveTalentInfo(){
			this.$http.post('/talent/editTalentInfo',{}).then((res) => {

			}).catch((err) => {
				
			})
		}
	}
}
</script>

<style>
.editTalentInfo{
	position: relative;
	min-width: 1100px;
  margin: 0 auto 30px auto;
	width: 80%;
}

.editTalentInfo_item{
  margin: 30px auto;
}

.editTalentInfo_item_title{
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.editTalentInfo_item_title_text{
  position: relative;
  height: 30px;
  line-height: 30px;
  font-size: 18px;
  /* font-weight: bold; */
  color: #64A1D7;
}

.editTalentInfo_item_title_text_tooltips{
	position: absolute;
	top: 0;
	left: calc(100% + 10px);
	white-space: nowrap;
	font-size: 15px;
	color: red;
}

.editTalentInfo_item_contentItem{
	height: 40px;
	margin: 10px auto;
}

.editTalentInfo_item_contentItem_item{
	width: 50%;
	height: 100%;
	float: left;
	position: relative;
}

.editTalentInfo_item_contentItem_item_left{
	position: absolute;
	top:0;
	left: 0;
	bottom: 0;
	width: 20%;
	float: left;
	font-size: 16px;
	/* padding: 0 10px; */
	display: flex;
	align-items: center;
	justify-content: flex-end;
}

.editTalentInfo_item_contentItem_item_right{
	position: absolute;
	top:0;
	right: 0;
	bottom: 0;
	width: 75%;
	float: left;
	/* padding-left: 20px; */
	display: flex;
	align-items: center;
	justify-content: flex-start;
}

.editTalentInfo_promptBox{
	position: relative;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: flex-start;
}

.editTalentInfo_promptBox_left{
	width: 10%;
	font-size: 25px;
	color: #AFADAD;
	text-align: right;
	cursor: pointer;
}

.editTalentInfo_promptBox_left .el-icon-circle-check:hover{
	color: #07C404;
}

.editTalentInfo_promptBox_right{
	margin-left: 30px;
	font-size: 15px;
}

.editTalentInfo_submitBox{
	position: relative;
	height: 40px;
	margin: 10px auto;
	display: flex;
	align-items: center;
	justify-content: center;
}

.editTalentInfo_submitBox_button{
	display: inline-block;
	width: 120px;
	height: 35px;
	line-height: 35px;
	border-radius: 5px;
	border: 1px solid #5A9AD5;
	background-color: #5A9AD5;
	color: #ffffff;
	cursor: pointer;
}

.editTalentInfo_submitBox_button:hover{
  color: #ffffff;
  background-color: #50A5F5;
  border: 1px solid #50A5F5;
}

.editTalentInfo_otherInfo{
  margin: 30px auto;
}

.editTalentInfo_otherInfo_contentItem{
	position: relative;
	height: 140px;
	margin: 10px auto;
}

.editTalentInfo_otherInfo_contentItem_left{
	position: absolute;
	top: 0;
	left: 0;
	width: 10%;
	bottom: 0;
	font-size: 16px;
	display: flex;
	align-items: flex-start;
	justify-content: flex-end;
}

.editTalentInfo_otherInfo_contentItem_right{
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	width: 87.5%;
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
}


@media screen and (max-width: 1366px){
  .editTalentInfo_spacing{
    margin: 30px auto;
  }
}

@media screen and (min-width: 1367px) and (max-width: 1600px){
  .editTalentInfo_spacing{
    margin: 55px auto;
  }
}

@media screen and (min-width: 1601px){
  .editTalentInfo_spacing{
    margin: 90px auto;
  }
}

</style>


