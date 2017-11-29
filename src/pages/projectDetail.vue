<template>
	<div class="projectDetail">
    <div class="projectDetail_basicInfo">
			<div class="projectDetail_basicInfo_left">
				<div class="projectDetail_basicInfo_left_top" :title="projectInfo.Name">{{projectInfo.Name}}</div>
				<div class="projectDetail_basicInfo_left_center">
					<div class="projectDetail_basicInfo_left_center_wage">日薪：{{projectInfo.Wage}}元/天</div>
					<div class="projectDetail_basicInfo_left_center_length">预计工期：{{projectInfo.Length}}天</div>
				</div>
				<div class="projectDetail_basicInfo_left_bottom">发布者：{{projectInfo.Employer_Name}}</div>
			</div>
			<div class="projectDetail_basicInfo_right">
				<div class="projectDetail_basicInfo_right_item">总价：{{projectInfo.Wage*projectInfo.Length}}元</div>
				<div class="projectDetail_basicInfo_right_item">
					<a @click="sendApply(projectInfo)" :class="['projectDetail_basicInfo_right_button','projectDetail_button_full',(projectInfo.State === 5 || projectInfo.State === 7 || projectInfo.hasApplyed)?'projectDetail_button--disable':'']">
						{{(projectInfo.State === 5 || projectInfo.State === 7)?'已完成':(projectInfo.hasApplyed?'已投递':'立即投递')}}
					</a>
					<span class="projectDetail_basicInfo_right_span">已有{{projectInfo.Delivery_number}}人投递</span>
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
			projectId: null,
			projectInfoOrign:{},
      isLogin:false,
      userId: null,
			userType: null,
			applyedProjectList:[],
			talentInfo:{}
		}
	},
	computed:{
		projectInfo(){
			let applyedProjectList = this.applyedProjectList;
			let projectInfo = this.projectInfoOrign;
			projectInfo.hasApplyed = false;
			for(let i = 0; i<applyedProjectList.length; i++){
				if(applyedProjectList[i].Project_ID === projectInfo.Project_ID){
					projectInfo.hasApplyed = true;
					break;
				}
			}
			return projectInfo;
		}
	},
	created(){
		this.projectId = this.$route.query.id;
		this.getProjectInfo();
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
        this.isLogin = true;
        this.userId = userId;
        this.userType = parseInt(userType);
				this.getApplyedProjectList();
				if(this.userType === 0){
					this.getTalentInfo();
				}
      }else{
        this.isLogin = false;
        this.userId = null;
        this.userType = null;
      }
    },
		getTalentInfo(){
			this.$http.post('/talent/getEmployeeInfo',{employeeId: this.userId}).then((res) => {
				let result = res.data;
				if(result.success){
					this.talentInfo = result.data;
				}
			})
		},
    getApplyedProjectList(){
      if(this.userType === 0){
        this.$http.post('/talent/getApplyList', {employeeId:this.userId}).then((res) => {
          let result = res.data;
          if(result.success){
            this.applyedProjectList = result.data;
          }
        })
      }
    },
		getProjectInfo(){
			this.$http.post('/project/getProjectInfo',{projectId: this.projectId}).then((res) => {
				let result = res.data;
				if(result.success){
					this.projectInfoOrign = result.data;
					this.projectInfoOrign.Desp = result.data.Desp.replace(/\n/g,'<br>');
				}
			})
		},
    sendApply(projectItem){
      if(projectItem.State !== 5 && projectItem.State !== 7 && !projectItem.hasApplyed){
        if(this.isLogin){
          if(this.userType === 1){
            this.$alert('雇主不能投递项目，请登录设计师账号',{lockScroll:false});
            return;
					}
					if(this.talentInfo.Name === null || this.talentInfo.Mobile === null){
            this.$alert('请编辑简历，完成个人信息注册',{
              lockScroll:false,
              callback:()=>{
                this.$router.push({
                  path:'/homePage/editTalentInfo'
                })
              }
            });
            return;
					}
          this.$http.post('/project/applyProject', {Project_ID:projectItem.Project_ID, Employee_ID:this.userId}).then((res) => {
            let result = res.data;
            if(result.success){
              projectItem.Delivery_number ++; 
							this.$alert('投递成功',{lockScroll:false});
							projectItem.hasApplyed = true;
            }else{
              this.$alert(result.msg,{lockScroll:false});
            }
          })
        }else{
          this.$login();
        }
      }
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
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
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

.projectDetail_button--disable{
  border: 1px solid #D5D5D5;
  background-color: #D5D5D5;
  color: #ffffff;
}

.projectDetail_button--disable:hover{
  border: 1px solid #D5D5D5;
  background-color: #D5D5D5;
  color: #ffffff;
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
	min-height: 400px;
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
  word-wrap: break-word;
}
</style>


