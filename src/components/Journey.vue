<template>
<article class="journey">
  <div class="sequence">
    <div class="scene" :class="activeSceneClasses">
      <div class="main-visual-container" :style="getStyles('mainVisualContainer')">
        <div class="main-visual" v-if="mainVisual" :class="mainVisual.type">
          <template v-if="mainVisual.type === 'image'">
            <div class="content" id="journey-main-visual-canvas" :style="mainVisualContentStyles"></div>
          </template>
        </div>
        <div class="visual-tags" v-if="activeScene.visualTags" :style="visualTagContainerStyles">
          <div v-for="tag of activeScene.visualTags" class="visual-tag" :style="getPositions('visualTags', tag)">
            <div class="region" :style="Object.assign(getDimensions('visualTags', tag), getStyles('visualTags', tag))"></div>
            <div class="content" :style="" v-if="tag.content">{{ tag.content }}</div>
          </div>
        </div>
        <div class="subtitle-container" v-if="activeScene.subtitle">字幕在這裡</div>
      </div>
      <div class="text-container" :style="getStyles('textContainer')">
        <div class="text">
          <template v-if="activeScene.title">
            <h1 v-if="activeSceneClasses.includes('opening')" class="small"><span>{{ activeScene.title }}</span></h1>
            <h2 v-else class="small"><span>{{ activeScene.title }}</span></h2>
          </template>
          <div class="paragraphs" v-if="activeScene.description" v-html="markdown(activeScene.description)"></div>
        </div>
      </div>
    </div>
    <div class="control-panel d-flex">
      <div class="previous" @click="advanceScene(-1)"></div>
      <template v-if="activeSceneClasses.includes('fork')">
        <div v-for="option of activeScene.options" class="option" @click="fork(option.action, option.target)" :style="getStyles('options', option)">{{ option.label }}</div>
      </template>
      <template v-else>
        <div class="next" @click="advanceScene(+1)"></div>
      </template>
    </div>
  </div>
  <header class="end">
    <div class="text textgroup">
      <hgroup>
        <h5>{{ config.seriesTitle }}</h5>
        <span class="zhi">之</span>
        <h4>{{ config.title }}</h4>
      </hgroup>
      <div class="authorship">
        <div class="item d-flex flex-row" v-for="item in authorship"><div class="job">{{ item.job }}</div><div v-for="person in item.people" class="person">{{ person }}</div></div>
      </div>
      <div class="date">{{ config.date }}</div>
      <div class="references a-text-only" v-if="references.length > 0">
        <h5>參考資料</h5>
        <ul>
          <li v-for="ref in references" v-html="markdown(ref)"></li>
        </ul>
      </div>
    </div>
  </header>
