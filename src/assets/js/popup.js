
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

      Vue.prototype.$login = function (callBack) {
        let self = this;
        let index = indexAll;
        indexAll = indexAll+2;
        let boxContainer = loginTemplete(self,index,callBack);
        let alterBox = new boxContainer().$mount();
        // $('body').addClass('login_overflow');
        self.$root.$el.appendChild(alterBox.$el);
      }

      Vue.prototype.$chooseType = function (data, callBack) {
        let self = this;
        let index = indexAll;
        indexAll = indexAll+2;
        let boxContainer = chooseTemplete(self,index,data,callBack);
        let alterBox = new boxContainer().$mount();
        // $('body').addClass('login_overflow');
        self.$root.$el.appendChild(alterBox.$el);
      }
    }
  }
  