<template lang="html">
  <footer class="footer">
    <div class="footer-inner">
      <p>
        <span class="footer-copyright">©2017 - 2017</span>
        <a href="https://github.com/leekoho" class="footer-anthors" target="_blank">leekoho</a>
      </p>
      <p>
        <span class="footer-poweredby">
          由<a href="https://cn.vuejs.org/" target="_blank">Vue</a>强力驱动
        </span>
      </p>
    </div>
  </footer>
</template>

<script lang="babel">
  export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/stylus/_variables'
  @import '../../assets/stylus/_mixins'

  .footer
    position: absolute
    left: 0
    bottom: 0
    width: 100%
    height $footer-height
    line-height: ($footer-height / 2)
    text-align: center
    &-inner
      max-width $body-width
      margin 0 auto
      /*padding 0 4%*/
      border-top 1px solid $gray
  /*&-copyright*/

</style>
