import { setTimeout } from "timers";

/**
 * Created by bh on 2017/6/2.
 */
export default {
    install(Vue, options) {
      let indexAll = 2000;
  
      let alertBoxComponentFactory = function (type, self, index, info, title ,resolve, reject) {
        return Vue.extend({
          template: '<div class="messageBox_hover" :style="{\'z-index\':index}" :id="messageId">' +
          '<iframe style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;border: 0"></iframe>' +
          '<transition name="el-zoom-in-center">' +
          '<div class="messageBox_popupBox" :style="{\'z-index\':index+1}" v-show="boxShow">' +
          '<div class="messageBox_popupBox_title">'+
          '<span class="messageBox_popupBox_title_span">{{messageTitle}}</span>'+
          '<span class="messageBox_popupBox_title_close"><i class="fa fa-close fa-2x" @click="cancel" style="cursor: pointer"></i></span>'+
          '</div>' +
          '<div class="messageBox_popupBox_content">' +
          '<div class="messageBox_popupBox_content_box">' +
          '<span v-html="message"></span>' +
          '</div>' +
          '</div>' +
          '<div class="messageBox_popupBox_bottom">' +
          '<a class="messageBox_popupBox_bottom_button" @click="confirm">确定</a>' +
          '<a class="messageBox_popupBox_bottom_button" @click="cancel" v-show="cancelShow">取消</a>' +
          '</div>' +
          '</div>' +
          '</transition>' +
          '</div>',
          data: function () {
            return {
              message:info,
              messageTitle:title,
              index,
              boxShow:false,
              cancelShow:type === 1
            }
          },
          mounted(){
            this.boxShow = true;
          },
          computed:{
            messageId(){
              return 'MessageBox_'+this.index;
            }
          },
          methods:{
            cancel(){
              if(this.cancelShow){
                reject();
              }
              this.closeBox();
            },
            closeBox(){
              this.boxShow = false;
              let messageBoxDom = document.getElementById(this.messageId);
              setTimeout(function () {
                self.$root.$el.removeChild(messageBoxDom);
              },300);
            },
            confirm(){
              if(this.cancelShow){
                resolve();
              }
              this.closeBox();
            }
          }
        });
      };
  
      Vue.prototype.$alertURM = function (info,title) {
        let self = this;
        let index = indexAll;
        indexAll = indexAll+2;
        if(title === undefined){
          title = '提示';
        }
        if(info === undefined){
          info = '';
        }
        let boxContainer = alertBoxComponentFactory(0,self,index,info,title);
        let alterBox = new boxContainer().$mount();
        self.$root.$el.appendChild(alterBox.$el);
      };
  
      Vue.prototype.$confirmURM = function (info,title) {
        let self = this;
        let index = indexAll;
        indexAll = indexAll+2;
        if(title === undefined){
          title = '提示';
        }
        if(info === undefined){
          info = '';
        }
        return new Promise(function (resolve, reject) {
          let boxContainer = alertBoxComponentFactory(1,self,index,info,title,resolve, reject);
          let alterBox = new boxContainer().$mount();
          self.$root.$el.appendChild(alterBox.$el);
        });
      };

      Vue.prototype.$login = function (callBack) {
          this.$alert('登录页面');
          setTimeout(callBack, 3000)
      }
    }
  }
  