<template>
  <div class="project">
        <div class="project_searchBox"> 
      <input class="project_searchBox_input" v-model="searchText"/>
      <a class="project_searchBox_search" @click="search">搜索</a>
      <a class="project_searchBox_contactWoker" @click="editTalentInfo">注册成为兼职专家</a>
    </div>
    <div class="project_sortBox">
      <div class="project_sortBox_item">
        <a class="project_sortBox_a" @click="sortProjectList(0)">最新发布</a>
      </div>
      <div class="project_sortBox_item">
        <el-dropdown @command="sortProjectList">
          <span class="el-dropdown-link">
            日薪排序<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="1">升序</el-dropdown-item>
            <el-dropdown-item :command="2">降序</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="project_sortBox_item">
        <el-dropdown @command="sortProjectList">
          <span class="el-dropdown-link">
            总价排序<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="3">升序</el-dropdown-item>
            <el-dropdown-item :command="4">降序</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="project_infoListBox">
      <div class="project_infoItem" v-for="(projectItem, key) in projectList" :key="'projectItem'+key">
        <div class="project_infoItem_left">
          <div class="project_infoItem_left_title" @click="intoProjectDetail(projectItem)">
            {{projectItem.Name}}
          </div>
          <div class="project_infoItem_left_content">
            {{projectItem.Desp}}
            <a class="project_infoItem_left_content_expend"><span>展开</span><i class="el-icon-arrow-down"></i></a>
          </div>

        </div>
        <div class="project_infoItem_right">
          <div class="project_infoItem_right_top">
            <div class="project_infoItem_right_top_item">日薪：{{projectItem.Wage}}元/天</div>
            <div class="project_infoItem_right_top_item">工时：{{projectItem.Length}}天</div>
            <div class="project_infoItem_right_top_item">总价：{{projectItem.totalWage}}元</div>
          </div>
          <div class="project_infoItem_right_bottom">
            <div class="project_infoItem_right_bottom_left">
              <a :class="['project_infoItem_right_bottom_left_a',(projectItem.State === 5 || projectItem.State === 7)?'project_infoItem_right_bottom_left_a--disable':'']">立即投递</a>
            </div>
            <div class="project_infoItem_right_bottom_right">
              已有234人投递
            </div>
          </div>
        </div> 
      </div>
    </div>
    <div class="project_pagingBox" v-show="total > pageSize">
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
      projectList:[],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      searchText:'',
      isSearchingText:'',
      sortType: 0
    }
  },
  mounted(){
    this.expandBind();
  },
  created(){
    this.getProjectList();
  },
  updated(){
    $(".project_infoListBox .project_infoItem_left_content").each(function(){
      $(this).removeClass("project_infoItem_left_content--overflowHide");
    })
    this.$nextTick(() => {
      this.expandBind();
    })
  },
  methods:{
    getProjectList(){
      let param = {
        searchText: this.isSearchingText,
        sortType: this.sortType,
        pageIndex: this.currentPage,
        pageSize: this.pageSize
      };
			this.$http.post('/project/getProjectList', param).then((res) => {
				 let result = res.data;
				 if(result.success){
           this.projectList = result.data;
           this.total = result.total;
				 }
			})
    },
    expandBind(){
      $(".project_infoListBox .project_infoItem_left_content").each(function(){
        if($(this).height() > 160){
          $(this).children('.project_infoItem_left_content_expend').show();
          $(this).addClass("project_infoItem_left_content--overflowHide");
          $(this).children('.project_infoItem_left_content_expend').children('span').text("展开");
          $(this).children('.project_infoItem_left_content_expend').children('i').removeClass("el-icon-arrow-up").addClass("el-icon-arrow-down");
          $(this).children('.project_infoItem_left_content_expend').off().on("click",function(){
            if($(this).children('span').text() === "展开"){
              $(this).parent().removeClass("project_infoItem_left_content--overflowHide");
              $(this).children('span').text("收起");
              $(this).children('i').removeClass("el-icon-arrow-down").addClass("el-icon-arrow-up");
            }else{
              $(this).parent().addClass("project_infoItem_left_content--overflowHide");
              $(this).children('span').text("展开");
              $(this).children('i').removeClass("el-icon-arrow-up").addClass("el-icon-arrow-down");
            }
          })
        }else{
          $(this).children('.project_infoItem_left_content_expend').hide();
        }
      })
    },
    intoProjectDetail(projectItem){
      this.$router.push({
        path:'/homePage/projectDetail',
        query:{
          id: projectItem.Project_ID
        }
      })
    },
    editTalentInfo(){
      this.$router.push({
        path:'/homePage/editTalentInfo'
      })
    },
    search(){
      this.isSearchingText = this.searchText.replace(/(^\s*)|(\s*$)/g,'');
      this.currentPage = 1;
      this.getProjectList();
    },
    sortProjectList(command){
      this.sortType = command;
      this.currentPage = 1;
      this.getProjectList();
    },
    currentPageChange(){
      this.getProjectList();
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
  padding: 10px 0;
}

.project_infoItem_left{
  /* height: 300px; */
  width: calc(100% - 250px);
}

.project_infoItem_left_title{
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.project_infoItem_left_content{
  position: relative;
  min-height: 94px;
  font-size: 15px;
  padding: 0 50px 0 20px;
  line-height: 1.6;
}

.project_infoItem_left_content--overflowHide{
  height: 94px;
  overflow: hidden;
}

.project_infoItem_left_content_expend{
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 14px;
  cursor: pointer;
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
  bottom: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
}

.project_infoItem_right_top_item{
  width: 70%;
  font-size: 16px;
  font-weight: bold;
  height: 30px;
  line-height: 30px;
}

.project_infoItem_right_bottom{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30px;
}

.project_infoItem_right_bottom_left{
  width: 50%;
  height: 100%;
  float: left;
  display: flex;
  justify-content: center;
}

.project_infoItem_right_bottom_left_a{
  color: #1A93EC;
  cursor: pointer;
  font-size: 15px;
}

.project_infoItem_right_bottom_left_a--disable{
  color: #D5D5D5;
}

.project_infoItem_right_bottom_right{
  width: 50%;
  height: 100%;
  float: left;
  font-size: 14px;
  color: #D5D5D5;
  /* display: flex;
  justify-content: center; */
  /* padding: 0 10px; */
}

.project_pagingBox{
  margin: 10px auto;
  height: 60px;
}
</style>