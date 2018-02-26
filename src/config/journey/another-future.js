const defaultDarkBackgroundColor = '#333'
const defaultLightTextColor = '#efefef'
const defaultLightBackgroundColor = '#efefef'
const defaultDarkTextColor = '#333'

export default {
  sequence: {
    autoplay: false,
    startDate: '1945-10-08',
    endDate: '1947-02-28',
    default: {
      toggles: {
        showCountdown: true
      },
      styles: {
        mainVisualContainer: {
          background: {
            color: defaultDarkBackgroundColor
          }
        },
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
        tags: { // INACTIVE
          background: {
            color: defaultDarkBackgroundColor
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
        },
        labels: { // INACTIVE
          text: {
            color: defaultLightTextColor
          },
          background: {
            color: defaultDarkBackgroundColor,
            opacity: 1
          }
        },
        subtitle: { // INACTIVE
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
        }
      }
    },
    media: [
      {
        id: 'japanese-surrender-broadcast',
        type: 'audio',
        url: 'https://watchout.tw/musou-aux/modern-history-of-taiwan/Imperial_Rescript_on_the_Termination_of_the_War.ogg'  // Use external URL
      }
    ],
    scenes: [
      {
        id: 'opening',
        classes: ['wide', 'opening'],
        title: '你不知道你失去了什麼'
      },
      {
        id: '1945-08-15',
        classes: ['wide'],
        date: '1945-08-15',
        subtitle: [
          '戰爭終於要結束了嗎？',
          '總算不再是殖民地',
          '台灣人能做自己的主人了吧？'
        ],
        backgroundAudio: {
          id: 'japanese-surrender-broadcast',
          config: {
            autoplay: true
          }
        },
        default: {
          styles: {
            mainVisualContainer: {
              background: {
                color: '#333'
              }
            }
          }
        }
      },
      {
        id: '1945-10-08',
        classes: ['wide'],
        date: '1945-10-08',
        description: '台灣人要讀自己的報紙，這是台灣第一個留美博士林茂生創立的《民報》，以後每天讀，當作學習國字，擺脫殖民惡習的功課。',
        mainVisual: {
          type: 'image',
          url: 'another-future/creation_of_minpo.jpg',
          width: 712,
          height: 1000,
          magnify: false
        }
      },
      {
        id: '1945-10-11',
        classes: ['wide'],
        date: '1945-10-11',
        description: '擺脫殖民的身份，不再是二等公民，台灣人是應該歡欣。本省應踐行三民主義，率先做個模範省。',
        mainVisual: {
          type: 'image',
          url: 'another-future/1945-10-11.png',
          width: 3008,
          height: 1884,
          magnify: false
        }
      },
      {
        id: '1945-10-12',
        classes: ['wide'],
        date: '1945-10-12',
        description: '台灣人才濟濟，除哲學博士林茂生，又有醫學博士杜聰明、施江南，經濟學博士陳炘，就像杜聰明博士說的一樣，台灣人有科學技術者至少上萬，要建設新生台灣，綽綽有餘。',
        mainVisual: {
          type: 'image',
          url: 'another-future/1945-10-12.png',
          width: 1416,
          height: 1650,
          magnify: false
        }
      },
      {
        id: '1945-10-18',
        classes: ['wide'],
        date: '1945-10-18',
        description: '聽別人說《民報》文字太艱澀，我覺得這正是台灣人需要努力的地方，已經回歸祖國，別再看日文、講日語，多讀國文報紙吧！',
        mainVisual: {
          type: 'image',
          url: 'another-future/1945-10-18.png',
          width: 1955,
          height: 1840,
          magnify: false
        }
      },
      {
        id: '1945-10-28',
        classes: ['wide'],
        date: '1945-10-28',
        description: '已從台北二中畢業好一段時間，現由哲學博士林茂生主持家長會，台灣文化協會的黃朝生兄也一同參與，真替學弟們感到放心。',
        mainVisual: {
          type: 'image',
          url: 'another-future/1945-10-28.png',
          width: 1050,
          height: 1286,
          magnify: false
        }
      },
      {
        id: '1945-11-15',
        classes: ['wide'],
        date: '1945-11-15',
        description: '別的不敢說，台灣人才中醫生和律師最多，政府應該加以錄用。剛接收還未上軌道，但法院應速速開辦，不得拖延才是。',
        mainVisual: {
          type: 'image',
          url: 'another-future/1945-11-15.png',
          width: 1452,
          height: 858,
          magnify: false
        }
      },
      {
        id: '1945-12-27',
        classes: ['wide'],
        date: '1945-12-27',
        description: '1945-12-27',
        mainVisual: {
          type: 'image',
          url: 'another-future/1945-12-27.png',
          width: 2280,
          height: 886,
          magnify: false
        }
      },
      {
        id: '1946-01-18',
        classes: ['wide'],
        date: '1946-01-18',
        description: '1946-01-18',
        mainVisual: {
          type: 'image',
          url: 'another-future/1946-01-18.png',
          width: 1620,
          height: 1690,
          magnify: false
        }
      },
      {
        id: '1946-02-12',
        classes: ['wide'],
        date: '1946-02-12',
        description: '1946-02-12',
        mainVisual: {
          type: 'image',
          url: 'another-future/1946-02-12.png',
          width: 1626,
          height: 1772,
          magnify: false
        }
      },
      {
        id: '1946-02-21',
        classes: ['wide'],
        date: '1946-02-21',
        description: '1946-02-21',
        mainVisual: {
          type: 'image',
          url: 'another-future/1946-02-21.png',
          width: 1670,
          height: 1296,
          magnify: false
        }
      },
      {
        id: '1946-03-16',
        classes: ['wide'],
        date: '1946-03-16',
        description: '1946-03-16',
        mainVisual: {
          type: 'image',
          url: 'another-future/1946-03-16.png',
          width: 1408,
          height: 1535,
          magnify: false
        }
      },
      {
        id: '1946-03-30',
        classes: ['wide'],
        date: '1946-03-30',
        description: '1946-03-30',
        mainVisual: {
          type: 'image',
          url: 'another-future/1946-03-30.png',
          width: 1990,
          height: 1684,
          magnify: false
        }
      },
      {
        id: '1946-03-31',
        classes: ['wide'],
        date: '1946-03-31',
        description: '1946-03-31',
        mainVisual: {
          type: 'image',
          url: 'another-future/1946-03-31.png',
          width: 1182,
          height: 1352,
          magnify: false
        }
      },
      {
        id: '1946-04-06',
        classes: ['wide'],
        date: '1946-04-06',
        description: '1946-04-06',
        mainVisual: {
          type: 'image',
          url: 'another-future/1946-04-06.png',
          width: 1224,
          height: 882,
          magnify: false
        }
      },
      {
        id: '1946-04-16',
        classes: ['wide'],
        date: '1946-04-16',
        description: '1946-04-16',
        mainVisual: {
          type: 'image',
          url: 'another-future/1946-04-16.png',
          width: 1918,
          height: 1294,
          magnify: false
        }
      },
      {
        id: '1946-04-19',
        classes: ['wide'],
        date: '1946-04-19',
        description: '1946-04-19',
        mainVisual: {
          type: 'image',
          url: 'another-future/1946-04-19.png',
          width: 1312,
          height: 1326,
          magnify: false
        }
      },
      {
        id: '1946-05-07',
        classes: ['wide'],
        date: '1946-05-07',
        description: '1946-05-07',
        mainVisual: {
          type: 'image',
          url: 'another-future/1946-05-07.png',
          width: 1734,
          height: 1310,
          magnify: false
        }
      },
      {
        id: '1946-07-14',
        classes: ['wide'],
        date: '1946-07-14',
        description: '1946-07-14',
        mainVisual: {
          type: 'image',
          url: 'another-future/1946-07-14.png',
          width: 1600,
          height: 1780,
          magnify: false
        }
      },
      {
        id: '1946-07-16',
        classes: ['wide'],
        date: '1946-07-16',
        description: '1946-07-16',
        mainVisual: {
          type: 'image',
          url: 'another-future/1946-07-16.png',
          width: 4843,
          height: 2845,
          magnify: false
        }
      },
      {
        id: '1946-08-13',
        classes: ['wide'],
        date: '1946-08-13',
        description: '1946-08-13',
        mainVisual: {
          type: 'image',
          url: 'another-future/1946-08-13.png',
          width: 2114,
          height: 2002,
          magnify: false
        }
      },
      {
        id: '1946-10-14',
        classes: ['wide'],
        date: '1946-10-14',
        description: '1946-10-14',
        mainVisual: {
          type: 'image',
          url: 'another-future/1946-10-14.png',
          width: 1992,
          height: 1570,
          magnify: false
        }
      },
      {
        id: '1946-10-16',
        classes: ['wide'],
        date: '1946-10-16',
        description: '1946-10-16',
        mainVisual: {
          type: 'image',
          url: 'another-future/1946-10-16.png',
          width: 1810,
          height: 2012,
          magnify: false
        }
      },
      {
        id: '1946-11-18',
        classes: ['wide'],
        date: '1946-11-18',
        description: '1946-11-18',
        mainVisual: {
          type: 'image',
          url: 'another-future/1946-11-18.png',
          width: 2450,
          height: 2068,
          magnify: false
        }
      },
      {
        id: '1946-11-26',
        classes: ['wide'],
        date: '1946-11-26',
        description: '1946-11-26',
        mainVisual: {
          type: 'image',
          url: 'another-future/1946-11-26.png',
          width: 1428,
          height: 1174,
          magnify: false
        }
      },
      {
        id: '1947-02-12',
        classes: ['wide'],
        date: '1947-02-12',
        description: '1947-02-12',
        mainVisual: {
          type: 'image',
          url: 'another-future/1947-02-12.png',
          width: 2116,
          height: 2396,
          magnify: false
        }
      },
      {
        id: '1947-02-26',
        classes: ['wide'],
        date: '1947-02-26',
        description: '1947-02-26',
        mainVisual: {
          type: 'image',
          url: 'another-future/1947-02-26.png',
          width: 2524,
          height: 1704,
          magnify: false
        }
      },
      {
        id: '1947-02-28',
        classes: ['wide'],
        date: '1947-02-28',
        description: '1947-02-28',
        mainVisual: {
          type: 'image',
          url: 'another-future/1947-02-28.png',
          width: 1448,
          height: 1920,
          magnify: false
        }
      },
      {
        id: 'closing',
        classes: ['wide', 'closing'],
        title: '結語',
        mainVisual: {
          type: 'image',
          url: 'journey-background.png',
          width: 3840,
          height: 2160
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
  references: [
    '台灣省行政長官公署檔案'
  ]
}
