import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import SectionMenu from '@/components/SectionMenu'

import menu from '@/menu'

Vue.use(Router)

var routes = [
  {
    path: '/',
    name: 'hello',
    component: Hello
  }
]

for(let section of menu) {
  routes.push({
    path: `/${section.id}`,
    component: SectionMenu,
    props: {
      config: section
    }
  })
  for(let page of section.pages) {
    routes.push({
      path: `/${section.id}/${page.id}`,
      name: page.id,
      component: section.component,
      props: {
        config: page
      }
    })
  }
}

export default new Router({
  mode: 'history',
  routes
})
