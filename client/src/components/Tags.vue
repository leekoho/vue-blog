<template lang="html">
  <section class="tags">
    <h1 class="tags__title">All Tags</h1>
    <span class="tags__link" v-for="tag in tags"><a :href="`#${tag._id}`">{{tag.name}}</a></span>
    <section class="tag" v-for="tag in tags" :id="tag._id">
      <h3 class="tag__title">{{tag.name}}</h3>
      <ul class="tag__ul">
        <li v-for="tag in tags"><h5><a href="">个人博客成立了 </a><span>2017-04-24</span></h5></li>
      </ul>
    </section>
  </section>
</template>

<script lang="babel">
  export default {
    data () {
      return {
        tags: [{
          _id: '586cb667f04d6c43b6e710c8',
          name: '个人项目'
        }, {
          _id: '58af99c15dc1822fa9a57273',
          name: '源码解析'
        }, {
          _id: '586cb6d9bf4eb043b0ca8ab9',
          name: 'Javascript'
        }, {
          _id: '586cb6e5bf4eb043b0ca8aba',
          name: 'CSS'
        }]
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../assets/stylus/_variables"
  @import "../assets/stylus/_mixins"
  .tags, .tag
    &__title
      &:before
        content: '# '
        color: $vue
      +mobile() {
        text-align center
      }
    &__link
      font-size: $font-size-larger
      font-weight: bold
      +mobile() {
        font-size: $font-size-large
      }
      &+&
        margin: 0 .5em;
  .tags
    margin-bottom: 4em
  .tag
    &__title
      +mobile() {
        text-align left
      }
    &__ul
      padding-left 1.2em
      span
        margin-left: 1.2em
        color: $gray
</style>
