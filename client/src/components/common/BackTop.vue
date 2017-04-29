<template>
  <div class="back-top" ref="backTop" @click="toTop">top</div>
</template>

<script lang="babel">
  export default {
    mounted () {
      this.$nextTick(() => {
        let oBackTop = this.$refs.backTop
//        const originalOffset = window.getComputedStyle(oBackTop, '').right
        const headerH = this.$parent.$children[0].$el.clientHeight
        window.onscroll = () => {
          let t = document.documentElement.scrollTop || document.body.scrollTop
          if (t > headerH) {
            oBackTop.style.right = '2em'
          } else {
            oBackTop.style.right = '-3em'
          }
        }
      })
    },
    methods: {
      toTop () {
        window.scrollTo(0, 0)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../assets/stylus/_variables"
  @import "../../assets/stylus/_mixins"
  .back-top
    position: fixed
    bottom: 3em
    right: - @bottom em
    width: 3em
    height: @width
    line-height: @width
    font-size: $font-size-large
    color: #fff
    background: $vue
    border-radius 50%
    cursor: pointer
    text-align: center
    z-index: 100
    transition right .4s cubic-bezier(0.68, -0.55, 0.27, 1.55)
    box-shadow 0 0 10px 2px $gray
    &:hover
      right 2.2em
</style>
