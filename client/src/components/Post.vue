<template lang="html">
  <div class="posts">
    <div class="post highlight">
      <div class="post-header">
        <h1 class="post-header__center"><span class="post-header__title">{{ post.markdown | title }}</span></h1>
        <p class="post-header__time">{{ post.createTime | time}}</p>
      </div>
      <p class="tip" v-if="isUpdate">该文章已于 {{post.updateTime | time}} 更新</p>
      <div class="post-body" v-html="markdown(getContent(post.markdown))"></div>
    </div>
  </div>
</template>

<script lang="babel">
//  import qs from 'qs'
  export default {
    data () {
      return {
        post: []
      }
    },
    methods: {
      fetchData () {
        this.$http.get(`/api/articles/${this.$route.params.postId}`).then(res => {
          this.post = res.data.data
        }).catch(err => {
//          alert('该文章不存在，将返回首页')
          console.log(err)
          this.$router.push({ name: 'Error' })
        })
      }
    },
    computed: {
      isUpdate () {
        return this.moment(this.post.createTime).isBefore(this.post.updateTime, 'hour')
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.fetchData()
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .posts
    .post-header__center
      text-align: center
    .post-header__time
      text-align: center
</style>
