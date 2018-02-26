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
        url: 'https://watchout.tw/musou-aux/modern-history-of-taiwan/Imperial_Rescript_on_the_Termination_of_the_War-excerpt.mp3' // Use external URL
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
        description: '檢察官有偵查犯罪和維持社會安寧之責，今已光復，日籍檢察官總算去職，首席檢察官雖不是台籍人士，但至少是同胞。之後願能多聘用本省法律人士。',
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
        description: '要作選出代表的準備，選出代表台灣人自己民意的代表。看來亦有不少推事、檢察官由台人擔當，甚好。',
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
        description: '竟有公務員搭火車不買票，以前不曾見過。據說這是外省人帶來的作風，盼能改進。明明戰爭已經結束，怎麼米價還一直漲，比三個月前高了三倍。',
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
        description: '怎麼連首席檢察官也在走私，怪不得物價飛漲。許久不見的天花病出現了，過去「種痘防疫」的政策取消了嗎？',
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
        description: '人才輩出，一時之選。',
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
        description: '大報紙居然把大畫家陳澄波的名字給寫錯，來寫封信要求訂正一下。',
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
        description: '日本政府殖民台灣五十年，壓榨了台灣人民不少財產，日產清查一定得公平，千萬不能交給人格品行有疑者。',
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
        description: '專賣局查緝私煙查到自己口袋裡，一個股長就可以貪污敲詐超過十萬元，惡劣！',
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
        description: '王添灯從市參議員選上省參議員了，更上一層樓！',
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
        description: '原來我們的參議會權力只有這樣，難怪「議而不決，決而不行」。政府支出又被公務員津貼補助佔了一大款，「爾俸爾祿，民脂民膏」，為政者得要苦民所苦啊！',
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
        description: '買教科書的錢竟被挪去走私，但官員怎是答非所問，莫名其妙。又各縣市預算收入僅有一億餘元，支出卻逾九億，錢哪來？',
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
        description: '捐給孩童的糧食居然被市府人員私吞，負責本案的王育霖檢察官據說是台灣人，應要為台人討公道。',
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
        description: '貪污瀆職公務員橫行，媒體據實報導還來信恐嚇，《民報》用整版貪污事件回擊真是痛快！',
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
        description: '王育霖檢察官果然有膽識，直接帶憲兵和法警到市府訊問貪瀆官員，這些貪官還四處嚷嚷說市府被憲兵包圍，真不要臉。',
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
        description: '全台建設百廢待舉，反先去籌獻金一億元建館慶祝蔣介石六十歲生日，荒謬！',
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
        description: '陳儀說什麼寬大仁愛是中國人長處，要台人成為地道的中國人，這不就是要我們也一起做事隨便嗎？',
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
        description: '警察打傷殺害法院法警又拘留其他當事人，法官、檢察官都已經同意保釋，為何還不放人？又不是古代衙門，縣長難道可以說押人就押人？',
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
        description: '媒體報導警察開槍亂打人，社長居然被告上法庭成筆禍。已是參議員的王添灯先生還因此官司纏身，殖民政府都不至如此。',
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
        description: '專賣事業反倒成圖利私人的工具，專賣公司內又多是外省人，薪資比縣市長還高，台灣人要去哪呢？王育霖不當檢察官了嗎？',
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
        description: '過去殖民時期臺灣人被壓榨的財富都歸到了日產，現在被盜賣又不追究，跟殖民政府有何異？王育霖不當檢察官了嗎？',
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
        description: '這政府不只是謀財，還來害命，實在可惡！今日聽聞眾人將到行政長官公署前討公道，得一起去才行。',
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
