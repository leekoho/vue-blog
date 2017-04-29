<template>
  <transition name="toastr">
    <div class="toastr"
         :class="[ type === 'success' ? 'toastrSuccess' : 'toastrError']"
         v-show="show" @click="closeToastr">
      <i class="fa toastr__icon" :class="[ type === 'success' ? 'fa-check' : 'fa-close']"></i>
      <div class="toastr__message">
        {{message}}
      </div>
    </div>
  </transition>
</template>

<script lang="babel">
  import {mapState, mapActions} from 'vuex'
  export default {
    methods: {
      ...mapActions([
        'closeToastr'
      ])
    },
    computed: {
      ...mapState({
        show: state => state.toastrConf.show,
        type: state => state.toastrConf.type,
        message: state => state.toastrConf.message
      })
    },
    watch: {
      show: function () {
        if (this.show === true) {
          setTimeout(this.closeToastr, 1000)
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../assets/stylus/_variables"
  @import "../assets/stylus/_mixins"
  .toastr
    position: fixed
    z-index 100
    top 2%
    left 50%
    width 300px
    margin-left: -(@width / 2)
    padding 15px
    color: #fff
    box-shadow 0 0 12px #999
    border-radius 3px
    opacity .9
    transition all .2s ease
    clearfix()
    &:hover
      box-shadow 0 3px 15px #333
      opacity 1
    &Success
      background: darken($vue, 20%)
    &Error
      background: #bd362f
    &__icon
      float: left
      font-size: $font-size-max
    &__message
      float: left
      margin-left: 20px

  .toastr-enter-active, .toastr-leave-active
    transition all .2s ease-in-out

  .toastr-enter, .toastr-leave-to
    transform translateY(-100%)

  .toastr-enter-to, .toastr-leave
    transform translateY(2%)
</style>
