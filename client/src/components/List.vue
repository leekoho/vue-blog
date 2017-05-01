<template lang="html">
  <section class="post-list">
    <article class="post" v-for="post in posts">
      <header class="post-header">
        <h1 class="text-overflow mb0">
          <router-link :to="{name: 'Post', params: { postId: post._id }}" class="post-header__title">
            {{ post.markdown | title }}
          </router-link>
        </h1>
        <p class="post-header__time">
          {{ post.createTime | time }}
        </p>
      </header>
      <div class="post-body highlight" v-html="markdown(getExcerpt(post.markdown))"></div>
      <footer class="post-footer">
        <router-link :to="{ name: 'Post', params: { postId: post._id }}" class="post-footer__more">More »</router-link>
      </footer>
    </article>
    <div class="pagination">
      <span class="prev" @click="turnPage(-1)" v-if="existPrevPage">&#8592 Prev</span>
      <span class="next" @click="turnPage(1)" v-if="existNextPage">Next &#8594</span>
    </div>
  </section>
</template>

<script lang="babel">
  export default {
    data () {
      return {
        posts: [],
        totalPage: 0,
        curPage: 1
      }
    },
    methods: {
      fetchData () {
        let limit = 5
        this.$http.get(`/api/articles?page=${this.curPage}&limit=${limit}&display=true`).then(res => {
          const data = res.data.data
          this.posts = data.article
          this.totalPage = data.totalPage
        }).catch(err => {
          console.log(err)
          this.$router.push({ name: 'Error' })
        })
      },
      turnPage (page) {
        this.curPage += page
        this.fetchData()
        window.scrollTo(0, 0)
      }
    },
    computed: {
      existNextPage () {
        return this.totalPage > this.curPage
      },
      existPrevPage () {
        return this.curPage > 1
      }
    },
    beforeRouteEnter (to, form, next) {
      next(vm => {
        vm.fetchData()
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../assets/stylus/_variables'
  @import '../assets/stylus/_mixins'
  gap(val = 1em)
    margin val auto

  .post
    margin-bottom: 4em
    +mobile() {
      margin-top: 4em
    }
    &-header
      +mobile() {
        text-align center
      }
      &__title
        position relative
        margin: 0 auto
        font-weight: bold
        color: $dark
        &:before
          content '# '
          color $vue
        &:after
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 2px;
          background: #42b983;
          visibility: hidden;
          transform: scaleX(0);
          transition: transform .2s ease-in-out;
        &:hover:after
          visibility: visible;
          transform: scaleX(1);

      &__time
        margin 1.2em auto
        padding-bottom: 0!important
        font-size: $font-size-large - 1
        color $gray
      &__update
        margin-left: .5em
        font-size: $font-size-base
        font-weight: bold
    &-body
      line-height 2
      font-size: 15px
    &-footer
      &__more
        display inline-block
        line-height 2
        font-size: $font-size-large
        color $vue
        border-bottom 2px solid $vue
        &:hover
          color darken($vue, 20%)
          border-color @color

  .pagination
    margin 0 auto 4em
    font-size $font-size-large
    font-weight: bold
    color $vue
    cursor pointer
    clearfix()
    .next
      float: right
    .prev
      float: left
</style>
