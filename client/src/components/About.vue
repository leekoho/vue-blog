<template>
<div class="post">
  <div v-html="markdown(data.markdown)"></div>
</div>
</template>

<script lang="babel">
  export default {
    data () {
      return {
        data: []
      }
    },
    created () {
      this.$http.get('/api/about').then(res => {
        this.data = res.data.data
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
