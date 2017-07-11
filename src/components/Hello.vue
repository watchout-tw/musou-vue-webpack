<template>
<div class="hello">
  <section v-for="series in menu" :key="series.id">
    <series-menu :config="series"></series-menu>
  </section>
</div>
</template>

<script>
import SeriesMenu from '@/components/SeriesMenu'

const menu = require('@/menu').default

export default {
  metaInfo() {
    return {
      title: `沃草→國會無雙←`,
      meta: [
        {
          vmid: 'og-image',
          property: 'og:image',
          content: require('_/musou.png')
        }
      ]
    }
  },
  name: 'hello',
  data() {
    return {
      menu
    }
  },
  components: {
    SeriesMenu
  }
}
</script>

<style lang="scss">
.hello {
  > section {
    padding: 4rem 0;
  }
}
</style>
