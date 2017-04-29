<template>
  <div class="post">
    <p class="tip fz50">
     服务器未响应,2秒后返回首页
    </p>
  </div>
</template>

<script lang="babel">
  export default {
    mounted () {
      this.$nextTick(() => {
        setTimeout(() => {
          this.$router.push({ name: 'List' })
        }, 2000)
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
