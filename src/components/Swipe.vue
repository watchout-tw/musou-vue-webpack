<template>
<article class="swipe">
  <div class="swipe-container">
    <div class="swipe-cards">
      <template v-for="(card, index) of cards">
        <div v-if="card.type === 'question'" class="swipe-card" :data-card-index="index" :class="cardClasses(index)">
          <div class="content">
            {{ card.question }}
          </div>
        </div>
        <div v-else-if="card.type === 'text'" class="swipe-card" :data-card-index="index" :class="cardClasses(index)" :id="card.id">
          <div class="content">
            <h1 v-if="card.title" class="small">{{ card.title }}</h1>
            <div class="paragraphs" v-html="markdown(card.content)"></div>
          </div>
        </div>
      </template>
    </div>
    <div class="swipe-actions d-flex justify-content-around">
      <div class="swipe-action d-flex justify-content-center align-items-center no" @click="swipe(swipeActionEnabled('no') ? -1 : 0)" :class="swipeActionClasses('no')"><span>{{ swipeActionTag('no') }}</span></div>
      <div class="swipe-action d-flex justify-content-center align-items-center yes" @click="swipe(swipeActionEnabled('yes') ? +1 : 0)" :class="swipeActionClasses('yes')"><span>{{ swipeActionTag('yes') }}</span></div>
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
    <div v-if="showResult" class="result-container d-flex justify-content-center align-items-center">
      <div class="result">
        <p class="question">{{ activeCard.question }}</p>
        <p class="answer">你說「{{ activeCard.options[lastSwipe > 0 ? 'yes' : 'no'] }}」，{{ activeCard.responses[lastSwipe > 0 ? 'yes' : 'no'] }}。</p>
        <p class="but">{{ activeCard.but }}</p>
        <template v-if="showMore">
          <div class="more">
            <div v-if="activeCard.more" v-for="section in activeCard.more">
              <template v-if="section.type === 'markdown'">
                <div v-html="markdown(section.content)"></div>
              </template>
              <template v-else-if="section.type === 'figure'">
                <div v-html="markdown(section.description)"></div>
              </template>
            </div>
          </div>
          <div class="buttons">
            <button @click="showResult = showMore = false">好了好了</button>
          </div>
        </template>
        <div v-else class="buttons">
          <button @click="showResult = showMore = false">我不想聽啦</button>
          <button class="musou" @click="showMore = true">繼續說下去</button>
        </div>
      </div>
    </div>
  </transition>
</article>
</template>

<script>
import Vue from 'vue'
import knowsMarkdown from '@/interfaces/knowsMarkdown'

export default {
  mixins: [knowsMarkdown],
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
      return this.swipeActionEnabled(action) ? 'enabled' : 'disabled'
    },
    swipeActionTag(action) {
      return this.topCard && this.topCard.hasOwnProperty('options') && this.topCard.options.hasOwnProperty(action) ? this.topCard.options[action] : 'N/A'
    },
    swipe(direction) {
      if(direction !== 0 && this.topCard) {
        this.topCard.dragging = true
        this.topCard.el.parentNode.appendChild(this.topCard.el) // move dom of topCard to the front
        this.topCard.obj.throwOut(direction * 200, Math.random() * 200 * (Math.round(Math.random()) * 2 - 1))
      }
    }
  },
  mounted() {
    const Swing = require('swing')
    // const Direction = Swing.Direction
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
    this.stack.on('throwinend', (e) => {
      const index = +e.target.dataset.cardIndex
      if(this.cards[index]) {
        this.cards[index].dragging = false
        this.cards[index].isOut = false
        this.cards[index].hasBeenOut = false
      }
      this.mirror.push(index)
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
  }
}
</script>

<style lang="scss">
@import '~common/src/styles/resources';
.swipe {
  position: relative;
  margin: 0;
  padding: 0;

  > .swipe-container {
    width: 100%;
    max-width: 24rem;
    margin: 2rem auto;
    @include bp-md-up {
      margin: 8vw auto;
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
        background: #eee;
        cursor: pointer;

        &.dragging,
        &.is-out {
            @include shadow;
        }
        > .content {
          width: 100%;
          @include font-serif;
          font-size: 1.25rem;
        }
        &.is-out {
          > .content,
          > .actions {
            opacity: 0.25;
          }
        }
        &#last {
          background: #aaa;
          @include shadow;
        }
      }
    }
    > .swipe-actions {
      margin-top: 2rem;
      margin-bottom: 1rem;
      > .swipe-action {
        position: relative;
        width: 8rem;
        height: 8rem;
        border-radius: 4rem;
        text-align: center;
        cursor: pointer;
        @include shadow;

        &.disabled {
          cursor: default;
          > * {
            display: none;
          }
          &:before {
            content: '';
            display: block;
            position: absolute;
            width: 100%;
            height: 0.5rem;
            background: red;
            transform: rotate(-45deg);
          }
        }
      }
      > .yes {
        background: $color-watchout;
      }
      > .no {
        background: $color-musou;
      }
    }

  }
  > .result-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: $color-modal-mask;
    z-index: $z-below-nav;
    padding-top: $navbar-height;
    transition: opacity .3s ease;

    > .result {
      max-width: 24rem;
      padding: 1rem;

      > .question {
        margin-left: 0.75rem;
        border-left: 0.25rem $color-secondary-text-grey solid;
        padding: 0.25rem 0 0.25rem 1rem;
        color: $color-secondary-text-grey;
      }
      > .but {
        &.yes {
          color: $color-watchout;
        }
        &.no {
          color: $color-musou;
        }
      }
      > .more {
        max-height: 16rem;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch
      }
      > .buttons {
        text-align: center;
      }
    }
  }
}
</style>
