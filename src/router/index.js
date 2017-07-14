import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import Hello from '@/components/Hello'
import Series from '@/components/Series'
import LongForm from '@/components/LongForm'
import Draw from '@/components/Draw'
import Map from '@/components/Map'

const routerViews = {
  longform: LongForm,
  draw: Draw,
  map: Map
}

const menu = require('@/menu').default

Vue.use(Router)
Vue.use(Meta, {
  tagIDKeyName: 'vmid'
})

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
        config: page
      }
    })
  }
}

export default new Router({
  mode: 'history',
  routes,
  scrollBehavior(to, from, pos) {
    if(!pos) {
      pos = {x: 0, y: 0}
    }
    return pos
  }
})
