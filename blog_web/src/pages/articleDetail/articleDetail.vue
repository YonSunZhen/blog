<template>
  <div class="detail">
    <header>
      <div class="article-title">
        <h1 class="title">{{articleDetailChanged[0].articleName}}</h1>
        <ul class="article-info">
          <li>
            By: {{articleDetailChanged[0].createPeople}}
          </li>
          <li>
            发布: {{articleDetailChanged[0].createDate}}
          </li>
          <li>
            更新: {{articleDetailChanged[0].updateDate}}
          </li>
          <li>
            分类: {{articleDetailChanged[0].typeName}}
          </li>
          <li>
            阅读: {{articleDetailChanged[0].readCount}}
          </li>
          <div class="clear"></div>
        </ul>
      </div>
    </header>
    <main>
      <div class="articleDetail">
        <div class="content" v-html=articleDetailChanged[0].content>
          
        </div>
        <div class="support-author">
          <p>感谢您的阅读。 🙏<a href="">关于转载请看这里</a></p>
        </div>
      </div>
      <div class="comment">
        <div class="gt-container">
          <div class="gt-meta">
            <span class="gt-counts">2条评论</span>
            <div class="gt-user">
              <div class="gt-user-inner">
                <span>未登录用户</span>
              </div>
            </div>
          </div>
          <div class="gt-error">
            Error: Not Found. 
          </div>
          <div class="gt-header">
            <div href="" class="gt-avatar">
              <img src="" alt="" >
            </div>
            <div class="gt-header-comment">
              <textarea name="" id="" class="gt-header-textarea" placeholder="说点什么呢"></textarea>
              <div class="gt-header-preview markdown-body hide"></div>
              <div class="gt-header-controls">
                <button class="gt-btn-login">
                  <span class="gt-btn-text">提交</span>
                </button>
                <button class="gt-btn-login">
                  <span class="gt-btn-text">登录</span>
                </button>
              </div>
            </div>
          </div>
          <div class="gt-comments">
            <div class="comment-box">
              <div class="comment-list-box">
                <ul class="comment-list" v-for="item in commentsChanges" :key="item.id">
                  <li class="comment-line-box">
                    <a href="" class="avatar-link">
                      <img src="../../assets/image/csdn.jpg" class="avatar" alt="">
                    </a>
                    <div class="right-box">
                      <div class="info-box">
                        <span class="name">{{item.from_userName}}:</span>
                        <span class="comment">{{item.content}}</span>
                        <span class="date">{{item.createDate}}</span>
                        <span class="opt-box">
                          <a href="">查看回复</a>
                          <a href="" class="reply">回复</a>
                        </span>
                      </div>
                    </div>
                    <div class="clear"></div>
                  </li>
                  <li class="reply-box">
                    <ul class="comment-list-reply">
                      <li class="comment-line-box">
                        <a href="" class="avatar-link">
                          <img src="../../assets/image/csdn.jpg" class="avatar" alt="">
                        </a>
                        <div class="right-box">
                          <div class="info-box">
                            <span class="name">孙永镇:</span>
                            <span class="comment">6666</span>
                            <span class="date">(15分钟前</span>
                            <span class="floor-num">#15楼)</span>
                          </div>
                        </div>
                        <div class="clear"></div>
                      </li>
                      <li class="comment-line-box">
                        <a href="" class="avatar-link">
                          <img src="../../assets/image/csdn.jpg" class="avatar" alt="">
                        </a>
                        <div class="right-box">
                          <div class="info-box">
                            <span class="name">孙永镇:</span>
                            <span class="comment">6666</span>
                            <span class="date">(15分钟前</span>
                            <span class="floor-num">#15楼)</span>
                          </div>
                        </div>
                        <div class="clear"></div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <footer></footer>
  </div>
</template>

<script>

  import { getArticleDetail } from '../../api/articleDetail';
  import { getArticleComments } from '../../api/comment';
  export default {
    name: 'articleDetail',
    data: function(){
      return {
        id: '',
        articleDetail: [],
        comments: []
      }
    },
    computed: {
      // 转化时间格式
      articleDetailChanged: function(){
        let list = this.articleDetail;
        for(let i = 0;i < list.length;i++){
          let oldCreateDate = list[i].createDate;
          let oldUpdateDate = list[i].updateDate;
          let oldContent = list[i].content;
          list[i].createDate = new Date(oldCreateDate).toLocaleDateString()+" "+new Date(oldCreateDate).toLocaleTimeString();
          list[i].updateDate = new Date(oldUpdateDate).toLocaleDateString()+" "+new Date(oldUpdateDate).toLocaleTimeString();
          list[i].content = decodeURIComponent(oldContent);
        }
        return list;
      },
      // 转换时间格式
      commentsChanges: function(){
        let list = this.comments;
        for(let i = 0;i < list.length;i++){
          let oldCreateDate = list[i].createDate;
          list[i].createDate = new Date(oldCreateDate).toLocaleDateString()+" "+new Date(oldCreateDate).toLocaleTimeString();
        }
        return list;
      }
    },
    created() {
      this.getArticleID();//获取这篇文章的id
      this._getArticleDetail(this.id);
      this._getArticleComments(this.id);
    },
    methods: {
      _getArticleComments(id){
        getArticleComments(id).then((res) => {
          this.comments = res;
          console.log("评论：");
          console.log(this.comments);
        })
      },
      getArticleID() {
        let id = window.location.href.split('=')[1];
        this.id = id;
        console.log(this.id);
      },
      _getArticleDetail(id){
        getArticleDetail(id).then((res) => {
          this.articleDetail = res;
          console.log("文章详情：");
          console.log(this.articleDetail[0]);
        })
      }
    }
    
  }
</script>

<style scoped lang="stylus">

  @import "../../assets/css/public.styl"
  .detail
    width: 100%
    height: 100%
    header  
      width: 100%
      height: 135px
      background-image: url(../../assets/image/articleDetail.png)
      text-align center
      .article-title
        margin 0 auto
        padding-top 20px
        text-align center
        .title
          color #4d4d4d
          font-size 40px
        .article-info
          width 650px
          margin: 0 auto
          margin-top: 15px
          text-align center
          li
            float left
            margin 8px
            color #666666
            font-size 13px
    main
      width 800px
      margin 0 auto 
      margin-top 30px
      .articleDetail
        padding 0px 30px 20px 20px
        word-break break-word
        .support-author
          padding 25px
          margin-bottom 40px
          border-left 4px solid #49be38
          box-sizing border-box
          box-shadow 0 0 1px #d9d9d9
          margin 50px auto
          p
            margin 0 auto 10px
            font-size 17px
            font-weight bold
      .comment
        width 800px 
        .gt-container
          box-sizing border-box
          font-size 16px
          .gt-meta
            margin 1.25em 0
            padding 1em 0
            border-bottom 1px solid #e9e9e9
            font-size 1em
            position relative
            z-index 10
            .gt-counts
              margin 0 0.625em 0 0
            .gt-user
              float right 
              font-size 92%
          .gt-error
            text-align center
            margin 0.625em
            color #ff3860
          .gt-header
            position relative
            display flex
            padding-bottom 30px
            border-bottom 1px solid #e9e9e9
            .gt-avatar
              width 3em
              height 3em
            .gt-header-comment
              -webkit-box-flex 1
              flex 1
              margin-left 1.25em
              .gt-header-textarea 
                overflow hidden
                word-wrap break-word
                resize none 
                height 72px
                padding 0.75em
                display block
                box-sizing border-box
                width 100%
                min-height 5.125em
                max-height 15em
                border-radius 5px
                border 1px solid rgba(0,0,0,0.1)
                word-wrap break-word
                background-color #f6f6f6
                outline none
                transition all 0.25s ease
              .gt-header-preview
                padding 0.75em
                border-radius 5px
                border 1px solid rgba(0,0,0,0.1)
                background-color #f6f6f6
              .gt-header-controls
                position relative
                margin 0.75em 0 0
                .gt-btn-login
                  float right 
                  margin-left 1.25em
                  padding 0.75em 1.25em
                  display inline-block
                  line-height 1
                  text-decoration none
                  white-space nowrap
                  cursor pointer
                  border 1px solid #6190e8
                  border-radius 5px
                  background-color #6190e8
                  color #fff
                  outline none
                  font-size 0.75em
                  .gt-btn-text
                    font-weight 400
          .gt-comments
            padding-top 1.25em
            .comment-box
              margin-top:2px
              background-color: #fff
              box-shadow: 0 2px 4px 0 rgba(0,0,0,0.05)
              .comment-list-box
                padding:0 24px
                overflow: hidden
                .comment-list
                  padding-left:0px
                  margin-top:15px
                  border-bottom: 1px dashed #e0e0e0
                  .comment-line-box
                    position: relative
                    margin-bottom: 8px
                    .avatar-link 
                      float: left
                      .avatar 
                        display: block
                        margin-right: 8px
                        width: 24px
                        height: 24px
                        border-radius: 50%
                    .right-box 
                      float: left
                      width: 83%
                      .info-box 
                        line-height: 22px
                        margin-bottom: 4px
                        word-wrap: break-word
                        color: #999
                        .comment 
                          color: #4d4d4d
                          font-size: 14px
                          margin-left: 0
                          vertical-align: top
                        .date
                          font-size: 12px
                          color: #999
                          vertical-align: top
                          display: inline-block
                        .floor-num 
                          font-size: 12px
                          color: #999
                          vertical-align: top
                          display: inline-block
                        .opt-box 
                          vertical-align: top
                          display: inline-block
                          margin-left: 16px
                          font-size: 12px
                          color: #6b6b6b
                  .reply-box
                    margin-left:32px
                    padding-left:8px
                    border-left:4px solid #c5c5c5
                    .comment-list-reply 
                      padding-left: 0px
                      margin-top: 15px
                      .comment-line-box 
                        position: relative
                        margin-bottom: 8px
                        .avatar-link 
                          float: left
                          .avatar 
                            display: block
                            margin-right: 8px
                            width: 24px
                            height: 24px
                            border-radius: 50%
                        .right-box 
                          float: left
                          width: 83%
                          .info-box 
                            line-height: 22px
                            margin-bottom: 4px
                            word-wrap: break-word
                            color: #999
                            .comment 
                              color: #4d4d4d
                              font-size: 14px
                              margin-left: 0
                              vertical-align: top
                              .date
                                font-size: 12px
                                color: #999
                                vertical-align: top
                                display: inline-block
                              .floor-num 
                                font-size: 12px
                                color: #999
                                vertical-align: top
                                display: inline-block

                  
                  
                
              

            






</style>

