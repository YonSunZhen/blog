<template>
  <div id="app">
    <div class="left-aside">
      <div class="face-img">
        <img src="../../assets/image/head.jpg" alt="">
      </div>
      <div class="intro-word">
        <h2>我们的博客</h2>
        <p>天马行空，爱生活，爱coding</p>
      </div>
      <div class="sns">
        <ul>
          <li>
            <a href="https://www.baidu.com" target="_blank" title="email">
              <img src="../../assets/image/icon-email.png" alt="email">
            </a>
          </li>
          <li>
            <a href="https://www.baidu.com" target="_blank" title="github">
              <img src="../../assets/image/icon-github.png" alt="github">
            </a>
          </li>
          <li>
            <a href="https://www.baidu.com" target="_blank" title="rss">
              <img src="../../assets/image/icon-rss.png" alt="rss">
            </a>
          </li>
          <li>
            <a href="https://www.baidu.com" target="_blank" title="sf">
              <img src="../../assets/image/icon-sf.png" alt="sf">
            </a>
          </li>
          <li>
            <a href="https://www.baidu.com" target="_blank" title="微博">
              <img src="../../assets/image/icon-weibo.png" alt="微博">
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="right-aside">
      <div class="right-nav">
        <ul>
          <li v-show="isLogin">
            <span class="username">{{username}}</span>
          </li>
          <li v-show="isLogin">
            <a href="javascript:;" @click="logout()">注销</a>
          </li>
          <li v-show="!isLogin">
            <a href="javascript:;" @click="dialogFormLogin = true">登录</a>
          </li>
          <li v-show="!isLogin">
            <a href="javascript:;" @click="dialogFormRegister = true">注册</a>
          </li>
          <li v-show="isLogin" @click="initOwnMsg()">
            <a href="javascript:;">个人信息</a>
          </li>
          <li v-show="isLogin" @click="dialogFormEditPwd = true">
            <a href="javascript:;">修改密码</a>
          </li>
        </ul>
        <!-- <div class="search">
          <input type="search" class="input-search" placeholder="搜索">
          <i class="icon-search"></i>
        </div> -->
      </div>
      <div class="right-main">
        <div class="type">
          <ul>
            <li>
              <a href="javascript:;" @click="navChange(-1,-1)" :class="{active: isActive == -1}">最新</a>
            </li>
            <li v-for="(item,index) in typeList" :key="item.id">
              <a href="javascript:;" @click="navChange(index,item.id)" :class="{active: isActive == index}">{{item.name}}</a>
            </li>
            <div class="clear"></div>
          </ul>
        </div>
        <div class="list">
          <articleList :typeid="typeId"/>
        </div>
        <div class="hosted"></div>
      </div>
    </div>  
    <!-- 登录窗口 -->
    <el-dialog title="登录" :visible.sync="dialogFormLogin" width="25%">
      <el-form :model="form">
        <el-form-item label="请输用户名" :label-width="formLabelWidth" style="margin-bottom:22px;">
          <el-input v-model="form.username" autocomplete="off" ref="username"></el-input>
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
    <!-- 注册窗口 -->
    <el-dialog title="注册" :visible.sync="dialogFormRegister" width="25%">
      <el-form :model="form">
        <el-form-item label="请输用户名" :label-width="formLabelWidth" style="margin-bottom:22px;">
          <el-input v-model="form.username1" autocomplete="off" ref="username1"></el-input>
        </el-form-item>
        <el-form-item label="请输入手机号码" :label-width="formLabelWidth" style="margin-bottom:22px;">
          <el-input v-model="form.mobile" autocomplete="off" ref="mobile"></el-input>
        </el-form-item>
        <el-form-item label="请输入密码" :label-width="formLabelWidth" style="margin-bottom:22px;">
          <el-input v-model="form.password1" autocomplete="off" show-password ref="password1"></el-input>
        </el-form-item>
        <el-form-item label="请再次输入密码" :label-width="formLabelWidth" style="margin-bottom:22px;">
          <el-input v-model="form.passwordAgain" autocomplete="off" show-password ref="passwordAgain"></el-input>
        </el-form-item>
        <el-form-item label="请输入备注信息" :label-width="formLabelWidth" style="margin-bottom:22px;">
          <el-input v-model="form.remark"  ref="remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="register()" style="border:1px solid #DCDFE6;padding:12px 20px;">注册</el-button>
        <el-button @click="dialogFormRegister = false" style="border:1px solid #DCDFE6;padding:12px 20px;">取 消</el-button>
      </div>
    </el-dialog> 
    <!-- 个人信息窗口 -->
    <el-dialog title="编辑信息" :visible.sync="dialogFormOwnMsg" width="25%">
      <el-form :model="form">
        <el-form-item label="请输用户名" :label-width="formLabelWidth" style="margin-bottom:22px;">
          <el-input v-model="form.username2" autocomplete="off" ref="username2"></el-input>
        </el-form-item>
        <el-form-item label="请输入手机号码" :label-width="formLabelWidth" style="margin-bottom:22px;">
          <el-input v-model="form.mobile2" autocomplete="off" ref="mobile2"></el-input>
        </el-form-item>
        <el-form-item label="请输入备注信息" :label-width="formLabelWidth" style="margin-bottom:22px;">
          <el-input v-model="form.remark2"  ref="remark2"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editOwnMsg()" style="border:1px solid #DCDFE6;padding:12px 20px;">提交信息</el-button>
        <el-button @click="dialogFormOwnMsg = false" style="border:1px solid #DCDFE6;padding:12px 20px;">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 修改密码窗口 -->
    <el-dialog title="修改密码" :visible.sync="dialogFormEditPwd" width="25%">
      <el-form :model="form">
        <el-form-item label="请输用户名" :label-width="formLabelWidth" style="margin-bottom:22px;">
          <el-input v-model="form.username3" autocomplete="off" ref="username3"></el-input>
        </el-form-item>
        <el-form-item label="请输入原密码" :label-width="formLabelWidth" style="margin-bottom:22px;">
          <el-input v-model="form.password3" autocomplete="off" ref="password3" show-password></el-input>
        </el-form-item>
        <el-form-item label="请输入新密码" :label-width="formLabelWidth" style="margin-bottom:22px;">
          <el-input v-model="form.newPassword"  ref="newPassword" show-password></el-input>
        </el-form-item>
        <el-form-item label="请再次输入密码" :label-width="formLabelWidth" style="margin-bottom:22px;">
          <el-input v-model="form.againPassword"  ref="againPassword" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updatePwd()" style="border:1px solid #DCDFE6;padding:12px 20px;">提交修改</el-button>
        <el-button @click="dialogFormEditPwd = false" style="border:1px solid #DCDFE6;padding:12px 20px;">取 消</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  import articleList from './components/articleList.vue'
  import {login} from '../../api/login'
  import {register} from '../../api/register'
  import {getTypeList} from '../../api/typeList'
  import {getUserModel,editUser1,editUser2,updataUserPassword} from '../../api/editUser'

  export default {
    name: 'app',
    data: function(){
      return {
        typeList: [],
        isActive: -1,
        typeId: 0,
        userId: 0,

        dialogFormRegister: false,
        dialogFormLogin: false,
        dialogFormOwnMsg: false,
        dialogFormEditPwd: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',//修改标签的宽度,
        isLogin: false,
        username: '',
        mobile: '',
        remark: ''
      }
    },
    created() {
      this.init();
      this._getTypeList();
    },
    methods: {
      //刷新页面时
      init() {
        if(sessionStorage.isLogin != "false"){
          // console.log("699");
          this.isLogin = sessionStorage.isLogin;
          // console.log(this.isLogin);
        }else{
          this.isLogin = false;
        }
        if(sessionStorage.username){
          this.username = sessionStorage.username;
        }
        // console.log("888");
        // console.log(this.isLogin);
      },
      login() {
        let username = this.$refs.username.value;
        let password = this.$refs.password.value;
        login(username,password).then((res) => {
          if(res.state == "success"){
            // console.log('---------');
            // console.log(res);
            this.dialogFormLogin = false;//关闭窗口
            sessionStorage.isLogin = true;
            sessionStorage.username = username;
            sessionStorage.uid = res.data[0].id;
            this.username = sessionStorage.username;
            this.isLogin = sessionStorage.isLogin;
            // this.userId =res.data[0].id;
            // console.log("666");
            // console.log(sessionStorage.isLogin);
            alert("登录成功!");
            console.log(res.data[0].id);
          }else{
            alert("账号不存在或输入密码有误!");
          }
        })
      },
      register() {
        let username = this.$refs.username1.value;
        let password = this.$refs.password1.value;
        let passwordAgain = this.$refs.passwordAgain.value;
        let mobile = this.$refs.mobile.value;
        let remark = this.$refs.remark.value;
        let state = 1;
        let type = 1;//1表示普通用户
        if(password != passwordAgain){
          alert("两次密码输入不一致，请重新输入!")
        }else{
          register(username,password,mobile,remark,state,type).then((res) => {
            if(res == "isExist"){
              alert("用户名已存在，请重新输入!");
            }else if(res == "success"){
              this.dialogFormRegister = false;//关闭窗口
              alert("注册成功!");
            }else if(res == "fail"){
              alert("注册失败!");
            }
          })
        }
      },
      logout() {
        sessionStorage.isLogin = false;
        sessionStorage.username = '';
        sessionStorage.uid = null;
        console.log(sessionStorage.isLogin);
        this.isLogin = false;
        this.username = sessionStorage.username;
        alert("注销账户成功!");
      },
      _getTypeList() {
        getTypeList().then((res) => {
          this.typeList = res;
          console.log("类型:");
          console.log(this.typeList);
        })
      },
      navChange(index,typeId) {
        this.isActive = index;
        this.typeId = typeId;
      },
      initOwnMsg() {
        this.dialogFormOwnMsg = true;
        getUserModel(sessionStorage.uid).then((res) => {
           this.$refs.username2.value = res[0].userName;
           this.$refs.mobile2.value = res[0].mobile;
           this.$refs.remark2.value = res[0].remark;
           this.username = res[0].userName;
           this.mobile = res[0].mobile;
           this.remark = res[0].remark;
        })
      },
      editOwnMsg() {
        let username = this.$refs.username2.value;
        let mobile = this.$refs.mobile2.value;
        let remark = this.$refs.remark2.value;
        if( this.username != username || this.mobile != mobile || this.remark != remark) {
          if(this.username != username) {
            editUser1(sessionStorage.uid,username,mobile,remark).then((res) => {
              if(res === 'success'){
                this.username = username;
                sessionStorage.username = username;
                this.dialogFormOwnMsg = false;
                alert('修改成功！');
              }else if(res === 'isExist') {
                alert('用户名已存在,请重新输入!');
              }else{
                alert('修改失败!');
              }
            })
          }else{
            editUser2(sessionStorage.uid,username,mobile,remark).then((res) => {
              if(res === 'success'){
                this.username = username;
                this.dialogFormOwnMsg = false;
                alert('修改成功！');
              }else{
                alert('修改失败!');
              }
            })
          }
        }else{
          alert("您还未作任何修改!");
        }
      },
      updatePwd() {
        let username = this.$refs.username3.value;
        let password = this.$refs.password3.value;
        let passwordAgain = this.$refs.againPassword.value;
        let passwordNew = this.$refs.newPassword.value;
        if(passwordNew !== passwordAgain){
          alert("两次密码输入不一致,请重新输入！");
        }else{
          updataUserPassword(sessionStorage.uid,username,passwordAgain,password).then((res) => {
            if(res == 'success'){
              this.logout();
              this.dialogFormEditPwd = false;
              // alert('修改成功！');
            }else if(res == 'error'){
              alert('账号或原密码输入有误,请重新输入！');
            }else{
              alert('修改失败!');
            }
          })
        }
        
      }
    },
    components: {
      articleList
    }
  }
</script>

<style scoped lang="stylus">

  @import "../../assets/css/public.styl"
  @import "../../assets/css/index.styl"

  #app 
    position relative
  .left-aside
    widteth: 256px
    position: fixed 
    left: 0
    top: 0
    bottom: 0
    padding: 50px 30px 80px
    border-right: 1px solid #d9d9d9
    box-shadow: -1px 1px 6px rgba(0, 0, 0, 0.35)
    background-size: cover
    background-image: url(../../assets/image/index-left2.jpg)
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
      margin 0px
      padding 0px
      width 100%
      position fixed
      top 0
      z-index 2
      padding-left 40px
      border-bottom 1px solid #d9d9d9
      background-color #fff
      ul
        float: left
        .username
          color #009800
          font-size 18px
          font-weight bold
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
