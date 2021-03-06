<template>
<main>
  <NavigationWithIdentity :channel="channel"></NavigationWithIdentity>
  <router-view :channel.sync="channel"></router-view>
  <ModalAuth v-if="modalAuthIsShown"></ModalAuth>
  <ModalLostPwd v-if="modalLostPwdIsShown"></ModalLostPwd>
  <ModalResetPwd v-if="modalResetPwdIsShown"></ModalResetPwd>
  <ModalIdentity v-if="modalIdentityIsShown"></ModalIdentity>
  <ModalTermsOfSvc v-if="modalTermsOfSvcIsShown"></ModalTermsOfSvc>
  <FooterStandard></FooterStandard>
  <SupportWatchoutStandard v-if="supportIsShown" :support-is-shown.sync="supportIsShown" :support-package-key="supportPackageKey"></SupportWatchoutStandard>
</main>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import dataStore from 'common/src/lib/dataStore'
import NavigationWithIdentity from 'common/src/components/Navigation/Identity'
import ModalAuth from 'common/src/components/Modal/Auth'
import ModalLostPwd from 'common/src/components/Modal/LostPwd'
import ModalResetPwd from 'common/src/components/Modal/ResetPwd'
import ModalIdentity from 'common/src/components/Modal/Identity'
import ModalTermsOfSvc from 'common/src/components/Modal/TermsOfSvc'
import FooterStandard from 'common/src/components/Footer/Standard'
import SupportWatchoutStandard from 'common/src/components/SupportWatchout/Standard'
import * as util from 'common/src/lib/util'

Vue.use(Vuex)

export default {
  name: 'app',
  components: {
    NavigationWithIdentity,
    ModalAuth,
    ModalLostPwd,
    ModalResetPwd,
    ModalIdentity,
    ModalTermsOfSvc,
    FooterStandard,
    SupportWatchoutStandard
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated
    },
    modalAuthIsShown() {
      return this.$store.state.modalAuthIsShown
    },
    modalLostPwdIsShown() {
      return this.$store.state.modalLostPwdIsShown
    },
    modalResetPwdIsShown() {
      return this.$store.state.modalResetPwdIsShown
    },
    modalIdentityIsShown() {
      return this.$store.state.modalIdentityIsShown
    },
    modalTermsOfSvcIsShown() {
      return this.$store.state.modalTermsOfSvcIsShown
    }
  },
  data() {
    return {
      channel: {
        id: 'musou-media-experiment',
        name: '國會無雙媒體實驗',
        classes: {
          bg: 'bg-musou'
        },
        links: {
          home: 'https://musou.watchout.tw'
        },
        asset: {
          logo: {
            large: require('_/logo/musou-media-experiment/large.png'),
            small: require('_/logo/musou-media-experiment/small.png')
          },
          logoWithType: {
            regular: {
              src: require('_/logo+watchout+type/musou-media-experiment/regular.png'),
              width: 214,
              style: { width: '214px' }
            }
          }
        }
      },
      supportIsShown: true,
      supportPackageKey: 'musou'
    }
  },
  created() {
    console.log(`This is the Musou App (${Vue.config.mode})`)
    if(Vue.config.mode === 'production') {
      axios.defaults.baseURL = 'https://core.watchout.tw'
    } else if(Vue.config.mode === 'staging') {
      axios.defaults.baseURL = 'https://staging.core.watchout.tw'
    } else {
      axios.defaults.baseURL = 'https://dev.core.watchout.tw'
    }
    this.$store.dispatch('cacheReps')
    this.$store.dispatch('cacheParties')
    this.$store.dispatch('cacheCaucuses')
    this.$store.dispatch('cacheGovAgencies')
    this.$store.dispatch('cacheLegislativeSteps')
  },
  beforeMount() {
    this.$store.dispatch('toggleIsAuthenticated', {
      value: util.jwtTokenIsHere()
    })
  }
}
</script>

<style lang="scss">
@import '~common/src/styles/resources';
@import '~common/src/styles/main';

#navbar-identity {
  display: none;
}

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
    margin: 2rem 1rem;

    &.end {
      margin-top: 1rem;

      &:before {
        content: '×　×　×';
        display: block;
        text-align: center;
      }
    }

    > .text {
      > hgroup {
        margin-bottom: 1rem;
        > h2 {
          color: $color-musou;
        }
        > .zhi {
          display: inline-block;
          margin: 0.25rem 0;
          padding: 0.25rem;
          background: black;
          color: white;
          font-size: 0.85rem;
          line-height: 1;
          opacity: 0.85;
        }
        > h4 > .before-title {
          margin-right: 0.125rem;
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
      > .references {
        margin: 1rem 0;
        > ul {
          margin: 0.25rem 0;
          padding-left: 1.25rem;
          font-size: 0.75rem;
          > li > p {
            margin: 0;
          }
        }
      }
    }
  }
}
</style>
