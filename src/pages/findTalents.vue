<template>
  <div class="talent">
    <div class="talent_searchBox"> 
      <input class="talent_searchBox_input"/>
      <a class="talent_searchBox_search">搜索</a>
      <a class="talent_searchBox_contactWoker">联系专员为您推荐</a>
    </div>
    <div class="talent_sortBox">
      <div class="talent_sortBox_item">
        <a class="talent_sortBox_a">默认排序</a>
      </div>
      <div class="talent_sortBox_item">
        <el-dropdown>
          <span class="el-dropdown-link">
            日薪排序<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>升序</el-dropdown-item>
            <el-dropdown-item>降序</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="talent_sortBox_item">
        <el-dropdown>
          <span class="el-dropdown-link">
            经验排序<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>升序</el-dropdown-item>
            <el-dropdown-item>降序</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="talent_infoListBox">
      <div class="talent_infoItem" v-for="i in 10">
        <div class="talent_infoItem_left" @click="enterTalentDetail">
          <div class="talent_infoItem_left_title">
            <div class="talent_infoItem_left_title_company">上海微创软件股份有限公司</div>
            <div class="talent_infoItem_left_title_position">.net开发工程师</div>
            <div class="talent_infoItem_left_title_experience">12年</div>
          </div>
          <div class="talent_infoItem_left_rate">
            <el-rate
              v-model="value5"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate>
          </div>
          <div class="talent_infoItem_left_skill">
            <div class="talent_infoItem_left_text">技能：</div>
            <div class="talent_infoItem_left_content" style="color:#1A93EC;">asp.net,mvc,autofac,ef,redis,rabbitmq,.net core,jquery,android,sql server,mysql,oracle等</div>
          </div>
          <div class="talent_infoItem_left_project">
            <div class="talent_infoItem_left_text">作品：</div>
            <div class="talent_infoItem_left_content">在线支付对接，及积分换算名品导购网后台，数据库设计，前台CMS程序嵌入；筑;人网门禁系统（CS），桌面应用及硬件接口对接，Socket通信实现局域网内指令传输。</div>
          </div>
        </div>
        <div class="talent_infoItem_right">
          <div class="talent_infoItem_right_item">800/天</div>
          <div class="talent_infoItem_right_item">   
            <a :class="['talent_infoItem_right_order',i%2 === 0?'talent_infoItem_right_order--disable':'']">{{i%2 === 0?'已被预约':'立即预约'}}</a>
          </div>
        </div>
      </div> 
    </div>
    <div class="talent_pagingBox">

    </div>
  </div>
</template> 

<script>
export default {
  data(){
    return {
      talentList:[],
      value5:3.6
    }
  },
  methods:{
    enterTalentDetail(talentItem){
      this.$router.push({
        path:'/homePage/talentDetail',
        query:{
          id:'123'
        }
      })
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
</style>