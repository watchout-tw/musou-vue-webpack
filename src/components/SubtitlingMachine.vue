<template>
<div class="subtitling-machine">
  <div v-if="lineText" class="line">{{ lineText }}</div>
</div>
</template>

<script>
import knowsTokenization from '@/interfaces/knowsTokenization'

export default {
  mixins: [knowsTokenization],
  props: ['lines', 'config', 'status'],
  data() {
    return {
      lineTimer: null,
      lineIndex: -1,
      tokenTimer: null,
      tokenIndex: -1
    }
  },
  computed: {
    isEmpty() {
      return this.lines ? this.lines.length < 1 : true
    },
    lineTokens() {
      return !this.isEmpty && this.lineIndex > -1 ? this.tokenize(this.lines[this.lineIndex]) : undefined
    },
    lineText() {
      return this.lineTokens && this.tokenIndex > -1 ? this.lineTokens.slice(0, this.tokenIndex + 1).join('') : undefined
    }
  },
  mounted() {
    if(!this.isEmpty) {
      if(this.lineIndex < 0) {
        this.lineIndex = 0
      }
      this.play()
    }
  },
  beforeDestroy() {
    this.stop()
  },
  methods: {
    play() {
      this.$emit('update:status', 'active')
      this.tokenTimer = setInterval(() => {
        if(this.lineTokens && this.tokenIndex < this.lineTokens.length) {
          this.tokenIndex += 1
        } else {
          this.prepare()
        }
      }, this.config.tokenInterval)
    },
    prepare() {
      clearInterval(this.tokenTimer)
      this.lineTimer = setTimeout(() => {
        this.tokenIndex = -1
        this.lineTimer = null
        this.lineIndex = this.lineIndex + 1 < this.lines.length ? this.lineIndex + 1 : -1
        if(this.lineIndex > -1) {
          this.play()
        } else {
          this.stop()
        }
      }, this.config.lineInterval)
    },
    stop() {
      this.$emit('update:status', 'inactive')
    }
  }
}
</script>

<style lang="scss">
.subtitling-machine {
  > .line {
    padding: 0.25rem 0.75rem;
    background-color: black;
    color: white;
  }
}
</style>
