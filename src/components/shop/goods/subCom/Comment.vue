<template>
    <!--网友评论-->
    <div class="comment-box">
        <!--取得评论总数-->
        <form id="commentForm" name="commentForm" class="form-box" @submit.prevent="sendComments">
            <div class="avatar-box">
                <i class="iconfont icon-user-full"></i>
            </div>
            <div class="conn-box">
                <div class="editor">
                    <textarea id="txtContent" v-model="content.commenttxt" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                    <span class="Validform_checktip"></span>
                </div>
                <div class="subcon">
                    <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                    <span class="Validform_checktip"></span>
                </div>
            </div>
        </form>
        <ul id="commentList" class="list-box">
            <p v-if="comments.length == 0" style="margin:5px 0 15px 69px;line-height:42px;text-align:center;border:1px solid #f7f7f7;">暂无评论，快来抢沙发吧！</p>
            <li v-for="(item,index) in comments" :key="index">
                <div class="avatar-box">
                    <i class="iconfont icon-user-full"></i>
                </div>
                <div class="inner-box">
                    <div class="info">
                        <span>{{ item.user_name }}</span>
                        <span>{{ item.add_time |date}}</span>
                    </div>
                    <p>{{item.content}}</p>
                </div>
            </li>
        </ul>
        <!--放置页码-->
        <!--/放置页码-->
    </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      content: {
        commenttxt: ""
      },
      comments: [],
      data: {
        pageIndex: 1,
        pageSize: 10
      }
    };
  },
  methods: {
    getComments() {
      this.$http
        .get(this.$api.commentList + "goods/" + this.id, {
          params: this.data
        })
        .then(res => {
          if (res.data.status == 0) {
            this.comments = res.data.message;
          }
        });
    },
    sendComments() {
      this.$http
        .post(this.$api.comment + "goods/" + this.id, this.content)
        .then(res => {
          if (res.data.status == 0) {
            this.content.commenttxt = ""; // 成功后清空评论框
            this.getComments(); // 成功后刷新评论列表
          }
        });
    }
  },
  created() {
    this.getComments();
  },
  watch: {
    id() {
      this.getComments();
    }
  },
  filters: {
    date(time) {
      let date = new Date(time);
      return `${date.getFullYear()}-${date.getMonth() +
        1}-${date.getDate()}   ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }
  }
};
</script>

<style scoped>

</style>