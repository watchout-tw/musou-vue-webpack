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
          'Quick brown fox jumps over the lazy human being',
          '這一行含有湯德章tang de zhang三個字',
          '這裡則a提到林茂生',
          'May the force be with you',
          'Live long and prosper'
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
            content: '生野',
            click: 'getCloser'
          }
        ],
        subtitle: [
          'A picture paints a 1000 words',
          '一個家族，三個時代'
        ]
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
          height: 358,
          magnify: false
        }
      },
      {
        id: 'a-extra-long-main-visual',
        classes: ['wide'],
        date: '1945-01-01',
        title: '我佛慈悲',
        description: '南無阿彌陀佛；南無阿彌陀佛；南無阿彌；南無阿；南無；無。',
        mainVisual: {
          type: 'image',
          url: 'placeholders/gb+.jpg',
          width: 2560,
          height: 1050,
          magnify: false
        },
        visualTags: [
          {
            x: 620,
            y: 164,
            width: 200,
            height: 236,
            content: '師姐'
          }
        ]
      },
      {
        id: 'a-sample-fork-scene',
        classes: ['wide', 'fork'],
        title: 'おもゐつゝら：選一個',
        description: 'むかしむかしあるところに心優しいお爺さんと欲張りなお婆さんの老夫婦がいた。ある日、お爺さんは怪我をしていた雀を家に連れ帰って手当てをした。',
        options: [
          {
            type: 'emoji',
            label: '🌌',
            action: 'goto',
            target: 'gallaxy'
          },
          {
            type: 'emoji',
            label: '🌞',
            action: 'goto',
            target: 'solarpunk'
          },
          {
            label: '結束',
            action: 'goto',
            target: 'closing'
          }
        ],
        mainVisual: {
          type: 'image',
          url: 'placeholders/yoshitoshi.jpg',
          width: 466,
          height: 704,
          magnify: false
        },
        visualTags: [
          {
            x: 170,
            y: 350,
            width: 128,
            height: 120,
            content: '#36',
            click: 'getCloser'
          }
        ]
      },
      {
        id: 'gallaxy',
        classes: ['wide'],
        title: 'NGC 3621',
        description: 'Far beyond the local group of galaxies lies NGC 3621, some 22 million light-years away. Found in the multi-headed southern constellation Hydra, the winding spiral arms of this gorgeous island universe are loaded with luminous blue star clusters, pinkish starforming regions, and dark dust lanes.',
        mainVisual: {
          type: 'image',
          url: 'placeholders/NGC3621-.jpg',
          width: 1024,
          height: 952
        },
        prev: 'a-sample-fork-scene',
        next: 'closing'
      },
      {
        id: 'solarpunk',
        classes: ['wide'],
        title: 'Solarpunk',
        mainVisual: {
          type: 'image',
          url: 'placeholders/53vTbZFz.jpg',
          width: 1364,
          height: 668
        },
        prev: 'a-sample-fork-scene',
        next: 'closing'
      },
      {
        id: 'closing',
        classes: ['square', 'closing'],
        title: '結語',
        mainVisual: {
          type: 'image',
          url: 'placeholders/chatSystems.png',
          width: 740,
          height: 536,
          magnify: false
        },
        prev: 'a-sample-fork-scene'
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
