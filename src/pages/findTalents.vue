<template>
  <div class="talent">
    <div class="talent_searchBox"> 
      <input class="talent_searchBox_input" v-model="searchText" :maxlength="100"/>
      <a class="talent_searchBox_search" @click="search">搜索</a>
      <a class="talent_searchBox_contactWoker" @click="contactWorker">联系专员为您推荐</a>
    </div>
    <div class="talent_sortBox">
      <div class="talent_sortBox_item">
        <a class="talent_sortBox_a" @click="sortTalentList(0)">默认排序</a>
      </div>
      <div class="talent_sortBox_item">
        <el-dropdown @command="sortTalentList">
          <span class="el-dropdown-link">
            日薪排序<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="1">升序</el-dropdown-item>
            <el-dropdown-item :command="2">降序</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="talent_sortBox_item">
        <el-dropdown @command="sortTalentList">
          <span class="el-dropdown-link">
            经验排序<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="3">升序</el-dropdown-item>
            <el-dropdown-item :command="4">降序</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="talent_infoListBox">
      <div class="talent_infoItem" v-for="(item, index) in talentList" :key="'talent_'+index">
        <div class="talent_infoItem_left" @click="enterTalentDetail(item)">
          <div class="talent_infoItem_left_title">
            <div class="talent_infoItem_left_title_company">{{item.Job_company}}</div>
            <div class="talent_infoItem_left_title_position">{{item.Job_position}}</div>
            <div class="talent_infoItem_left_title_experience">{{item.Job_experience}}年</div>
          </div>
          <div class="talent_infoItem_left_rate">
            <el-rate
              v-model="item.Rating"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate>
          </div>
          <div class="talent_infoItem_left_skill">
            <div class="talent_infoItem_left_text">技能：</div>
            <div class="talent_infoItem_left_content" style="color:#1A93EC;">{{item.Skills}}</div>
          </div>
          <div class="talent_infoItem_left_project">
            <div class="talent_infoItem_left_text">作品：</div>
            <div class="talent_infoItem_left_content">{{item.Projects}}</div>
          </div>
        </div>
        <div class="talent_infoItem_right">
          <div class="talent_infoItem_right_item">{{item.Wage}}/天</div>
          <div class="talent_infoItem_right_item">   
            <a @click="orderTalent(item)" :class="['talent_infoItem_right_order',item.State === 1?'talent_infoItem_right_order--disable':'']">{{item.State === 1?'已被预约':'立即预约'}}</a>
          </div>
        </div>
      </div> 
    </div>
    <div class="talent_pagingBox" v-show="total > pageSize">
      <el-pagination
        layout="prev, pager, next"
        @current-change="currentPageChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template> 

