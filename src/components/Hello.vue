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
section {
  padding-bottom: 8rem;
}
</style>
