<template>
<article class="draw">
  <header>
    <div class="text textgroup">
      <hgroup>
        <h2>不然你來畫畫看啊</h2>
        <h1>{{ header.title }}</h1>
      </hgroup>
      <div class="description" v-html="markdown(header.description)"></div>
      <div class="authorship">
        <div class="item d-flex flex-row" v-for="item in authorship"><div class="job">{{ item.job }}</div><div v-for="person in item.people" class="person">{{ person }}</div></div>
      </div>
    </div>
  </header>
  <section class="graphs">
    <line-chart v-for="config in graphs" :key="config.id" :config="config" :channel="channel"></line-chart>
  </section>
  <section class="bridge">畫完了，然後呢？</section>
  <section class="conclusion textgroup">
    <h2 class="title">{{ conclusion.title }}</h2>
    <div class="description a-text-only" v-html="markdown(conclusion.description)"></div>
  </section>
</article>
</template>

<script>
import marked from 'marked'
import LineChart from './draw/LineChart'

export default {
  metaInfo() {
    return {
      title: `沃草→${this.config.title}←`,
      meta: [
        {
          vmid: 'og-image',
          property: 'og:image',
          content: require('_/draw.png')
        }
      ]
    }
  },
  props: ['channel', 'config'],
  data() {
    return require('@/config/draw/' + this.config.id).default
  },
  methods: {
    markdown(str) {
      return marked(str)
    }
  },
  components: {
    LineChart
  }
}
</script>

<style lang="scss">
@import '~common/src/styles/resources';

.draw {
  > .bridge {
    width: 100%;
    margin: 2rem 0;
    padding: 1rem 0;
    @include font-serif;
    font-weight: bold;
    font-size: 1.5rem;
    text-align: center;
    background: rgba($color-musou, 0.25);
  }
  > .conclusion {
    margin-left: 1rem;
    margin-right: 1rem;
  }
}
</style>
