<template>
  <div class="header text1">
    <img class="logo" src="../../static/images/timg.jpg"/>
		<ul class="nav">
      <li v-for="(navItem, index) in navList"><a :class="['nav_link',navItem.isSelected?'nav_link--selected':'']" @click="navChange(navItem, index)">{{navItem.name}}</a></li>
    </ul>
		<div class="userBox">
      <div class="userInfoBox" v-if="isLogin">

      </div>
      <div class="loginBox" v-else>
        <a>微信登录</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
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
    this.navList.forEach((item) => {
      item.isSelected = this.$route.path === item.path;
    })
  },
  methods:{
    navChange(navItem, indexSelected){
      this.navList.forEach((item, index) => {
        item.isSelected = index === indexSelected;
      })
      this.$router.push(navItem.path);
    }
  }
}
</script>

<style>
.header{
	width: 100%;
  position: fixed;
  z-index: 1000;
  height: 60px;
  display: flex;
  align-items: center;
}

.logo{
  width: 40px;
  height: 40px;
  margin-left: 40px;
}

.nav{
  margin-left: 60px;
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
</style>