<template>
  <div class="login">
    <h1 class="login__title">博客后台登录</h1>
    <input type="text" placeholder="用户名" autofocus v-model="username">
    <input type="password" placeholder="密码" v-model="password">
    <button @click="login({username, password})">登录</button>
  </div>
</template>

<script lang="babel">
  import { mapActions } from 'vuex'
  export default {
    data () {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      ...mapActions([
        'login'
      ])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../assets/stylus/_variables"
  @import "../assets/stylus/_mixins"
  .login
    width 320px
    height: 500px
    text-align: center
    absolute-center()
    input
      display: block
      width: 100%
      height 40px
      padding 5px 15px
      margin 2em auto
      background: #f5f5f5
      border 1px solid $dark
      outline none
      border-radius 5px
      &:focus
        box-shadow 0 0 2px $vue
        border-color $vue
    button
      width 100%
      height: 40px
      background: $vue
      color: #fff
      transition all .2s ease
      &:hover
        background: darken($vue, 20%)
</style>
