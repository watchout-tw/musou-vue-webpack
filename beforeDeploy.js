const files = require('./build/prerendering.conf').routes
  .map(route => `./docs${route}/index.html`)

function gtmScript(gtmID) {
  return `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmID}');</script>`
}

function gtmNoScript(gtmID) {
  return `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${gtmID}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`
}

const replace = require('replace-in-file')
const gtmID = process.argv[3]
const options = {
  files,
  from: [
    /<html[^>]*>/,
    /<main>[\s\S]*<\/main>/, // use [\s\S] to match across multiple lines
    '<script>//gtm</script>',
    '<script>//gtm-no-script</script>'
  ],
  to: [
    (match) => {
      return match.replace(/class="[^"]*"/, 'class=""')
    },
    '<main></main>',
    gtmScript(gtmID),
    gtmNoScript(gtmID)
  ]
}

// replace strings
console.log('Before deploy...')
replace(options)
  .then(changedFiles => {
    console.log('Modified files:')
    console.log(changedFiles.join('\n'))
  })
  .catch(error => {
    console.error(error)
  })

if(process.argv.indexOf('staging') > -1) {
  // no crawler for staging
  console.log('No crawler.')
  const fs = require('fs')
  fs.writeFile('./docs/robots.txt', 'User-agent: *\nDisallow: /', (error) => {
    if(error) {
      return console.error(error)
    }
    console.log('Added robots.txt')
  })
}
