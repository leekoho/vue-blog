<template lang="html">
  <header class="header">
    <div class="header-inner" ref="header">
      <div class="logo">
        <a href="/posts">
          <img src="../../assets/images/logo.png" alt="">
          <span class="dark">leekoho'Blog</span>
        </a>
      </div>
      <nav class="menu">
        <ul class="menu__ul clearfix">
          <li class="menu__link" v-for="link in links">
            <router-link :to="{name: link.name}">{{link.text}}</router-link>
          </li>
          <li class="menu__link">
            <a href="https://github.com/leekoho" target="_blank">GitHub</a>
          </li>
        </ul>
      </nav>
      <div class="btn-menu" @click="openMenu">
        <img src="../../assets/images/menu.png" alt="" width="30" height="30">
      </div>
      <div class="mask" v-show="menuFlag" @click="closeMenu"></div>
      <transition name="slide">
        <aside class="menu-aside" v-show="menuFlag">
          <ul class="menu-aside__ul">
            <li class="menu-aside__link" v-for="link in links">
              <router-link :to="{name: link.name}">{{link.text}}</router-link>
            </li>
            <li class="menu-aside__link">
              <a href="https://github.com/leekoho" target="_blank">GitHub</a>
            </li>
          </ul>
        </aside>
      </transition>

    </div>
  </header>
</template>

<script lang="babel">
  export default {
    data () {
      return {
        links: [{
          name: 'List',
          text: 'Blog'
        }, {
          name: 'Archive',
          text: 'ARCHIVE'
        }, {
          name: 'About',
          text: 'About'
        }],
        menuFlag: false
      }
    },
    methods: {
      closeMenu () {
        this.menuFlag = false
      },
      openMenu () {
        this.menuFlag = true
      }
    },
    watch: {
      $route: 'closeMenu'
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/stylus/_variables'
  @import '../../assets/stylus/_mixins'
  .header
    width 100%
    padding 0 4%
    margin-bottom: 4em
    line-height $header-height
    color $dark
    z-index 100
    +mobile() {
      position: fixed
      top: 0
      left: 0
      width: 100%;
      line-height $header-height - 30
      background #fff
    }
    box-shadow 0 0 2px rgba(0, 0, 0, .3)
    &-inner
      max-width $body-width
      margin 0 auto
      clearfix()
      .logo
        float left
        font-size $font-size-larger
        img
          width 40px
          height @width
          vertical-align middle
        span
          margin-left .5em
      .menu
        float right
        +mobile() {
          display none
        }
        &__ul
          list-style none
        &__link
          float left
          margin 0 1em
          font-size $font-size-large
          a
            color: $dark
          &--active
            border-bottom 3px solid $vue
        &-aside
          display none
          position fixed
          right 0
          top 0
          width 61.8%
          height 100%
          padding 1em 10% 0
          background: #fff
          box-shadow 0 5px 10px rgba(0, 0, 0, .3)
          &__ul
            list-style none
          &__link
            a
              color $dark
          +mobile() {
            display: block
          }
      .btn-menu
        float right
        display: none
        +mobile() {
          display: block
        }

  .slide-enter-active, .slide-leave-active
    transition transform .4s ease

  .slide-enter, .slide-leave-to
    transform translateX(100%)

  .slide-leave, .slide-enter-to
    transform translateX(0)
</style>
