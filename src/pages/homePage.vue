<template>
  <div class="mainPage">
		<div class="headerContainer">
    	<my-header></my-header>
		</div>
		<div class="bodyContainer">
    	<router-view/>
		</div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import myHeader from '../components/header.vue'
import myFooter from '../components/footer.vue'

export default {
  data(){
    return {
      name:'主页面'
    }
  },
  components:{
    myHeader,
    myFooter
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
  min-width: 1300px;
	width: 100%;
  z-index: 1;
}

.headerContainer{
	height: 60px;
  width: 100%;
}

.bodyContainer{
  position: relative;
  width: 100%;
  background-color: #ffffff;
  min-height: 600px;
}
</style>