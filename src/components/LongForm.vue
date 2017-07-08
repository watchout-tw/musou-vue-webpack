<template>
<div class="longform">
  <div class="content" :style="config.chart.contentStyle">
    <div class="credit" :style="creditStyle">
      <span>This project is made possible by </span><a :href="sourceLink" target="_blank"><img src="https://plotdb.com//assets/img/land/name.png" width="165px" style="margin: 0.25rem 0;"/></a>
    </div>
    <div v-if="isLoading">loading...</div>
    <div id="chart"></div>
  </div>
  <div class="spacer" :style="spacerStyle"></div>
</div>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: `沃草→${this.config.title}←`,
      meta: [
        {
          vmid: 'og-image',
          property: 'og:image',
          content: require('_/roll-play.png')
        }
      ]
    }
  },
  props: ['config'],
  data() {
    return {
      isLoading: true,
      mountingPoint: 'chart',
      scripts: [
        'https://plotdb.com/js/pack/view.js',
        'https://plotdb.com/lib/showdown/1.5.0/index.min.js',
        'https://plotdb.com/lib/d3/3.5.12/index.min.js'
      ]
    }
  },
  computed: {
    sourceLink() {
      return `https://plotdb.io/v/chart/${this.config.chart.id}`
    },
    creditStyle() {
      return {
        maxWidth: this.config.chart.width
      }
    },
    spacerStyle() {
      return {
        background: this.config.chart.contentStyle.backgroundColor // `linear-gradient(to bottom, ${this.contentStyle.backgroundColor}, white)`
      }
    }
  },
  created() {
    Promise.all(this.scripts.map(scriptURL => this.loadScript(scriptURL)))
      .then(results => {
        if(window.plotdb) {
          window.plotdb.load(this.config.chart.id, chart => {
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
.credit {
  margin: 0 auto;
  padding: 1rem 0;
  font-size: 0.75rem;
}
.content {
}
.spacer {
  height: 24rem;
}
#chart {
  h1 {
    margin: 2rem 0;
  }
}
</style>
