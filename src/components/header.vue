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
        <el-badge :max="99" :value="newsNumber" :hidden="!isLogin || isUserInfoPage">
          <div class="login_link_box" v-show="isLogin">
            <a class="login_link"  @click="enterUserInfo">个人主页</a>
          </div>
        </el-badge>
        <a class="login_link" style="margin-left:25px;"  v-show="isLogin" @click="logout">退出</a>
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
      userType: null,
      newsNumber: 0,
      isUserInfoPage: false,
      stopLoop: false,
      setTimeoutIndex: 0
    }
  },
  created(){
    this.checkLogin();
    this.navList.forEach((item) => {
      item.isSelected = this.$route.path === item.path;
    });
    this.isUserInfoPage = this.$route.path === '/homePage/userInfo';
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
        this.startLoopNews();
      }else{
        this.isLogin = false;
        this.userId = null;
        this.userType = null;
        this.stopLoopNews();
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
    },
    startLoopNews(){
      this.stopLoop = false;
      this.setTimeoutIndex ++;
      this.getNewsNumberLoop(this.setTimeoutIndex);
    },
    stopLoopNews(){
      this.stopLoop = true;
      this.setTimeoutIndex ++;
    },
    getNewsNumberLoop(setTimeoutIndex){
      if(!this.stopLoop && this.isLogin && setTimeoutIndex === this.setTimeoutIndex && !this.isUserInfoPage){
        this.$http.post('/project/getNewsNumber', {userId:this.userId,userType:this.userType}).then((res) => {
          let result = res.data;
          if(result.success){
            this.newsNumber = result.data;
          }else{
            this.newsNumber = 0;
          }
          setTimeout(()=>{
            this.getNewsNumberLoop(setTimeoutIndex);
          },2000);
        }).catch(() => {
          this.newsNumber = 0;
          setTimeout(()=>{
            this.getNewsNumberLoop(setTimeoutIndex);
          },2000);
        })
      }
    }
  },
  watch:{
    $route(newVal, oldVal){
      this.navList.forEach((item) => {
        item.isSelected = this.$route.path === item.path;
      })
      this.isUserInfoPage = this.$route.path === '/homePage/userInfo';
      if(newVal.path === '/homePage/userInfo'){
        this.stopLoopNews();
      }
      if(oldVal.path === '/homePage/userInfo' && newVal.path !== '/homePage/userInfo'){
        this.startLoopNews()
      }
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
  text-align: right;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.login_link{
  cursor: pointer;
  height: 19px;
  line-height: 19px;
  margin-top: 6px;
  /* margin: auto 10px; */
}

.login_link:hover{
  color: #5A9AD5;
}

.login_link_box{
  position: relative;
  margin-top: 6px;
  height: 19px;
  line-height: 19px;
  text-align: center;
  width: 90px;
}
</style>