import LongForm from '@/components/LongForm'
import Draw from '@/components/Draw'
import Map from '@/components/Map'

var menu = [
  {
    id: 'roll-play',
    title: '誰扮誰誰就像誰',
    description: '如果能夠身歷其境，或許我們都能更了解彼此？',
    component: LongForm,
    pages: [
      {
        id: 'terror-30',
        title: '你是戒嚴時代的誰呢？',
        chart: {
          id: 14141,
          width: '36rem',
          contentStyle: {
            backgroundColor: '#202020',
            color: '#eee'
          }
        },
        breaking: true
      },
      {
        id: 'yulamchia',
        title: '遊覽車為什麼翻車？跟著這樣做，你也會成為黑心慣老闆！',
        chart: {
          id: 12756,
          width: '36rem',
          contentStyle: {
            backgroundColor: 'white',
            color: 'black'
          }
        }
      }
    ]
  },
  {
    id: 'map',
    title: '啊不是很有國際觀',
    description: '世界各地的人，說著不同的語言，讀著不同的報導，過著不同的生活。我們對他們了解多少？他們又是如何認識、看待台灣的？',
    component: Map,
    pages: [
      {
        id: '748',
        title: '同志結婚會滅國？醒醒吧，你沒有____'
      }
    ]
  },
  {
    id: 'draw',
    title: '不然你來畫畫看啊',
    description: '不靠感覺，靠資料、靠數據的新聞，有時候並不符合期待。你也來試試？',
    component: Draw,
    pages: [
      {
        id: 'tsai-first-year',
        title: '蔡總統的第一年'
      }
    ]
  }
]

export default menu
