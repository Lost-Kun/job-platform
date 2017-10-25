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
  }
}
</script>

<style>
.mainPage{
  min-width: 1000px;
	width: 100%;
}

.headerContainer{
	height: 60px;
}

.bodyContainer{
	position: relative;
}
</style>