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
        subtitle: {},
        options: {
          text: {
            align: 'center',
            size: 16,
            color: 'black'
          },
          background: {
            color: 'white',
            opacity: 1
          }
        }
      }
    },
    scenes: [
      {
        id: 'opening',
        classes: ['wide', 'opening'],
        title: '你不知道你失去了什麼'
      },
      {
        id: 'the-first-sample-scene',
        classes: ['wide'],
        date: '1945-01-01',
        title: '一九四五年､夏｡',
        description: 'Lorem ipsum.',
        mainVisual: {
          type: 'image',
          url: '.../...tif',
          width: 1600,
          height: 900
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
          'line1',
          '這一行含有湯德章三個字',
          '這裡則提到林茂生',
          'line4',
          'line5'
        ],
        tags: [
          {
            type: 'person',
            content: '湯德章'
          },
          {
            type: 'person',
            content: '林茂生'
          }
        ],
        visualTags: [
          {
            x: 200,
            y: 400,
            width: 48,
            height: 64,
            content: '湯德章'
          },
          {
            x: 320,
            y: 160,
            width: 64,
            height: 48,
            content: '林茂生'
          },
          {
            x: 640,
            y: 400,
            width: 84,
            height: 96
          }
        ],
        default: {
          styles: {
            labels: {
              text: {
                color: 'white'
              },
              background: {
                color: 'black',
                opacity: 1
              }
            },
            subtitle: {
              x: 'center',
              y: 'bottom',
              text: {
                align: 'center',
                size: 16,
                color: 'white'
              },
              background: {
                color: 'black',
                opacity: 0.5
              }
            },
            tags: {
              background: 'black'
            },
            visualTags: {
              background: {
                color: 'black',
                opacity: 0.25
              },
              text: {
                color: 'black'
              }
            }
          }
        }
      },
      {
        id: 'the-dance',
        classes: ['square'],
        title: 'The dance.'
      },
      {
        id: 'a-square-scene',
        classes: ['square'],
        date: '1945-01-01',
        title: '正方形場景',
        description: 'Lorem ipsum.',
        mainVisual: {
          type: 'image',
          url: '.../...jpg'
        }
      },
      {
        id: 'a-sample-fork-scene',
        classes: ['wide', 'fork'],
        title: '選一個？',
        description: 'Lorem ipsum.',
        options: [
          {
            label: 'Let’s dance.',
            action: 'goto',
            target: 'the-dance'
          },
          {
            label: '不要鬧了',
            action: 'next'
          }
        ]
      },
      {
        id: 'some-other-scene',
        classes: ['wide'],
        title: '測試一下'
      },
      {
        id: 'closing',
        classes: ['square', 'closing'],
        title: '結語'
      }
    ] // end of scenes
  }
}
