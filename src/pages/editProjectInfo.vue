<template>
  <div class="editProjectInfo">
		<div :class="['editProjectInfo_item', isOrder?'editProjectInfo_spacing--order':'editProjectInfo_spacing']" v-show="!isOrder">
			{{promptInfo}}
		</div>
		<div :class="['editProjectInfo_item', isOrder?'editProjectInfo_spacing--order':'editProjectInfo_spacing']">
			<div class="editProjectInfo_item_left editProjectInfo_required">项目需求</div>
			<div class="editProjectInfo_item_right">
				<el-input v-model="Name" style="width:90%" size="small" placeholder="请输入内容" :maxlength="200"></el-input>
			</div>
		</div>
		<div :class="['editProjectInfo_item', isOrder?'editProjectInfo_spacing--order':'editProjectInfo_spacing']" style="height:150px;" v-show="!isOrder">
			<div class="editProjectInfo_item_left editProjectInfo_required">具体描述</div>
			<div class="editProjectInfo_item_right">
				<el-input v-model="Desp" type="textarea" style="width:90%;margin-top:8px;" :rows="6" placeholder="请输入内容" :maxlength="800"></el-input>
			</div>
		</div>
		<div :class="['editProjectInfo_item', isOrder?'editProjectInfo_spacing--order':'editProjectInfo_spacing']" v-show="isOrder">
			<div class="editProjectInfo_itemHalf">
				<div class="editProjectInfo_itemHalf_left editProjectInfo_required">预约人才</div>
				<div class="editProjectInfo_itemHalf_right">
					<el-input v-model="talentInfo.Name" style="width:76%" size="small" :readonly="true" :maxlength="50"></el-input>
				</div>
			</div>
		</div>
		<div :class="['editProjectInfo_item', isOrder?'editProjectInfo_spacing--order':'editProjectInfo_spacing']">
			<div class="editProjectInfo_itemHalf">
				<div class="editProjectInfo_itemHalf_left editProjectInfo_required">项目日薪</div>
				<div class="editProjectInfo_itemHalf_right">
						<el-select v-model="Wage" placeholder="请选择" style="width:76%;" size="small">
							<el-option v-for="item in WageList" :label="item+'元/天'" :value="item"></el-option>
						</el-select>
				</div>
			</div>
			<div class="editProjectInfo_itemHalf">
				<div class="editProjectInfo_itemHalf_left editProjectInfo_required">项目工时</div>
				<div class="editProjectInfo_itemHalf_right">
						<el-select v-model="Length" placeholder="请选择" style="width:76%;" size="small">
							<el-option v-for="item in 90" :label="item+'天'" :value="item"></el-option>
						</el-select>
				</div>
			</div>
		</div>
		<div :class="['editProjectInfo_item', isOrder?'editProjectInfo_spacing--order':'editProjectInfo_spacing']">
			<div class="editProjectInfo_itemHalf">
				<div class="editProjectInfo_itemHalf_left editProjectInfo_required">您的姓名</div>
				<div class="editProjectInfo_itemHalf_right">
					<el-input v-model="Employer_name" style="width:76%" size="small" placeholder="请输入内容" :readonly="readonly" :maxlength="50"></el-input>
				</div>
			</div>
		</div>
		<div :class="['editProjectInfo_item', isOrder?'editProjectInfo_spacing--order':'editProjectInfo_spacing']">
			<div class="editProjectInfo_itemHalf">
				<div class="editProjectInfo_itemHalf_left editProjectInfo_required">联系方式</div>
				<div class="editProjectInfo_itemHalf_right">
					<el-input v-model="Employer_mobile" style="width:76%" size="small" placeholder="请输入内容" :readonly="readonly" :maxlength="11"></el-input>
					<div :class="['editProjectInfo_getCode',countDownFlag?'editProjectInfo_getCode--wait':'']" @click="getVerificationCode">{{countDownFlag?countDown+'秒后重新获取':'获取验证码'}}</div>
				</div>
			</div>
		</div>
		<div :class="['editProjectInfo_item', isOrder?'editProjectInfo_spacing--order':'editProjectInfo_spacing']">
			<div class="editProjectInfo_itemHalf">
				<div class="editProjectInfo_itemHalf_left editProjectInfo_required">验证码</div>
				<div class="editProjectInfo_itemHalf_right">
					<el-input v-model="verificationCode" style="width:76%" size="small" placeholder="请输入内容" :maxlength="6"></el-input>
				</div>
			</div>
		</div>
		<div :class="['editProjectInfo_submitBox', isOrder?'editProjectInfo_spacing--order':'editProjectInfo_spacing']">
			<a class="editProjectInfo_submitBox_button" @click="addProject">{{this.isOrder?'立即预约':'发布需求'}}</a>
		</div>
  </div>
