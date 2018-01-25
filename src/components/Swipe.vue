<template>
<article class="swipe">
  <div class="swipe-container">
    <div class="swipe-cards">
      <div v-for="card of cards" class="swipe-card">
        <div class="content">
          {{ card.question }}
        </div>
        <div class="actions d-flex justify-content-around">
          <div class="left">
            NO
          </div>
          <div class="right">
            YES
          </div>
        </div>
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
</article>
</template>

<script>
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
    return require('@/config/swipe/' + this.config.id).default
  },
  computed: {
    ogImage() {
      return this.config.image ? this.config.image : 'swipe.png'
    }
  },
  methods: {
    throwout() {
      console.log('throw out')
    },
    throwin() {
      console.log('throw in')
    }
  },
  mounted() {
    const selector = '.swipe-card'
    const Swing = require('swing')
    // const Direction = Swing.Direction
    const cards = [].slice.call(document.querySelectorAll(selector))
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
    const stack = Swing.Stack(config)
    cards.forEach(el => {
      stack.createCard(el)
    })
    stack.on('throwoutend', (e) => {
      console.log('throwoutend', e)
      stack.getCard(e.target).destroy()
    })
  }
}
</script>

<style lang="scss">
@import '~common/src/styles/resources';
.swipe {
  position: relative;
  margin: 0 auto;
  padding: 0 1rem;
  > .swipe-container {
    width: 100%;
    max-width: 24rem;
    margin: 0 auto;
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
        @include shadow;
        padding: 1rem;
      }
    }

  }

}
</style>
