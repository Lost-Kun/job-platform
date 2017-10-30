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
          <el-carousel height="400px" :arrow="'never'">
            <el-carousel-item v-for="(item, key) in carouselPictures" :key="'carouselPicture'+key">
              <img class="index_carouselPicture" :src="item" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <div class="sentenceBlock">
      为什么选择我们？
    </div>
    <div class="whyChoose">
      <div class="whyChoose_item_box" v-for="(chooseItem, index) in whyChooseArr" :key="'choose'+index" >
        <div :class="['whyChoose_item',chooseItem.isHover?'whyChoose_item--hover':'']" @mouseover="whyChooseMouseOver(chooseItem)" @mouseout="whyChooseMouseOut(chooseItem)">
          <div class="whyChoose_item_icon">
            <img :class="['whyChoose_item_icon_img',chooseItem.isHover?'whyChoose_item_icon_img--hover':'']" :src="chooseItem.src"/>
          </div>
          <div :class="['whyChoose_item_title',chooseItem.isHover?'whyChoose_item_title--hover':'']">
            {{chooseItem.title}}
          </div>
          <div :class="['whyChoose_item_description',chooseItem.isHover?'whyChoose_item_description--hover':'']">
            {{chooseItem.description}}
          </div>
        </div>
      </div>
    </div>
    <div class="sentenceBlock">
      他们这么说
    </div> 
    <div class="theySay">
      <div class="theySay_box">
          <el-carousel height="350px" :arrow="'never'" type="card" :autoplay="false" indicator-position="none">
            <el-carousel-item v-for="(item, key) in carouselPictures" :key="'theySay'+key">
              <img class="index_carouselPicture" style="width:500px;margin: 0 auto;" :src="item" />
            </el-carousel-item>
          </el-carousel>
      </div>
    </div>
    <div class="sentenceBlock">
      立即发布您的项目！
    </div> 
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
      whyChooseArr:[
        {
          src:'../static/images/people.jpg',
          title:'优质人才',
          isHover:false,
          description:'人才来自著名互联网公司，百度、腾讯、阿里、滴滴、搜狗、360、京东、美团等等，让您拥有一流的开发人员！'
        },
        {
          src:'../static/images/rocket.jpg',
          title:'快速对接',
          isHover:false,
          description:'企业提出用人需求后，客服一对一对接，全程参与筛选人才，不管是工作日还是双休日的需求，当天即可确定对口人才！'
        },
        {
          src:'../static/images/money.jpg',
          title:'资金担保',
          isHover:false,
          description:'创业公司将薪酬先预付到平台，待确认工程师完工后再实际支付，一小时内免费退款，保证项目顺利进展和资金安全！'
        }
      ]
    }
  },
  methods:{
    whyChooseMouseOver(item){
      item.isHover = true;
    },
    whyChooseMouseOut(item){
      item.isHover = false;
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
  height: 600px;
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
  margin-left: 10px;
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

.sentenceBlock{
  height: 60px;
  line-height: 60px;
  font-size: 25px;
}

.whyChoose{
  height: 380px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 50px;
}

.whyChoose_item_box{
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.whyChoose_item{
  width: 350px;
  height: 380px;
  border: 1px solid #F5F5F5;
}

.whyChoose_item--hover{
  /* border: 2px solid #F5F5F5; */
  box-shadow: 0 4px 6px 0 rgba(0,0,0,.24), 0 0 8px 0 rgba(0,0,0,.08);
}

.whyChoose_item_icon{
  height: 52%;
  width: 80%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.whyChoose_item_icon_img{
  width: 150px;
  height: 150px;
}

.whyChoose_item_icon_img--hover{
  width: 160px;
  height: 160px;
}

.whyChoose_item_title{
  height: 15%;
  width: 80%;
  margin: 0 auto;
  font-size: 20px;
  font-weight: bold;
}

.whyChoose_item_title--hover{
  font-size: 21px;
}

.whyChoose_item_description{
  height: 30%;
  width: 80%;
  font-size: 16px;
  margin: 0 auto;
  line-height: 1.6;
}

.whyChoose_item_description--hover{
  width: 85%;
  font-size: 17px;
}

.theySay{
  height: 350px;
  margin-top: 30px;
  margin-bottom: 60px;
}

.theySay_box{
  width: 80%;
  min-width: 1000px;
  height: 100%;
  margin: 0 auto;
}

</style>


