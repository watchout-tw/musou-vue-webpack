import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import Hello from '@/components/Hello'
import Series from '@/components/Series'
import Journey from '@/components/Journey'
import Swipe from '@/components/Swipe'
import LongForm from '@/components/LongForm'
import Draw from '@/components/Draw'
import Map from '@/components/Map'
const menu = require('@/menu').default

Vue.use(Router)
Vue.use(Meta, {
  tagIDKeyName: 'vmid'
})

const routerViews = {
  journey: Journey,
  swipe: Swipe,
  longform: LongForm,
  draw: Draw,
  map: Map
}

var routes = [
  {
    path: '/',
    name: 'hello',
    component: Hello
  }
]

for(let series of menu) {
  routes.push({
    path: `/${series.id}`,
    component: Series,
    props: {
      config: series
    }
  })
  for(let page of series.pages) {
    routes.push({
      path: `/${series.id}/${page.id}`,
      name: page.id,
      component: routerViews[series.component],
      props: {
        config: Object.assign(page, { seriesTitle: series.title })
      }
    })
  }
}

export default new Router({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
