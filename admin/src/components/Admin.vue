<template>
<div class="admin">
  <sidebar></sidebar>
  <editor></editor>
</div>
</template>

<script lang="babel">
  import Editor from './Editor'
  import Sidebar from './Sidebar'
  export default {
    components: {
      'editor': Editor,
      'sidebar': Sidebar
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .admin
    display: flex
    width 100%
    height @width
</style>
