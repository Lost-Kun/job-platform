<template>
	<div class="editEmployerInfo">
		<div class="editEmployerInfo_item editEmployerInfo_spacing">
      <div class="editEmployerInfo_item_title">
        <div class="editEmployerInfo_item_title_text">个人信息
          <div class="editEmployerInfo_item_title_text_tooltips">（私密信息，不公开展示）</div>
        </div>
      </div>
			<div class="editEmployerInfo_item_contentItem">
				<div class="editEmployerInfo_item_contentItem_item">
					<div class="editEmployerInfo_item_contentItem_item_left editEmployerInfo_required">您的昵称	</div>
					<div class="editEmployerInfo_item_contentItem_item_right">
						<el-input v-model="Name" style="width:90%" size="small" placeholder="请输入内容"></el-input>
					</div>
				</div>
				<div class="editEmployerInfo_item_contentItem_item">
					<div class="editEmployerInfo_item_contentItem_item_left editEmployerInfo_required">您的姓名</div>
					<div class="editEmployerInfo_item_contentItem_item_right">
						<el-input v-model="Name_real" style="width:90%" size="small" placeholder="请输入真实姓名"></el-input>
					</div>
				</div>
			</div>
			<div class="editEmployerInfo_item_contentItem">
				<div class="editEmployerInfo_item_contentItem_item">
					<div class="editEmployerInfo_item_contentItem_item_left editEmployerInfo_required">您的手机	</div>
					<div class="editEmployerInfo_item_contentItem_item_right">
						<el-input v-model="Mobile" style="width:90%" size="small" placeholder="请输入内容"></el-input>
					</div>
				</div>
			</div>
		</div>
		<div class="editEmployerInfo_item editEmployerInfo_spacing">
      <div class="editEmployerInfo_item_title">
        <div class="editEmployerInfo_item_title_text">公司信息
        </div>
      </div>
			<div class="editEmployerInfo_item_contentItem">
				<div class="editEmployerInfo_item_contentItem_item">
					<div class="editEmployerInfo_item_contentItem_item_left">公司名称	</div>
					<div class="editEmployerInfo_item_contentItem_item_right">
						<el-input v-model="Company" style="width:90%" size="small" placeholder="请输入内容"></el-input>
					</div>
				</div>
				<div class="editEmployerInfo_item_contentItem_item">
					<div class="editEmployerInfo_item_contentItem_item_left">公司地址</div>
					<div class="editEmployerInfo_item_contentItem_item_right">
						<el-input v-model="Location" style="width:90%" size="small" placeholder="请输入内容"></el-input>
					</div>
				</div>
			</div>
			<div class="editEmployerInfo_otherInfo_contentItem">
				<div class="editEmployerInfo_otherInfo_contentItem_left">
					产品介绍
				</div>
				<div class="editEmployerInfo_otherInfo_contentItem_right">
					<el-input v-model="Company_introduction" type="textarea" style="width:96%;" :rows="5" placeholder="请输入内容"></el-input>
				</div>
			</div>
		</div>
		<div class="editEmployerInfo_submitBox editEmployerInfo_spacing">
			<a class="editEmployerInfo_submitBox_button" @click="saveEmployerInfo">提交</a>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return {
			Name:'',
			Name_real:'',
			Mobile:'',
			Company:'',
			Location:'',
			Company_introduction:'',
			employerId: ""
		}
	}, 
	created(){
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
				this.employerId = userId;
		        this.getEmployerInfo();
			}else{
				this.employerId = '';
				this.initPage({});
			}
		},
		getEmployerInfo(){
			this.$http.post('/employer/getSelfInfo',{employerId: this.employerId}).then((res) => {
				let result = res.data;
				if(result.success){
					this.initPage(result.data);
				}
			})
		},
		initPage(employerInfo){
			this.Name = employerInfo.Name ? employerInfo.Name:'';
			this.Name_real = employerInfo.Name_real ? employerInfo.Name_real:'';
			this.Mobile = employerInfo.Mobile ? employerInfo.Mobile:'';
			this.Company = employerInfo.Company ? employerInfo.Company:'';
			this.Location = employerInfo.Location ? employerInfo.Location:'';
			this.Company_introduction = employerInfo.Company_introduction ? employerInfo.Company_introduction:'';
		},
		saveEmployerInfo(){			
			let Name = this.Name.replace(/(^\s*)|(\s*$)/g,'');
			if(Name === ''){
				this.$alert('请填写昵称');
				return;
			}			
			let Name_real = this.Name_real.replace(/(^\s*)|(\s*$)/g,'');
			if(Name_real === ''){
				this.$alert('请填写姓名');
				return;
			}
			let Mobile = this.Mobile.replace(/(^\s*)|(\s*$)/g,'');
			let reg = /^1\d{10}$/;
			if(Mobile === '' || !reg.test(Mobile)){
				this.$alert('请填写正确的手机号');
				return;
			}
			let param = {
				Employer_ID: this.employerId,
				Name,
				Name_real,
				Mobile,
				Company:this.Company.replace(/(^\s*)|(\s*$)/g,''),
				Location:this.Location.replace(/(^\s*)|(\s*$)/g,''),
				Company_introduction:this.Company_introduction.replace(/(^\s*)|(\s*$)/g,'')
			}
			this.$http.post('/employer/editEmployerInfo', param).then((res) => {
				 let result = res.data;
				 if(result.success){
					 this.$alert('保存成功');
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
.editEmployerInfo{
	position: relative;
	min-width: 1100px;
	margin: 0 auto 30px auto;
	width: 80%;
}

.editEmployerInfo_item{
  margin: 30px auto;
}

.editEmployerInfo_item_title{
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.editEmployerInfo_item_title_text{
  position: relative;
  height: 30px;
  line-height: 30px;
  font-size: 18px;
  /* font-weight: bold; */
  color: #64A1D7;
}

.editEmployerInfo_item_title_text_tooltips{
	position: absolute;
	top: 0;
	left: calc(100% + 10px);
	white-space: nowrap;
	font-size: 15px;
	color: red;
}


.editEmployerInfo_item_contentItem{
	height: 40px;
	margin: 10px auto;
}

.editEmployerInfo_item_contentItem_item{
	width: 50%;
	height: 100%;
	float: left;
	position: relative;
}

.editEmployerInfo_item_contentItem_item_left{
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

.editEmployerInfo_required:before {
    content: "*";
    color: #fa5555;
    margin-right: 4px;
}

.editEmployerInfo_item_contentItem_item_right{
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

.editEmployerInfo_otherInfo_contentItem{
	position: relative;
	height: 140px;
	margin: 10px auto;
}

.editEmployerInfo_otherInfo_contentItem_left{
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

.editEmployerInfo_otherInfo_contentItem_right{
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	width: 87.5%;
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
}

.editEmployerInfo_submitBox{
	position: relative;
	height: 40px;
	margin: 10px auto;
	display: flex;
	align-items: center;
	justify-content: center;
}

.editEmployerInfo_submitBox_button{
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

.editEmployerInfo_submitBox_button:hover{
  color: #ffffff;
  background-color: #50A5F5;
  border: 1px solid #50A5F5;
}

@media screen and (max-width: 1366px){
  .editEmployerInfo_spacing{
    margin: 40px auto;
  }
}

@media screen and (min-width: 1367px) and (max-width: 1600px){
  .editEmployerInfo_spacing{
    margin: 65px auto;
  }
}

@media screen and (min-width: 1601px){
  .editEmployerInfo_spacing{
    margin: 100px auto;
  }
}
</style>


