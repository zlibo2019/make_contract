<template>
  <div class="radio-wrap">
    <div class="radio-modal" v-if="disabled"></div>
    <div class="radio-inner" v-for="(item,index) in data" @click="chooseRadio(item)" >
      <img :src="item.checked?yesIcon:noIcon" v-if="imgShow">
      <div class="round" :class="{'yes-round':item.checked}" v-else>
        <span></span>
      </div>
      <p>{{item.title}}</p>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'Radio',
    props: {
      data: {
        type: Array,
        default(){
          return []
        }
      },
      yesIcon: {
        type: String,
        default: require('./icons/radBtns.png')
      },
      noIcon: {
        type: String,
        default: require('./icons/radBtnd.png')
      },
      imgShow: {
        type: Boolean,
        default: true
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
      }
    },
    created(){
      //默认第一项选中
      if (!this.disabled) {//当单选框不可被点击时是否默认选中第一项
        this.data[0].checked = true;
      }
    },
    methods: {
      chooseRadio(item){
        //点击时使所有的都不选中，当前的选中
        this.data.forEach(element => {
          element.checked = false;
        })
        item.checked = true;
        //传递参数，不传可以不选择
        this.$emit("choose", item);
      }
    }
  }
</script>
<style type="text/scss" lang="scss" scoped>
  .radio-wrap {
    width: 100%;
    height: 0.4rem;
    line-height: 0.4rem;
    display: flex;
    position: relative;
    .radio-modal {
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: transparent;
      z-index: 10;
      cursor: no-drop;
    }
    .radio-inner {
      flex: 1;
      width: 30%;
      position: relative;
      min-width: 0.5rem;
      img {
        width: 0.2rem;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0.1rem;
        margin: auto;
      }

      .round{
        width: 0.2rem;
        height: 0.2rem;
        border-radius: 50%;
        border: 1px solid #eaeaea;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0.1rem;
        margin: auto;
        &:hover {
          border: 1px solid #409EFF !important;
        }
        span{
          width: 0.1rem;
          height: 0.1rem;
          border-radius: 50%;
          background-color: #eaeaea;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
        }
      }
      .yes-round{
        border: 1px solid #409EFF !important;
        span{
          background-color: #409EFF !important;
        }
      }

      /*&:hover .round span{*/
        /*background-color: #409EFF !important;*/
      /*}*/
      p {
        font-size: 0.15rem;
        text-align: left;
        padding-left: 0.35rem;
      }
    }
  }
</style>
