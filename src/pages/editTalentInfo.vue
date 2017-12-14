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
			<div class="editTalentInfo_item_contentItem_item_left editTalentInfo_required">您的昵称</div>
			<div class="editTalentInfo_item_contentItem_item_right">
				<el-input v-model="Name" style="width:90%" size="small" placeholder="请输入内容" :maxlength="50"></el-input>
			</div>
		</div>
		<div class="editTalentInfo_item_contentItem_item">
			<div class="editTalentInfo_item_contentItem_item_left editTalentInfo_required">您的手机</div>
			<div class="editTalentInfo_item_contentItem_item_right">
				<el-input v-model="Mobile" style="width:90%" size="small" placeholder="请输入内容" :maxlength="11"></el-input>
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
					<div class="editTalentInfo_item_contentItem_item_left editTalentInfo_required">兼职岗位</div>
					<div class="editTalentInfo_item_contentItem_item_right">
						<el-select v-model="Position" placeholder="请选择" style="width:90%;" size="small">
							<el-option v-for="item in PositionList" :label="item" :value="item"></el-option>
						</el-select>
					</div>
				</div>
				<div class="editTalentInfo_item_contentItem_item">
					<div class="editTalentInfo_item_contentItem_item_left editTalentInfo_required">兼职日薪</div>
					<div class="editTalentInfo_item_contentItem_item_right">
						<el-select v-model="Wage" placeholder="请选择" style="width:90%;" size="small">
							<el-option v-for="item in WageList" :label="item+'元/天'" :value="item"></el-option>
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
					<div class="editTalentInfo_item_contentItem_item_left editTalentInfo_required">工作单位</div>
					<div class="editTalentInfo_item_contentItem_item_right">
						<el-input v-model="Job_company" style="width:90%" size="small" placeholder="请输入内容" :maxlength="100"></el-input>
					</div>
				</div>
				<div class="editTalentInfo_item_contentItem_item">
					<div class="editTalentInfo_item_contentItem_item_left editTalentInfo_required">工作职位</div>
					<div class="editTalentInfo_item_contentItem_item_right">
						<el-input v-model="Job_position" style="width:90%" size="small" placeholder="请输入内容" :maxlength="50"></el-input>
					</div>
				</div>
      </div>
      <div class="editTalentInfo_item_contentItem">
				<div class="editTalentInfo_item_contentItem_item">
					<div class="editTalentInfo_item_contentItem_item_left editTalentInfo_required">工作经验</div>
					<div class="editTalentInfo_item_contentItem_item_right">
						<el-select v-model="Job_experience" placeholder="请选择" style="width:90%;" size="small">
							<el-option v-for="item in 15" :label="item+'年'" :value="item"></el-option>
						</el-select>
					</div>
				</div>
				<div class="editTalentInfo_item_contentItem_item">
					<div class="editTalentInfo_item_contentItem_item_left editTalentInfo_required">所在地区</div>
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
							<el-input v-model="Edu_school" style="width:90%" size="small" placeholder="请输入内容" :maxlength="100"></el-input>
						</div>
					</div>
					<div class="editTalentInfo_item_contentItem_item">
						<div class="editTalentInfo_item_contentItem_item_left">所在系别</div>
						<div class="editTalentInfo_item_contentItem_item_right">
							<el-input v-model="Edu_department" style="width:90%" size="small" placeholder="请输入内容" :maxlength="100"></el-input>
						</div>
					</div>
				</div>
				<div class="editTalentInfo_item_contentItem">
					<div class="editTalentInfo_item_contentItem_item">
						<div class="editTalentInfo_item_contentItem_item_left">最高学历</div>
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
						<el-input v-model="Skills" type="textarea" style="width:95%;" :rows="5" placeholder="请输入内容" :maxlength="400"></el-input>
					</div>
				</div>
				<div class="editTalentInfo_otherInfo_contentItem">
					<div class="editTalentInfo_otherInfo_contentItem_left">
						项目经验
					</div>
					<div class="editTalentInfo_otherInfo_contentItem_right">
						<el-input v-model="Projects" type="textarea" style="width:95%;" :rows="5" placeholder="请输入内容" :maxlength="800"></el-input>
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
		<div class="editTalentInfo_promptBox editTalentInfo_spacing">
			<div :class="['editTalentInfo_promptBox_left',showSuppleInfoFlag?'editTalentInfo_promptBox_left--checked':'']">
				<i class="el-icon-circle-check" style="cursor: pointer;" @click="showSuppleInfo"></i>
			</div>
			<div class="editTalentInfo_promptBox_right">是否补充详细信息，增加接单成功率</div>
		</div>
		<div class="editTalentInfo_submitBox editTalentInfo_spacing">
			<a class="editTalentInfo_submitBox_button" @click="saveTalentInfo">提交</a>
		</div>
  </div>
</template>

