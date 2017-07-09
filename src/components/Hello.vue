<template>
<div class="hello">
  <section v-for="section in menu" :key="section.id">
    <section-menu :config="section"></section-menu>
  </section>
</div>
</template>

<script>
import menu from '@/menu'
import SectionMenu from '@/components/SectionMenu'

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
    SectionMenu
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
