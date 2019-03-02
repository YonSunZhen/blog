<template>
  <div id="app">
    <div class="left-aside">
      <div class="face-img">
        <img src="./assets/image/head.jpg" alt="">
      </div>
      <div class="intro-word">
        <h2>皮皮虾</h2>
        <p>天马行空，爱生活，爱coding</p>
      </div>
      <div class="sns">
        <ul>
          <li>
            <a href="https://www.baidu.com" target="_blank" title="email">
              <img src="./assets/image/icon-email.png" alt="email">
            </a>
          </li>
          <li>
            <a href="https://www.baidu.com" target="_blank" title="github">
              <img src="./assets/image/icon-github.png" alt="github">
            </a>
          </li>
          <li>
            <a href="https://www.baidu.com" target="_blank" title="rss">
              <img src="./assets/image/icon-rss.png" alt="rss">
            </a>
          </li>
          <li>
            <a href="https://www.baidu.com" target="_blank" title="sf">
              <img src="./assets/image/icon-sf.png" alt="sf">
            </a>
          </li>
          <li>
            <a href="https://www.baidu.com" target="_blank" title="微博">
              <img src="./assets/image/icon-weibo.png" alt="微博">
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="right-aside">
      <div class="right-nav">
        <ul>
          <li>
            <a href="">友链</a>
          </li>
          <li>
            <a href="">关于我</a>
          </li>
        </ul>
        <div class="search">
          <input type="search" class="input-search" placeholder="搜索">
          <i class="icon-search"></i>
        </div>
      </div>
      <div class="right-main">
        <div class="type">
          <ul>
            <li>
              <a href="" class="active">最新</a>
            </li>
            <li>
              <a href="">Github</a>
            </li>
            <li>
              <a href="">孙永镇</a>
            </li>
            <div class="clear"></div>
          </ul>
        </div>
        <div class="list">
          <articleList msg="Welcome to Your Vue.js App"/>
        </div>
        <div class="hosted"></div>
      </div>
    </div>   
  </div>
</template>

<script>
import articleList from './components/articleList.vue'

export default {
  name: 'app',
  components: {
    articleList
  }
}
</script>

<style scoped lang="stylus">

  @import "./assets/css/public.styl"
  @import "./assets/css/index.styl"

  #app 
    position relative
  .left-aside
    width: 256px
    position: fixed 
    left: 0
    top: 0
    bottom: 0
    padding: 50px 30px 80px
    border-right: 1px solid #d9d9d9
    box-shadow: -1px 1px 6px rgba(0, 0, 0, 0.35)
    background-size: cover
    background-image: url(./assets/image/index-left2.jpg)
    text-align: center
    .face-img
      img 
        width: 100px
        height: 100px
        padding: 5px
        border-radius: 50%
        box-shadow: 0 0 5px #95a5a6
        transition: All ease-in-out 0.4s
        background: #fff
    .intro-word
      h2
        margin: 24px 0 50px
        padding-bottom: 10px
        font-weight: 500
      p
        margin: 12px
        font-size: 17px
        font-weight: 500
    .sns
      position: absolute
      bottom: 20%
      li
        float: left
        margin: 60px 10px 20px
        img
          width: 31px
          transition: All ease-in-out 0.4s

  .right-aside
    margin-left: 318px
    .right-nav
      width 100%
      position fixed
      top 0
      z-index 2
      padding-left 40px
      border-bottom 1px solid #d9d9d9
      background-color #fff
      ul
        float: left
        li
          float: left
          line-height 40px
          margin-right 30px
          a
            color #009800
            font-size 18px
            font-weight bold
      .search
        float left
        position relative
        margin-left 30%
        line-height 40px
        color #717171
        .input-search
          width 200px
          margin 8px -31px 0  0
          padding 7px
          border 1px solid #cccccc
          border-radius 2em
    .right-main
      position relative
      margin-top 44px
      padding-left 40px
      z-index 1
      background-color #fff
      .type
        li
          float left
          margin 25px 0px 5px 10px
          a
            padding 5px 11px
            border 1px solid #d9d9d9
            border-radius 15px
            box-sizing border-box
            font-size 13px
            font-weight normal
            line-height 1.5
            color #555555
          .active//点击出现深色
            background #6bd95b
            color #ffffff
            border 1px solid #6bd95b
      .list
        margin-top 40px
        width 600px
        height 711px
        // background-color grey
        


  

</style>
