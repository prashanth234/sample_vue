<template>
  <div 
    contenteditable
    :class="{'editor': this.done}"
    ref="editor"
    @keydown.ctrl.enter.exact="blur"
    @blur="onInput"
  >
    {{text}}
  </div>
</template>

<script>

export default {
  props: ['value', 'done'],
  data () {
    return {
      text: this.value
    }
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.innerText)
      this.$emit('change', e.target.innerText)
    },
    blur () {
      this.$refs.editor.blur()
    },
    newline (e) {
      e.target.innerText += '\n'
    }
  }
}
</script>

<style scoped>
[contenteditable]:focus {
  outline: 0.5px solid grey;
  text-decoration: none;
}
.editor {
  text-decoration: line-through;
}
</style>