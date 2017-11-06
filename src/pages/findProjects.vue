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
      <div class="project_infoItem">
        <div class="project_infoItem_left">
          <!-- <div style="height:300px;">

          </div> -->
        </div>
        <div class="project_infoItem_right"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
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
  min-height: 160px;
  margin-top: 20px;
  margin-bottom: 20px; 
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.24), 0 0 4px 0 rgba(0,0,0,.08);
  text-align: left;
}

.project_infoItem_left{
  /* height: 300px; */
  width: calc(100% - 300px);
}

.project_infoItem_right{
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 160px;
}
</style>