<template>
<article class="journey">
  <div class="sequence">
    <div class="scene" :class="activeSceneClasses">
      <div class="main-visual-container" :style="mainVisualContainerStyles">
        <div class="main-visual" v-if="mainVisual" :class="mainVisual.type">
          <template v-if="mainVisual.type === 'image'">
            <div class="content" id="journey-main-visual-canvas" :style="mainVisualContentStyles"></div>
          </template>
        </div>
        <div class="visual-tags" v-if="activeScene.visualTags" :style="visualTagContainerStyles">
          <div v-for="tag of activeScene.visualTags" class="visual-tag" :style="Object.assign(getPositions('visualTags', tag), getVisibility(tag))" @click="visualTagClick(tag)" :key="getVisualTagKey(tag)">
            <div class="region" :style="Object.assign(getDimensions('visualTags', tag), getStyles('visualTags', tag))"></div>
            <div class="content" :style="" v-if="tag.content">{{ tag.content }}</div>
          </div>
        </div>
        <div class="subtitle d-flex justify-content-center">
          <subtitling-machine :lines="activeScene.subtitle" :config="subtitling.config" :status.sync="subtitling.status" :key="activeScene.id" />
        </div>
      </div>
      <div class="text-container" :style="textContainerStyles">
        <div class="text">
          <div class="date" v-if="activeScene.date"><span>{{ activeSceneDateString }}</span><span v-if="sequence.default.toggles.showCountdown" class="countdown">{{ activeSceneCountDown }}</span></div>
          <h3 v-if="activeScene.beforeTitle" class="before-title font-size-body body-style"><span>{{ activeScene.beforeTitle }}</span></h3>
          <template v-if="activeScene.title">
            <h1 v-if="activeSceneClasses.includes('opening')" class="title small"><span>{{ activeScene.title }}</span></h1>
            <h2 v-else class="title small"><span>{{ activeScene.title }}</span></h2>
          </template>
          <div class="paragraphs" v-if="activeScene.description" v-html="markdown(activeScene.description)"></div>
        </div>
      </div>
    </div>
    <div class="control-panel d-flex">
      <div class="previous" @click="changeScene('prev')"></div>
      <template v-if="activeSceneClasses.includes('fork')">
        <div v-for="option of activeScene.options" class="option" :class="option.type" @click="changeScene(option.action, option.target)" :style="getStyles('options', option)"><span>{{ option.label }}</span></div>
      </template>
      <template v-else>
        <div class="next" @click="changeScene('next')"></div>
      </template>
    </div>
  </div>
  <div class="background-audio-library">
    <audio v-for="audio of backgroundAudioLibrary" :id="'background-audio-player-' + audio.media.id" :src="audio.media.url"></audio>
  </div>
  <header class="end">
    <div class="text textgroup">
      <hgroup>
        <h5>{{ config.seriesTitle }}</h5>
        <span class="zhi">之</span>
        <h4><span v-if="config.beforeTitle" class="before-title font-size-body body-style">{{ config.beforeTitle }}</span><span>{{ config.title }}</span></h4>
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
import knowsAudio from '@/interfaces/knowsAudio'
import parseColor from 'parse-color'
import SubtitlingMachine from '@/components/SubtitlingMachine'

