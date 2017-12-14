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
          <div class="userInfo_prompt" style="margin-left:0;" v-show="userType === 1">若您有新需求，可三分钟免费下单，或联系专员为您发布需求、对接人才！</div>
				</div>
				<div class="userInfo_basicInfo_center_partTimePosition">
					<a class="userInfo_button" v-show="userType === 1" @click="editProjectInfo">发布需求</a>
					<a class="userInfo_button userInfo_button_full" v-show="userType === 1" @click="contactWoker">联系专员</a>
          <a class="userInfo_button" v-show="userType === 1" @click="editEmployerInfo">编辑资料</a>
          <a class="userInfo_button" v-show="userType === 0" @click="editEmployeeInfo">编辑简历</a>
          <div class="userInfo_prompt" style="margin-top:2px;" v-show="userType === 0">小贴士：完善简历可以有效提高您的接单率</div>
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
          <el-collapse-item v-for="(item, index) in orderList" :name="item.Project_ID+''" :key="'order'+index">
            <template slot="title">
              <div class="userInfo_otherInfo_order_name" :title="item.Name" :style="!(item.State === 1) && item.Amount_paid == 0 && userType === 1?{maxWidth: 'calc(100% - 850px)'}:''">项目名称：{{item.Name}}</div>
              <div class="userInfo_otherInfo_order_state">（{{getOrderStateText(item.State)}}）</div>
              <div class="userInfo_otherInfo_order_money" style="max-width: 360px;" v-if="!(item.State === 1) && item.Amount_paid == 0 && userType === 1">暂未支付，订单将为您保留1小时，逾期将会自动取消</div>
              <div class="userInfo_otherInfo_order_money" v-else v-show="!(item.State === 1)">已支付：{{item.Amount_paid - item.Refund_real}}元</div>
              <div class="userInfo_otherInfo_order_toolBox">
                <a class="userInfo_button" v-show="item.State === 1 && userType === 1" @click.stop="contactWoker">沟通需求</a>
                <a class="userInfo_button userInfo_button_full" v-show="item.State === 2 && userType === 0" @click.stop="addWorkLog(item)">新增工作记录</a>
                <a class="userInfo_button" v-show="item.State === 2 && userType === 0" @click.stop="applyForComplete(item)">申请完工</a>
                <a class="userInfo_button userInfo_button_full" v-show="(item.State === 2 || item.State === 9) && userType === 1" @click.stop="payForEmploy(item)">支付佣金</a>
                <a class="userInfo_button" v-show="(item.State === 2 || item.State === 9) && userType === 1" @click.stop="extendOrder(item)">延长预约</a>
                <a class="userInfo_button" v-show="item.State === 9 && userType === 1" @click.stop="cancelOrder(item)">取消预约</a>
                <a class="userInfo_button" v-show="(item.State === 2 || item.State === 3) && userType === 1" @click.stop="applyForRefund(item)">申请退款</a>
                <a class="userInfo_button userInfo_button_full" v-show="item.State === 3 && userType === 1" @click.stop="agreeComplete(item)">确认完工</a>
                <a class="userInfo_button" v-show="item.State === 3 && userType === 1" @click.stop="rejectComplete(item)">驳回完工</a>
                <a class="userInfo_button userInfo_button_full" v-show="item.State === 4 && userType === 0" @click.stop="agreeRefund(item)">确认退款</a>
                <a class="userInfo_button" v-show="item.State === 4 && userType === 0"  @click.stop="rejectRefund(item)">驳回退款</a>
                <a class="userInfo_button userInfo_button_full" v-show="item.State === 5" @click.stop="evaluate(item)">前去评价</a>
                <div style="position:absolute;right:-20px;top:3px;">
                <el-badge :max="99" :value="item.State === 1 && userType === 1?item.newDeliverNumber:item.newsNumber">
                </el-badge>
                </div>
              </div>
            </template>
            <div class="userInfo_otherInfo_order_applyBox" v-if="item.State === 1 && userType === 1">
              <div class="userInfo_otherInfo_order_item" v-for="applyItem in item.applyList">
                <div class="userInfo_otherInfo_order_item_time">
                  {{applyItem.Riqi}}
                </div>
                <div class="userInfo_otherInfo_order_item_main">
                  设计师<a class="userInfo_otherInfo_order_a" @click="enterTalentInfo(applyItem)">{{applyItem.Name}}</a>已申请了您的项目
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
                <div class="userInfo_otherInfo_order_item_main" style="width: calc(100% - 165px);word-wrap: break-word;">
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
      orderListObj:{},
      selectOrderIndex:'-1',
      isUserInfoPage: false,
      stopLoopOrderList: false,
      setTimeoutIndex: 0
    }
  },
  created(){
    this.isUserInfoPage = this.$route.path === '/homePage/userInfo';
    this.checkLogin();
    window.bus.$on('checkLogin',this.checkLogin);
  },
  beforeDestroy(){
    this.stopLoopOrderList = true;
    this.setTimeoutIndex = null;
    this.isUserInfoPage = false;
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
        this.startLoopOrder();
      }else{
        this.isLogin = false;
        this.userId = null;
        this.userType = null;
        this.userInfo = {};
        this.totalMoney = 0;
        this.orderList = [];
        this.stopLoopOrder();
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
    startLoopOrder(){
      this.stopLoopOrderList = false;
      this.setTimeoutIndex ++;
      this.getOrderList(this.setTimeoutIndex);
    },
    stopLoopOrder(){
      this.stopLoopOrderList = true;
      this.setTimeoutIndex ++;
    },
    getOrderList(setTimeoutIndex){
      if(!this.stopLoopOrderList && this.isLogin && this.isUserInfoPage && setTimeoutIndex === this.setTimeoutIndex){
        let url = this.userType === 0?'/talent/getOrderList':'/employer/getOrderList';
        let param = this.userType === 0?{employeeId:this.userId}:{employerId:this.userId};
        this.$http.post(url, param).then((res) => {
          let result = res.data;
          if(result.success){
            let totalMoney = 0;
            let orderListObj = this.orderListObj;
            this.orderList = result.data.map((item) => {
              if(orderListObj.hasOwnProperty(item.Project_ID+'')){
                let oldItem = orderListObj[item.Project_ID+''];
                Object.assign(oldItem, item);
                item = oldItem;
              }else{
                item.applyList = [];
                item.logList = [];
                orderListObj[item.Project_ID+''] = item;
              }
              if(item.State == 5 || item.State == 7){
                totalMoney += (item.Amount_paid-item.Refund);
              }
              if(item.State === 5 && item.ratingNumber === 1){
                item.State = 7;
              }
              return item;
            });
            this.totalMoney = totalMoney;
            if(this.selectOrderIndex !== undefined && this.selectOrderIndex !== '-1'){
              if(this.orderListObj[this.selectOrderIndex]){
                if(this.orderListObj[this.selectOrderIndex].State === 1){
                  if(this.orderListObj[this.selectOrderIndex].newDeliverNumber > 0 || this.orderListObj[this.selectOrderIndex].newsNumber > 0){
                    this.showOrderdetail(this.selectOrderIndex);
                  }
                }else if(this.orderListObj[this.selectOrderIndex].newsNumber > 0){
                  this.showOrderdetail(this.selectOrderIndex);
                }
              }
            }
          }
          setTimeout(()=>{
            this.getOrderList(setTimeoutIndex);
          },2000)
        }).catch(() => {
          setTimeout(()=>{
            this.getOrderList(setTimeoutIndex);
          },2000)
        })
      }
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
      if(State === 9){
        return '雇主支付阶段';
      }
      return '';
    },
    showOrderdetail(selectOrderIndex){
      if(selectOrderIndex !== undefined && selectOrderIndex !== '-1'){
        // let index = parseInt(selectOrderIndex);
        let selectedOrder = this.orderListObj[selectOrderIndex];
        if(selectedOrder){
          if(selectedOrder.State === 1){//需求对接阶段，获取申请列表
            this.$http.post('/project/getApplyList', {Project_ID:selectedOrder.Project_ID}).then((res) => {
              let result = res.data;
              if(result.success){
                selectedOrder.applyList = result.data;
              }
            })
            if(selectedOrder.newsNumber > 0){
              this.getLogList(selectedOrder);
            }
          }else{//获取项目日志
            this.getLogList(selectedOrder);
          }
        }
      }
    },
    getLogList(orderItem){//获取项目日志
      this.$http.post('/project/getLogList', {Project_ID:orderItem.Project_ID,userType:this.userType}).then((res) => {
        let result = res.data;
        if(result.success){
          if(this.userType === 0){
            orderItem.logList = result.data.map((item) => {
              item.Progress = item.Progress.replace('，设计师将在3天内答复，','，请您在3天内答复，');
              return item;
            });
          }else{
            orderItem.logList = result.data;
          }
        }
      })
    },
    orderAtOnce(orderItem, applyItem){ //立即预约
      let self = this;
      self.$order(applyItem,() => {
        orderItem.State = 2;
        if(self.selectOrderIndex === orderItem.Project_ID+''){
          self.getLogList(orderItem);
        }
      });
    },
    addWorkLog(orderItem){//新增工作记录
      let self = this;
      self.$addLog(orderItem,() => {
        if(self.selectOrderIndex === orderItem.Project_ID+''){
          self.getLogList(orderItem);
        }
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
            if(self.selectOrderIndex === orderItem.Project_ID+''){
              self.getLogList(orderItem);
            }
          }else{
            self.$alert(result.msg,{lockScroll:false});
          }
        })
      }).catch(() => {       
      });
    },
    payForEmploy(orderItem){//支付佣金
      this.$payPicture();
    },
    extendOrder(orderItem){//延长预约
      let self = this;
      self.$extendOrder(orderItem,() => {
        if(self.selectOrderIndex === orderItem.Project_ID+''){
          self.getLogList(orderItem);
        }
      })
    },
    cancelOrder(orderItem){//取消预约
      let self = this;
      self.$confirm('是否确认取消预约', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        lockScroll:false
      }).then(() => {
        self.$http.post('/project/cancelOrder', {Project_ID:orderItem.Project_ID}).then((res) => {
          let result = res.data;
          if(result.success){
            self.$alert('已取消预约',{lockScroll:false});
          }else{
            self.$alert(result.msg,{lockScroll:false});
          }
        })
      }).catch(() => {       
      });
    },
    applyForRefund(orderItem){//申请退款
      let self = this;
      // self.$confirm('是否确认申请退款', '', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning',
      //   lockScroll:false
      // }).then(() => {
      //   self.$http.post('/project/setProjectState', {Project_ID:orderItem.Project_ID,State:4,StateOrigin:orderItem.State}).then((res) => {
      //     let result = res.data;
      //     if(result.success){
      //       self.$alert('已申请退款',{lockScroll:false});
      //       orderItem.State = 4;
      //       self.getLogList(orderItem);
      //     }else{
      //       self.$alert(result.msg,{lockScroll:false});
      //     }
      //   })
      // }).catch(() => {       
      // });
      self.$applyForRefund(orderItem,() => {
        orderItem.State = 4;
        if(self.selectOrderIndex === orderItem.Project_ID+''){
          self.getLogList(orderItem);
        }
      })
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
            if(self.selectOrderIndex === orderItem.Project_ID+''){
              self.getLogList(orderItem);
            }
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
            if(self.selectOrderIndex === orderItem.Project_ID+''){
              self.getLogList(orderItem);
            }
          }else{
            self.$alert(result.msg,{lockScroll:false});
          }
        })
      }).catch(() => {       
      });
    },
    agreeRefund(orderItem){//确认退款
      let self = this;
      self.$confirm('是否确认退款'+orderItem.Refund+'元', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        lockScroll:false
      }).then(() => {
        self.$http.post('/project/agreeRefund', {Project_ID:orderItem.Project_ID,Refund:orderItem.Refund}).then((res) => {
          let result = res.data;
          if(result.success){
            self.$alert('已确认退款',{lockScroll:false});
            orderItem.State = 5;
            if(self.selectOrderIndex === orderItem.Project_ID+''){
              self.getLogList(orderItem);
            }
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
            if(self.selectOrderIndex === orderItem.Project_ID+''){
              self.getLogList(orderItem);
            }
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
        // orderItem.State = 7;
        if(self.selectOrderIndex === orderItem.Project_ID+''){
          self.getLogList(orderItem);
        }
      });
    },
    enterTalentInfo(applyItem){
      this.$router.push({
        path:'/homePage/talentDetail',
        query:{
          id:applyItem.Employee_ID,
          projectId:applyItem.Project_ID
        }
      })
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
	/* margin: -2px 30px 0 10px; */
	margin: -2px 30px 0 0;
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
  /* max-width: 53%; */
  max-width: calc(100% - 620px);
  height: 100%;
  margin-left: 20px;
  font-size: 15px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.userInfo_otherInfo_order_state{
  float: left;
  /* max-width: 12%; */
  max-width: 160px;
  height: 100%;
  padding: 0 3px;
  font-size: 15px;
}

.userInfo_otherInfo_order_money{
  float: left;
  /* margin-right: 5px; */
  color: #EF782B;
  max-width: 130px;
  height: 100%;
  padding: 0 3px;
  font-size: 15px;
}

.userInfo_otherInfo_order_toolBox{
  position: relative;
  float: right;
  margin-right: 5px;
  margin-left: 15px;
  /* max-width: 30%; */
  max-width: 280px;
  height: 100%;
}

.userInfo_otherInfo_order_applyBox{
  padding: 0 26px 0 30px;
  min-height: 40px;
  font-size: 15px;
}

.userInfo_otherInfo_order_item{
  position: relative;
  min-height: 40px;
  line-height: 40px;
}

.userInfo_otherInfo_order_item_time{
  position: absolute;
  top: 0;
  left: 0;
  height: 40px;
  width: 150px;
  color: #BEBEBE;
}

.userInfo_otherInfo_order_item_main{
  /* position: absolute; */
  /* top: 0; */
  margin-left: 155px;
  min-height: 40px;
  line-height: 40px;
  width: calc(100% - 260px);
  /* right: 105px; */
  /* overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; */
}

.userInfo_otherInfo_order_item_buttonBox{
  position: absolute;
  top: 0;
  width: 100px;
  height: 40px;
  right: 0;
  text-align: right;
}

.userInfo_otherInfo_order_logBox{
  padding: 0 30px;
  min-height: 40px;
  font-size: 15px;
}

.userInfo_otherInfo_order_a{
  color: #50A5F5;
  cursor: pointer;
}
</style>


