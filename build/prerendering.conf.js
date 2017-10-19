import menu from '/src/menu'

let routes = ['/']
for(let series of menu) {
  routes.push('/' + series.id)
  for(let page of series.pages) {
    routes.push('/' + series.id + '/' + page.id)
  }
}
module.exports = {
  routes
}
