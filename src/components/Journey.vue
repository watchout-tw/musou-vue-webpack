<template>
<div class="journey">
  <div class="sequence">
    <div class="scene" :class="activeSceneClasses">
      <div class="main-visual-container">
        <div class="main-visual"></div>
      </div>
      <div class="text-container">
        <p v-if="activeScene.title">{{ activeScene.title }}</p>
        <p v-if="activeScene.description">{{ activeScene.description }}</p>
      </div>
      <div class="subtitle-container">字幕在這裡</div>
    </div>
    <div class="control d-flex">
      <div class="previous" @click="advanceScene(-1)"></div>
      <div class="next" @click="advanceScene(+1)"></div>
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
    },
    activeSceneClasses() {
      return this.activeScene.classes
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
      background: rgb(255, 192, 192);

      > .main-visual-container {
        @include fill-everything;
        background: rgb(192, 192, 255);
        > .main-visual {
          @include fill-everything;
          background: rgb(192, 255, 192);
        }
      }
      > .text-container {
        position: absolute;
        top: 0;
        left: 0;
        background: rgb(255, 228, 192);
      }
      > .subtitle-container {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        padding: 0.125rem 0.5rem;
        background: black;
        color: white;
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
            left: 50%;
          }
        }
      }
    }
    > .control {
      position: absolute;
      bottom: 0;
      right: 0;
      margin: 1rem;
      > .previous,
      > .next {
        cursor: pointer;
        position: relative;
        border-radius: 50%;
        background: white;
        @include shadow;
      }
      > .previous {
        width: 2rem;
        height: 2rem;
        @include arrow(0.75rem, left);
        margin-right: 0.25rem;
      }
      > .next {
        width: 4rem;
        height: 4rem;
        @include arrow(1.25rem, right);
      }
    }
  }
}
</style>
