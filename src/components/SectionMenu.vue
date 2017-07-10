<template>
<div class="section-menu">
  <router-link class="section-link" :to="sectionLink" :alt="config.title"><img class="key-visual" :src="sectionImage" /></router-link>
  <p class="description">{{ config.description }}</p>
  <div class="pages">
    <router-link class="page" v-for="page in config.pages" :to="{name: page.id}" :key="page.id">
      <div class="title">
        <h3 class="small">{{ page.title }}</h3>
      </div>
      <div v-if="page.breaking" class="breaking">NEW</div>
    </router-link>
  </div>
</div>
</template>

<script>
export default {
  props: ['config'],
  computed: {
    sectionLink() {
      return `/${this.config.id}`
    },
    sectionImage() {
      var image
      try {
        image = require(`_/${this.config.id}.png`)
      } catch(exception) {
        image = require(`_/${this.config.id}.jpg`)
      }
      return image
    }
  }
}
</script>

<style lang="scss">
@import '~common/src/styles/resources';

.section-menu {
  max-width: 36rem;
  margin: 0 auto;
  > .section-link {
    width: 100%;
    > .key-visual {
      display: block;
      width: 100%;
    }
  }
  > .description,
  > .pages {
    @include bp-sm-only {
      margin-left: 1rem;
      margin-right: 1rem;
    }
  }
  > .description {
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
  }
  > .pages {
    > .page {
      position: relative;
      display: inline-block;
      vertical-align: middle;
      max-width: 16rem;
      margin: 0 1rem 1rem 0;
      padding: 1rem;
      background: rgba($color-musou, 0.25);
      @include shadow;

      > .title {
        > h3 {
          text-align: left;
          line-height: 1.25;
        }
      }

      > .breaking {
        $font-size: 0.75rem;
        $width: 3.6;
        position: absolute;
        top: -$font-size;
        right: -$font-size;
        width: $font-size*$width;
        @include transform(rotate(15deg))

        font-size: $font-size;
        line-height: 1;
        padding: $font-size*($width - 1)/2 0;
        border-radius: $font-size * $width/2;

        background: $color-musou;
        color: white;
        text-align: center;
      }
    }
  }
}

</style>
