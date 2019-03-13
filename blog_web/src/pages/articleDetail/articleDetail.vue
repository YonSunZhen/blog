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
            <span class="gt-counts">{{commentsChanges.length}}条评论</span>
            <div class="gt-user">
              <div class="gt-user-inner">
                <span>{{msg}}</span>
              </div>
            </div>
          </div>
          <div class="gt-error">
            
          </div>
          <div class="gt-header">
            <div href="" class="gt-avatar">
              <img src="" alt="" >
            </div>
            <div class="gt-header-comment">
              <textarea name="" id="" class="gt-header-textarea" placeholder="说点什么呢" ref="commentContent"></textarea>
              <div class="gt-header-preview markdown-body hide"></div>
              <div class="gt-header-controls">
                <button class="gt-btn-login" ref="submit" @click="addComment()">
                  <span class="gt-btn-text">提交</span>
                </button>
                <button class="gt-btn-login" v-show="!isLogin"  @click="dialogFormLogin = true">
                  <span class="gt-btn-text">登录</span>
                </button>
                <button class="gt-btn-login" v-show="isLogin" @click="logout()">
                  <span class="gt-btn-text">注销1</span>
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
                        <span class="date">  ({{item.createDate}})</span>
                        <span class="opt-box">
                          <!-- <a href="">查看回复</a> -->
                          <a href="javascript:;" class="reply" :class="{hide: item.from_uid == uid}" @click="reply(item.from_uid,item.id)">回复</a>
                          <a href="javascript:;" class="delete" :class="{hide: item.from_uid != uid}" @click="delComment(item.id)">删除</a>
                        </span>
                      </div>
                    </div>
                    <div class="clear"></div>
                  </li>
                  <li class="reply-box">
                    <ul class="comment-list-reply">
                      <li class="comment-line-box" v-for="item1 in replyList[item.id]" :key="item1.id">
                        <a href="" class="avatar-link">
                          <img src="../../assets/image/csdn.jpg" class="avatar" alt="">
                        </a>
                        <div class="right-box">
                          <div class="info-box">
                            <span class="name">{{item1.from_userName}}@{{item1.to_userName}}:</span>
                            <span class="comment">{{item1.content}}</span>
                            <span class="date">({{item1.createDate}})</span>
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

    <!-- 登录窗口 -->
    <el-dialog title="登录" :visible.sync="dialogFormLogin" width="25%">
      <el-form :model="form">
        <el-form-item label="请输用户名" :label-width="formLabelWidth" style="margin-bottom:22px;">
          <el-input v-model="form.name" autocomplete="off" ref="username"></el-input>
        </el-form-item>
        <el-form-item label="请输入密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off" ref="password" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="login()" style="border:1px solid #DCDFE6;padding:12px 20px;">登录</el-button>
        <el-button @click="dialogFormLogin = false" style="border:1px solid #DCDFE6;padding:12px 20px;">取 消</el-button>
      </div>
    </el-dialog> 

    <!-- 回复窗口 -->
    <el-dialog title="回复" :visible.sync="dialogFormReply" width="25%">
      <el-form :model="form">
        <el-form-item label="请输入回复内容" :label-width="formLabelWidth" style="margin-bottom:22px;">
          <el-input v-model="form.name" autocomplete="off" ref="reply"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary"  @click="addReplyToComment()" style="border:1px solid #DCDFE6;padding:12px 20px;">提交</el-button>
        <el-button @click="dialogFormReply = false" style="border:1px solid #DCDFE6;padding:12px 20px;">取 消</el-button>
      </div>
    </el-dialog> 

  </div>
</template>

