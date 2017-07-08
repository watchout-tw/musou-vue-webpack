<template>
<div class="draw">
  <header class="textgroup">
    <hgroup>
      <h2>不然你來畫畫看啊</h2>
      <h1>{{ header.title }}</h1>
    </hgroup>
    <div class="description" v-html="markdown(header.description)"></div>
    <div class="authorship">
      <div class="item d-flex flex-row" v-for="item in authorship"><div class="job">{{ item.job }}</div><div v-for="person in item.people" class="person">{{ person }}</div></div>
    </div>
  </header>
  <section id="graphs">
    <line-chart v-for="config in graphs" :key="config.id" :config="config" :channel="channel"></line-chart>
  </section>
  <section id="bridge">畫完了，然後呢？</section>
  <section id="conclusion" class="textgroup">
    <h2 class="title">{{ conclusion.title }}</h2>
    <div class="description a-text-only" v-html="markdown(conclusion.description)"></div>
  </section>
</div>
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

* {
  margin: 0;
  padding: 0;
  border: 0;
}
body {
  font-size: 16px;
}
header {
  margin-top: 2rem;
  margin-bottom: 2rem;
  > hgroup {
    > h2 {
      color: $color-musou;
    }
  }
  > .description {
    margin: 1rem 0;
  }
}

h1, h2 {
  line-height: 1.25em;
}
h2.list-item {
  font-size: 1.5rem;
  margin: 0;
}
.textgroup {
  margin-left: 1rem;
  margin-right: 1rem;
  max-width: 30rem;
  width: auto;
}

.authorship {
  color: $color-watchout;
  > .item {
    > .job {
      width: 4rem;
      margin-right: 1rem;
      opacity: 0.65;
    }
    > .person:not(:last-of-type) {
      margin-right: 1rem;
    }
  }
}

#bridge {
  width: 100%;
  margin: 2rem 0;
  padding: 1rem 0;
  background: rgba($color-musou, 0.25);
  text-align: center;
  @include font-serif;
  font-weight: bold;
  font-size: 1.5rem;
}
#conclusion {
  > .title {
    margin: 1rem 0;
  }
}
</style>
