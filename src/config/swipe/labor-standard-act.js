export default {
  cards: [
    {
      type: 'text',
      id: 'preface',
      title: '《勞基法》流言終結者',
      content: '我們《沃草》幫你整理這次《勞基法》修法最常見的九個似是而非的說法，都已經這麼簡單了，你還不看嗎？\n\n左右滑滑看啊！\n\n不然，用下面的兩個按鈕也可以。',
      options: {
        left: {
          type: 'NO',
          label: 'NO'
        },
        right: {
          type: 'YES',
          label: 'YES'
        }
      }
    },
    {
      type: 'question',
      question: '先練習一次吧。\n\n**只要努力，人人都有機會成功。**\n\n<span>在卡片上往左滑，或按紅色的按鈕</span><label class="swipe-action-inline NO"></label><span>，表示你不同意這則敘述。往右滑，或按綠色的按鈕</span><label class="swipe-action-inline YES"></label><span>，表示你同意。</span>',
      answer: 'YES',
      options: {
        left: {
          type: 'NO',
          label: 'NO'
        },
        right: {
          type: 'YES',
          label: 'YES'
        }
      },
      recap: '只要努力，人人都有機會成功？',
      but: '話是這麼說沒錯，但是⋯\n\n如果聽《沃草》的說法，請按「繼續說下去」，不然，按「下一題謝謝」可以跳出，繼續看下一題。',
      more: [
        {
          type: 'markdown',
          content: '根據古典自由經濟理論⋯'
        }
      ]
    },
    {
      type: 'question',
      question: '法律規定加班可以換補休，以後都領不到加班費啦 QQ',
      answer: 'NO',
      options: {
        left: {
          type: 'NO',
          label: 'NO'
        },
        right: {
          type: 'YES',
          label: 'YES'
        }
      },
      recap: '法律規定加班可以換補休，以後都領不到加班費了？',
      but: '「加班可換補休」並不一定會讓勞工領不到加班費，不過⋯',
      more: [
        {
          type: 'markdown',
          content: '依新《勞基法》第32-1條規定，「加班換補休」的發動權在勞工身上，在勞工選擇補休且雇主同意的情況下，勞雇雙方還需協商補休完成的期限，如果期限內或離職前都沒休完，雇主必須補給加班費。\n\n其實「加班換補休」制度，早於1990年行政院勞工委員會（今勞動部）就以函釋說明「為法所不禁」，表示「用補休代替勞工延長工作時間的加班費」並不違法。從正面的角度來看，這次修法至少將這行之有年的制度明文化，並且寫出對應的罰則。\n\n不過法律中並無寫明「補休期限」的限制，如果勞雇雙方協商出「十年內完成補休」，那麼勞方加班所額外付出的勞力並無法即時得到休息，十年後的加班費用也有可能趕不上物價成長的速度，領到的加班費已經沒有加班當時的價值。'
        }
      ]
    },
    {
      type: 'question',
      question: '休息日加班費費率變低，加班費要減少啦 QQ',
      answer: 'NO',
      options: {
        left: {
          type: 'NO',
          label: 'NO'
        },
        right: {
          type: 'YES',
          label: 'YES'
        }
      },
      recap: '休息日加班費費率變低，加班會會減少？',
      but: '雖然加班費不會因為費率變低而減少，但是⋯',
      more: [
        {
          type: 'markdown',
          content: '新《勞基法》第24條並未調整休息日加班費費率，但「擬制工時」制度的廢除，可能會造成加班費的減少。\n\n休息日制度是從2016年底通過的《勞基法》新加入的概念，民進黨政府為了落實「週休二日」政見，用「以價制量」減少加班機會，讓每週上班的第六天（休息日）有較高的加班費，勞工前兩小時至少可多領一又三分之一、之後可多領一又三分之二的薪資。同時，也加入「擬制工時」制度，休息日加班「四小時內都算四小時」、「超過五小時至八小時都算八小時」。\n\n而2018年初通過的新《勞基法》將原先休息日加班「擬制工時」制度取消，都改回核實計算，也就是「做多久算多久」的加班費計算方式，但加班費率本身並未調整。支持者認為，這樣的修法能讓老闆願意請員工加班，勞工才拿得到休息日加班費；但反對者認為這會讓勞工休息日的加班費減少，也失去當初制定休息日用「以價制量」來推動週休二日的本意。'
        },
        {
          type: 'markdown',
          content: '以月薪 36,000 元和月薪 43,200 元勞工在修法前後的每小時休息日加班費差異為例。'
        },
        {
          type: 'figure',
          description: '例 1：月薪 36,000 元的小明在休息日加班了 5 小時， 修法前可以拿到 1,900 元，修法後改拿 1,150 元，減少 750 元。'
        },
        {
          type: 'figure',
          description: '例 2：月薪 43,200 元的小雅在休息日加班了 3 小時， 修法前可以拿到 1,080 元，修法後改拿 780 元，減少 300 元。'
        }
      ]
    },
    {
      type: 'question',
      question: '每個月加班工時上限提高了，以後每個月都要多加班八小時了啦 QQ',
      answer: 'NO',
      options: {
        left: {
          type: 'NO',
          label: 'NO'
        },
        right: {
          type: 'YES',
          label: 'YES'
        }
      },
      recap: '每個月加班工時上限提高，每個月要多加班八小時？',
      but: '不會每個月多加班，不過⋯',
      more: [
        {
          type: 'markdown',
          content: 'Lorem ipsum.'
        }
      ]
    },
    {
      type: 'question',
      question: '「七休一」條文從《勞基法》訂定時就存在，已經實施超過三十年！',
      answer: 'YES',
      options: {
        left: {
          type: 'NO',
          label: 'NO'
        },
        right: {
          type: 'YES',
          label: 'YES'
        }
      },
      recap: '「七休一」已經實施超過三十年？',
      but: '的確可以說「七休一已經實施超過三十年」，但是⋯',
      more: [
        {
          type: 'markdown',
          content: 'Lorem ipsum.'
        }
      ]
    },
    {
      type: 'question',
      question: '要累死了，以後每個人下班後八小時就可以繼續上班 QQ',
      answer: 'NO',
      options: {
        left: {
          type: 'NO',
          label: 'NO'
        },
        right: {
          type: 'YES',
          label: 'YES'
        }
      },
      recap: '以後下班後八小時就可以繼續上班？',
      but: '其實不是每個人都會這樣⋯',
      more: [
        {
          type: 'markdown',
          content: 'Lorem ipsum.'
        }
      ]
    },
    {
      type: 'question',
      question: '公司沒工會，也沒開過勞資會議，放寬七休一、加班時數上限調整跟我沒關係吧？',
      answer: 'YES',
      options: {
        left: {
          type: 'NO',
          label: 'NO'
        },
        right: {
          type: 'YES',
          label: 'YES'
        }
      },
      recap: '沒有工會，也沒開過勞資會議，七休一、加班時數上限就不會被放寬？',
      but: '可以這樣說沒錯，不過⋯',
      more: [
        {
          type: 'markdown',
          content: 'Lorem ipsum.'
        }
      ]
    },
    {
      type: 'question',
      question: '遊覽車司機工時超長，這次修法，會讓他們更慘 QQ',
      answer: 'NO',
      options: {
        left: {
          type: 'NO',
          label: 'NO'
        },
        right: {
          type: 'YES',
          label: 'YES'
        }
      },
      recap: '這次修法，會讓遊覽車司機更慘？',
      but: '其實遊覽車司機不會因為這次修法而更慘，因為⋯',
      more: [
        {
          type: 'markdown',
          content: 'Lorem ipsum.'
        }
      ]
    },
    {
      type: 'question',
      question: '這次修法後，民進黨立委說的中南部中小企業就可以讓勞工在例假日上班了耶！',
      answer: 'YES',
      options: {
        left: {
          type: 'NO',
          label: 'NO'
        },
        right: {
          type: 'YES',
          label: 'YES'
        }
      },
      recap: '這次修法後，中南部中小企業就可以讓勞工在例假日上班了？',
      but: '是啦是啦，不過⋯',
      more: [
        {
          type: 'markdown',
          content: 'Lorem ipsum.'
        }
      ]
    },
    {
      type: 'question',
      question: '保全業的勞工已經夠慘了，修法後，工時規定更有「彈性」，要更過勞了 QQ',
      answer: 'NO',
      options: {
        left: {
          type: 'NO',
          label: 'NO'
        },
        right: {
          type: 'YES',
          label: 'YES'
        }
      },
      recap: '這次修法，會讓保全業的勞工更慘？',
      but: '其實不會，因為⋯',
      more: [
        {
          type: 'markdown',
          content: 'Lorem ipsum.'
        }
      ]
    },
    {
      type: 'text',
      id: 'last',
      title: '沒了',
      content: '記得分享喔。'
    }
  ],
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
