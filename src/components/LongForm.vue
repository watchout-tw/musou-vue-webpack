<template>
<article class="longform">
  <div class="content" :style="chart.contentStyle">
    <div class="credit">
      <span>This project is made possible by </span><a :href="sourceLink" target="_blank"><img :src="plotDBLogo" width="163px" style="margin: 0.25rem 0;"/></a>
    </div>
    <div class="loading" v-if="isLoading">載入中，請稍候⋯</div>
    <div id="chart"></div>
  </div>
  <div class="spacer" :style="spacerStyle"></div>
  <header class="end">
    <div class="text textgroup">
      <hgroup>
        <h5>模擬人生</h5>
        <span class="zhi">之</span>
        <h4>{{ header.title }}</h4>
      </hgroup>
      <div class="authorship">
        <div class="item d-flex flex-row" v-for="item in authorship"><div class="job">{{ item.job }}</div><div v-for="person in item.people" class="person">{{ person }}</div></div>
      </div>
      <div class="date">{{ date }}</div>
      <div class="references" v-if="references">
        <h5>參考資料</h5>
        <ul>
          <li v-for="ref in references">{{ ref }}</li>
        </ul>
      </div>
    </div>
  </header>
</article>
</template>

<script>
import Color from 'color'

export default {
  metaInfo() {
    return {
      title: `→沃草←${this.config.title}→國會無雙←`,
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
    return Object.assign(require('@/config/longform/' + this.config.id).default, {
      isLoading: true,
      mountingPoint: 'chart',
      scripts: [
        'https://plotdb.com/js/pack/view.js',
        'https://plotdb.com/lib/showdown/1.5.0/index.min.js',
        'https://plotdb.com/lib/d3/3.5.12/index.min.js'
      ]
    })
  },
  computed: {
    ogImage() {
      return this.config.image ? this.config.image : 'role-play.png'
    },
    plotDBLogo() {
      let color = Color(this.chart.contentStyle.backgroundColor)
      return require('_/plotdb/' + (color.light() ? 'light' : 'dark') + '.png')
    },
    sourceLink() {
      return `https://plotdb.io/v/chart/${this.chart.id}`
    },
    widthConstraint() {
      return {
        maxWidth: this.chart.width
      }
    },
    spacerStyle() {
      return {
        background: this.chart.contentStyle.backgroundColor
      }
    }
  },
  mounted() {
    Promise.all(this.scripts.map(scriptURL => this.loadScript(scriptURL)))
      .then(results => {
        if(window.plotdb) {
          window.plotdb.load(this.chart.id, chart => {
            chart.attach(document.getElementById(this.mountingPoint), {})
            this.isLoading = false
          })
        } else {
          console.error('plotdb not found.')
        }
      })
      .catch(error => {
        console.error(error)
      })
  },
  methods: {
    loadScript(url) {
      return new Promise(function(resolve, reject) {
        var script = document.createElement('script')
        script.type = 'text/javascript'
        script.async = true
        script.src = url
        script.onload = resolve
        script.onerror = reject
        document.head.appendChild(script)
      })
    }
  }
}
</script>

<style lang="scss">
.longform {
  > .content {
    > .credit,
    > .loading {
      max-width: 38rem;
      margin: 0 auto;
      padding: 0 1rem;
    }
    > .credit {
      padding-top: 1rem;
      padding-bottom: 1rem;
      font-size: 0.75rem;
    }
    > #chart {
      h1 {
        margin: 2rem 0;
      }
    }
  }
  > .spacer {
    height: 24rem;
  }
}
</style>
