const defaultDarkBackgroundColor = '#333'
const defaultLightTextColor = '#efefef'
const defaultLightBackgroundColor = '#efefef'
const defaultDarkTextColor = '#333'
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
        mainVisualContainer: {
          background: {
            color: defaultDarkBackgroundColor
          }
        },
        textContainer: {
          text: {
            color: defaultLightTextColor
          },
          background: {
            color: defaultDarkBackgroundColor
          }
        },
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
            color: defaultLightBackgroundColor
          },
          text: {
            color: defaultDarkTextColor
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
                color: defaultLightTextColor
              },
              background: {
                color: defaultDarkBackgroundColor,
                opacity: 1
              }
            },
            subtitle: {
              x: 'center',
              y: 'bottom',
              text: {
                align: 'center',
                size: '1rem',
                color: defaultLightTextColor
              },
              background: {
                color: defaultDarkBackgroundColor,
                opacity: 0.5
              }
            },
            tags: {
              background: {
                color: defaultDarkBackgroundColor
              }
            }
          }
        }
      },
      {
        id: 'a-small-photo-scene',
        classes: ['wide'],
        date: '1945-01-01',
        title: '小照片',
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
        classes: ['wide'],
        title: 'NGC 3621',
        description: 'Far beyond the local group of galaxies lies NGC 3621, some 22 million light-years away. Found in the multi-headed southern constellation Hydra, the winding spiral arms of this gorgeous island universe are loaded with luminous blue star clusters, pinkish starforming regions, and dark dust lanes.',
        mainVisual: {
          type: 'image',
          url: 'placeholders/NGC3621-.jpg',
          width: 1024,
          height: 952
        }
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
        classes: ['square', 'fork'],
        title: '選一個？',
        description: 'Lorem ipsum.',
        options: [
          {
            label: 'Let’s dance.',
            action: 'goto',
            target: 'the-dance'
          },
          {
            label: '繼續',
            action: 'next'
          }
        ],
        mainVisual: {
          type: 'image',
          url: 'placeholders/yoshitoshi.jpg',
          width: 1080,
          height: 871,
          magnify: false
        }
      },
      {
        id: 'some-other-scene',
        classes: ['wide'],
        title: '測試一下',
        mainVisual: {
          type: 'image',
          url: 'placeholders/53vTbZFz.jpg',
          width: 1080,
          height: 720
        }
      },
      {
        id: 'closing',
        classes: ['square', 'closing'],
        title: '結語',
        mainVisual: {
          type: 'image',
          url: 'placeholders/chatSystems.png',
          width: 1364,
          height: 668,
          magnify: false
        }
      }
    ] // end of scenes
  },
  authorship: [
    {
      job: '編輯設計',
      people: ['洪國鈞']
    },
    {
      job: '設計開發',
      people: ['游知澔']
    }
  ],
  references: []
}
