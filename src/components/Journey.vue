<template>
<div class="journey">
  <div class="sequence">
    <div class="scene active">
      <div>{{ activeScene.id }}</div>
    </div>
    <div class="control">
      <div class="previous" @click="advanceScene(-1)">PREV</div>
      <div class="next" @click="advanceScene(+1)">NEXT</div>
    </div>
  </div>
</div>
</template>

<script>
import knowsMarkdown from '@/interfaces/knowsMarkdown'
import knowsClasses from '@/interfaces/knowsClasses'

export default {
  mixins: [knowsMarkdown, knowsClasses],
  metaInfo() {
    return {
      title: `《${this.config.seriesTitle}》${this.config.title}→沃草←國會無雙`,
      meta: [
        {
          vmid: 'og-image',
          property: 'og:image',
          content: require('_/' + this.ogImage)
        }
      ]
    }
  },
  props: ['config'],
  data() {
    var config = require('@/config/journey/' + this.config.id + '.js').default
    var state = {
      activeSceneIndex: 0
    }
    return Object.assign(config, state)
  },
  computed: {
    ogImage() {
      return this.config.image ? this.config.image : 'journey.png'
    },
    scenes() {
      return this.sequence.scenes ? this.sequence.scenes : []
    },
    activeScene() {
      return this.scenes[this.activeSceneIndex]
    }
  },
  methods: {
    advanceScene(delta) {
      this.activeSceneIndex = (this.activeSceneIndex + this.scenes.length + delta) % this.scenes.length
    }
  }
}
</script>

<style lang="scss">
</style>