<script>
export default {
  data(){
    return {
      talentList:[],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      searchText:'',
      isSearchingText:'',
      sortType: 0,
      isLogin:false,
			userType: null
    }
  },
  created(){
    this.getTalentList();
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
				this.userType = parseInt(userType);
			}else{
				this.isLogin = false;
				this.userType = null;
			}
		},
    enterTalentDetail(talentItem){
      this.$router.push({
        path:'/homePage/talentDetail',
        query:{
          id:talentItem.Employee_ID
        }
      })
    },
    getTalentList(){
      let param = {
        searchText: this.isSearchingText,
        sortType: this.sortType,
        pageIndex: this.currentPage,
        pageSize: this.pageSize
      };
			this.$http.post('/talent/getTalentList', param).then((res) => {
				 let result = res.data;
				 if(result.success){
           this.talentList = result.data;
           this.total = result.total;
				 }
			})
    },
    search(){
      this.isSearchingText = this.searchText.replace(/(^\s*)|(\s*$)/g,'');
      this.currentPage = 1;
      this.getTalentList();
    },
    sortTalentList(command){
      this.sortType = command;
      this.currentPage = 1;
      this.getTalentList();
    },
    currentPageChange(){
      this.getTalentList();
    },
		contactWorker(){
			this.$contactWoker();
		},
		orderTalent(talentInfo){
			if(talentInfo.State === 0){
				if(this.isLogin){
					if(this.userType === 0){
						this.$alert('设计师不能预约人才，请登录雇主账号',{lockScroll:false});
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
.talent{
  min-width: 1100px;
  margin: 0 auto;
  width: 80%; 
}

.talent_searchBox{
   height: 50px;
   display: flex;
   align-items: center;
   justify-content: flex-start;
}  

.talent_searchBox_input{
  width: 60%;
  height: 33px;
  border: 1px solid #EEEEEE;
  padding: 0 10px;
}

.talent_searchBox_input:focus{
  border: 1px solid #5C9ED7;
}

.talent_searchBox_search{
  display: inline-block;
  width: 100px;
  height: 35px;
  line-height: 35px;
  background-color: #5C9ED7;
  font-size: 15px;
  color: #ffffff;
  cursor: pointer;
}

.talent_searchBox_search:hover{
  background-color: #50A5F5;
}

.talent_searchBox_contactWoker{
  display: inline-block;
  width: 150px;
  height: 35px;
  line-height: 35px;
  background-color: #5C9ED7;
  font-size: 15px;
  color: #ffffff;
  margin-left: 20px;
  cursor: pointer;
  border-radius: 5px;
}

.talent_searchBox_contactWoker:hover{
  background-color: #50A5F5;
}

.talent_sortBox{
  margin-top: 5px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid #EEEEEE;
  font-size: 15px;
  color: #5a5e66;
}

.talent_sortBox_item{
  margin: 0 10px 0 20px;
}

.talent_sortBox_a{
  margin-left: 10px;
  cursor: pointer;
}

.talent_sortBox_a:active{
  color: #1A93EC;
}

.talent_sortBox .el-dropdown{
  font-size: 15px;
  cursor: pointer;
}

.talent_infoListBox{
  margin-top: 10px;
}

.talent_infoItem{
  position: relative;
  height: 160px;
  /* border: 1px solid #EEEEEE; */
  margin-top: 20px;
  margin-bottom: 20px; 
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.24), 0 0 4px 0 rgba(0,0,0,.08);
}

.talent_infoItem_left{
  position: absolute;
  left: 25px;
  right: 200px;
  height: 100%;
  overflow: hidden;
  text-align: left;
  cursor: pointer;
}

.talent_infoItem_left_title{
  height: 34%;
  line-height: 55px;
  font-size: 16px;
  font-weight: bold;
}

.talent_infoItem_left_title_company{
  float: left;
  max-width: 400px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.talent_infoItem_left_title_position{
  float: left;
  margin: 0 20px;
  max-width: 250px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.talent_infoItem_left_title_experience{
  float: left;
  max-width: 50px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.talent_infoItem_left_rate{
  height: 18%;
  width: 100%;
  margin-top: 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.talent_infoItem_left_skill{
  position: relative;
  height: 23%;
}

.talent_infoItem_left_project{
  position: relative;
  height: 25%;
}

.talent_infoItem_left_text{
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  bottom: 0;
  font-size: 15px;
  font-weight: bold;
}

.talent_infoItem_left_content{
  position: absolute;
  top: 0;
  left: 50px;
  right: 0;
  bottom: 0;
  font-size: 15px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.talent_infoItem_right{
  position: absolute;
  right: 0;
  width: 200px;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  font-size: 15px;
}

.talent_infoItem_right_item{
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  margin: 5px auto;
}

.talent_infoItem_right_order{
  color: #1A93EC;
  cursor: pointer;
  font-size: 15px;
  font-weight: normal;
}

.talent_infoItem_right_order--disable{
  color: #D5D5D5;
}

.talent_pagingBox{
  margin: 10px auto;
  height: 60px;
}
</style>