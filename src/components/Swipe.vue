<template>
<article class="swipe">
  <div class="swipe-container">
    <div class="swipe-sections">
      <div class="swipe-cards">
        <div v-for="(card, index) of cards" class="swipe-card" :data-card-index="index" :class="cardClasses(index)" :id="card.id">
          <label v-if="index > 0" class="index">{{ index }}</label>
          <component v-if="card.title" :is="card.id === 'cover' ? 'h1' : 'h2'" class="title" v-html="card.title"></component>
          <template v-if="card.type === 'question'">
            <div class="content">
              <div class="paragraphs first" v-html="markdown(card.question)"></div>
            </div>
          </template>
          <template v-else-if="card.type === 'text'">
            <div class="content">
              <div class="paragraphs" v-html="markdown(card.content)"></div>
            </div>
          </template>
        </div>
      </div>
      <div class="swipe-actions d-flex justify-content-around">
        <div class="swipe-action d-flex justify-content-center align-items-center" @click="swipe(swipeActionEnabled('left') ? -1 : 0)" :class="swipeActionClasses('left')"></div>
        <div class="swipe-action d-flex justify-content-center align-items-center" @click="swipe(swipeActionEnabled('right') ? +1 : 0)" :class="swipeActionClasses('right')"></div>
      </div>
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
  <transition name="modal">
    <div v-if="showResult" class="result-container d-flex justify-content-center align-items-start" @click.self="showResult = showMore = false">
      <div class="result">
        <div class="question paragraphs" v-html="markdown(activeCard.hasOwnProperty('recap') ? activeCard.recap : activeCard.question)"></div>
        <div class="answer" :class="activeCard.answer"></div>
        <div class="but paragraphs" v-html="markdown(activeCard.but)"></div>
        <template v-if="showMore">
          <div class="more">
            <div class="section" v-if="activeCard.more" v-for="section in activeCard.more" :class="section.type">
              <template v-if="section.type === 'markdown'">
                <div class="content a-text-only" v-if="section.content" v-html="markdown(section.content)"></div>
              </template>
              <template v-else-if="section.type === 'figure'">
                <iframe v-if="section.platform === 'infogram'" class="figure" :src="`https://e.infogram.com/${section.id}?src=embed`" width="100%" :height="section.height" scrolling="no" frameborder="0"></iframe>
                <div class="description" v-if="section.description" v-html="markdown(section.description)"></div>
              </template>
            </div>
          </div>
          <div class="buttons">
            <button class="flat" @click="showResult = showMore = false">下一題謝謝</button>
          </div>
        </template>
        <div v-else class="buttons">
          <button class="flat" @click="showResult = showMore = false">下一題謝謝</button>
          <button class="flat musou" @click="showMore = true">繼續說下去</button>
        </div>
      </div>
    </div>
  </transition>
</article>
</template>

