<template>
    <div class="carousel_container">
        <ol class="carousel_indicator" v-show="indicatorShow">
            <li v-for="(i,index) in indicators" @click="indicatorClick(index)" v-bind:class="{active:index===curIndex}"></li>
        </ol>
        <div class="carousel_inner">
            <div class="carousel_item_container" v-bind:style="{width:allWidth+'px',marginLeft:marginLeft+'px'}">
                <div class="carousel_item" v-for="indica in indicators" v-bind:style="{width:singleWidth+'px'}">
                    <img v-bind:src="typeof indica=='object'?indica.src:indica" class="carousel_image">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        props:{
            indicatorShow:{
                type:Boolean,
                default:true
            },
            indicators:{
                type:Array,
                default:function(){
                    return []
                }
            }
        },
        data:function(){
            return{
                curIndex:0,
                allWidth:0,
                singleWidth:0,
                marginLeft:0
             }
        },
        mounted:function(){
            var self=this;
            this.singleWidth=document.querySelector(".carousel_inner").offsetWidth;
            this.allWidth=this.singleWidth*this.indicators.length;
            setInterval(function(){
                if(self.curIndex==self.indicators.length-1){
                    self.curIndex=0;
                }else{
                    self.curIndex++;
                }
            },5000)
        },
        methods:{
            indicatorClick:function(index){
                this.curIndex=index;
            }
        },
        watch:{
           curIndex:function(newVal){
                this.marginLeft=0-newVal*this.singleWidth;
           }
        }
    }
</script>
<style>
.carousel_container{
    width:100%;
    height:100%;
    position:relative;
}

.carousel_indicator{
    position:absolute;
    bottom:20px;
    left:50%;
    z-index:15;
    width:60%;
    padding-left:0;
    margin-left:-30%;
    text-align:center;
    list-style:none;
}

.carousel_indicator li{
    display:inline-block;
    width:10px;
    height:10px;
    margin:3px;
    text-indent:-999px;
    cursor:pointer;
    background-color:rgba(0,0,0,0);
    border:1px solid #fff;
    border-radius:10px;
}

.carousel_indicator .active{
    width:12px;
    height:12px;
    background-color:#fff;
    margin:2px;
}

.carousel_inner{
    position:relative;
    width:100%;
    height:100%;
    overflow:hidden;
}

.carousel_item_container{
    height:100%;
    transition: all 0.6s ease-in 0s;
}

.carousel_item{
    height:100%;
    float:left;
}

.carousel_image{
    width:100%;
    height:100%;
}
</style>