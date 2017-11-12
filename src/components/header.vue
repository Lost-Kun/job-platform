<template>
  <div class="header text1">
    <img class="logo" src="../../static/images/timg.jpg" @click="backToIndex"/>
		<ul class="nav">
      <li v-for="(navItem, index) in navList"><a :class="['nav_link',navItem.isSelected?'nav_link--selected':'']" @click="navChange(navItem, index)">{{navItem.name}}</a></li>
    </ul>
		<div class="userBox">
      <div class="userInfoBox" v-if="isLogin">

      </div>
      <div class="loginBox" v-else>
        <a class="login_link" @click="showLoginPicture">微信登录</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      indexPath:'/homePage/index',
      navList:[
        {
          name:'浏览人才',
          isSelected: false,
          path:'/homePage/talent'
        },
        {
          name:'发现项目',
          isSelected: false,
          path:'/homePage/project'
        }
      ],
      isLogin:false
    }
  },
  created(){
    this.checkLogin();
    this.navList.forEach((item) => {
      item.isSelected = this.$route.path === item.path;
    })
  },
  methods:{
    //检验用户登录
    checkLogin(){   

    },
    //返回首页
    backToIndex(){
      this.navList.forEach((item) => {
        item.isSelected = false;
      })
      this.$router.push(this.indexPath);
    },
    //tab切换
    navChange(navItem, indexSelected){
      this.navList.forEach((item, index) => {
        item.isSelected = index === indexSelected;
      })
      this.$router.push(navItem.path);
    },
    //二维码登录
    showLoginPicture(){
      this.$router.push({
        path:'/homePage/userInfo'
      })
    }
  }
}
</script>

<style>
.header{
	width: 100%;
  position: fixed;
  height: 60px;
  display: flex;
  align-items: center;
  z-index: 100;
  background-color: #ffffff;
  border-bottom: 1px solid #E8E8E8;
}

.logo{
  width: 40px;
  height: 40px;
  margin-left: 40px;
  cursor: pointer;
}

.nav{
  margin-left: 40px;
  height: 40px;
}

.nav li{
  display: inline-block;
  height: 100%;
  line-height: 48px;
}

.nav_link{
  cursor: pointer;
  padding-bottom: 6px;
  margin-left: 60px;
}

.nav_link:hover{
  border-bottom: 3px solid #5A9AD5
}

.nav_link--selected{
  border-bottom: 3px solid #5A9AD5
}

.userBox{
  position: absolute;
  top: 0;
  right: 40px;
  bottom: 0;
}

.loginBox{
  height: 100%;
  width: 100px;
  line-height: 70px;
}

.login_link{
  cursor: pointer;
}

.login_link:hover{
  color: #5A9AD5;
}
</style>