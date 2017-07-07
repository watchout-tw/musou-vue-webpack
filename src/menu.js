import LongForm from '@/components/LongForm'
import Draw from '@/components/Draw'
import Map from '@/components/Map'

var menu = [
  {
    id: 'roll-play',
    title: '誰扮誰誰就像誰',
    component: LongForm,
    pages: [
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
      },
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
      }
    ]
  },
  {
    id: 'draw',
    title: '不然你來畫畫看啊',
    component: Draw,
    pages: [
      {
        id: 'tsai-first-year',
        title: '蔡總統的第一年'
      }
    ]
  },
  {
    id: 'map',
    title: '啊不是很有國際觀',
    component: Map,
    pages: [
      {
        id: '748',
        title: '同志結婚會滅國？醒醒吧，你沒有____'
      }
    ]
  }
]

export default menu
