<template>
  <div class="project">
        <div class="project_searchBox"> 
      <input class="project_searchBox_input"/>
      <a class="project_searchBox_search">搜索</a>
      <a class="project_searchBox_contactWoker">注册成为兼职专家</a>
    </div>
    <div class="project_sortBox">
      <div class="project_sortBox_item">
        <a class="project_sortBox_a">最新发布</a>
      </div>
      <div class="project_sortBox_item">
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
      <div class="project_sortBox_item">
        <el-dropdown>
          <span class="el-dropdown-link">
            总价排序<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>升序</el-dropdown-item>
            <el-dropdown-item>降序</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="project_infoListBox">
      <div class="project_infoItem" v-for="projectItem in projectList">
        <div class="project_infoItem_left">
        </div>
        <div class="project_infoItem_right">
          <div class="project_infoItem_right_top">
            <div class="project_infoItem_right_top_item">日薪：{{projectItem.Wage}}元/天</div>
            <div class="project_infoItem_right_top_item">工时：{{projectItem.Length}}天</div>
            <div class="project_infoItem_right_top_item">总价：{{projectItem.Length * projectItem.Wage}}元</div>
          </div>
          <div class="project_infoItem_right_bottom">
            <div class="project_infoItem_right_bottom_left">
              <a>立即投递</a>
            </div>
            <div class="project_infoItem_right_bottom_right">
              已有234人投递
            </div>
          </div>
        </div> 
      </div>
    </div>
    <div class="project_pagingBox">
      <el-pagination
        layout="prev, pager, next"
        :total="100">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      projectList:[
        {
          Project_ID: 1,
          Name: '消费信息分享评论网站搭建',
          Desp: '需要开发一个消费信息分享+用户评论的网站，主要是手机端访问.比如有些商品有便宜打折的信息，展示这个商品，同时用户可以点评。',
          Wage: 800,
          Length: 20,
          State: 0,
          Employer_ID: 1
        },
        {
          Project_ID: 2,
          Name: '消费信息分享评论网站搭建',
          Desp: '需要开发一个消费信息分享+用户评论的网站，主要是手机端访问.比如有些商品有便宜打折的信息，展示这个商品，同时用户可以点评。',
          Wage: 800,
          Length: 20,
          State: 0,
          Employer_ID: 2
        },
        {
          Project_ID: 3,
          Name: '消费信息分享评论网站搭建',
          Desp: '需要开发一个消费信息分享+用户评论的网站，主要是手机端访问.比如有些商品有便宜打折的信息，展示这个商品，同时用户可以点评。',
          Wage: 800,
          Length: 20,
          State: 0,
          Employer_ID: 3
        }
      ]
    }
  }
}
</script>

<style>
.project{
  min-width: 1100px;
  margin: 0 auto;
  width: 80%; 
}

.project_searchBox{
   height: 50px;
   display: flex;
   align-items: center;
   justify-content: flex-start;
}  

.project_searchBox_input{
  width: 60%;
  height: 33px;
  border: 1px solid #EEEEEE;
  padding: 0 10px;
}

.project_searchBox_input:focus{
  border: 1px solid #5C9ED7;
}

.project_searchBox_search{
  display: inline-block;
  width: 100px;
  height: 35px;
  line-height: 35px;
  background-color: #5C9ED7;
  font-size: 15px;
  color: #ffffff;
  cursor: pointer;
}

.project_searchBox_search:hover{
  background-color: #50A5F5;
}

.project_searchBox_contactWoker{
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

.project_searchBox_contactWoker:hover{
  background-color: #50A5F5;
}

.project_sortBox{
  margin-top: 5px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid #EEEEEE;
  font-size: 15px;
  color: #5a5e66;
}

.project_sortBox_item{
  margin: 0 10px 0 20px;
}

.project_sortBox_a{
  margin-left: 10px;
  cursor: pointer;
}

.project_sortBox_a:active{
  color: #1A93EC;
}

.project_sortBox .el-dropdown{
  font-size: 15px;
  cursor: pointer;
}

.project_infoListBox{
  margin-top: 10px;
}

.project_infoItem{
  position: relative;
  min-height: 180px;
  margin-top: 20px;
  margin-bottom: 20px; 
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.24), 0 0 4px 0 rgba(0,0,0,.08);
  text-align: left;
}

.project_infoItem_left{
  /* height: 300px; */
  width: calc(100% - 250px);
}

.project_infoItem_right{
  position: absolute;
  top: 0;
  right: 0;
  width: 250px;
  height: 180px;
}

.project_infoItem_right_top{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
}

.project_infoItem_right_top_item{
  width: 70%;
  font-size: 15px;
  font-weight: bold;
  height: 30px;
  line-height: 30px;
}

.project_infoItem_right_bottom{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
}

.project_infoItem_right_bottom_left{
  width: 50%;
  height: 100%;
  float: left;
  display: flex;
  justify-content: center;
}

.project_infoItem_right_bottom_right{
  width: 50%;
  height: 100%;
  float: left;
  /* display: flex;
  justify-content: center; */
  /* padding: 0 10px; */
}

.project_pagingBox{
  margin: 10px auto;
  height: 60px;
}
</style>