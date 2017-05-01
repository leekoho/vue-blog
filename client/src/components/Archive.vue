<template lang="html">
  <div class="archive">

    <div v-for="archive in archiveList">
      <h1 class="archive__year">{{archive.year}}</h1>
      <div class="archive-post text-overflow" v-for="post in archive.item">
        <span class="archive-post__time">{{post.createTime | time}}</span>
        <router-link :to="{name: 'Post', params: { postId: post._id }}">
          {{post.markdown | title}}
        </router-link>
      </div>
    </div>

  </div>
</template>

<script lang="babel">
  export default {
    data () {
      return {
        archiveList: [],
        yearList: []
      }
    },
    created () {
      this.$http.get('/api/articles?display=true').then(res => {
        const articlesList = res.data.data.article
        const archiveList = [{}]
        let yearList = []
        articlesList.forEach(article => {
          let articleYear = this.moment(article.createTime).year()
          if (yearList.indexOf(articleYear) === -1) {
            yearList.push(articleYear)
          }
        })
        yearList.sort((a, b) => {
          return b - a
        })
        yearList.forEach((year, yearIdx) => {
          archiveList[yearIdx] = {}
          archiveList[yearIdx].year = year
          archiveList[yearIdx].item = []
          articlesList.forEach((article, aIdx) => {
            let articleYear = this.moment(article.createTime).year()
            if (articleYear === year) {
              archiveList[yearIdx].item.push(article)
            }
          })
        })
        this.archiveList = archiveList
        this.articlesList = articlesList
        this.yearList = yearList
      }).catch(err => {
        console.log(err)
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/_mixins'
.archive
  margin 0 auto 4em
  +mobile() {
    width 100%
  }
  +tablet() {
    width 80%
  }
  +desktop() {
    width 70%
  }
  &-post
    margin-left 60px
    margin-bottom 1.2em
    +mobile() {
      margin-left 20px
    }
    &__time
      display inline-block
      width 120px
      color #999
</style>
