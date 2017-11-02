<template>
  <div class="index">
    <div id="fullpage">
      <div class="section index_item">
        <div style="width:100%">
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
        </div>
      </div>
      <div class="section index_item">
        <div style="width:100%">
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
        </div>
      </div>
      <div class="section index_item">
        <div style="width:100%">
        <div class="sentenceBlock">
          他们这么说
        </div> 
        <div class="theySay">
          <div class="theySay_box">
              <el-carousel height="350px" :arrow="'never'" type="card" indicator-position="none">
                <el-carousel-item v-for="(theySayItem, key) in theySayArr" :key="'theySay'+key">
                  <div class="theySay_item">
                    <div class="theySay_item_icon">
                      <div class="theySay_item_icon_box">
                        <img class="theySay_item_icon_img" :src="theySayItem.src"/>
                      </div>
                    </div>
                    <div class="theySay_item_name">
                      {{theySayItem.name}}
                    </div>
                    <div class="theySay_item_info">
                      {{theySayItem.info}}
                    </div>
                    <div class="theySay_item_saidWord">
                      <div class="theySay_item_saidWord_left">

                      </div>
                      <div class="theySay_item_saidWord_center">
                        {{theySayItem.saidWord}}
                      </div>
                      <div class="theySay_item_saidWord_right">

                      </div>
                    </div>
                  </div>
                </el-carousel-item>
              </el-carousel>
          </div>
        </div>
        </div>
      </div>
      <div class="section index_item">
        <div style="width:100%">
        <div class="sentenceBlock">
          立即发布您的项目！
        </div>
        <div class="publishProject">
          <div class="publishProject_container">
            <div class="publishProject_item" v-for="(publishItem, key) in publishProjectArr" :key="'publishKey'+key">
              <div class="publishProject_item_icon">
                <div class="publishProject_item_icon_imgBox">
                  <img class="publishProject_item_icon_img" :src="publishItem.src" />
                </div>
              </div>
              <div class="publishProject_item_name">
                {{publishItem.name}}
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      ],
      theySayArr:[
        {
          src:'../static/images/wulimi.jpg',
          name:'罗明',
          info:'品牌策划推广|9年',
          saidWord:'程序员特别负责，透彻理解需求，逻辑很清晰，时间概念也很强。更重要的是程序员使用最新的热门技术开发，可以帮助创业团队少走一些技术坑。101分，多一分换辛苦，以后还会来平台找你的！'
        },
        {
          src:'../static/images/baima.jpg',
          name:'吴楠',
          info:'软件架构师|10年',
          saidWord:'我们是初创企业，做电影影评相关app，公司技术只有一个前端和一个后端CTO，其他的PHP、iOS都是在猿急送找的。工程师的技术水平很高，我们很满意，iOS做完之后Android工程师也会在猿急送找。'
        },
        {
          src:'../static/images/huanxiang.jpg',
          name:'上海励识科技',
          info:'王永春|CEO',
          saidWord:'工程师是自由职业者，来我们这儿坐班过来的，程序架构设计的非常好，帮助我们解决了一些技术上的难点，总共项目做了3周，验收竟然几乎没有bug，十几年经验的工程师做出来的东西确实不错，以后还会用。'
        }
      ],
      publishProjectArr:[
        {
          src:'../static/images/people.jpg',
          name:'Website Development'
        },
        {
          src:'../static/images/rocket.jpg',
          name:'Graphic Design'
        },
        {
          src:'../static/images/people.jpg',
          name:'Internet Marketing'
        },
        {
          src:'../static/images/rocket.jpg',
          name:'Mobie App'
        }
      ]
    }
  },
  mounted(){
    $('#fullpage').fullpage({
      autoScrolling:false
    });
  },
  beforeDestroy(){
    $.fn.fullpage.destroy('all');
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
  width: 100%;
}

.mainShowContainer{
  position: relative;
  width: 100%;
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
  font-size: 17px;
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
  /* color: #218EF7; */
  color: #118EF7;
  border: 2px solid #118EF7;
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
  width: 600px;
  height: 500px;
}

.index_carouselPicture{
  width: 100%;
  height: 100%;
}

.sentenceBlock{
  width: 100%;
  height: 60px;
  line-height: 60px;
  font-size: 25px;
}

.whyChoose{
  width: 100%;
  height: 380px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 80px;
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
  cursor: pointer;
}

.whyChoose_item--hover{
  /* border: 2px solid #F5F5F5; */
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.24), 0 0 6px 0 rgba(0,0,0,.08);
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
  font-size: 15px;
  margin: 0 auto;
  line-height: 1.8;
}

.whyChoose_item_description--hover{
  width: 85%;
  font-size: 16px;
}

.theySay{
  width: 100%;
  height: 350px;
  margin-top: 30px;
  margin-bottom: 80px;
}

.theySay_box{
  width: 85%;
  /* min-width: 1000px; */
  height: 100%;
  margin: 0 auto;
}

.theySay_item{
  height: 340px;
  width: 500px;
  margin: 5px auto;
  background: #ffffff;
  border-radius: 5px;
  /* border: 1px solid #F5F5F5; */
  box-shadow: 0 2px 3px 0 rgba(0,0,0,.24), 0 0 6px 0 rgba(0,0,0,.08);
}

.theySay_item_icon{
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.theySay_item_icon_box{
  width: 90px;
  height: 90px;
  border-radius: 45px;
  border: 1px solid #DEDBDB;
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.theySay_item_icon_img{
  width: 80px;
  height: 80px;
  border-radius: 40px;
  border: 1px solid #DEDBDB;
}

.theySay_item_name{
  height: 30px;
  font-size: 17px;
  font-weight: bold;
}

.theySay_item_info{
  height: 30px;
  font-size: 15px;
}

.theySay_item_saidWord{
  margin-top: 20px;
  height: 140px;
  position: relative;
}

.theySay_item_saidWord_left{
  position: absolute;
  top: 0;
  left: 40px;
  width: 30px;
  bottom: 0;
}

.theySay_item_saidWord_center{
  position: absolute;
  top: 0;
  left: 70px;
  right: 70px;
  bottom: 0;
  font-size: 14px;
  line-height: 2;
  overflow: hidden;
}

.theySay_item_saidWord_right{
  position: absolute;
  top: 0;
  right: 40px;
  width: 30px;
  bottom: 0;
}

.publishProject{
  width: 100%;
  height: 260px;
  margin-top: 30px;
}

.publishProject_container{
  width: 80%;
  height: 200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.publishProject_item{
  width: 22%;
  height: 100%;
  position: relative;
}

.publishProject_item_icon{
  position: absolute;
  top: 0;
  right: 10px;
  left: 10px;
  bottom: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.publishProject_item_icon_imgBox{
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border: 1px solid #C8C8E8;
  overflow: hidden;
  cursor: pointer;
}

.publishProject_item_icon_img{
  width: 102px;
  height: 102px;
  margin-top: -1px;
  margin-left: -1px;
}

.publishProject_item_name{
  position: absolute;
  right: 10px;
  left: 10px;
  bottom: 0;
  height: 60px;
}

.index_item{
  /* display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; */
}

</style>