<script>
export default {
	data(){
		return {
			PositionList: ['JAVA工程师','前端工程师','算法工程师','其他'],
			WageList: Array.apply(null, { length: 16 }).map((item, index) => {return 500+index*100}),
			PositionAreaList:[
				{
					"name":"北京",
					"children":[
						{
							"name":"全区"
						},
						{
							"name":"海淀"
						},
						{
							"name":"朝阳"
						},
						{
							"name":"昌平"
						},
						{
							"name":"东城"
						},
						{
							"name":"西城"
						},
						{
							"name":"石景山"
						},
						{
							"name":"通州"
						},
						{
							"name":"丰台"
						}
					]
				},
				{
					"name":"上海",
					"children":[
						{
							"name":"全区"
						},
						{
							"name":"浦东"
						},
						{
							"name":"闵行"
						},
						{
							"name":"徐汇"
						},
						{
							"name":"长宁"
						},
						{
							"name":"普陀"
						},
						{
							"name":"静安"
						},
						{
							"name":"卢湾"
						},
						{
							"name":"黄浦"
						},
						{
							"name":"闸北"
						},
						{
							"name":"虹口"
						},
						{
							"name":"杨浦"
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
			Job_district: '海淀',
			Edu_school:'',
			Edu_department:'',
			Edu_degree:'',
			Skills:'',
			Projects:'',
			employeeId: "",
			type: null
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
			return resultList;
		}
	},
	created(){
		this.type = this.$route.query.type || null;
    	this.checkLogin();
		window.bus.$on('checkLogin',this.checkLogin);
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
				this.employeeId = userId;
				this.getDistrictList();
			}else{
				this.employeeId = '';
				this.initPage({});
				this.$router.push({
					path:'/homePage/index'
				})
			}
		},
		showSuppleInfo(){
			this.showSuppleInfoFlag = !this.showSuppleInfoFlag;
		},
		getTalentInfo(){
			this.$http.post('/talent/getSelfInfo',{employeeId: this.employeeId}).then((res) => {
				let result = res.data;
				if(result.success){
					this.initPage(result.data);
				}
			})
		},
		getDistrictList(){
			this.$http.get('/static/json/district.json').then((res) => {
				if(res.status === 200){
					this.PositionAreaList = res.data;
				}
				this.$nextTick(()=>{
					this.getTalentInfo();
				})
			}).catch(()=>{
				this.$nextTick(()=>{
					this.getTalentInfo();
				})
			})
		},
		initPage(employeeInfo){
			this.Name = employeeInfo.Name ? employeeInfo.Name:'';
			this.Mobile = employeeInfo.Mobile ? employeeInfo.Mobile:'';
			this.Position = employeeInfo.Position ? employeeInfo.Position:null;
			this.Wage = employeeInfo.Wage ? employeeInfo.Wage:null;
			this.Job_company = employeeInfo.Job_company ? employeeInfo.Job_company:'';
			this.Job_position = employeeInfo.Job_position ? employeeInfo.Job_position:'';
			this.Job_experience = employeeInfo.Job_experience ? employeeInfo.Job_experience:null;
			this.Job_city = employeeInfo.Job_city ? employeeInfo.Job_city:'北京';
			this.$nextTick(()=>{
				this.Job_district = employeeInfo.Job_district ? employeeInfo.Job_district:'海淀';
			})
			this.Edu_school = employeeInfo.Edu_school ? employeeInfo.Edu_school:'';
			this.Edu_department = employeeInfo.Edu_department ? employeeInfo.Edu_department:'';
			this.Edu_degree = employeeInfo.Edu_degree ? employeeInfo.Edu_degree:'';
			this.Skills = employeeInfo.Skills ? employeeInfo.Skills:'';
			this.Projects = employeeInfo.Projects ? employeeInfo.Projects:'';
		},
		saveTalentInfo(){
			let Name = this.Name.replace(/(^\s*)|(\s*$)/g,'');
			if(Name === ''){
				this.$alert('请填写昵称',{lockScroll:false});
				return;
			}
			let Mobile = this.Mobile.replace(/(^\s*)|(\s*$)/g,'');
			let reg = /^1\d{10}$/;
			if(Mobile === '' || !reg.test(Mobile)){
				this.$alert('请填写正确的手机号',{lockScroll:false});
				return;
			}
			let Position = this.Position;
			if(Position === null){
				this.$alert('请选择兼职岗位',{lockScroll:false});
				return;
			}
			let Wage = this.Wage;
			if(Wage === null){
				this.$alert('请选择兼职日薪',{lockScroll:false});
				return;
			}
			let Job_company = this.Job_company.replace(/(^\s*)|(\s*$)/g,'');
			if(Job_company === ''){
				this.$alert('请填写工作单位',{lockScroll:false});
				return;
			}
			let Job_position = this.Job_position.replace(/(^\s*)|(\s*$)/g,'');
			if(Job_position === ''){
				this.$alert('请填写工作职位',{lockScroll:false});
				return;
			}
			let Job_experience = this.Job_experience;
			if(Job_experience === null){
				this.$alert('请选择工作经验',{lockScroll:false});
				return;
			}
			let param = {
				Employee_ID: this.employeeId,
				showSuppleInfoFlag: this.showSuppleInfoFlag,
				Name,
				Mobile,
				Position,
				Wage,
				Job_company,
				Job_position,
				Job_experience,
				Job_city: this.Job_city,
				Job_district: this.Job_district,
				Edu_school: this.Edu_school.replace(/(^\s*)|(\s*$)/g,''),
				Edu_department: this.Edu_department.replace(/(^\s*)|(\s*$)/g,''),
				Edu_degree: this.Edu_degree,
				Skills: this.Skills.replace(/(^\s*)|(\s*$)/g,''),
				Projects: this.Projects.replace(/(^\s*)|(\s*$)/g,'')
			}
			this.$http.post('/talent/editTalentInfo', param).then((res) => {
				 let result = res.data;
				 if(result.success){
					 this.$alert('保存成功',{
						lockScroll:false,
						callback:()=>{
							if(this.type == 1){
								this.$router.back();
							}
						}
					 });
				 }else{
					 this.$alert(result.msg,{lockScroll:false});
				 }
			}).catch((err) => {
				this.$alert(err.message,{lockScroll:false});
			})
		}
	},
	watch:{
		regionList(newVal){
			if(newVal.indexOf(this.Job_district) === -1){
				this.Job_district = newVal[0].name
			}
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

.editTalentInfo_required:before {
    content: "*";
    color: #fa5555;
    margin-right: 4px;
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

.editTalentInfo_promptBox_left--checked{
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


