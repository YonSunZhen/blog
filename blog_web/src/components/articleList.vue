<template>
  <div id="articleList">
    <div class="item" v-for="item in articleListChanged" :key="item.id">
      <div class="title">
        <a href="">{{item.articleName}}</a>
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
  </div>
</template>

<script>

  import {getArticleList} from '../api/articleList'

  export default {
    name: 'articleList',
    data: function() {
      return {
        articleList: []
      }
    },
    props: {
      msg: String
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
      this._getArticleList();
      this.handleScroll();
    },
    methods: {
      _getArticleList() {
        getArticleList(6).then((res) => {
          this.articleList = res;
          console.log(res);
        })
      },
      handleScroll() {
        window.addEventListener('scroll',()=>{
          // console.log(window.scrollY);
          if(this.getScrollBottomHeight() <= 0){
            console.log("success");
            console.log(this.getScrollBottomHeight());
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
    }
  }
</script>

<style scoped lang="stylus">

  @import "../assets/css/public.styl"

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


</style>