export default {
  mixins: [knowsMarkdown, knowsClasses, knowsAudio],
  metaInfo() {
    return {
      title: `${this.config.beforeTitle}${this.config.title}→沃草←國會無雙`,
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
        height: 0,
        transformOrigin: {
          x: 50,
          y: 50
        },
        transform: {
          scale: 1
        }
      },
      actual: {
        width: 0,
        height: 0
      },
      croppingMethod: 'cover',
      subtitling: {
        status: 'inactive',
        config: {
          tokenInterval: 150,
          lineInterval: 2000,
          styles: {
            background: {
              color: 'black'
            },
            text: {
              color: 'white'
            }
          }
        }
      },
      backgroundAudio: {
        playing: false
      }
    }
    return Object.assign(config, state)
  },
  watch: {
    activeSceneIndex() {
      // reset transformOrigin & transform at change of scene
      this.canvas.transformOrigin.x = this.canvas.transformOrigin.y = 50
      this.canvas.transform.scale = 1
    }
  },
  updated() {
    this.setSceneDimensions() // scene dimensions *HAVE TO BE* calculated after data update & DOM re-render
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
    activeSceneDate() {
      return this.activeScene.date ? new Date(this.activeScene.date) : undefined
    },
    activeSceneDateString() {
      return this.activeSceneDate ? this.activeSceneDate.getFullYear() + '年' + (this.activeSceneDate.getMonth() + 1) + '月' + this.activeSceneDate.getDate() + '日' : undefined
    },
    activeSceneCountDown() {
      var result = null
      if(this.activeSceneDate && this.sequence.endDate) {
        const endDate = new Date(this.sequence.endDate)
        const oneDay = 24 * 60 * 60 * 1000
        result = Math.round((this.activeSceneDate.getTime() - endDate.getTime()) / (oneDay))
        result = result > 0 ? '+' + result : result
      }
      return result
    },
    mainVisual() {
      return this.activeScene.hasOwnProperty('mainVisual') ? this.activeScene.mainVisual : undefined
    },
    mainVisualContentStyles() {
      var styles = {}
      if(this.mainVisual && this.mainVisual.type === 'image') {
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
        if(this.mainVisual.blur) {
          styles.filter = 'blur(4px)'
        }
        styles.backgroundImage = 'url(' + require('_/' + this.mainVisual.url) + ')'
      }
      return styles
    },
    mainVisualContainerStyles() {
      return Object.assign(this.getStyles('mainVisualContainer'), {
        transformOrigin: `${this.canvas.transformOrigin.x}% ${this.canvas.transformOrigin.y}%`,
        transform: `scale(${this.canvas.transform.scale})`
      })
    },
    visualTagContainerStyles() {
      return this.mainVisual ? {
        width: this.mainVisual.width * this.zoom + 'px',
        height: this.mainVisual.height * this.zoom + 'px',
        top: this.offset.top + 'px',
        left: this.offset.left + 'px'
      } : {}
    },
    textContainerStyles() {
      return this.getStyles('textContainer')
    },
    zoom() {
      return this.mainVisual ? this.actual.width / this.mainVisual.width : 1
    },
    offset() {
      return {
        top: (this.canvas.height - this.actual.height) / 2.0,
        left: (this.canvas.width - this.actual.width) / 2.0
      }
    },
    nextScene() {
      var index = -1
      if(this.activeScene.classes.includes('fork')) {
         // FIXME: TBD
      } else {
        index = this.activeScene.hasOwnProperty('next')
          ? this.getSceneIndexFromID(this.activeScene.next)
          : (this.activeSceneIndex + this.scenes.length + 1) % this.scenes.length
      }
      return index > 0 && index < this.scenes.length ? this.scenes[index] : undefined
    },
    backgroundAudioLibrary() {
      // find all background audio occurences at scenes
      var backgroundAudioAtScene = this.scenes
        .filter(scene => scene.hasOwnProperty('backgroundAudio'))
        .map(scene => ({
          mediaID: scene.backgroundAudio.id,
          sceneID: scene.id
        }))

      // return list of unique media entries and their occurences at scenes
      return [...new Set(backgroundAudioAtScene.map(item => item.mediaID))]
        .map(mediaID => ({
          media: this.getMediaFromID(mediaID),
          scenes: backgroundAudioAtScene.filter(item => item.mediaID === mediaID).map(item => item.sceneID)
        }))
    }
  },
  methods: {
    getMediaFromID(id) {
      return Object.assign({}, this.sequence.media.find(media => media.id === id))
    },
    getSceneIndexFromID(id) {
      return this.sceneIDs.indexOf(id)
    },
    canvasIsLarger() {
      return this.canvas.width >= this.mainVisual.width && this.canvas.height >= this.mainVisual.height
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
    getVisibility(data) {
      var styles = {}
      if(data.hasOwnProperty('visible') && data.visible === false) {
        styles.opacity = 0
        styles.visibility = 'hidden'
      }
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
        if(styles.text.leading) {
          styles.lineHeight = styles.text.leading
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
        this.canvas.width = el.getBoundingClientRect().width / this.canvas.transform.scale
        this.canvas.height = el.getBoundingClientRect().height / this.canvas.transform.scale
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
    visualTagClick(tag) {
      if(tag.click === 'getCloser') {
        this.canvas.transformOrigin.x = (tag.x + tag.width / 2) * 100.0 / this.mainVisual.width
        this.canvas.transformOrigin.y = (tag.y + tag.height / 2) * 100.0 / this.mainVisual.height
        this.canvas.transform.scale = this.canvas.transform.scale === 1 ? 2 : 1
      } else if(tag.click === 'revealUnder') {
        tag.visible = false
      }
    },
    getVisualTagKey(tag) {
      return `${tag.x}-${tag.y}-${tag.width}-${tag.height}`
    },
    changeScene(action, target) {
      var nextSceneIndex = this.activeSceneIndex
      if(action === 'next') {
        nextSceneIndex = this.activeScene.hasOwnProperty('next') ? this.getSceneIndexFromID(this.activeScene.next) : (this.activeSceneIndex + this.scenes.length + 1) % this.scenes.length
      } else if(action === 'prev') {
        nextSceneIndex = this.activeScene.hasOwnProperty('prev') ? this.getSceneIndexFromID(this.activeScene.prev) : (this.activeSceneIndex + this.scenes.length - 1) % this.scenes.length
      } else if(action === 'goto') {
        nextSceneIndex = this.getSceneIndexFromID(target)
      }

      // fade out AND/OR play background audio
      // audio.play() *MUST* be involked within a click/touch event handler
      const nextScene = this.scenes[nextSceneIndex]
      const audioInLibrary = this.backgroundAudioLibrary.find(audio => audio.scenes.includes(nextScene.id))
      const nextBackgroundAudio = audioInLibrary ? document.getElementById('background-audio-player-' + audioInLibrary.media.id) : null

      if(this.backgroundAudio.playing) {
        this.fadeOutAudio(this.backgroundAudio.playing, () => {
          this.activeSceneIndex = nextSceneIndex
          if(nextBackgroundAudio) {
            this.playAudio(nextBackgroundAudio)
            this.backgroundAudio.playing = nextBackgroundAudio
          }
        })
        return // do not change scene until fade is complete
      } else {
        if(nextBackgroundAudio) {
          this.playAudio(nextBackgroundAudio)
          this.backgroundAudio.playing = nextBackgroundAudio
        }
      }
      // change scene
      this.activeSceneIndex = nextSceneIndex
    }
  },
  mounted() {
    window.addEventListener('resize', this.setSceneDimensions)
    this.setSceneDimensions()
  },
  components: {
    SubtitlingMachine
  }
}
</script>

<style lang="scss">
@import '~common/src/styles/resources';
@import '../common';

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
@mixin aspect-ratio-wide {
  @media (min-aspect-ratio: 16/10) {
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
      overflow: hidden;
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
          @include aspect-ratio-wide {
            padding-top: 48%;
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
            transition: visibility 0s linear 500ms, opacity 500ms;
            > .region {
              border-style: solid;
              cursor: pointer;
            }
            > .content {
              display: inline-block;
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
        > .subtitle {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          // FIXME: not perfect center due to weird line height issue with the font?
          width: 100%;
        }
      }
      > .text-container {
        position: relative;
        width: 100%;
        margin: 0;
        padding: 1rem;
        @include bp-md-up {
          position: absolute;
          top: 0;
          left: 0;
          width: auto;
        }
        > .text {
          position: relative;
          max-width: 24rem;
          margin: 0;
          padding: 0;
          > .date {
            margin-bottom: 1rem;
            > span {
              @include subtitle-ish;
              &.countdown {
                color: $color-nice-grey;
              }
            }
          }
          > .before-title {
            > span {
              @include subtitle-ish;
            }
          }
          > .title {
            // FIXME: temporary solution for 10-character title
            @include bp-xs-down {
              font-size: 1.75rem;
            }
            > span {
              @include subtitle-ish(true);
            }
          }
          > .paragraphs {
            &:first-child {
              margin-top: 0;
            }
            &:last-child {
              margin-bottom: 0;
            }
            > p {
              display: inline;
              @include subtitle-ish;
            }
          }
        }
      }

      &.opening {
        > .text-container {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          padding: 0;
          margin: 0;
          width: 100%;
          > .text {
            padding: 0;
            margin: 0;
            width: 100%;
            max-width: none;
            text-align: center;
          }
        }
      }
      &.wide {
      }
      &.square {
        > .main-visual-container {
          > .main-visual {
            @include bp-sm-up {
              position: absolute;
              top: 50%;
              right: auto;
              bottom: auto;
              left: auto;
              transform: translateY(-50%);
              width: 50%;
              height: 0;
              padding-bottom: 50%;
            }
            @include bp-md-up {
              margin-left: 2.5%;
            }
          }
        }
        > .text-container {
          @include bp-sm-up {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 50%;
            width: 50%;
          }
          @include bp-md-up {
            left: 52.5%;
            width: 45%;
          }
        }
      }
    }
    > .control-panel {
      position: absolute;
      top: 100vw;
      transform: translateY(-65%);
      @include bp-sm-up {
        top: 75vw;
      }
      @include bp-md-up {
        top: 66.66666667vw;
      }
      @include bp-lg-up {
        top: 56.25vw;
      }
      @include aspect-ratio-wide {
        transform: none;
        top: auto;
        bottom: 1rem;
      }
      right: 0;
      margin: 0 1rem;
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
        min-width: 4rem;
        max-height: 4rem;
        padding: 1.5rem 1rem;
        border-radius: 2rem;
        line-height: 1;
        font-weight: bold;
        text-align: center;
        &:not(:last-child) {
          margin-right: 0.5rem;
        }
        &.emoji {
          > span {
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            font-size: 2rem;
            line-height: 2rem;
            @include bp-sm-up { // FIXME: emoji baseline is different on iOS & macOS
              padding-top: 0.25rem;
            }
          }
        }
      }
    }
  }
}
</style>
