<template>
  <div id="app">
    <v-header></v-header>
    <main class="content">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </main>
    <v-footer></v-footer>
    <backtop></backtop>
  </div>
</template>

<script>
  import Header from './components/common/Header'
  import Footer from './components/common/Footer'
  import BackTop from './components/common/BackTop'
  export default {
    components: {
      'v-header': Header,
      'v-footer': Footer,
      'backtop': BackTop
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '/assets/stylus/main'
  @import '/assets/stylus/_variables'

  #app
    position: relative
    min-height 100%
  .content
    max-width $body-width
    margin 0 auto
    padding 0 4% 60px
    overflow: hidden
    +mobile() {
      padding-top 50px
    }

  .fade-enter-active, .fade-leave-active
    transition opacity .2s ease-out

  .fade-enter, .fade-leave-to
    opacity 0

  .fade-leave, .fade-enter-to
    opacity 1
</style>
