<template>
  <div class="userInfo">
    <div class="userInfo_basicInfo">
			<div class="userInfo_basicInfo_left">
				<div class="userInfo_basicInfo_left_top">
					<div class="userInfo_basicInfo_left_iconBox">
						<img class="userInfo_basicInfo_left_iconImg" :src="userInfo.HeadImageUrl"/>
					</div>
				</div>
				<div class="userInfo_basicInfo_left_bottom">
					{{userInfo.Name}}
				</div>
			</div>
			<div class="userInfo_basicInfo_center">
				<div class="userInfo_basicInfo_center_title">
					<div class="userInfo_basicInfo_center_title_welcome">尊敬的{{userInfo.Name}}，欢迎您使用XXX！</div>
				</div>
				<div class="userInfo_basicInfo_center_rate">
					<div class="userInfo_basicInfo_center_orderedNumber">
						已接单{{userInfo.Ordered_number}}次
					</div>
          <div class="userInfo_prompt">小贴士：完善简历可以有效提高您的接单率</div>
				</div>
				<div class="userInfo_basicInfo_center_partTimePosition">
					<a class="userInfo_button">发布需求</a>
					<a class="userInfo_button userInfo_button_full">联系专员</a>
          <a class="userInfo_button">编辑简历</a>
          <div class="userInfo_prompt">小贴士：完善简历可以有效提高您的接单率</div>
				</div>
			</div>
			<div class="userInfo_basicInfo_right">
				<div class="userInfo_basicInfo_right_item">日薪：{{userInfo.Wage}}元/天</div>
				<div class="userInfo_basicInfo_right_item">
          已赚：348000元
				</div>
			</div>
    </div>
    <div class="userInfo_otherInfo">
      <div class="userInfo_otherInfo_tabBox">
        <ul class="userInfo_otherInfo_tabBox_ul">
          <li>
            <a class="userInfo_otherInfo_tabBox_ul_link userInfo_otherInfo_tabBox_ul_link--selected">我的订单</a>
          </li>
        </ul>
      </div>
      <div class="userInfo_otherInfo_showBox">
        <div class="userInfo_otherInfo_orderItem">
          <div class="userInfo_otherInfo_orderItem_titleBox">

          </div>
          <div class="userInfo_otherInfo_orderItem_contentBox">
            <div class="userInfo_otherInfo_orderItem_contentBox_item">
              <div class="userInfo_otherInfo_orderItem_contentBox_item_left">
              </div>
              <div class="userInfo_otherInfo_orderItem_contentBox_item_center">
              </div>
              <div class="userInfo_otherInfo_orderItem_contentBox_item_right">
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
      userInfo:{
        Name:'余温散尽ぺ',
        HeadImageUrl:'../static/images/baima.jpg',
        Job_company:'上海微创软件股份有限公司',
        Job_position:'.net开发工程师',
        Job_experience:12,
        Ordered_number:6,
        Rating:3.1,
        Wage:800,
        Skills:'1 精通Object-C，node，js，html，css等iOS和前后端开发技术，熟练搭建基于微信公众号的h5页面 <br>2 熟悉使用redis mongo mysql等数据库技术，擅长前后端一体化 <br>3 熟练使用 Plist 文件读取、NSUserDefaults 以及归档方式将数据持久化存储 <br>4 熟悉使用redis mongo mysql等数据库技术，擅长前后端一体化 <br>5 熟练使用 Plist 文件读取、NSUserDefaults 以及归档方式将数据持久化存储<br>6 熟悉使用redis mongo mysql等数据库技术，擅长前后端一体化 <br>7 熟练使用 Plist 文件读取、NSUserDefaults 以及归档方式将数据持久化存储',
        Projects:'1、三一重工门户网站开发建设，团队接单完成。整体项目算法重构，权限系统重构。官网的改版和重建、网站会员中心、会员支撑系统改造、前台页面改造、业务支撑系统改造。 <br>2、腾讯旗下创业频道CMS系统大改版，内容展示算法重新设计。数据库升级优化，搜索效率提升。 <br>3、曾在某初创公司负责技术研发部分，包括公司内部管理系统的设计和开发，以及其他与营销业务相关的应用开发（关键词处理和分析、网页爬虫等）。具体有：外贸B2C咨询平台的设计和研发，功能包括集中展示国内知名外贸B2C平台上的热门产品、促销信息，发布和管理与B2C相关的主题咨询等；基于Magento系统的外贸B2C平台的二次开发。 <br>4、目前担任公司的技术总监，技术联合创始人。负责公司所有IT系统的研发工作。包括所有内部系统的研发，系统服务器的架设，官网的开发等。'
      },
      orderList:[{
				Project_ID: 1,
				Name: '消费信息分享评论网站搭建',
				Desp: '需要开发一个消费信息分享+用户评论的网站，主要是手机端访问.比如有些商品有便宜打折的信息，展示这个商品，同时用户可以点评。',
				Wage: 800,
				Length: 20,
				State: 0,
				Employer_ID: 1
			}
      ]
    }
  }
}
</script>

