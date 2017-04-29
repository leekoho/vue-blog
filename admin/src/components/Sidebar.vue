<template>
  <transition name="sidebar">
    <aside class="sidebar" :style="{width: $store.state.sidebarWidth}">
      <img src="../assets/images/logo.png" alt="" class="sidebar__logo">
      <!--<input type="text" placeholder="Search" class="sidebar__postSearch">-->
      <ul class="sidebar__tabCon">
        <li class="sidebar__tabItem" :class="{active: disType == 1}">
          <input type="radio" id="disTypeTrue" name="disType" v-model="disType" value="1" class="dn">
          <label for="disTypeTrue">已发布</label>
        </li>
        <li class="sidebar__tabItem" :class="{active: disType == 0}">
          <input type="radio" id="disTypeFalse" name="disType" v-model="disType" value="0" class="dn">
          <label for="disTypeFalse">未发布</label>
        </li>
      </ul>
      <ul class="sidebar__postsList">
        <li v-for="article in articlesList" @click="selectArticle(article)" :class="{ isCurrentArticle: article._id === currentArticle._id}" v-show="article.display == disType">
          <p class="text-overflow">{{article.markdown | title}}</p>
          <button class="btn-delPost" @click="deleteArticle(article._id)">
            <i class="fa fa-times"></i>
          </button>
        </li>
      </ul>
      <button class="sidebar__addPost" @click="addArticle">
        <i class="fa fa-plus"></i>
      </button>
    </aside>
  </transition>

</template>

<script lang="babel">
  import {mapActions, mapState} from 'vuex'
  export default {
    data () {
      return {
        disType: 1
      }
    },
    created () {
      this.getArticlesList('all')
    },
    methods: {
      ...mapActions([
        'getArticlesList',
        'selectArticle',
        'addArticle',
        'deleteArticle'
      ])
    },
    computed: {
      ...mapState({
        articlesList: state => state.articlesList,
        currentArticle: state => state.currentArticle
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../assets/stylus/_variables"
  button
    border none
    outline none
    background transparent
    cursor pointer
  .sidebar
    position: relative
    background: #fff
    box-shadow 0 0 10px $gray
    transition width .3s ease
    overflow: hidden
    &__logo
      display: block
      width: 80px
      height: @width
      margin 1em auto
    &__postSearch
      display: block
      width 80%
      height 30px
      margin 1em auto
      padding 5px 10px
      border 1px solid $gray
      outline none
      font-family $font-family-base
    &__tabCon
      list-style none
      clearfix()
    &__tabItem
      float: left
      width 50%
      margin 1em auto
      text-align: center
      label
        cursor: pointer
      &:hover
        color: $vue
      &.active
        color: $vue
    &__postsList
      width: 100%
      max-height 300px
      border-bottom 1px solid $gray
      overflow-y scroll
      li
        position: relative
        width: 100%
        padding: 15px
        cursor: pointer
        transition all .2s ease
        &.isCurrentArticle
          border-left 5px solid $vue
        &:hover
          background: #eee
        &:hover .btn-delPost
          display block
        .btn-delPost
          display: none
          position: absolute
          right 0
          top 0
          width 25px
          height 100%
          padding: 0
          font-weight: bold
          &:hover
            color: #fff
            background: #f00
    &__addPost
      width 100%
      padding 15px 0
      font-size: $font-size-larger
      background: #fff
      &:hover
        background: #eee
</style>
