<template>
<div class="journey">
  <div class="sequence">
    <div class="scene" :class="activeSceneClasses">
      <div class="main-visual-container">
        <div class="main-visual"></div>
      </div>
      <div class="text-container">
        <p>{{ activeScene.classes }}</p>
        <template v-if="activeScene.title">
          <h1 v-if="activeSceneClasses.includes('opening')" class="small">{{ activeScene.title }}</h1>
          <h2 v-else class="small">{{ activeScene.title }}</h2>
        </template>
        <p v-if="activeScene.description">{{ activeScene.description }}</p>
      </div>
      <div v-if="activeScene.subtitle" class="subtitle-container">字幕在這裡</div>
    </div>
    <div class="control-panel d-flex">
      <template v-if="activeSceneClasses.includes('fork')">
        <div v-for="option of activeScene.options" class="option" @click="fork(option.action, option.target)" :style="getStyles('options', option)">{{ option.label }}</div>
      </template>
      <template v-else>
        <div class="previous" @click="advanceScene(-1)"></div>
        <div class="next" @click="advanceScene(+1)"></div>
      </template>
    </div>
  </div>
</div>
</template>

<script>
import knowsMarkdown from '@/interfaces/knowsMarkdown'
import knowsClasses from '@/interfaces/knowsClasses'
import parseColor from 'parse-color'

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
    sceneIDs() {
      return this.scenes.map(scene => scene.id)
    },
    activeScene() {
      return this.scenes[this.activeSceneIndex]
    },
    activeSceneClasses() {
      return this.activeScene.classes
    }
  },
  methods: {
    getStyles(name, data) {
      const global = this.sequence.default ? this.sequence.default.styles ? this.sequence.default.styles[name] : undefined : undefined
      const scene = this.activeScene.default ? this.activeScene.styles ? this.activeScene.styles[name] : undefined : undefined
      const local = data.styles
      const attributes = ['text', 'background']
      var styles = {}
      for(let attribute of attributes) {
        styles[attribute] = (local && local[attribute]) || (scene && scene[attribute]) || (global && global[attribute]) || undefined
      }

      if(styles.text && typeof styles.text === 'object') {
        if(styles.text.align) {
          styles.textAlign = styles.text.align
        }
        if(styles.text.size) {
          styles.fontSize = styles.text.size
        }
        if(styles.text.color) {
          styles.color = styles.text.color
        }
      }
      if(styles.background && typeof styles.background === 'object') {
        var color = parseColor(styles.background.color)
        if(styles.background.opacity) {
          color = parseColor('rgba(' + color.rgb.slice().concat(styles.background.opacity).join(',') + ')')
        }
        styles.backgroundColor = 'rgba(' + color.rgba.join(',') + ')'
      }
      console.log(styles)
      return styles
    },
    advanceScene(delta) {
      this.activeSceneIndex = (this.activeSceneIndex + this.scenes.length + delta) % this.scenes.length
    },
    fork(action, target) {
      if(action === 'goto') {
        const index = this.sceneIDs.indexOf(target)
        this.activeSceneIndex = index >= 0 ? index : this.activeSceneIndex
      } else if(action === 'next') {
        this.advanceScene(+1)
      }
    }
  }
}
</script>

<style lang="scss">
@import '~common/src/styles/resources';

@mixin arrow($size, $orientation) {
  &:before {
    content: '';
    display: block;
    width: $size;
    height: $size;
    $border: max($size/5, 0.1875rem) black solid;
    border-top: $border;
    border-right: $border;
    position: absolute;
    top: 50%;
    left: 50%;
    $translateX: -65%;
    $translateY: -50%;
    $rotate: 45deg;
    @if $orientation == left {
      $translateX: -45%;
      $rotate: -135deg;
    }
    transform: translate($translateX, $translateY) rotate($rotate)
  }
}

@mixin fill-everything {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

@mixin bp-lg-alt-up {
  @media (min-width: #{$bp-lg-alt}) {
    @content;
  }
}

.journey {
  position: relative;
  width: 100%;
  > .sequence {
    > .scene {
      position: relative;
      box-sizing: border-box;
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      @include bp-sm-up {
        padding-bottom: 75%;
      }
      @include bp-md-up {
        padding-bottom: 66.66666667%;
      }
      @include bp-lg-up {
        padding-bottom: 56.25%;
      }
      background-color: rgb(255, 192, 192);

      > .main-visual-container {
        @include fill-everything;
        background-color: rgb(192, 192, 255);
        > .main-visual {
          @include fill-everything;
          background-color: rgb(192, 255, 192);
        }
      }
      > .text-container {
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgb(255, 228, 192);
        margin: 1rem;
      }
      > .subtitle-container {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        padding: 0.125rem 0.5rem;
        background-color: black;
        color: white;
      }

      &.opening {
        > .text-container {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }

      @include bp-sm-up {
        &.wide {
        }
        &.square {
          > .main-visual-container {
            position: absolute;
            width: 50%;
            height: 100%;
            > .main-visual {
              position: absolute;
              width: 100%;
              height: 0;
              padding-bottom: 100%;
              top: 50%;
              transform: translateY(-50%);
            }
          }
          > .text-container {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
    > .control-panel {
      position: absolute;
      bottom: 0;
      right: 0;
      margin: 1rem;
      > .previous,
      > .next,
      > .option {
        cursor: pointer;
        position: relative;
        background-color: white;
        @include shadow;
      }
      > .previous,
      > .next {
        border-radius: 50%;
      }
      > .previous {
        width: 2rem;
        height: 2rem;
        @include arrow(0.75rem, left);
        margin-right: 0.5rem;
      }
      > .next {
        width: 4rem;
        height: 4rem;
        @include arrow(1.25rem, right);
      }
      > .option {
        padding: 0.75rem;
        line-height: 1;
        &:not(:last-child) {
          margin-right: 0.75rem;
        }
      }
    }
  }
}
</style>
