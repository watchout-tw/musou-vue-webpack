<template>
<article class="swipe">
  <div class="swipe-container">
    <div class="swipe-cards">
      <template v-for="(card, index) of cards">
        <div v-if="card.type === 'question'" class="swipe-card" :data-card-index="index" :class="cardClasses(index)">
          <div class="content">
            {{ card.question }}
          </div>
          <div class="actions d-flex justify-content-around">
            <div class="button no d-flex justify-content-center align-items-center" @click="swipe(index, -1)"><span>不是這樣</span></div>
            <div class="button yes d-flex justify-content-center align-items-center" @click="swipe(index, +1)"><span>就是說啊</span></div>
          </div>
        </div>
        <div v-else-if="card.type === 'text'" class="swipe-card" :data-card-index="index" :id="card.id">
          <h1 v-if="card.title" class="small">{{ card.title }}</h1>
          <div v-html="markdown(card.content)"></div>
        </div>
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
  <transition name="modal">
    <div v-if="showResult" class="result-container d-flex justify-content-center align-items-center">
      <div class="result">
        <p class="question">{{ activeCardData.question }}</p>
        <p class="but" :class="activeCardData.answer">{{ activeCardData.but }}</p>
        <template v-if="showMore">
          <div class="more">
            <div v-if="activeCardData.more" v-for="section in activeCardData.more">
              <template v-if="section.type === 'markdown'">
                <div v-html="markdown(section.content)"></div>
              </template>
              <template v-else-if="section.type === 'figure'">
                <div v-html="markdown(section.description)"></div>
              </template>
            </div>
          </div>
          <div>
            <button @click="showResult = showMore = false">好了好了</button>
          </div>
        </template>
        <div v-else>
          <button @click="showResult = showMore = false">我不要聽</button>
          <button class="musou" @click="showMore = true">跟我說說</button>
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
        throwOut: false
      }))
    }
    var references = {
      stack: undefined
    }
    var status = {
      activeCardIndex: -1,
      showResult: false,
      showMore: false
    }
    return Object.assign(data, status, references)
  },
  computed: {
    ogImage() {
      return this.config.image ? this.config.image : 'swipe.png'
    },
    activeCardData() {
      return this.activeCardIndex >= 0 && this.activeCardIndex < this.cards.length
        ? this.cards[this.activeCardIndex]
        : undefined
    }
  },
  methods: {
    /*
    cardIDToIndex(id) {
      var index = +id.split('-').pop()
      return index >= 0 && index < this.cards.length ? index : -1
    },
    */
    cardClasses(index) {
      var classes = []
      if(this.cards[index]) {
        if(this.cards[index].dragging) {
          classes.push('dragging')
        }
        if(this.cards[index].throwOut) {
          classes.push('throw-out')
        }
      }
      return classes
    },
    swipe(index, direction) {
      this.cards[this.cards.length - index - 1].obj.throwOut(direction * 200, Math.random() * 200 * (Math.round(Math.random()) * 2 - 1))
      // this.activeCardIndex = index
      // this.showResult = true
    }
  },
  mounted() {
    const selector = '.swipe-card:not(#swipe-card-last)'
    const Swing = require('swing')
    // const Direction = Swing.Direction
    const elements = [].slice.call(document.querySelectorAll(selector))
    const config = {
      throwOutConfidence: (xOffset, yOffset, element) => {
        console.log(xOffset, yOffset, element.offsetWidth, window.innerWidth)
        const xConfidence = Math.min(Math.abs(xOffset) / element.offsetWidth * 2, 1)
        const yConfidence = Math.min(Math.abs(yOffset) / element.offsetHeight * 2, 1)

        return Math.max(xConfidence, yConfidence)
      },
      throwOutDistance: () => {
        return document.querySelector(selector).offsetWidth * 1.05 * (1 + window.innerWidth / 320 * 0.05)
      }
    }
    Vue.set(this, 'stack', Swing.Stack(config))

    elements.reverse()
    elements.forEach((el, index) => {
      this.cards[index].el = el
      this.cards[index].obj = this.stack.createCard(el)
    })
    this.stack.on('dragstart', (e) => {
      const index = e.target.dataset.cardIndex
      console.log('dragstart', e, e.target.id, index)
      if(this.cards[index]) {
        this.cards.forEach(cardStatus => {
          cardStatus.dragging = false
        })
        this.cards[index].dragging = true
      }
      this.activeCardIndex = index
    })
    this.stack.on('throwinend', (e) => {
      const index = e.target.dataset.cardIndex
      if(this.cards[index]) {
        this.cards[index].dragging = false
        this.cards[index].throwOut = false
      }
    })
    this.stack.on('throwoutend', (e) => {
      const index = e.target.dataset.cardIndex
      console.log('throwoutend', e, index)
      if(this.cards[index]) {
        this.cards[index].throwOut = true
      }
      this.stack.getCard(e.target).destroy()
      this.activeCardIndex = index
      if(this.cards[index].type === 'question') {
        this.showResult = true
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
    margin: 4rem auto;

    > .swipe-cards {
      position: relative;
      width: 100%;
      height: 0;
      padding-bottom: 150%;
      > .swipe-card {
        position: absolute;
        top: 0;
        left: 0;
        background: #eee;
        width: 100%;
        height: 100%;
        padding: 1rem;

        &.dragging,
        &.throw-out {
          @include shadow;
        }
        > .actions {
          margin-top: 1rem;
          > .button {
            width: 8rem;
            height: 8rem;
            border-radius: 4rem;
            font-size: 1.25rem;
            text-align: center;
            cursor: pointer;
          }
          > .yes {
            background: $color-watchout;
          }
          > .no {
            background: $color-musou;
          }
        }
        &.throw-out {
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
        padding: 1rem;
        background: #ddd;
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
    }
  }
}
</style>
