# Journey
## Data-structure of a scene
```
{
  id
  classes: [] // wide OR square; opening OR closing; fork
  date
  title
  description
  mainVisual: {
    type
    url
    width
    height
    magnify
  }
  visualTags: [
    {
      x
      y
      width
      height
      content
      click: 'getCloser'
    }
  ]
  subtitle: []
  media: []
  options: [
    {
      type: 'emoji'
      label
      action
      target
    }
  ]
  default: {
    styles
  }
  prev
  next
}
```
