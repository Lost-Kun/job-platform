<template>
  <div class="mainPage">
		<div class="headerContainer">
    	<my-header></my-header>
		</div>
		<div class="bodyContainer">
    	<router-view/>
		</div>
    <my-footer v-if="!isIndex"></my-footer>
  </div>
</template>

<script>
import myHeader from '../components/header.vue'
import myFooter from '../components/footer.vue'

export default {
  data(){
    return {
      name:'主页面',
      isIndex: false
    }
  },
  components:{
    myHeader,
    myFooter
  },
  created(){
    if(this.$route.path === '/homePage'){
      this.$router.push('/homePage/index');
      this.isIndex = true;
    }else if(this.$route.path === '/homePage/index'){
      this.isIndex = true;
    }else{
      this.isIndex = false;
    }
  },
  watch:{
    $route(){
      if(this.$route.path === '/homePage/index'){
        this.isIndex = true;
      }else{
        this.isIndex = false;
      }
    }
  }
}
</script>

<style>
.mainPage{
  min-width: 1300px;
	width: 100%;
  z-index: 1;
}

.headerContainer{
	height: 60px;
  width: 100%;
}

@media screen and (max-width: 1366px){
.bodyContainer{
  position: relative;
  width: 100%;
  background-color: #ffffff;
  min-height: 648px;
  overflow: hidden;
}
}

@media screen and (min-width: 1367px) and (max-width: 1600px){
.bodyContainer{
  position: relative;
  width: 100%;
  background-color: #ffffff;
  min-height: 780px;
  overflow: hidden;
}
}

@media screen and (min-width: 1601px){
.bodyContainer{
  position: relative;
  width: 100%;
  background-color: #ffffff;
  min-height: 960px;
  overflow: hidden;
}
}
</style>