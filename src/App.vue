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
</style>