</article>
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
      activeSceneIndex: 0,
      canvas: {
        width: 0,
        height: 0
      },
      actual: {
        width: 0,
        height: 0
      },
      croppingMethod: 'cover'
    }
    return Object.assign(config, state)
  },
  updated() { // data changes -> DOM re-render complete
    this.setSceneDimensions()
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
    },
    mainVisual() {
      return this.activeScene.hasOwnProperty('mainVisual') ? this.activeScene.mainVisual : undefined
    },
    mainVisualContentStyles() {
      var styles = {}
      if(this.mainVisual.type === 'image') {
        if(this.mainVisual.magnify === false) {
          if(this.canvasIsLarger()) {
            // actual size
            this.croppingMethod = 'none'
            styles.backgroundSize = this.mainVisual.width + 'px'
          } else {
            // contain
            this.croppingMethod = styles.backgroundSize = 'contain'
          }
        } else {
          // cover
          this.croppingMethod = styles.backgroundSize = 'cover'
        }
        styles.backgroundImage = 'url(' + require('_/' + this.mainVisual.url) + ')'
      }
      return styles
    },
    visualTagContainerStyles() {
      return {
        width: this.mainVisual.width * this.zoom + 'px',
        height: this.mainVisual.height * this.zoom + 'px',
        top: this.offset.top + 'px',
        left: this.offset.left + 'px'
      }
    },
    zoom() {
      return this.mainVisual ? this.actual.width / this.mainVisual.width : 1
    },
    offset() {
      return {
        top: (this.canvas.height - this.actual.height) / 2.0,
        left: (this.canvas.width - this.actual.width) / 2.0
      }
    }
  },
  methods: {
    canvasIsLarger() {
      return this.canvas.width >= this.mainVisual.width
    },
    getPositions(name, data) {
      return {
        top: data.y * 100.0 / this.mainVisual.height + '%',
        left: data.x * 100.0 / this.mainVisual.width + '%'
      }
    },
    getDimensions(name, data) {
      var styles = {}
      styles.width = data.width * this.zoom + 'px'
      styles.height = data.height * this.zoom + 'px'
      return styles
    },
    getStyles(name, data = undefined) {
      var styles = {}
      const global = this.sequence.default ? this.sequence.default.styles ? this.sequence.default.styles[name] : undefined : undefined
      const scene = this.activeScene.default ? this.activeScene.default.styles ? this.activeScene.default.styles[name] : undefined : undefined
      const local = data ? data.styles : undefined
      const attributes = ['text', 'border', 'background']
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
      if(styles.border && typeof styles.border === 'object') {
        if(styles.border.width) {
          styles.borderWidth = styles.border.width
        }
        if(styles.border.color) {
          styles.borderColor = styles.border.color
        }
      }
      if(styles.background && typeof styles.background === 'object') {
        var color = parseColor(styles.background.color)
        if(styles.background.opacity) {
          color = parseColor('rgba(' + color.rgb.slice().concat(styles.background.opacity).join(',') + ')')
        }
        styles.backgroundColor = 'rgba(' + color.rgba.join(',') + ')'
      }
      return styles
    },
    setSceneDimensions() {
      const el = document.getElementById('journey-main-visual-canvas')
      if(el) {
        this.canvas.width = el.getBoundingClientRect().width
        this.canvas.height = el.getBoundingClientRect().height
        if(this.mainVisual && this.mainVisual.type === 'image') {
          // http://blog.vjeux.com/2013/image/css-container-and-cover.html
          const originalRatio = this.mainVisual.width / this.mainVisual.height
          const canvasRatio = this.canvas.width / this.canvas.height

          if(this.mainVisual.magnify === false) {
            if(this.canvasIsLarger()) {
              // actual size
              this.actual.width = this.mainVisual.width
              this.actual.height = this.mainVisual.height
            } else {
              // contain
              this.actual.width = canvasRatio > originalRatio ? this.canvas.height * originalRatio : this.canvas.width
              this.actual.height = canvasRatio > originalRatio ? this.canvas.height : this.canvas.width / originalRatio
            }
          } else {
            // cover
            this.actual.width = canvasRatio > originalRatio ? this.canvas.width : this.canvas.height * originalRatio
            this.actual.height = canvasRatio > originalRatio ? this.canvas.width / originalRatio : this.canvas.height
          }
        }
      } else {
        this.canvas.width = this.canvas.height = 0
        this.actual.width = this.actual.height = 0
      }
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
  },
  mounted() {
    window.addEventListener('resize', this.setSceneDimensions)
    this.setSceneDimensions()
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

@mixin full-coverage {
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
    position: relative;
    > .scene {
      position: relative;
      display: block;

      > .main-visual-container {
        position: relative;
        display: block;
        width: 100%;
        padding: 0;
        overflow: hidden;
        background-color: #333;

        &:before {
          content: '';
          display: block;
          padding-top: 100%;
          @include bp-sm-up {
            padding-top: 75%;
          }
          @include bp-md-up {
            padding-top: 66.66666667%;
          }
          @include bp-lg-up {
            padding-top: 56.25%;
          }
        }

        > .main-visual {
          @include full-coverage;
          &.image > .content {
            @include full-coverage;
            background-size: cover;
            background-position: center center;
            background-repeat: no-repeat;
          }
        }
        > .visual-tags {
          position: absolute;
          > .visual-tag {
            position: absolute;
            > .region {
              border-style: solid;
              border-radius: 2px;
              cursor: pointer;
            }
            > .content {
              display: inline-block;
              min-width: 3rem;
              max-width: 8rem;
              border-radius: 2px;
              font-size: 0.875rem;
              margin: 0.25rem 0;
              padding: 0.25rem 0.5rem;
              background: rgba(white, 0.5);
              color: black;
            }
          }
        }
        > .subtitle-container {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          padding: 0.25rem 0.75rem;
          background-color: black;
          color: white;
        }
      }
      > .text-container {
        position: relative;
        width: 100%;
        padding: 0.5rem 0;
        background-color: black;
        color: white;
        @include bp-md-up {
          position: absolute;
          top: 0;
          left: 0;
          width: auto;
          margin: 1rem;
        }
        > .text {
          position: relative;
          max-width: 24rem;
          margin: 0 1rem;
        }
      }

      &.opening {
        > .text-container {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          width: 100%;
          > .text {
            margin: 1rem auto;
            text-align: center;
          }
        }
      }

      @include bp-sm-up {
        &.wide {
        }
        &.square {
          > .main-visual-container {
            > .main-visual {
              position: absolute;
              top: 50%;
              right: auto;
              bottom: auto;
              left: auto;
              transform: translateY(-50%);
              width: 50%;
              height: 0;
              padding-bottom: 50%;
              margin-left: 1rem;
            }
          }
          > .text-container {
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: 1rem;
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
        padding: 1.5rem 1rem;
        border-radius: 2rem;
        line-height: 1;
        font-weight: bold;
        &:not(:last-child) {
          margin-right: 0.5rem;
        }
      }
    }
  }
}
</style>
