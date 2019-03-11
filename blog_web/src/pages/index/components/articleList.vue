<template>
  <div id="articleList">
    <div class="item" v-for="item in articleListChanged" :key="item.id">
      <div class="title">
        <a :href="'articleDetail.html?id='+item.id">{{item.articleName}}</a>
      </div>
      <div class="info">
        <ul>
          <li>
            <p>By {{item.createPeople}}</p>
          </li>
          <li>
            <p>发布: {{item.createDate}}</p>
          </li>
          <li>
            <p>更新: {{item.updateDate}}</p>
          </li>
          <li>
            <p>分类: {{item.typeName}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="loading" v-show="isShowLoading">
      <img src="../../../assets/image/loading.gif" alt="">
    </div>
    <div class="loading" v-show="isShowWord">
      <p>数据已完全加载</p>
    </div>
  </div>
</template>

<script>

  import {getArticleList} from '../../../api/articleList'

  export default {
    name: 'articleList',
    data: function() {
      return {
        articleList: [],
        limit: 0,
        isShowLoading: false,
        isShowWord: false,
        articleLength: 0
      }
    },
    props: {
      typeid: Number
    },
    computed: {
      // 转化时间格式
      articleListChanged: function(){
        let list = this.articleList;
        for(let i = 0;i < list.length;i++){
          let oldCreateDate = list[i].createDate;
          let oldUpdateDate = list[i].updateDate;
          list[i].createDate = new Date(oldCreateDate).toLocaleDateString()+" "+new Date(oldCreateDate).toLocaleTimeString();
          list[i].updateDate = new Date(oldUpdateDate).toLocaleDateString()+" "+new Date(oldUpdateDate).toLocaleTimeString();
        }
        return list;
      }
    },
    created() {
      this.getLimitByWindowHeight();//修改了limit的值
      this._getArticleList(this.limit,'1','haha');
      this.handleScroll();
    },
    methods: {
      getLimitByWindowHeight() {
        let articleCount = (this.getWindowHeight() - 134)/80//134为右边三上部分的高度，80为每条文章占据的高度 
        this.limit = parseInt(articleCount);
        console.log(this.limit);
      },
      _getArticleList(limit,state,id) {
        getArticleList(limit,state,id).then((res) => {
          this.articleList = res;
          console.log("文章:");
          console.log(res);
        })
      },
      handleScroll() {
        window.addEventListener('scroll',()=>{
          // console.log(window.scrollY);
          // console.log(this.typeid);
          if(this.getScrollBottomHeight() <= 0){
            this.isShowLoading = true;
            setTimeout(() => {//必须使用箭头函数，不然this指向的是window对象
              this.articleLength = this.articleList.length;
              this.limit += 3;
              if(this.typeid == 0 || this.typeid == 19){//0表示刚进入首页渲染,19表示是类型为最新的id,类型中不能有id==0的
                this._getArticleList(this.limit,'1','haha');
                if(this.articleLength == this.articleList.length){
                  this.isShowLoading = false;
                  this.isShowWord = true;
                }
              }else{
                this._getArticleList(this.limit,'0',this.typeid);
                if(this.articleLength == this.articleList.length){
                  this.isShowLoading = false;
                  this.isShowWord = true;
                }
              }          
              // console.log("success");
            },500)
          }
        });
      },
      // 获取整个文档页面的高度
      getPageHeight() {
        return document.querySelector("html").scrollHeight;
      },
      // 获取滚动栏向上滚动的距离
      getScrollTop() {
        let scrollTop = 0; 
        let bodyScrollTop = 0;
        let documentScrollTop = 0;
        if (document.body) {
            bodyScrollTop = document.body.scrollTop;
        }
        if (document.documentElement) {
            documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
        return scrollTop;
      },
      // 获取可视窗口的高度
      getWindowHeight() {
        let windowHeight = 0;
        if (document.compatMode == "CSS1Compat") {
            windowHeight = document.documentElement.clientHeight;
        } else {
            windowHeight = document.body.clientHeight;
        }
        return windowHeight;
      },
      // 获取滚动栏距离窗口底部的距离
      getScrollBottomHeight() {
        return this.getPageHeight() - this.getScrollTop() - this.getWindowHeight();
      }
    },
    watch: {
      typeid: function(){
        //表示类型为最新的那个
        if(this.typeid == 19){
          this._getArticleList(this.limit,'1','haha');
        }else{
          this._getArticleList(this.limit,'0',this.typeid);
        }
        console.log(this.typeid);
      }
    }
  }
</script>

<style scoped lang="stylus">

  @import "../../../assets/css/public.styl"

  .item
    width 600px
    margin 23px 0px
    border-bottom 1px dashed #d9d9d9
    .title
      a
        color #555555
        font-size 18px
        font-weight bold
        line-height 1.5
    .info
      overflow auto
      li
        float left
        margin 8px 8px 8px 0px
        font-size 12px
        color #717171

  .loading
    text-align: center
    padding-bottom: 25px
    img 
      width: 40px
      height: 40px


</style>