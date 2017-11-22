<template>
  <div class="userInfo">
    <div class="userInfo_basicInfo">
			<div class="userInfo_basicInfo_left">
				<div class="userInfo_basicInfo_left_top">
					<div class="userInfo_basicInfo_left_iconBox">
						<img class="userInfo_basicInfo_left_iconImg" :src="userInfo.HeadImageUrl?userInfo.HeadImageUrl:'../static/images/defaultHeadImg.jpg'"/>
					</div>
				</div>
				<div class="userInfo_basicInfo_left_bottom">
					{{userInfo.Name}}
				</div>
			</div>
			<div class="userInfo_basicInfo_center">
				<div class="userInfo_basicInfo_center_title">
					<div class="userInfo_basicInfo_center_title_welcome">尊敬的{{userInfo.Name}}，欢迎您使用本兼职平台！</div>
				</div>
				<div class="userInfo_basicInfo_center_rate">
					<div class="userInfo_basicInfo_center_orderedNumber" v-show="userType === 0">
						已接单{{userInfo.Ordered_number}}次
					</div>
          <div class="userInfo_prompt" v-show="userType === 1">若您有新需求，可三分钟免费下单，或联系专员为您发布需求、对接人才！</div>
				</div>
				<div class="userInfo_basicInfo_center_partTimePosition">
					<a class="userInfo_button" v-show="userType === 1" @click="editProjectInfo">发布需求</a>
					<a class="userInfo_button userInfo_button_full" v-show="userType === 1" @click="contactWoker">联系专员</a>
          <a class="userInfo_button" v-show="userType === 1" @click="editEmployerInfo">编辑资料</a>
          <a class="userInfo_button" v-show="userType === 0" @click="editEmployeeInfo">编辑简历</a>
          <div class="userInfo_prompt" v-show="userType === 0">小贴士：完善简历可以有效提高您的接单率</div>
				</div>
			</div>
			<div class="userInfo_basicInfo_right" v-show="userType === 0">
				<div class="userInfo_basicInfo_right_item">日薪：{{userInfo.Wage}}元/天</div>
				<div class="userInfo_basicInfo_right_item">
          已赚：{{totalMoney}}元
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
        <el-collapse v-model="selectOrderIndex" @change="showOrderdetail"  accordion>
          <el-collapse-item v-for="(item, index) in orderList" :name="index+''" :key="'order'+index">
            <template slot="title">
              <div class="userInfo_otherInfo_order_name">项目名称：{{item.Name}}</div>
              <div class="userInfo_otherInfo_order_state">（{{getOrderStateText(item.State)}}）</div>
              <div class="userInfo_otherInfo_order_toolBox">
                <a class="userInfo_button" v-show="item.State === 1 && userType === 1" @click.stop="contactWoker">沟通需求</a>
                <a class="userInfo_button userInfo_button_full" v-show="item.State === 2 && userType === 0" @click.stop="addWorkLog(item)">新增工作记录</a>
                <a class="userInfo_button" v-show="item.State === 2 && userType === 0" @click.stop="applyForComplete(item)">申请完工</a>
                <a class="userInfo_button" v-show="item.State === 2 && userType === 1" @click.stop="extendOrder(item)">延长预约</a>
                <a class="userInfo_button" v-show="(item.State === 2 || item.State === 3) && userType === 1" @click.stop="applyForRefund(item)">申请退款</a>
                <a class="userInfo_button userInfo_button_full" v-show="item.State === 3 && userType === 1" @click.stop="agreeComplete(item)">确认完工</a>
                <a class="userInfo_button" v-show="item.State === 3 && userType === 1" @click.stop="rejectComplete(item)">驳回完工</a>
                <a class="userInfo_button userInfo_button_full" v-show="item.State === 4 && userType === 0" @click.stop="agreeRefund(item)">确认退款</a>
                <a class="userInfo_button" v-show="item.State === 4 && userType === 0"  @click.stop="rejectRefund(item)">驳回退款</a>
                <a class="userInfo_button userInfo_button_full" v-show="item.State === 5" @click.stop="evaluate(item)">前去评价</a>
              </div>
            </template>
            <div class="userInfo_otherInfo_order_applyBox" v-if="item.State === 1">
              <div class="userInfo_otherInfo_order_item" v-for="applyItem in item.applyList">
                <div class="userInfo_otherInfo_order_item_time">
                  {{applyItem.Riqi}}
                </div>
                <div class="userInfo_otherInfo_order_item_main">
                  {{applyItem.Name}}已申请了您的项目
                </div>
                <div class="userInfo_otherInfo_order_item_buttonBox">
                  <a class="userInfo_button userInfo_button_full" @click="orderAtOnce(item, applyItem)">立即预约</a>
                </div>
              </div>
            </div>
            <div class="userInfo_otherInfo_order_logBox" v-else>
              <div class="userInfo_otherInfo_order_item" v-for="logItem in item.logList">
                <div class="userInfo_otherInfo_order_item_time">
                  {{logItem.Riqi}}
                </div>
                <div class="userInfo_otherInfo_order_item_main" style="right:10px;">
                  {{logItem.Progress}}
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      isLogin:false,
      userId: null,
      userType: null,
      userInfo:{},
      totalMoney:0,
      orderList:[],
      selectOrderIndex:'0'
    }
  },
  created(){
    this.checkLogin();
    window.bus.$on('checkLogin',this.checkLogin);
  },
  methods:{
    //检验用户登录
    checkLogin(){   
      let strCookie = document.cookie;
      let arrCookie = strCookie.split(";");
      let userId = '';
      let userType = '';
      for(let i = 0; i< arrCookie.length; i++){
        let cookieItemArr = arrCookie[i].replace(/(^\s*)|(\s*$)/g,'').split('=');
        if(cookieItemArr[0] && cookieItemArr[0] === 'userId'){
          userId = cookieItemArr[1];
        }
        if(cookieItemArr[0] && cookieItemArr[0] === 'userType'){
          userType = cookieItemArr[1];
        }
      }
      if(userId !== '' && userType !== ''){
        this.isLogin = true;
        this.userId = userId;
        this.userType = parseInt(userType);
        this.getUserInfo();
        this.getOrderList();
      }else{
        this.isLogin = false;
        this.userId = null;
        this.userType = null;
        this.userInfo = {};
        this.totalMoney = 0;
        this.orderList = [];
				this.$router.push({
					path:'/homePage/index'
				})
      }
    },
    getUserInfo(){
      let url = this.userType === 0?'/talent/getSelfInfo':'/employer/getSelfInfo';
      let param = this.userType === 0?{employeeId:this.userId}:{employerId:this.userId};
      this.$http.post(url, param).then((res) => {
				 let result = res.data;
				 if(result.success){
           this.userInfo = result.data;
				 }
			})
    },
    editEmployeeInfo(){
      this.$router.push({
        path:'/homePage/editTalentInfo'
      })
    },
    editEmployerInfo(){
      this.$router.push({
        path:'/homePage/editEmployerInfo'
      })
    },
    editProjectInfo(){
      this.$router.push({
        path:'/homePage/editProjectInfo'
      })
    },
    contactWoker(){   //联系专员
      this.$contactWoker();
    },
    getOrderList(){
      let url = this.userType === 0?'/talent/getOrderList':'/employer/getOrderList';
      let param = this.userType === 0?{employeeId:this.userId}:{employerId:this.userId};
      this.$http.post(url, param).then((res) => {
				 let result = res.data;
				 if(result.success){
           let totalMoney = 0;
           this.orderList = result.data.map((item) => {
             item.applyList = [];
             item.logList = [];
             if(item.State == 5 || item.State == 7){
               if(item.Length_real && item.Wage_real){
                 totalMoney += item.Length_real*item.Wage_real;
               }
             }
             return item;
           });
           this.totalMoney = totalMoney;
           this.showOrderdetail(this.selectOrderIndex);
				 }
			})
    },
    getOrderStateText(State){
      if(State === 1){
        return '需求对接阶段';
      }
      if(State === 2){
        return '项目实施阶段';
      }
      if(State === 3){
        return '申请完工阶段';
      }
      if(State === 4){
        return '申请退款阶段';
      }
      if(State === 5){
        return '评价反馈阶段';
      }
      if(State === 6){
        return '平台处理争端阶段';
      }
      if(State === 7){
        return '已评价';
      }
      return '';
    },
    showOrderdetail(selectOrderIndex){
      if(selectOrderIndex !== undefined && selectOrderIndex !== ''){
        let index = parseInt(selectOrderIndex);
        let selectedOrder = this.orderList[index];
        if(selectedOrder){
          if(selectedOrder.State === 1){//需求对接阶段，获取申请列表
            this.$http.post('/project/getApplyList', {Project_ID:selectedOrder.Project_ID}).then((res) => {
              let result = res.data;
              if(result.success){
                selectedOrder.applyList = result.data;
              }
            })
          }else{//获取项目日志
            this.getLogList(selectedOrder);
          }
        }
      }
    },
    getLogList(orderItem){//获取项目日志
      this.$http.post('/project/getLogList', {Project_ID:orderItem.Project_ID}).then((res) => {
        let result = res.data;
        if(result.success){
          orderItem.logList = result.data;
        }
      })
    },
    orderAtOnce(orderItem, applyItem){ //立即预约
      let self = this;
      self.$order(applyItem,() => {
        orderItem.State = 2;
        self.getLogList(orderItem);
      });
    },
    addWorkLog(orderItem){//新增工作记录
      let self = this;
      self.$addLog(orderItem,() => {
        self.getLogList(orderItem);
      });
    },
    applyForComplete(orderItem){//申请完工
      let self = this;
      self.$confirm('是否确认申请完工', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        lockScroll:false
      }).then(() => {
        self.$http.post('/project/setProjectState', {Project_ID:orderItem.Project_ID,State:3,StateOrigin:orderItem.State}).then((res) => {
          let result = res.data;
          if(result.success){
            self.$alert('已申请完工',{lockScroll:false});
            orderItem.State = 3;
            self.getLogList(orderItem);
          }else{
            self.$alert(result.msg,{lockScroll:false});
          }
        })
      }).catch(() => {       
      });
    },
    extendOrder(orderItem){//延长预约
      let self = this;
      self.$extendOrder(orderItem,() => {
        self.getLogList(orderItem);
      })
    },
    applyForRefund(orderItem){//申请退款
      let self = this;
      self.$confirm('是否确认申请退款', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        lockScroll:false
      }).then(() => {
        self.$http.post('/project/setProjectState', {Project_ID:orderItem.Project_ID,State:4,StateOrigin:orderItem.State}).then((res) => {
          let result = res.data;
          if(result.success){
            self.$alert('已申请退款',{lockScroll:false});
            orderItem.State = 4;
            self.getLogList(orderItem);
          }else{
            self.$alert(result.msg,{lockScroll:false});
          }
        })
      }).catch(() => {       
      });
    },
    agreeComplete(orderItem){//确认完工
      let self = this;
      self.$confirm('是否确认完工', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        lockScroll:false
      }).then(() => {
        self.$http.post('/project/setProjectState', {Project_ID:orderItem.Project_ID,State:5,StateOrigin:orderItem.State}).then((res) => {
          let result = res.data;
          if(result.success){
            self.$alert('已确认完工',{lockScroll:false});
            orderItem.State = 5;
            self.getLogList(orderItem);
          }else{
            self.$alert(result.msg,{lockScroll:false});
          }
        })
      }).catch(() => {       
      });
    },
    rejectComplete(orderItem){//驳回完工
      let self = this;
      self.$confirm('是否确认驳回完工', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        lockScroll:false
      }).then(() => {
        self.$http.post('/project/setProjectState', {Project_ID:orderItem.Project_ID,State:2,StateOrigin:orderItem.State}).then((res) => {
          let result = res.data;
          if(result.success){
            self.$alert('已驳回完工',{lockScroll:false});
            orderItem.State = 2;
            self.getLogList(orderItem);
          }else{
            self.$alert(result.msg,{lockScroll:false});
          }
        })
      }).catch(() => {       
      });
    },
    agreeRefund(orderItem){//确认退款
      let self = this;
      self.$confirm('是否确认退款', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        lockScroll:false
      }).then(() => {
        self.$http.post('/project/setProjectState', {Project_ID:orderItem.Project_ID,State:5,StateOrigin:orderItem.State}).then((res) => {
          let result = res.data;
          if(result.success){
            self.$alert('已确认退款',{lockScroll:false});
            orderItem.State = 5;
            self.getLogList(orderItem);
          }else{
            self.$alert(result.msg,{lockScroll:false});
          }
        })
      }).catch(() => {       
      });
    },
    rejectRefund(orderItem){//驳回退款
      let self = this;
      self.$confirm('是否驳回退款', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        lockScroll:false
      }).then(() => {
        self.$http.post('/project/setProjectState', {Project_ID:orderItem.Project_ID,State:6,StateOrigin:orderItem.State}).then((res) => {
          let result = res.data;
          if(result.success){
            self.$alert('已驳回退款',{lockScroll:false});
            orderItem.State = 6;
            self.getLogList(orderItem);
          }else{
            self.$alert(result.msg,{lockScroll:false});
          }
        })
      }).catch(() => {       
      });
    },
    evaluate(orderItem){//前去评价
      let self = this;
      self.$evaluate(orderItem, this.userType,()=>{
        orderItem.State = 7;
        self.getLogList(orderItem);
      });
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

.userInfo_otherInfo_showBox{
  position: relative;
  width: 100%;
  min-height: 300px;
  text-align: left;
  /* padding: 10px 20px; */
}

.userInfo_otherInfo_order_name{
  float: left;
  max-width: 53%;
  height: 100%;
  margin-left: 20px;
  font-size: 15px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.userInfo_otherInfo_order_state{
  float: left;
  max-width: 12%;
  height: 100%;
  padding: 0 5px;
  font-size: 15px;
}

.userInfo_otherInfo_order_toolBox{
  float: right;
  margin-right: 5px;
  max-width: 30%;
  height: 100%;
}

.userInfo_otherInfo_order_applyBox{
  padding: 0 30px;
  min-height: 40px;
  font-size: 15px;
}

.userInfo_otherInfo_order_item{
  position: relative;
  height: 40px;
  line-height: 40px;
}

.userInfo_otherInfo_order_item_time{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 150px;
  color: #BEBEBE;
}

.userInfo_otherInfo_order_item_main{
  position: absolute;
  top: 0;
  left: 155px;
  bottom: 0;
  right: 105px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.userInfo_otherInfo_order_item_buttonBox{
  position: absolute;
  top: 0;
  width: 100px;
  bottom: 0;
  right: 0;
  text-align: right;
}

.userInfo_otherInfo_order_logBox{
  padding: 0 30px;
  min-height: 40px;
  font-size: 15px;
}


</style>


