<template>
  <div class="editProjectInfo">
		<div class="editProjectInfo_item editProjectInfo_spacing">
			{{promptInfo}}
		</div>
		<div class="editProjectInfo_item editProjectInfo_spacing">
			<div class="editProjectInfo_item_left editProjectInfo_required">项目需求</div>
			<div class="editProjectInfo_item_right">
				<el-input v-model="Name" style="width:90%" size="small" placeholder="请输入内容"></el-input>
			</div>
		</div>
		<div class="editProjectInfo_item editProjectInfo_spacing" style="height:150px;">
			<div class="editProjectInfo_item_left editProjectInfo_required">具体描述</div>
			<div class="editProjectInfo_item_right">
				<el-input v-model="Desp" type="textarea" style="width:90%;margin-top:8px;" :rows="6" placeholder="请输入内容"></el-input>
			</div>
		</div>
		<div class="editProjectInfo_item editProjectInfo_spacing">
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
		<div class="editProjectInfo_item editProjectInfo_spacing">
			<div class="editProjectInfo_itemHalf">
				<div class="editProjectInfo_itemHalf_left editProjectInfo_required">您的姓名</div>
				<div class="editProjectInfo_itemHalf_right">
					<el-input v-model="Employer_name" style="width:76%" size="small" :readonly="true"></el-input>
				</div>
			</div>
		</div>
		<div class="editProjectInfo_item editProjectInfo_spacing">
			<div class="editProjectInfo_itemHalf">
				<div class="editProjectInfo_itemHalf_left editProjectInfo_required">联系方式</div>
				<div class="editProjectInfo_itemHalf_right">
					<el-input v-model="Employer_mobile" style="width:76%" size="small" :readonly="true"></el-input>
					<div :class="['editProjectInfo_getCode',countDownFlag?'editProjectInfo_getCode--wait':'']" @click="getVerificationCode">{{countDownFlag?countDown+'秒后重新获取':'获取验证码'}}</div>
				</div>
			</div>
		</div>
		<div class="editProjectInfo_item editProjectInfo_spacing">
			<div class="editProjectInfo_itemHalf">
				<div class="editProjectInfo_itemHalf_left editProjectInfo_required">验证码</div>
				<div class="editProjectInfo_itemHalf_right">
					<el-input v-model="verificationCode" style="width:76%" size="small" placeholder="请输入内容" :maxlength="6"></el-input>
				</div>
			</div>
		</div>
		<div class="editProjectInfo_submitBox editProjectInfo_spacing">
			<a class="editProjectInfo_submitBox_button" @click="addProject">发布需求</a>
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
			Employer_ID: '1',
			Name:'',
			Desp:'',
			Wage:null,
			Length:null,
			Employer_name:'',
			Employer_mobile:'',
			verificationCode:''
		}
	},
	created(){
		this.getEmployerInfo();
	},
	beforeDestroy(){
		this.countDownFlag = false;
	},
	methods:{
		getEmployerInfo(){
			this.$http.post('/employer/getSelfInfo',{employerId: this.Employer_ID}).then((res) => {
				let result = res.data;
				if(result.success){
					this.Employer_name = result.data.Name_real?result.data.Name_real:'';
					this.Employer_mobile = result.data.Mobile?result.data.Mobile:'';
				}
			})
		},
		getVerificationCode(){
			if(!this.countDownFlag){
				let Mobile = this.Employer_mobile.replace(/(^\s*)|(\s*$)/g,'');
                let reg = /^1\d{10}$/;
                if(Mobile === '' || !reg.test(Mobile)){
                  this.$alert('请填写正确的手机号');
                  return;
                }
                this.startCountDown();
                let param = {
                  Mobile
                };
                this.$http.post('/sys/getVerificationCode', param).then((res) => {
                  let result = res.data;
                  if(!result.success){
                    this.$alert(result.msg);
                  }
               }).catch((err) => {
                 this.$alert(err.message);
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
			let Employer_name = this.Employer_name;
			let Employer_mobile = this.Employer_mobile;
			if(Employer_name === '' || Employer_name === ''){
				this.$alert('个人信息不完善，无法发布需求');
				return;
			}
			let Name = this.Name.replace(/(^\s*)|(\s*$)/g,'');
			if(Name === ''){
				this.$alert('请填写项目需求');
				return;
			}
			let Desp = this.Desp.replace(/(^\s*)|(\s*$)/g,'');
			if(Desp === '' || Desp.length < 30){
				this.$alert('具体描述不能少于30字');
				return;
			}
			let Wage = this.Wage;
			if(Wage === null){
				this.$alert('请选择项目日薪');
				return;
			}
			let Length = this.Length;
			if(Length === null){
				this.$alert('请选择项目工时');
				return;
			}
			let verificationCode = this.verificationCode.replace(/(^\s*)|(\s*$)/g,'');
			if(verificationCode === ''){
				this.$alert('请输入验证码');
				return;
			}
			let param = {
				Employer_ID:this.Employer_ID,
				Name,
				Desp,
				Wage,
				Length,
				Employer_mobile,
				verificationCode
			}
			this.$http.post('/project/addProject', param).then((res) => {
				 let result = res.data;
				 if(result.success){
					 this.clearPage();
					 this.$alert('发布成功');
				 }else{
					 this.$alert(result.msg);
				 }
			}).catch((err) => {
				this.$alert(err.message);
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


