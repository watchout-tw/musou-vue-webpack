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
      question: '先練習一次吧。\n\n<span>在卡片上往左滑，或按紅色的按鈕</span><label class="swipe-action-inline NO"></label><span>，表示你不同意這則敘述。往右滑，或按綠色的按鈕</span><label class="swipe-action-inline YES"></label><span>，表示你同意。</span>',
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
      recap: '每過六十秒，就有一分鐘過去。',
      but: '如果想聽更多《沃草》的說法，請按「繼續說下去」，或是按「下一題謝謝」，繼續看下一題。',
      more: [
        {
          type: 'markdown',
          content: '因為一分鐘有六十秒，所以每六十秒就過去一分鐘呀！\n\n'
        },
        {
          type: 'figure',
          platform: 'infogram',
          id: '34df8c36-f538-411d-8afb-1328f31c1cd1',
          height: 250
        }
      ]
    },
    {
      type: 'question',
      question: '法律規定加班可以換補休，以後加班費都領不到了啦 QQ',
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
          content: '#### 先講結論\n\n依新《勞基法》第32-1條規定，「加班換補休」的發動權在勞工身上，在勞工選擇補休且雇主同意的情況下，勞雇雙方還需協商補休完成的期限，如果期限內或離職前都沒休完，雇主還是要補給加班費。\n\n#### 法條演進\n\n其實「加班換補休」制度，早於1990年行政院勞工委員會（今勞動部）就以函釋說明「為法所不禁」，表示「用補休代替勞工延長工作時間的加班費」並沒有違背法律。也就是說，就算沒有本次修法，業界常見的「加班換補休」就已經是實務上勞動主管機關可以接受的做法。\n\n在1月10日《勞基法》三讀後，勞動部也於1月26日預告施行細則加入「補休期間」的限制，需參考特休假可以週年、曆年或於當年底結清，避免補休期限遙遙無期的問題。\n\n#### 修法影響\n\n從正面的角度來看，這次修法將這行之有年的制度明文化，並且訂定違法所對應的罰則。不過《勞基法》本法中並無寫明「補休期限」的限制，僅在施行細則中補充。如果勞雇雙方協商出「十年內完成補休」這種違反細則、不違反母法的行為，在細則不能逾越母法的法律原則下，主管機關是否能逕行裁罰，仍有相當爭議。而部分學者和工運團體所倡議的「補休比照加班費加成計算」，雖有中國國民黨立委蔣萬安提案，但也未能通過審查。'
        }
      ]
    },
    {
      type: 'question',
      question: '休息日加班費費率變低，加班費要減少了啦 QQ',
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
      recap: '休息日加班費費率變低，加班費會減少？',
      but: '休息日加班費不會因為費率變低而減少，但是⋯',
      more: [
        {
          type: 'markdown',
          content: '#### 先講結論\n\n新《勞基法》第24條並未調整休息日加班費費率，但「擬制工時」制度的廢除，可能會造成加班費的減少。\n\n#### 法條演進\n\n休息日本來即是勞動主管機關函釋及勞動法學就有的概念與用詞，2016年底民進黨政府將其明文入法。民進黨政府為了落實「週休二日」政見，用「以價制量」減少加班機會，讓每週上班的第六天（休息日）有較高的加班費，勞工前兩小時至少可多領一又三分之一、之後可多領一又三分之二的薪資。同時，也加入「擬制工時」制度，休息日加班「四小時內都算四小時」、「超過五小時至八小時都算八小時」。\n\n而2018年初通過的新《勞基法》將原先休息日加班「擬制工時」制度取消，都改回核實計算，也就是「做多久算多久」的加班費計算方式，但加班費率本身並未調整。\n\n#### 法條演進\n\n支持者認為，原本的「擬制工時」制度設計，勞工只要去工作一小時就算四小時加班，讓雇主寧願休息日不開工，修法取消「擬制工時」才能讓雇主願意請員工加班，勞工也才拿得到休息日加班費；但反對者認為這會讓勞工休息日的加班費減少，也失去當初制定休息日用「以價制量」來推動週休二日的本意。\n\n以月薪 36,000 元勞工在修法前後的每小時休息日加班費差異為例。休息日加班了 5 小時， 修法前可以拿到 1,900 元，修法後改拿 1,150 元，減少 750 元。'
        },
        {
          type: 'figure',
          platform: 'infogram',
          id: '34df8c36-f538-411d-8afb-1328f31c1cd1',
          height: 250
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
      but: '不會每個月都多加班八小時，不過⋯',
      more: [
        {
          type: 'markdown',
          content: '#### 先講結論\n\n新《勞基法》第 32 條將原先單月加班上限 46 小時的提高為 54 小時。本次提高加班時數上限的修法，其實並不會直接對所有勞工產生效果，雇主必須經過工會或勞資會議的同意，才能將月加班時數從 46 小時調整至 54 小時，而每三個月最高加班時數仍維持 138 小時，並不會每個月都多加班 8 小時。但在旺季可加班時數上限提高的情況下，勞工整體加班時數恐將成長，最多甚至能連續四個月加班 54 小時。\n\n#### 法條演進\n\n其實立法院不是第一次討論調整加班工時上限。在 2015 年修《勞基法》時，馬政府行政院版草案除了將正常工時從「雙週 84 小時」改為「單週 40 小時」，也有提案將每月加班時數上限從 46 小時提高到 54 小時。以每月 30 日為例，原先一個月的總工時上限為 184（正常工時）加上 46（加班工時）共 230 小時，2015年行政院版是將減少 8 小時正常工時，增加 8 小時加班時數，但當時立法院審議通過的版本僅減少 8 小時正常工時，並未調整加班時數。2018 年新《勞基法》通過後，每月最高總工時將回到 230 小時（ 176 正常工時加上 54 加班工時），但每三個月最高加班時數仍維持 138 小時。\n\n#### 修法影響\n\n針對本條修法，支持的意見認為，這可以解決產業淡旺季的問題，能在滿足短期內大量的加班需求，也可以讓勞工有更多加班機會、領到更多加班費；不過在每三個月加班時數上限固定的情況下，加班費總數上限其實也不會變，其實總加班費上限也不會更多。\n\n另外，雖然每三個月的加班時數上限與修法前一樣為 138 小時，但法律並未規定「任連續三個月加班時數不得超過 138 小時」，因此可能出現六個月中頭尾加班 30 小時、中間連續四個月加班 54 小時的極端狀況。而在各國都在逐步降低每月工時上限時，台灣卻獨步全球提高，原已名列前茅的總工時排名恐將再「進步」。'
        },
        {
          type: 'figure',
          platform: 'infogram',
          id: '8dca1a95-7681-465b-8786-d1b75814ef92',
          height: 250
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
