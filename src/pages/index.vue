<template>
  <div class="index">
    <div class="mainShowContainer">
      <div class="mainShowContainer_left">
        <div class="mainShowContainer_left_slogan">
          国内互联网行业顶级设计师为您服务！
        </div>
        <div class="mainShowContainer_left_description">
          <div class="mainShowContainer_left_description_item">
            节假日无休，12小时内对需求
          </div>
          <div class="mainShowContainer_left_description_item">
            快捷操作，无需注册，快速发布需求，高效匹配专家
          </div>
        </div>
        <div class="mainShowContainer_left_operation">
          <a class="mainShowContainer_left_operation_button button_full">发布任务</a>
          <a class="mainShowContainer_left_operation_button">寻找兼职</a>
        </div>
      </div>
      <div class="mainShowContainer_right">
        <div class="mainShowContainer_right_carouselPictureBox">
          <el-carousel height="400px" :arrow="'never'" :indicator-position="'outside'">
            <el-carousel-item v-for="(item, key) in carouselPictures" :key="'carouselPicture'+key">
              <img class="index_carouselPicture" :src="item" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
// import carousel from '../components/carousel.vue'
export default {
  data(){
    return {
      carouselPictures:[
        '../static/images/wulimi.jpg',
        '../static/images/baima.jpg',
        '../static/images/huanxiang.jpg'
      ],
    }
  }
}
</script>

<style>
.index{
  position: relative;
}

.mainShowContainer{
  position: relative;
  height: 640px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mainShowContainer_left_slogan{
  font-size: 25px;
  font-weight: bold;
  height: 25%;
  line-height: 80px;
}

.mainShowContainer_left_description{
  height: 30%;
}

.mainShowContainer_left_description_item{
  margin-top: 10px;
}

.mainShowContainer_left_operation{
  height: 45%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mainShowContainer_left_operation_button{
  display: inline-block;
  width: 140px;
  height: 45px;
  line-height: 45px;
  border-radius: 6px;
  border: 2px solid #5A9AD5;
  font-size: 18px;
  color: #5A9AD5;
  cursor: pointer;
  margin-left: 80px;
  margin-right: 80px;
}

.mainShowContainer_left_operation_button:hover{
  color: #218EF7;
  border: 2px solid #218EF7;
}

.button_full{
  background-color: #5A9AD5;
  color: #ffffff;
}

.button_full:hover{
  color: #ffffff;
  background-color: #50A5F5;
  border: 2px solid #50A5F5;
}

@media screen and (max-width: 1366px){

.mainShowContainer_left{
  width: 600px;
  height: 350px;
}

.mainShowContainer_right{
  width: 600px;
  height: 500px;
  margin-left: 20px;
}

}

@media screen and (min-width: 1367px) and (max-width: 1600px){

.mainShowContainer_left{
  width: 650px;
  height: 350px;
}

.mainShowContainer_right{
  width: 650px;
  height: 500px;
  margin-left: 50px;
}

}

@media screen and (min-width: 1601px){

.mainShowContainer_left{
  width: 750px;
  height: 350px;
}

.mainShowContainer_right{
  width: 750px;
  height: 500px;
  margin-left: 100px;
}

}

.mainShowContainer_right_carouselPictureBox{
  width: 650px;
  height: 500px;
}

.index_carouselPicture{
  width: 100%;
  height: 100%;
}
</style>


