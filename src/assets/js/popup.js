
export default {
    install(Vue, options) {
      let indexAll = 1000;
  
      let loginTemplete = function (self, index, callBack) {
        return Vue.extend({
          template: '<div class="login_hover" :style="{\'z-index\':index}" :id="messageId">' +
          '<iframe style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;border: 0"></iframe>' +
          '<transition name="el-zoom-in-center">' +
          '<div class="login_popupBox" :style="{\'z-index\':index+1}" v-show="boxShow">' +
          '<div class="login_popupBox_title">'+
          '<span class="login_popupBox_title_span"></span>'+
          '<span class="login_popupBox_title_close"><i class="el-icon-circle-close-outline" @click="cancel" style="cursor: pointer"></i></span>'+
          '</div>' +
          '<div class="login_popupBox_content">' +
          '<div class="login_popupBox_content_title">手机登录</div>' +
          '<div class="login_popupBox_content_main">'+
          '<div class="login_popupBox_content_main_item">' +
          '<div class="login_popupBox_content_main_item_left">手机号</div>' +
          '<div class="login_popupBox_content_main_item_right">' +
          '<input class="login_popupBox_content_main_item_right_input" maxlength="11" v-model="Mobile" />' +
          '<a :class="[\'login_popupBox_content_main_item_right_a\',countDownFlag?\'login_popupBox_content_main_item_right_a--wait\':\'\']" @click="getVerificationCode">{{countDownFlag?countDown+\'秒后重新获取\':\'获取验证码\'}}</a>' +
          '</div>' +
          '</div>' +
          '<div class="login_popupBox_content_main_item">' +
          '<div class="login_popupBox_content_main_item_left">验证码</div>' +
          '<div class="login_popupBox_content_main_item_right">' +
          '<input class="login_popupBox_content_main_item_right_input" maxlength="6" v-model="Code"/>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '<div class="login_popupBox_content_bottom">' +
          '<a class="login_popupBox_button" @click="loginMobile">登录</a>' +
          '</div>'+
          '</div>' +
          '<div class="login_popupBox_bottom">' +
          '<a class="login_popupBox_bottom_a" @click="loginWex">微信登录</a>' +
          '</div>' +
          '</div>' +
          '</transition>' +
          '</div>',
          data: function () {
            return {
              index,
              boxShow:false,
              countDownFlag: false,
              countDown: 60,
              Mobile:'',
              Code:''
            }
          },
          mounted(){
            this.boxShow = true;
          },
          beforeDestroy(){
            this.countDownFlag = false;
          },
          computed:{
            messageId(){
              return 'login_'+this.index;
            }
          },
          methods:{
            cancel(){
              this.closeBox();
            },
            getVerificationCode(){
              if(!this.countDownFlag){
                let Mobile = this.Mobile.replace(/(^\s*)|(\s*$)/g,'');
                let reg = /^1\d{10}$/;
                if(Mobile === '' || !reg.test(Mobile)){
                  this.$alert('请填写正确的手机号',{lockScroll:false});
                  return;
                }
                this.startCountDown();
                let param = {
                  Mobile
                };
                this.$http.post('/sys/getVerificationCode', param).then((res) => {
                  let result = res.data;
                  if(!result.success){
                    this.$alert(result.msg,{lockScroll:false});
                  }
               }).catch((err) => {
                 this.$alert(err.message,{lockScroll:false});
               })
              }
            },
            startCountDown(){
              this.countDown = 60;
              this.countDownFlag = true;
              this.countDownLoop();
            },
            countDownLoop(){
              if(this.countDownFlag){
                setTimeout(() => {
                  this.countDown = this.countDown - 1;
                  if(this.countDown === 0){
                    this.countDownFlag = false;
                  }else{
                    this.countDownLoop();
                  }
                }, 1000) 
              }
            },
            closeBox(){
              this.boxShow = false;
              let messageBoxDom = document.getElementById(this.messageId);
              setTimeout(function () {
                self.$root.$el.removeChild(messageBoxDom);
                // $('body').removeClass('login_overflow');
              },300);
            },
            loginWex(){

            },
            loginMobile(){
              let Mobile = this.Mobile.replace(/(^\s*)|(\s*$)/g,'');
              let reg = /^1\d{10}$/;
              if(Mobile === '' || !reg.test(Mobile)){
                this.$alert('请填写正确的手机号',{lockScroll:false});
                return;
              }
              let Code = this.Code.replace(/(^\s*)|(\s*$)/g,'');
              if(Code === ''){
                this.$alert('请输入验证码',{lockScroll:false});
                return;
              }
              let param = {
                Mobile,
                Code
              };
              this.$http.post('/sys/login', param).then((res) => {
                let result = res.data;
                if(result.success){
                  if(result.data.type === 2){ //新用户未入库
                    this.closeBox();
                    setTimeout(() => {
                      self.$chooseType({type:'mobile',Mobile}, callBack)
                    },350);
                  }else{
                    /*
                    触发头部切换
                    */
                    window.bus.$emit('checkLogin');
                    this.closeBox();
                    if(typeof callBack === 'function'){
                      callBack();
                    }
                  }
                }else{
                  this.$alert(result.msg,{lockScroll:false});
                }
             }).catch((err) => {
               this.$alert(err.message,{lockScroll:false});
             })
            }
          }
        });
      };

      let chooseTemplete = function (self, index, loginData, callBack) {
        return Vue.extend({
          template: '<div class="login_hover" :style="{\'z-index\':index}" :id="messageId">' +
          '<iframe style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;border: 0"></iframe>' +
          '<transition name="el-zoom-in-center">' +
          '<div class="login_popupBox" :style="{\'z-index\':index+1}" v-show="boxShow">' +
          '<div class="login_popupBox_title">'+
          '<span class="login_popupBox_title_span"></span>'+
          '<span class="login_popupBox_title_close"><i class="el-icon-circle-close-outline" @click="cancel" style="cursor: pointer"></i></span>'+
          '</div>' +
          '<div class="login_popupBox_content">' +
          '<div class="login_popupBox_content_title">请问您是？</div>' +
          '<div class="choose_popupBox_content_left">' +
          '<a class="choose_popupBox_a" @click="addUser(1)">我是雇主</a>'+
          '</div>' +
          '<div class="choose_popupBox_content_right">' +
          '<a class="choose_popupBox_a" @click="addUser(0)">我是设计师</a>'+
          '</div>' +
          '</div>' +
          '</div>' +
          '</transition>' +
          '</div>',
          data: function () {
            return {
              index,
              boxShow:false,
              loginData
            }
          },
          computed:{
            messageId(){
              return 'choose_'+this.index;
            }
          },
          mounted(){
            this.boxShow = true;
          },
          methods:{
            cancel(){
              this.closeBox();
            },
            closeBox(){
              this.boxShow = false;
              let messageBoxDom = document.getElementById(this.messageId);
              setTimeout(function () {
                self.$root.$el.removeChild(messageBoxDom);
                // $('body').removeClass('login_overflow');
              },300);
            },
            addUser(userType){
              this.$http.post('/sys/addUser', Object.assign({},this.loginData,{userType})).then((res) => {
                let result = res.data;
                if(result.success){
                    /*
                    触发头部切换
                    */
                    window.bus.$emit('checkLogin');
                    this.closeBox();
                    if(typeof callBack === 'function'){
                      callBack();
                    }
                }else{
                  this.$alert(result.msg,{lockScroll:false});
                }
              }).catch((err) => {
               this.$alert(err.message,{lockScroll:false});
             })
            }
          }
        })
      };

      let contactWokerTemplete = function (self, index) {
        return Vue.extend({
          template: '<div class="login_hover" :style="{\'z-index\':index}" :id="messageId">' +
          '<iframe style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;border: 0"></iframe>' +
          '<transition name="el-zoom-in-center">' +
          '<div class="login_popupBox_woker" :style="{\'z-index\':index+1}" v-show="boxShow">' +
          '<div class="login_popupBox_title">'+
          '<span class="login_popupBox_title_span"></span>'+
          '<span class="login_popupBox_title_close"><i class="el-icon-circle-close-outline" @click="cancel" style="cursor: pointer"></i></span>'+
          '</div>' +
          '<div class="login_popupBox_content" style="bottom:0;">' +
          '<div class="login_popupBox_content_title" style="color:#000;height:20px;line-height:20px;">联系专员</div>' +
          '<div class="login_popupBox_content_picture">' +
          '<img class="login_popupBox_img" :src="workerPicture" />'+
          '</div>' +
          '</div>' +
          '</div>' +
          '</transition>' +
          '</div>',
          data: function () {
            return {
              index,
              boxShow:false,
              workerPicture:'./static/images/workerWex.jpg'
            }
          },
          computed:{
            messageId(){
              return 'contactWoker_'+this.index;
            }
          },
          mounted(){
            this.boxShow = true;
          },
          methods:{
            cancel(){
              this.closeBox();
            },
            closeBox(){
              this.boxShow = false;
              let messageBoxDom = document.getElementById(this.messageId);
              setTimeout(function () {
                self.$root.$el.removeChild(messageBoxDom);
              },300);
            }
          }
        })
      };

      let orderTemplete = function (self, index, applyItem, callBack) {
        return Vue.extend({
          template: '<div class="login_hover" :style="{\'z-index\':index}" :id="messageId">' +
          '<iframe style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;border: 0"></iframe>' +
          '<transition name="el-zoom-in-center">' +
          '<div class="login_popupBox" :style="{\'z-index\':index+1}" v-show="boxShow">' +
          '<div class="login_popupBox_title">'+
          '<span class="login_popupBox_title_span"></span>'+
          '<span class="login_popupBox_title_close"><i class="el-icon-circle-close-outline" @click="cancel" style="cursor: pointer"></i></span>'+
          '</div>' +
          '<div class="login_popupBox_content">' +
          '<div class="login_popupBox_content_title" style="color:#000;">预约{{applyItem.Name}}设计师</div>' +
          '<div class="login_popupBox_content_main">'+
          '<div class="login_popupBox_content_main_item">' +
          '<div class="login_popupBox_content_main_item_left">项目日薪</div>' +
          '<div class="login_popupBox_content_main_item_right_select" style="width:75%;margin-left:3%;">' +
					'<el-select v-model="Wage" placeholder="请选择" style="width:90%;" size="small">'+
          '<el-option v-for="item in WageList" :label="item+\'元/天\'" :value="item"></el-option>'+
          '</el-select>'+
          '</div>' +
          '</div>' +
          '<div class="login_popupBox_content_main_item">' +
          '<div class="login_popupBox_content_main_item_left">项目工时</div>' +
          '<div class="login_popupBox_content_main_item_right_select" style="width:75%;margin-left:3%;">' +
					'<el-select v-model="Length" placeholder="请选择" style="width:90%;" size="small">'+
          '<el-option v-for="item in 90" :label="item+\'天\'" :value="item"></el-option>'+
          '</el-select>'+
          '</div>' +
          '</div>' +
          '</div>' +
          '<div class="login_popupBox_content_bottom">' +
          '<a class="login_popupBox_button" @click="orderTalent">下单预约</a>' +
          '</div>'+
          '</div>' +
          '</div>' +
          '</transition>' +
          '</div>',
          data: function () {
            return {
              index,
              boxShow:false,
              applyItem,
              WageList: Array.apply(null, { length: 16 }).map((item, index) => {return 500+index*100}),
              Wage: null,
              Length:null
            }
          },
          computed:{
            messageId(){
              return 'order_'+this.index;
            }
          },
          mounted(){
            this.boxShow = true;
          },
          methods:{
            cancel(){
              this.closeBox();
            },
            closeBox(){
              this.boxShow = false;
              let messageBoxDom = document.getElementById(this.messageId);
              setTimeout(function () {
                self.$root.$el.removeChild(messageBoxDom);
              },300);
            },
            orderTalent(){
              if(this.Wage === null){
                this.$alert('请选择项目日薪',{lockScroll:false});
                return;
              }
              if(this.Length === null){
                this.$alert('请选择项目工时',{lockScroll:false});
                return;
              }
              let param = {
                  Project_ID: this.applyItem.Project_ID,
                  Employee_ID: this.applyItem.Employee_ID,
                  Wage: this.Wage,
                  Length: this.Length
              };
              this.$http.post('/project/orderEmployee', param).then((res) => {
                let result = res.data;
                if(result.success){
                  this.$alert('预约成功',{lockScroll:false});
                  this.closeBox();
                  if(typeof callBack === 'function'){
                    callBack();
                  }
                }else{
                  this.$alert(result.msg,{lockScroll:false});
                }
              }).catch((e)=>{
                  this.$alert(e.message,{lockScroll:false});
              })
            }
          }
        })
      };

      let addLogTemplete = function (self, index, orderItem, callBack) {
        return Vue.extend({
          template: '<div class="login_hover" :style="{\'z-index\':index}" :id="messageId">' +
          '<iframe style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;border: 0"></iframe>' +
          '<transition name="el-zoom-in-center">' +
          '<div class="login_popupBox" :style="{\'z-index\':index+1}" v-show="boxShow">' +
          '<div class="login_popupBox_title">'+
          '<span class="login_popupBox_title_span"></span>'+
          '<span class="login_popupBox_title_close"><i class="el-icon-circle-close-outline" @click="cancel" style="cursor: pointer"></i></span>'+
          '</div>' +
          '<div class="login_popupBox_content">' +
          '<div class="login_popupBox_content_title" style="color:#000;">新增工作记录</div>' +
          '<div class="login_popupBox_content_main_addLog">'+
          '<div class="login_popupBox_content_main_item_left">记录内容</div>' +
          '<div class="login_popupBox_content_main_item_right_addLog" style="width:75%;margin-left:3%;">' +
          '<el-input v-model="Progress" style="width:90%;margin-top:8px;" type="textarea" :rows="3" placeholder="请输入内容" :maxlength="800"></el-input>'+
          '</div>' +
          '</div>' +
          '<div class="login_popupBox_content_bottom_addLog">' +
          '<a class="login_popupBox_button" @click="addLog">提交</a>' +
          '</div>'+
          '</div>' +
          '</div>' +
          '</transition>' +
          '</div>',
          data: function () {
            return {
              index,
              boxShow:false,
              orderItem,
              Progress:''
            }
          },
          computed:{
            messageId(){
              return 'addLog_'+this.index;
            }
          },
          mounted(){
            this.boxShow = true;
          },
          methods:{
            cancel(){
              this.closeBox();
            },
            closeBox(){
              this.boxShow = false;
              let messageBoxDom = document.getElementById(this.messageId);
              setTimeout(function () {
                self.$root.$el.removeChild(messageBoxDom);
              },300);
            },
            addLog(){
              let Progress = this.Progress.replace(/(^\s*)|(\s*$)/g,'');
              if(Progress === ''){
                this.$alert('请输入记录内容',{lockScroll:false});
                return;
              }
              let param = {
                Progress:'工作记录：'+Progress,
                Project_ID:this.orderItem.Project_ID
              }
              this.$http.post('/project/addProjectLog', param).then((res) => {
                let result = res.data;
                if(result.success){
                  this.$alert('添加成功',{lockScroll:false});
                  this.closeBox();
                  if(typeof callBack === 'function'){
                    callBack();
                  }
                }else{
                  this.$alert(result.msg,{lockScroll:false});
                }
              }).catch((e)=>{
                  this.$alert(e.message,{lockScroll:false});
              })
            }
          }
        })
      };

      let extendOrderTemplete = function (self, index, orderItem, callBack) {
        return Vue.extend({
          template: '<div class="login_hover" :style="{\'z-index\':index}" :id="messageId">' +
          '<iframe style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;border: 0"></iframe>' +
          '<transition name="el-zoom-in-center">' +
          '<div class="login_popupBox" :style="{\'z-index\':index+1}" v-show="boxShow">' +
          '<div class="login_popupBox_title">'+
          '<span class="login_popupBox_title_span"></span>'+
          '<span class="login_popupBox_title_close"><i class="el-icon-circle-close-outline" @click="cancel" style="cursor: pointer"></i></span>'+
          '</div>' +
          '<div class="login_popupBox_content">' +
          '<div class="login_popupBox_content_title" style="color:#000;">延长预约</div>' +
          '<div class="login_popupBox_content_main">'+
          '<div class="login_popupBox_content_main_item" style="margin-top:25px;">' +
          '<div class="login_popupBox_content_main_item_left">延长工时</div>' +
          '<div class="login_popupBox_content_main_item_right_select" style="width:75%;margin-left:3%;">' +
					'<el-select v-model="Length" placeholder="请选择" style="width:90%;" size="small">'+
          '<el-option v-for="item in 90" :label="item+\'天\'" :value="item"></el-option>'+
          '</el-select>'+
          '</div>' +
          '</div>' +
          '</div>' +
          '<div class="login_popupBox_content_bottom">' +
          '<a class="login_popupBox_button" @click="extendOrder">延长预约</a>' +
          '</div>'+
          '</div>' +
          '</div>' +
          '</transition>' +
          '</div>',
          data: function () {
            return {
              index,
              boxShow:false,
              orderItem,
              Length:null
            }
          },
          computed:{
            messageId(){
              return 'extendOrder_'+this.index;
            }
          },
          mounted(){
            this.boxShow = true;
          },
          methods:{
            cancel(){
              this.closeBox();
            },
            closeBox(){
              this.boxShow = false;
              let messageBoxDom = document.getElementById(this.messageId);
              setTimeout(function () {
                self.$root.$el.removeChild(messageBoxDom);
              },300);
            },
            extendOrder(){
              if(this.Length === null){
                this.$alert('请选择延长工时',{lockScroll:false});
                return;
              }
              let param = {
                Length:this.Length,
                Project_ID:this.orderItem.Project_ID
              }
              this.$http.post('/project/extendOrder', param).then((res) => {
                let result = res.data;
                if(result.success){
                  this.$alert('延长预约成功',{lockScroll:false});
                  this.closeBox();
                  if(typeof callBack === 'function'){
                    callBack();
                  }
                }else{
                  this.$alert(result.msg,{lockScroll:false});
                }
              }).catch((e)=>{
                  this.$alert(e.message,{lockScroll:false});
              })
            }
          }
        })
      };

      let evaluateTemplete = function (self, index, orderItem, userType, callBack) {
        return Vue.extend({
          template: '<div class="login_hover" :style="{\'z-index\':index}" :id="messageId">' +
          '<iframe style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;border: 0"></iframe>' +
          '<transition name="el-zoom-in-center">' +
          '<div class="login_popupBox" :style="{\'z-index\':index+1}" v-show="boxShow">' +
          '<div class="login_popupBox_title">'+
          '<span class="login_popupBox_title_span"></span>'+
          '<span class="login_popupBox_title_close"><i class="el-icon-circle-close-outline" @click="cancel" style="cursor: pointer"></i></span>'+
          '</div>' +
          '<div class="login_popupBox_content">' +
          '<div class="login_popupBox_content_title" style="color:#000;">评价{{userType === 0 ?"雇主":"设计师"}}</div>' +
          '<div class="login_popupBox_content_main">'+
          '<div class="login_popupBox_content_main_item" style="margin-top:5px;">' +
          '<div class="login_popupBox_content_main_item_left">请您打分</div>' +
          '<div class="login_popupBox_content_main_item_right" style="width:75%;margin-left:3%;">' +
          '<el-rate v-model="Rating"></el-rate>' +
          '</div>' +
          '</div>' +
          '<div class="login_popupBox_content_main_item" style="margin-top:5px;height:60px;">' +
          '<div class="login_popupBox_content_main_item_left">评价内容</div>' +
          '<div class="login_popupBox_content_main_item_right" style="width:75%;margin-left:3%;">' +
          '<el-input v-model="Comment" style="width:90%;margin-top:8px;" type="textarea" :rows="2" placeholder="请输入内容" :maxlength="800"></el-input>'+
          '</div>' +
          '</div>' +
          '</div>' +
          '<div class="login_popupBox_content_bottom">' +
          '<a class="login_popupBox_button" @click="evaluate">提交</a>' +
          '</div>'+
          '</div>' +
          '</div>' +
          '</transition>' +
          '</div>',
          data: function () {
            return {
              index,
              boxShow:false,
              orderItem,
              userType,
              Rating:null,
              Comment:''
            }
          },
          computed:{
            messageId(){
              return 'evaluate_'+this.index;
            }
          },
          mounted(){
            this.boxShow = true;
          },
          methods:{
            cancel(){
              this.closeBox();
            },
            closeBox(){
              this.boxShow = false;
              let messageBoxDom = document.getElementById(this.messageId);
              setTimeout(function () {
                self.$root.$el.removeChild(messageBoxDom);
              },300);
            },
            evaluate(){
              if(this.Rating === null || this.Rating === 0){
                this.$alert('请您打分',{lockScroll:false});
                return;
              }
              let Comment = this.Comment.replace(/(^\s*)|(\s*$)/g,'');
              if(Comment === ''){
                this.$alert('请填写评价内容',{lockScroll:false});
                return;
              }
              let param = {
                  Project_ID: this.orderItem.Project_ID,
                  Type: this.userType === 0?2:1,
                  UserId: this.userType === 0?this.orderItem.Employer_ID:this.orderItem.Employee_ID,
                  Rating: this.Rating,
                  Comment
              };
              this.$http.post('/project/evaluate', param).then((res) => {
                let result = res.data;
                if(result.success){
                  this.$alert('评价成功',{lockScroll:false});
                  this.closeBox();
                  if(typeof callBack === 'function'){
                    callBack();
                  }
                }else{
                  this.$alert(result.msg,{lockScroll:false});
                }
              }).catch((e)=>{
                  this.$alert(e.message,{lockScroll:false});
              })
            }
          }
        })
      };

      Vue.prototype.$login = function (callBack) { //登录
        let self = this;
        let index = indexAll;
        indexAll = indexAll+2;
        let boxContainer = loginTemplete(self,index,callBack);
        let alterBox = new boxContainer().$mount();
        // $('body').addClass('login_overflow');
        self.$root.$el.appendChild(alterBox.$el);
      }

      Vue.prototype.$chooseType = function (data, callBack) { //用户类型选择
        let self = this;
        let index = indexAll;
        indexAll = indexAll+2;
        let boxContainer = chooseTemplete(self,index,data,callBack);
        let alterBox = new boxContainer().$mount();
        // $('body').addClass('login_overflow');
        self.$root.$el.appendChild(alterBox.$el);
      }

      Vue.prototype.$contactWoker = function () { //专员二维码
        let self = this;
        let index = indexAll;
        indexAll = indexAll+2;
        let boxContainer = contactWokerTemplete(self,index);
        let alterBox = new boxContainer().$mount();
        self.$root.$el.appendChild(alterBox.$el);
      }

      Vue.prototype.$order = function (applyItem, callBack) {//预约设计师
        let self = this;
        let index = indexAll;
        indexAll = indexAll+2;
        let boxContainer = orderTemplete(self,index,applyItem,callBack);
        let alterBox = new boxContainer().$mount();
        self.$root.$el.appendChild(alterBox.$el);
      }

      Vue.prototype.$addLog = function (orderItem, callBack) {//新增工作记录
        let self = this;
        let index = indexAll;
        indexAll = indexAll+2;
        let boxContainer = addLogTemplete(self,index,orderItem,callBack);
        let alterBox = new boxContainer().$mount();
        self.$root.$el.appendChild(alterBox.$el);
      }

      Vue.prototype.$extendOrder = function (orderItem, callBack) { //延长预约
        let self = this;
        let index = indexAll;
        indexAll = indexAll+2;
        let boxContainer = extendOrderTemplete(self,index,orderItem,callBack);
        let alterBox = new boxContainer().$mount();
        self.$root.$el.appendChild(alterBox.$el);
      }

      Vue.prototype.$evaluate = function (orderItem, userType, callBack) { //评价
        let self = this;
        let index = indexAll;
        indexAll = indexAll+2;
        let boxContainer = evaluateTemplete(self,index,orderItem, userType,callBack);
        let alterBox = new boxContainer().$mount();
        self.$root.$el.appendChild(alterBox.$el);
      }
    }
  }
  