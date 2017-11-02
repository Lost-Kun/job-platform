<template>
  <div id="fullpage">
    <div class="section">
      <div style="width:100%;height:100%;background-color:blue;min-height:300px;"></div>
    </div>
    <div class="section">
      <div style="width:100%;height:100%;background-color:red;"></div>
    </div>
    <div class="section">
      <div style="width:100%;height:100%;background-color:pink;"></div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
    }
  },
  mounted(){
    $('#fullpage').fullpage({
      autoScrolling:false
    });
  },
  beforeDestroy(){
    $.fn.fullpage.destroy('all');
  }
}
</script>

<style>

</style>