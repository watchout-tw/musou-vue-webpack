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
            size: '1rem',
            color: 'black'
          },
          background: {
            color: 'white',
            opacity: 1
          }
        },
        visualTags: {
          border: {
            width: '2px',
            color: 'white'
          },
          text: {
            color: 'black'
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
          url: 'placeholders/_8uD3NOc.jpg',
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
            x: 560,
            y: 280,
            width: 60,
            height: 128,
            content: 'Stormtrooper A'
          },
          {
            x: 790,
            y: 200,
            width: 64,
            height: 96,
            content: 'Stormtrooper B'
          },
          {
            x: 784,
            y: 360,
            width: 76,
            height: 144,
            content: 'Jedi'
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
                size: '1rem',
                color: 'white'
              },
              background: {
                color: 'black',
                opacity: 0.5
              }
            },
            tags: {
              background: 'black'
            }
          }
        }
      },
      {
        id: 'a-small-photo-scene',
        classes: ['wide'],
        date: '1945-01-01',
        title: '小照片',
        description: 'Lorem ipsum.',
        mainVisual: {
          type: 'image',
          url: 'placeholders/70181883.jpg',
          width: 500,
          height: 398,
          magnify: false
        },
        visualTags: [
          {
            x: 40,
            y: 100,
            width: 48,
            height: 64,
            content: '生野'
          }
        ]
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
          url: 'placeholders/70182271.jpg',
          width: 500,
          height: 398,
          magnify: false
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