<style>
.userInfo{
	position: relative;
  min-width: 1100px;
  margin: 0 auto;
  width: 80%; 
}

.userInfo_basicInfo{
	position: relative;
	margin-top: 15px;
	height: 120px;
	box-shadow: 0 2px 4px 0 rgba(0,0,0,.24), 0 0 6px 0 rgba(0,0,0,.08);
}

.userInfo_basicInfo_left{
	position: absolute;
	top: 0;
	left: 0;
	width: 150px;
	bottom: 0;
}

.userInfo_basicInfo_left_top{
	height: 70%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.userInfo_basicInfo_left_iconBox{
	width: 60px;
	height: 60px;
	border-radius: 30px;
	overflow: hidden;
	border: 1px solid #C8C8E8;
}

.userInfo_basicInfo_left_iconImg{
	width: 62px;
	height: 62px;
	margin-top: -1px;
	margin-left: -1px;
}

.userInfo_basicInfo_left_bottom{
	width: 92%;
	height: 30%;
	margin: 0 auto;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.userInfo_basicInfo_center{
	position: absolute;
	top: 0;
	left: 150px;
	right: 200px;
	bottom: 0;
  }

  .userInfo_basicInfo_center_title{
	height: 30%;
  font-size: 16px;
  font-weight: bold;
}

.userInfo_basicInfo_center_title_welcome{
	margin-top: 20px;
  float: left;
  max-width: 600px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.userInfo_basicInfo_center_rate{
	height: 35%;
	width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.userInfo_basicInfo_center_orderedNumber{
	font-size: 14px;
	margin: -2px 30px 0 10px;
	color: #989DA2;
}

.userInfo_basicInfo_center_partTimePosition{
	height: 35%;
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
}

.userInfo_basicInfo_center_partTimePosition_item{
	padding: 0 5px;
	color: #989DA2;
	font-size: 13px;
	border: 1px solid #989DA2;
	border-radius: 4px;
	margin-right: 8px;
}

.userInfo_button{
  display: inline-block;
  padding: 0 10px;
  height: 22px;
  line-height: 22px;
  border-radius: 3px;
  border: 1px solid #5A9AD5;
  color: #5A9AD5;
  cursor: pointer;
  margin-right: 10px;
  font-size: 14px;
  font-weight: normal;
}

.userInfo_button:hover{
  color: #118EF7;
  border: 1px solid #118EF7;
}

.userInfo_button_full{
  background-color: #5A9AD5;
  color: #ffffff;
}

.userInfo_button_full:hover{
  color: #ffffff;
  background-color: #50A5F5;
  border: 1px solid #50A5F5;
}

.userInfo_prompt{
  font-size: 14px;
  color: #EF782B;
  margin-left: 20px;
}

.userInfo_basicInfo_right{
	position: absolute;
	top: 0;
	right: 0;
	width: 200px;
	bottom: 0;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-content: center;
	font-size: 15px;
}

.userInfo_basicInfo_right_item{
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  margin: 10px auto;
  padding: 0 30px;
  text-align: left;
}

.userInfo_otherInfo{
	margin: 15px auto;
	padding: 5px 0;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.24), 0 0 6px 0 rgba(0,0,0,.08);
  min-height: 400px;
}

.userInfo_otherInfo_tabBox{
  height: 40px;
  display: flex;
  padding: 0 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.userInfo_otherInfo_tabBox_ul{
  height: 30px;
}

.userInfo_otherInfo_tabBox_ul li{
  display: inline-block;
  height: 100%;
  line-height: 30px;
  margin-right: 20px;
}

.userInfo_otherInfo_tabBox_ul_link{
  cursor: pointer;
  padding-bottom: 4px;
}

.userInfo_otherInfo_tabBox_ul_link--selected{
  border-bottom: 2px solid #5A9AD5;
  color: #5A9AD5;
}

.userInfo_otherInfo_orderItem_titleBox{
  height: 40px;
}
</style>


