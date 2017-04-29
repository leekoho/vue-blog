<template>
  <div id="app">
    <router-view></router-view>
    <toastr></toastr>
  </div>
</template>

<script>
  import 'font-awesome/css/font-awesome.min.css'
  import Editor from './components/Editor'
  import Sidebar from './components/Sidebar'
  import Toastr from './components/Toastr'

  export default {
    components: {
      'editor': Editor,
      'sidebar': Sidebar,
      'toastr': Toastr
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '/assets/stylus/main'
  @import '/assets/stylus/_variables'

  #app
    width 100%
    height @width
    background: #f5f5f5
    overflow: hidden
</style>
