<template>
  <div class="editor">
    <nav class="toolbar">
      <ul>
        <li @click="toggleSidebar">
          <button><i class="fa fa-bars"></i></button>
        </li>
        <li @click="insertText('\n| title | title | title |\n| --- | --- | --- |\n| item | item | item |')">
          <button><i class="fa fa-table"></i></button>
        </li>
        <li @click="insertText('\n\<p class=\'tip\'\>\</p\>', -4)">
          <button><i class="fa fa-exclamation"></i></button>
        </li>

        <!--TODO add tag-->
        <!--<li>-->
          <!--<button><i class="fa fa-tags"></i></button>-->
        <!--</li>-->

        <li @click="togglePreview">
          <button><i class="fa fa-columns"></i></button>
        </li>
        <li @click="selectAbout">
          <button><i class="fa fa-user"></i></button>
        </li>
        <li @click="loginOut">
          <button><i class="fa fa-power-off"></i></i></button>
        </li>
        <li class="published" v-show="currentArticle.display" @click="unPublishArticle(currentArticle._id)">
          <button>撤回发布</button>
        </li>
        <li class="published" v-show="!currentArticle.display" @click="publishArticle(currentArticle._id)">
          <button>发布</button>
        </li>
        <li class="published" v-show="currentArticle._id" @click="updateArticle(currentArticle._id)">
          <button>更新</button>
        </li>
      </ul>
    </nav>
    <div class="content">
      <div class="code-area" ref="codeArea">
        <textarea :value="currentArticle.markdown" @input="updateTextarea"
                  ref="textArea" placeholder="请开始你的表演"></textarea>
      </div>
      <div v-show="previewFlag" class="preview-area" ref="previewArea">
        <h1 class="preview-area__title">{{currentArticle.markdown | title}}</h1>
        <!--<p class="preview-area__time">2017.04.25</p>-->
        <div class="preview-area__content" v-html="marked(getContent(currentArticle.markdown) || '')"></div>
      </div>
    </div>
  </div>
</template>

<script lang="babel">
  import marked from 'marked'
  import { mapActions, mapState } from 'vuex'

  export default {
    data () {
      return {
        previewFlag: true
      }
    },
    methods: {
      marked (str) {
        return marked(str)
      },
      ...mapActions([
        'toggleSidebar',
        'unPublishArticle',
        'publishArticle',
        'updateArticle',
        'loginOut',
        'selectAbout'
      ]),
      updateTextarea (e) {
        this.$store.commit('updateTextarea', e.target.value)
      },
      togglePreview () {
        this.previewFlag = !this.previewFlag
        if (this.previewFlag) {
          this.$refs.codeArea.style.width = '47.5%'
        } else {
          this.$refs.codeArea.style.width = '98%'
        }
      },
      insertText (str, cursorPosOffset = 0) {
        let obj = this.$refs.textArea
        obj.focus()
        if (document.selection) {
          let sel = document.selection.createRange() // 获得光标的位置，或选中文字的位置；
          sel.text = str
        } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
          let startPos = obj.selectionStart
          let endPos = obj.selectionEnd
          let cursorPos = startPos
          let tmpStr = obj.value
          obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length)
          cursorPos += str.length
          cursorPos += cursorPosOffset  // 可以自己传进来一个参数，定义光标的偏移量，默认为str.length
          obj.selectionStart = obj.selectionEnd = cursorPos
        } else {
          obj.value += str
        }
      }
    },
    computed: {
      ...mapState({
        currentArticle: state => state.currentArticle,
        updataType: state => state.updateType
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../assets/stylus/_variables"
  @import "../assets/stylus/_mixins"
  .editor
    flex 1
    .toolbar
      background: $vue
      box-shadow 0 0 10px $gray
      ul
        list-style none
        clearfix()
        & > li
          float: left
          width 3.5em
          height @width
          line-height: @width
          &:first-child
            border-right 1px solid darken($vue, 20%)
          &.published
            float: right
            width: 100px
            background: darken($vue, 20%)
          button
            width: 100%
            height @width
            color: #fff
            background: transparent
            border none
            outline none
            font-size: 18px
            transition all .2s ease
            cursor: pointer
            &:hover
              background: darken($vue, 20%)
    .content
      position: relative
      height calc(100% - 5.5em)  // toolbar的高度 + .content margin的高度
      margin-top: 1em
      clearfix()
      .code-area
        float: left
        margin-left: 1%
        width 48.5%
        height 100%
        workAreaAnimate()
        textarea
          width: 100%
          height 100%
          min-height: 300px
          padding 1em
          font-size: $font-size-large
          outline none
          border none
          overflow: hidden
          resize: none
          font-family $font-family-base
          white-space pre-wrap
          border-radius 2px
          overflow-y scroll
          box-shadow 0 0 10px $gray
      .preview-area
        float: left
        margin: 0 1%
        width 48.5%
        height 100%
        padding: 1em
        background: #fff
        box-shadow 0 0 10px $gray
        overflow-y scroll
        &__title
          margin-bottom: 0
          text-align: center
          &:before
            content: '# '
            text-align: center
            color $vue
        &__time
          margin: 1.2em auto
          padding-bottom: 0 !important
          text-align: center
          color: $gray
</style>