<script>

  import { getArticleDetail } from '../../api/articleDetail';
  import { getArticleComments, addOneComment, delComment} from '../../api/comment';
  import { addReply, getReplysByCommentID} from '../../api/reply';
  import {login} from '../../api/login'
  export default {
    name: 'articleDetail',
    data: function(){
      return {
        id: '',
        articleDetail: [],
        comments: [],
        msg: '未登录用户',
        isLogin: false,
        uid: '',
        tid: '',//文章类型id,暂且没用
        username: '',
        from_uid: '',//用于addReply()
        comment_id: '',//用于addReply()
        replyList: {},
        commentID: [],
        dialogFormLogin: false,
        dialogFormReply: false,
        formLabelWidth: '120px',//修改标签的宽度
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
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
      this.init();
      this.getArticleID();//获取这篇文章的id
      this._getArticleComments(this.id);//这里有点问题
      this._getArticleDetail(this.id);
      // this._getAllReply();
    },
    methods: {
      //登录
      login() {
        let username = this.$refs.username.value;
        let password = this.$refs.password.value;
        login(username,password).then((res) => {
          if(res.state == "success"){
            this.dialogFormLogin = false;//关闭窗口
            sessionStorage.isLogin = true;
            sessionStorage.username = username;
            sessionStorage.uid = res.data[0].id;
            this.username = sessionStorage.username;
            this.isLogin = sessionStorage.isLogin;
            // console.log("666");
            // console.log(sessionStorage.isLogin);
            alert("登录成功!");
            window.location.reload();
            // console.log(res.data[0].id);
          }else{
            alert("账号不存在或输入密码有误!");
          }
        })
      },
      //注销
      logout() {
        sessionStorage.isLogin = false;
        sessionStorage.username = '';
        sessionStorage.uid = null;
        console.log(sessionStorage.isLogin);
        this.isLogin = false;
        this.username = sessionStorage.username;
        this.msg = '未登录用户';
        alert("注销账户成功!");
      },
      //提交评论
      addComment() {
        if(sessionStorage.isLogin == "false" || sessionStorage.isLogin == null){
          // console.log("333");
          alert("您还未登录，请先登录！");
        }else{
          let content = this.$refs.commentContent.value;
          if(content == ''){
            alert("请先输入评论内容")
          }else{
            let articleID = this.id;
            console.log(articleID);
            let typeID= this.articleDetail[0].tid;
            let from_uid = this.uid;
            addOneComment(articleID, typeID, content, from_uid).then((res) => {
              if(res == "success") {
                this._getArticleComments(this.id);//重新加载评论
                alert("评论成功!");
              }else{
                alert("评论失败！");
              }
            })
          }        
        }
      },
      //删除评论
      delComment(id) {
        delComment(id).then((res) => {
          if(res == "success") {
            this._getArticleComments(this.id);//重新加载评论
            alert("删除成功!");
          }else{
            alert("删除失败!");
          }
        })
      },
      //获取登录用户名和登录用户id
      init() {
        console.log("123");
        this.uid = sessionStorage.uid;
        this.username = sessionStorage.username;
        if(sessionStorage.username){
          this.msg = '已登录用户:' + sessionStorage.username;
        }
        if(sessionStorage.isLogin == "true"){
          this.isLogin = true;
        }
      },
      _getArticleComments(id){
        getArticleComments(id).then((res) => {
          this.comments = res;
          //将所有的评论的id存进数组commentID
          for(let i = 0;i < this.comments.length; i++){
            // let key = this.comments[i].id;
            this.commentID.push(this.comments[i].id);
          }
          console.log("评论：");
          console.log(this.comments);
          console.log("评论id");
          console.log(this.commentID);
          console.log("tyu");
          console.log( this.comments[1].id);
          //获取所有评论的回复
          for(let i = 0;i < this.comments.length;i++){
            getReplysByCommentID(this.comments[i].id).then((res) => {
              console.log(res);
              this.replyList[ this.commentID[i]] = res;
            })
          }
          console.log("所有回复");
          console.log(this.replyList);
          // console.log(sessionStorage.isLogin);
        })
      },
      getArticleID() {
        let id = window.location.href.split('=')[1];
        this.id = id;
        this._getArticleComments(this.id);
        console.log(this.id);
      },
      _getArticleDetail(id){
        getArticleDetail(id).then((res) => {
          this.articleDetail = res;
          console.log("文章详情：");
          console.log(this.articleDetail[0]);
        })
      },
      //向评论增加一条回复
      addReplyToComment() {
        let comment_id = this.comment_id;
        let content = this.$refs.reply.value;
        let reply_type = 0;
        let from_uid = this.from_uid;
        let to_uid = this.uid;
        console.log(comment_id );
        console.log(content );
        console.log(reply_type );
        console.log(from_uid );
        console.log(to_uid );
        addReply(comment_id,reply_type,content,from_uid,to_uid).then((res) => {
          if(res == "error"){
            alert("您不能向自己回复!");
          }else if(res == "success"){
            alert("回复成功!");
          }else{
            alert("回复失败!");
          }
        })
      },
      //点击回复事件
      reply(from_uid,comment_id) {
        if(sessionStorage.isLogin == "false" || sessionStorage.isLogin == null){
          alert("您还未登录，请先登录!");
        }else{
          this.from_uid = from_uid;
          this.comment_id = comment_id;
          // console.log(this.comment_id);
          this.dialogFormReply = true;
        }
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
                          .reply
                            margin-left 10px
                          .delete
                            margin-left 10px
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