<script>
import Vue from 'vue'
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
    var data = require('@/config/swipe/' + this.config.id).default
    if(data.cards && Array.isArray(data.cards)) {
      data.cards = data.cards.map(card => Object.assign(card, {
        el: undefined,
        obj: undefined,
        dragging: false,
        offsetX: 0,
        isOut: false,
        hasBeenOut: false
      }))
    }
    var references = {
      cardSelector: '.swipe-card',
      stack: undefined
    }
    var status = {
      activeCardIndex: -1,
      mirror: [], // this is a mirror of the stack
      lastSwipe: 0,
      showResult: false,
      showMore: false
    }
    return Object.assign(data, status, references)
  },
  computed: {
    ogImage() {
      return this.config.image ? this.config.image : 'swipe.png'
    },
    activeCard() {
      return this.activeCardIndex >= 0 && this.activeCardIndex < this.cards.length
        ? this.cards[this.activeCardIndex]
        : undefined
    },
    topCard() {
      return this.mirror.length > 0 ? this.cards[this.mirror[this.mirror.length - 1]] : undefined
    }
  },
  watch: {
    showResult() {
      const html = document.documentElement
      const body = document.body
      const className = 'no-scroll'
      if(this.showResult) {
        this.addClass(html, className)
        this.addClass(body, className)
      } else {
        this.removeClass(html, className)
        this.removeClass(body, className)
      }
    }
  },
  methods: {
    cardClasses(index) {
      var classes = []
      if(this.cards[index]) {
        if(this.cards[index].dragging) {
          classes.push('dragging')
        }
        if(this.cards[index].isOut) {
          classes.push('is-out')
        }
      }
      return classes
    },
    swipeActionEnabled(action) {
      return this.topCard && this.topCard.hasOwnProperty('options') && this.topCard.options.hasOwnProperty(action)
    },
    swipeActionClasses(action) {
      var classes = []
      if(this.swipeActionEnabled(action)) {
        classes.push(this.topCard.options[action].type)
        classes.push('enabled')
      } else {
        classes.push('disabled')
      }
      return classes
    },
    swipeActionTag(action) {
      return this.topCard && this.topCard.hasOwnProperty('options') && this.topCard.options.hasOwnProperty(action) ? this.topCard.options[action] : 'N/A'
    },
    swipe(direction) {
      if(direction !== 0 && this.topCard) {
        this.topCard.dragging = true
        this.topCard.el.parentNode.appendChild(this.topCard.el) // move dom of topCard to the front
        this.topCard.obj.throwOut(direction * 200, Math.random() * 200 * (Math.round(Math.random()) * 2 - 1))
        // modify swing to set springThrowOut velocity to 1
      }
    }
  },
  mounted() {
    const Swing = require('swing')
    const elements = [].slice.call(document.querySelectorAll(this.cardSelector))
    const config = {
      allowedDirections: [Swing.Direction.LEFT, Swing.Direction.RIGHT],
      throwOutConfidence: (xOffset, yOffset, element) => {
        const xConfidence = Math.min(Math.abs(xOffset) / element.offsetWidth * 2, 1)
        const yConfidence = Math.min(Math.abs(yOffset) / element.offsetHeight * 2, 1)
        return Math.max(xConfidence, yConfidence)
      },
      throwOutDistance: () => {
        return document.querySelector(this.cardSelector).offsetWidth * 1.05 * (1 + window.innerWidth / 320 * 0.05)
      }
    }
    Vue.set(this, 'stack', Swing.Stack(config))

    elements.reverse()
    elements.forEach((el, index) => {
      this.cards[this.cards.length - index - 1].el = el
      this.cards[this.cards.length - index - 1].obj = this.stack.createCard(el)
      this.mirror.unshift(index)
    })
    this.stack.on('dragstart', (e) => {
      const index = +e.target.dataset.cardIndex
      if(this.cards[index]) {
        this.cards.forEach(cardStatus => {
          cardStatus.dragging = false
        })
        this.cards[index].dragging = true
      }
      this.activeCardIndex = index
    })
    this.stack.on('dragmove', (e) => {
      const index = +e.target.dataset.cardIndex
      if(this.cards[index]) {
        this.cards[index].offsetX = e.offset
      }
    })
    this.stack.on('throwinend', (e) => {
      const index = +e.target.dataset.cardIndex
      if(this.cards[index]) {
        this.cards[index].dragging = false
        this.cards[index].isOut = false
        this.cards[index].hasBeenOut = false
      }
      if(this.mirror.indexOf(index) < 0) {
        this.mirror.push(index)
      }
    })
    this.stack.on('throwout', (e) => {
      this.lastSwipe = e.throwDirection.toString().toLowerCase().indexOf('right') > -1 ? +1 : -1
    })
    this.stack.on('throwoutend', (e) => {
      const index = +e.target.dataset.cardIndex
      if(this.cards[index]) {
        this.cards[index].isOut = true
      }
      // this.stack.getCard(e.target).destroy()
      this.activeCardIndex = index
      if(this.cards[index].isOut === true && this.cards[index].hasBeenOut === false) {
        // first remove it from mirror
        var toRemove = this.mirror.indexOf(index)
        if(toRemove >= 0 && toRemove < this.mirror.length) {
          this.mirror.splice(toRemove, 1)
        } else {
          console.error('broken mirror')
        }
        // show result if card is a question
        if(this.cards[index].type === 'question') {
          this.showResult = true
        }
        // flag card as has-been-out
        this.cards[index].hasBeenOut = true
      }
    })
  },
  updated() {
    if(this.showMore) {
      this.activeCard.more.map(section => {
        if(section.type === 'script') {
          const id = section.id
          const el = document.getElementById('script-container-' + id)
          const script = this.scripts[id]
          if(el && script) {
            el.innerHTML = script
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '~common/src/styles/resources';

@mixin checkmark($size, $color) {
  content: '';
  display: block;
  width: $size;
  height: $size*1.75;
  border-bottom: $size*0.25 $color solid;
  border-right: $size*0.25 $color solid;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -65%) rotate(45deg);
}
@mixin line($size, $color, $rotation) {
  content: '';
  display: block;
  width: $size*1.75;
  height: $size*0.25;
  background: $color;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate($rotation);
}
@mixin forward-slash($size, $color) {
  @include line($size, $color, -45deg);
}
@mixin backward-slash($size, $color) {
  @include line($size, $color, 45deg);
}
@mixin shadow-more {
  box-shadow: 0 4px 16px 0 $color-shadow;
}
.no-scroll {
  height: 100%;
  overflow: hidden !important;
}
@mixin v-bp-sm-down {
  @media (max-height: #{$bp-sm}) {
    @content;
  }
}
@mixin v-bp-sm-up {
  @media (min-height: #{$bp-sm}) {
    @content;
  }
}
@mixin v-bp-md-up {
  @media (min-height: #{$bp-md}) {
    @content;
  }
}

button:not([class^="el"]):not(.btn-prev):not(.btn-next).flat {
  padding: 0.25rem;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom-color: $color-border-grey;
  border-radius: 0;
  margin: 0 1rem;
  background: none;
  color: $color-border-grey;

  &.musou {
    color: $color-musou;
    border-color: $color-musou;
  }
}

$color-yes: $color-watchout;
$color-no: $color-musou;

.swipe {
  position: relative;
  margin: 0;
  padding: 0;

  .swipe-action-inline {
    display: inline-block;
    vertical-align: top;
    position: relative;
    width: 2rem;
    height: 2rem;
    border-radius: 1rem;
    margin: 0 0.125rem;

    &.YES {
      background: rgba($color-yes, 0.5);
      &:before {
        @include checkmark(0.65rem, $color-yes);
      }
    }
    &.NO {
      background: rgba($color-no, 0.5);
      &:before {
        @include forward-slash(0.65rem, $color-no);
      }
      &:after {
        @include backward-slash(0.65rem, $color-no);
      }
    }
  }

  > .swipe-container {
    width: 100%;
    > .swipe-sections {
      width: 100%;
      max-width: 16rem;
      margin: 0 auto;
      padding: 1rem 0;
      @include bp-sm-up {
        max-width: 20rem;
        padding: 2rem 0;
      }
      @include bp-md-up {
        padding: 8vw 0;
      }

      > .swipe-cards {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        > .swipe-card {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          padding: 1rem;
          background: $color-very-light-grey;
          cursor: pointer;

          &.dragging,
          &.is-out {
              @include shadow;
          }
          > .index {
            display: block;
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            text-align: center;
            line-height: 2rem;
            background-color: rgba(black, 0.125);
            color: rgba(black, 0.25);
          }
          > .title {
            font-size: 1.75rem;
            margin: 0.5rem 0;
            font-family: $font-sans-serif;
            @include font-no-smoothing;
            @include bp-sm-up {
              font-size: 2.25rem;
              margin: 0.75rem 0 1rem;
            }
          }
          > h1.title {
          }
          > .content {
            width: 100%;
            @include bp-sm-up {
              font-size: 1.125rem;
            }

          }
          &.is-out {
            > .index,
            > .title,
            > .content,
            > .actions {
              opacity: 0.25;
            }
          }
          &#last {
            background: $color-very-light-grey;
            @include shadow;
          }
        }
      }
      > .swipe-actions {
        margin-top: 1.25rem;
        @include bp-sm-up {
          margin-top: 2rem;
        }
        > .swipe-action {
          position: relative;
          width: 6rem;
          height: 6rem;
          border-radius: 3rem;
          text-align: center;
          cursor: pointer;
          @include shadow;

          &.disabled {
            background: $color-very-light-grey;
            cursor: default;
          }
          &.YES {
            background: rgba($color-yes, 0.5);
            &:before {
              @include checkmark(1.5rem, $color-yes);
            }
          }
          &.NO {
            background: rgba($color-no, 0.5);
            &:before {
              @include forward-slash(1.5rem, $color-no);
            }
            &:after {
              @include backward-slash(1.5rem, $color-no);
            }
          }
        }
      }
    }
  }
  > .result-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(black, 0.65);
    z-index: $z-below-nav;
    padding-top: $navbar-height;
    transition: opacity .3s ease;

    > .result {
      margin-top: 1rem;
      max-width: 24rem;
      max-height: 22rem;
      @include v-bp-md-up {
        margin-top: 4rem;
        max-height: 32rem;
      }
      overflow-x: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      padding: 1rem;
      background: white;
      @include shadow-more;

      > .question {
        margin-top: 0;
      }
      > .answer {
        position: relative;
        width: 4rem;
        height: 4rem;
        border-radius: 2rem;
        margin: 0 auto;

        &.YES {
          background: rgba($color-yes, 0.25);
          &:before {
            @include checkmark(1.25rem, $color-yes);
          }
        }
        &.NO {
          background: rgba($color-no, 0.25);
          &:before {
            @include forward-slash(1.25rem, $color-no);
          }
          &:after {
            @include backward-slash(1.25rem, $color-no);
          }
        }
      }
      > .more {
        > .section.figure {
          > .figure {
            width: 100%;
            margin-bottom: 1rem;
          }
        }
        h4 {
          font-family: inherit;
          font-size: 1.25rem;
          margin: 1rem 0 0.5rem;
        }
      }
      > .buttons {
        text-align: center;
        padding-bottom: 0.5rem;
      }
    }
  }
}
.figure {
  display: block;
}
// FIXME: HOTFIX
.support-watchout {
  @include bp-sm-down {
    width: 16rem;
    left: 50%;
    transform: translateX(-50%);
    > .panel {
      padding: 0;
      > .text {
        padding: 0.5rem 0 0.25rem;
        font-size: 0.75rem;
        font-family: $font-sans-serif;
        > p {
          display: none;
          margin: 0;
          &:last-child {
            display: block;
          }
        }
      }
      > .button {
        padding: 0 0 0.5rem;
        > .grouping {
          > button {
            padding-left: 1.25rem;
            padding-right: 1.25rem;
          }
        }
      }
    }
  }
}
</style>
