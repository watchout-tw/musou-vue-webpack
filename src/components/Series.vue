<template>
<div class="series">
  <series-menu :config="config"></series-menu>
</div>
</template>

<script>
import SeriesMenu from '@/components/SeriesMenu'

export default {
  metaInfo() {
    return {
      title: `→沃草←${this.config.title}→國會無雙←`,
      meta: [
        {
          vmid: 'og-image',
          property: 'og:image',
          content: this.seriesImage
        }
      ]
    }
  },
  props: ['config'],
  computed: {
    seriesImage() {
      return require('_/' + this.config.image)
    }
  },
  components: {
    SeriesMenu
  }
}
</script>

<style lang="scss">
.series {
  padding-top: 4rem;
}
</style>
