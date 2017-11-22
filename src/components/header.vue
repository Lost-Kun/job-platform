<template>
  <div class="header text1">
    <img class="logo" src="../../static/images/timg.jpg" @click="backToIndex"/>
		<ul class="nav">
      <li v-for="(navItem, index) in navList"><a :class="['nav_link',navItem.isSelected?'nav_link--selected':'']" @click="navChange(navItem, index)">{{navItem.name}}</a></li>
    </ul>
		<div class="userBox">
      <!-- <div class="userInfoBox" v-if="isLogin">

      </div> -->
      <div class="loginBox">
        <a class="login_link" v-show="!isLogin" @click="showLoginPicture">登录</a>
        <a class="login_link" v-show="isLogin" @click="enterUserInfo">个人主页</a>
        <a class="login_link" v-show="isLogin" @click="logout">退出</a>
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
      isLogin:false,
      userId: null,
      userType: null
    }
  },
  created(){
    this.checkLogin();
    this.navList.forEach((item) => {
      item.isSelected = this.$route.path === item.path;
    });
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
        this.userType = userType;
      }else{
        this.isLogin = false;
        this.userId = null;
        this.userType = null;
      }
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
    //登录
    showLoginPicture(){
      this.$login();
    },
    enterUserInfo(){
      this.$router.push({
        path:'/homePage/userInfo'
      })
    },
    logout(){
      this.$confirm('是否确认退出?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        lockScroll:false
      }).then(() => {
          let d = new Date();  
          d.setTime(d.getTime() + (-1*24*60*60*1000));
          document.cookie = `userId=${this.userId}; expires=${d.toUTCString()}`;
          document.cookie = `userType=${this.userType}; expires=${d.toUTCString()}`;
          window.bus.$emit('checkLogin');
      }).catch(() => {       
      });
    }
  },
  watch:{
    $route(){
      this.navList.forEach((item) => {
        item.isSelected = this.$route.path === item.path;
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
  width: 150px;
  line-height: 70px;
  text-align: right;
}

.login_link{
  cursor: pointer;
  margin: auto 10px;
}

.login_link:hover{
  color: #5A9AD5;
}
</style>