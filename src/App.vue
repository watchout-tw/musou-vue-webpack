<template>
<div id="app">
  <NavigationWithIdentity :channel="channel" :isAuthenticated.sync="isAuthenticated" :modalAuthIsShown.sync="modalAuthIsShown"></NavigationWithIdentity>
  <router-view :channel="channel"></router-view>
  <ModalAuth v-if="modalAuthIsShown" :modalAuthIsShown.sync="modalAuthIsShown" :isAuthenticated.sync="isAuthenticated"></ModalAuth>
  <FooterStandard></FooterStandard>
  <SupportWatchoutStandard v-if="supportIsShown" :supportIsShown.sync="supportIsShown"></SupportWatchoutStandard>
</div>
</template>

<script>
import dataStore from 'common/src/lib/dataStore'
import NavigationWithIdentity from 'common/src/components/Navigation/Identity'
import ModalAuth from 'common/src/components/Modal/Auth'
import FooterStandard from 'common/src/components/Footer/Standard'
import SupportWatchoutStandard from 'common/src/components/SupportWatchout/Standard'

export default {
  name: 'app',
  metaInfo() {
    return {
      meta: [
        {
          vmid: 'og-image',
          property: 'og:image',
          content: require('_/musou.png')
        }
      ]
    }
  },
  data() {
    return {
      channel: dataStore.channels.musou,
      isAuthenticated: false,
      modalAuthIsShown: false,
      supportIsShown: true
    }
  },
  components: {
    NavigationWithIdentity,
    ModalAuth,
    FooterStandard,
    SupportWatchoutStandard
  }
}
</script>

<style lang="scss">
@import '~common/src/styles/resources';
@import '~common/src/styles/main';

html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}
svg {
  display: block;
}
.textgroup {
  max-width: 30rem;
  width: auto;
  > .title {
    margin: 1rem 0;
  }
}
article {
  > header {
    margin-top: 2rem;
    margin-bottom: 2rem;
    margin-left: 1rem;

    > .text {
      > hgroup {
        margin-bottom: 1rem;
        > h2 {
          color: $color-musou;
        }
      }
      > .description {
        margin: 1rem 0;
      }
      > .authorship {
        margin: 1rem 0;
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
    }
  }
}
</style>
