export default {
  sequence: {
    autoplay: false,
    startDate: '1945-01-01',
    endDate: '1948-12-31',
    default: {
      format: {
        date: 'countdown'
      },
      styles: {
        title: {},
        description: {},
        subtitle: {}
      }
    },
    scenes: [
      {
        id: 'opening',
        type: 'opening'
      },
      {
        id: 'the-first-sample-scene',
        type: 'default',
        date: '1945-01-01',
        title: '一九四五年､夏｡',
        description: 'Lorem ipsum.',
        mainVisual: {
          type: 'image',
          url: '.../...tif'
        },
        media: [
          {
            type: 'audio',
            url: '.../...mp4',
            autoplay: true
          }
        ],
        labels: [
          {
            content: 'label1',
            x: 240,
            y: 480
          }
        ],
        subtitle: [
          {
            content: 'line1',
            rotate: -30
          }
        ],
        tags: [
          {
            content: '湯德章'
          },
          {
            content: '林茂生'
          }
        ],
        visualTags: [
          {
            x: 200,
            y: 400,
            width: 24,
            height: 72,
            content: '湯德章'
          }
        ],
        default: {
          styles: {
            label: {
              label: 'white',
              background: {
                color: 'black',
                opacity: 1
              }
            },
            subtitle: {
              x: 'center',
              y: 'bottom',
              align: 'center',
              size: 16,
              color: 'white',
              background: {
                background: 'black',
                opacity: 0.5
              }
            },
            tag: {
              background: 'black'
            },
            visualTag: {
              background: 'black'
            }
          }
        }
      },
      {
        id: 'a-sample-fork-scene',
        type: 'fork',
        title: '選一個？',
        description: 'Lorem ipsum.',
        options: [
          {
            label: '旋轉跳躍',
            action: 'goto',
            target: 'a-sample-scene'
          },
          {
            label: '不要鬧了',
            action: 'next'
          }
        ],
        default: {
          styles: {
            option: {
              align: 'center',
              size: 16,
              color: 'white',
              background: {
                color: 'black',
                opacity: 0.5
              }
            }
          }
        }
      },
      {
        id: 'closing',
        type: 'closing'
      }
    ] // end of scenes
  }
}
