<template>
  <div class="mainPage">
		<div class="headerContainer">
    	<my-header></my-header>
		</div>
		<div class="bodyContainer">
    	<router-view/>
		</div>
  </div>
</template>

<script>
import myHeader from '../components/header.vue'

export default {
  data(){
    return {
      name:'主页面'
    }
  },
  components:{
    myHeader
  },
  created(){
    if(this.$route.path === '/homePage'){
      this.$router.push('/homePage/index')
    }
  }
}
</script>

<style>
.mainPage{
  min-width: 1200px;
	width: 100%;
  z-index: 1;
}

.headerContainer{
	height: 60px;
  border-bottom: 1px solid #E8E8E8;
}

.bodyContainer{
  position: relative;
}
</style>