</template>

<script>
export default {
	data(){
		return {
			promptInfo:"发布需求后，专员将在2小时内为您推荐知名设计师为您工作。如您对设计师的服务不满意，可以无条件退款。",
			WageList: Array.apply(null, { length: 16 }).map((item, index) => {return 500+index*100}),
			countDownFlag: false,
			countDown: 60,
			Employer_ID: null,
			Name:'',
			Desp:'',
			Wage:null,
			Length:null,
			Employer_nameShow:'',
			Employer_name:'',
			Employer_mobile:'',
			verificationCode:'',
			readonly:true,
			isOrder:false,
			Employee_ID: null,
			talentInfo:{}
		}
	},
	created(){
		if(this.$route.query.hasOwnProperty('id')){
			this.isOrder = true;
			this.Employee_ID = this.$route.query.id;
			this.getTalentInfo();
		}else{
			this.isOrder = false;
			this.Employee_ID = null;
		}
    	this.checkLogin();
    	window.bus.$on('checkLogin',this.checkLogin);
	},
	beforeDestroy(){
		this.countDownFlag = false;
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
				this.Employer_ID = userId;
		        this.getEmployerInfo();
			}else{
				this.Employer_ID = '';
				this.clearPage();
				this.Employer_name = '';
				this.Employer_nameShow = '';
				this.Employer_mobile = '';
				this.$router.push({
					path:'/homePage/index'
				})
			}
		},
		getTalentInfo(){
			this.$http.post('/talent/getEmployeeInfo',{employeeId: this.Employee_ID}).then((res) => {
				let result = res.data;
				if(result.success){
					this.talentInfo = result.data;
					this.Wage = result.data.Wage;
					this.Name = result.data.Job_position;
				}
			})
		},
		getEmployerInfo(){
			this.$http.post('/employer/getSelfInfo',{employerId: this.Employer_ID}).then((res) => {
				let result = res.data;
				if(result.success){
					this.Employer_name = result.data.Name_real?result.data.Name_real:'';
					this.Employer_nameShow = result.data.Name?result.data.Name:'';
					this.Employer_mobile = result.data.Mobile?result.data.Mobile:'';
					if(result.data.Name_real){
						this.readonly = true;
					}else{
						this.readonly = false;
					}
				}
			})
		},
		getVerificationCode(){
			if(!this.countDownFlag){
				let Mobile = this.Employer_mobile.replace(/(^\s*)|(\s*$)/g,'');
                let reg = /^1\d{10}$/;
                if(Mobile === '' || !reg.test(Mobile)){
                  this.$alert('请填写正确的手机号',{lockScroll:false});
                  return;
                }
                this.startCountDown();
                let param = {
                  Mobile
                };
                this.$http.post('/sys/getVerificationCode', param).then((res) => {
                  let result = res.data;
                  if(!result.success){
                    this.$alert(result.msg,{lockScroll:false});
                  }
               }).catch((err) => {
                 this.$alert(err.message,{lockScroll:false});
               })
			}
		},
		startCountDown(){
			this.countDown = 60;
			this.countDownFlag = true;
			this.countDownLoop();
		},
		countDownLoop(){
			if(this.countDownFlag){
				setTimeout(() => {
					this.countDown = this.countDown - 1;
					if(this.countDown === 0){
						this.countDownFlag = false;
					}else{
						this.countDownLoop();
					}
				}, 1000) 
			}
		},
		clearPage(){
			this.Name = '';
			this.Desp = '';
			this.Wage = null;
			this.Length = null;
			this.verificationCode = '';
		},
		addProject(){
			let Employer_name = this.Employer_name.replace(/(^\s*)|(\s*$)/g,'');
			let Employer_mobile = this.Employer_mobile.replace(/(^\s*)|(\s*$)/g,'');
			// if(Employer_name === '' || Employer_mobile === ''){
			// 	let msg = this.isOrder?'预约人才':'发布需求'
			// 	this.$alert('个人信息不完善，无法'+msg,{lockScroll:false});
			// 	return;
			// }
			if(Employer_name === ''){
				this.$alert('请填写您的名称',{lockScroll:false});
				return;
			}
			let reg = /^1\d{10}$/;
			if(Employer_mobile === '' || !reg.test(Employer_mobile)){
				this.$alert('请填写正确的手机号',{lockScroll:false});
				return;
			}
			let Name = this.Name.replace(/(^\s*)|(\s*$)/g,'');
			if(Name === ''){
				this.$alert('请填写项目需求',{lockScroll:false});
				return;
			}
			let Desp = this.Desp.replace(/(^\s*)|(\s*$)/g,'');
			if(!this.isOrder && (Desp === '' || Desp.length < 30)){
				this.$alert('具体描述不能少于30字',{lockScroll:false});
				return;
			}
			let Wage = this.Wage;
			if(Wage === null){
				this.$alert('请选择项目日薪',{lockScroll:false});
				return;
			}
			let Length = this.Length;
			if(Length === null){
				this.$alert('请选择项目工时',{lockScroll:false});
				return;
			}
			let verificationCode = this.verificationCode.replace(/(^\s*)|(\s*$)/g,'');
			if(verificationCode === ''){
				this.$alert('请输入验证码',{lockScroll:false});
				return;
			}
			let param = {
				Employer_ID:this.Employer_ID,
				Name,
				Desp,
				Wage,
				Length,
				Employer_mobile,
				verificationCode,
				type:'publish'
			}

			let Employer_nameShow = this.Employer_nameShow !== ''?this.Employer_nameShow:Employer_name;
			if(!this.readonly){
				param.Employee_name = Employer_name;
				param.Employer_nameShow = Employer_nameShow;
			}

			if(this.isOrder){
				param.Employee_ID = this.Employee_ID;
				param.type = 'order';
			}
			this.$http.post('/project/addProject', param).then((res) => {
				 let result = res.data;
				 if(result.success){
					 let msg = param.type === 'publish'?'发布成功':'预约成功';
					 this.$router.push({
						path:'/homePage/userInfo'
					 })
					 this.$alert(msg,{
						lockScroll:false,
						callback:()=>{
							if(param.type === 'order'){
								this.$payPicture();
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

.editProjectInfo_required:before {
    content: "*";
    color: #fa5555;
    margin-right: 4px;
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
	position: relative;
}

.editProjectInfo_getCode{
	position: absolute;
	width: 150px;
	top: 5px;
	left: calc(76% + 30px);
	height: 30px;
	line-height: 30px;
	text-align: center;
	border: 1px solid #5A9AD5;
	color: #5A9AD5;
	border-radius: 4px;
	cursor: pointer;
}

.editProjectInfo_getCode--wait{
	border: 1px solid #D5D5D5;
	color: #D5D5D5;
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
  .editProjectInfo_spacing{
    margin: 18px auto;
  }

  .editProjectInfo_spacing--order{
    margin: 38px auto;
  }
}

@media screen and (min-width: 1367px) and (max-width: 1600px){
  .editProjectInfo_spacing{
    margin: 32px auto;
  }

  .editProjectInfo_spacing--order{
    margin: 52px auto;
  }
}

@media screen and (min-width: 1601px){
  .editProjectInfo_spacing{
    margin: 50px auto;
  }

  .editProjectInfo_spacing--order{
    margin: 75px auto;
  }
}
</style>


