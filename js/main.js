import { totalAns } from './db.js'

const userChoice = []

function getCookName (name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  if (match) return match[2]
}

function genRanNum (ran) {
  return Math.floor(Math.random() * Math.floor(ran))
}

class AnsParser {
  constructor () {
    this.curVal = []
    this.getCookie()
  }

  getCookie () {
    for (let i = 0; i < 2; i++) {
      userChoice.push(getCookName('q' + Math.floor(i + 1)))
    }
  }

  parse () {
    for (let i = 0; i < totalAns.length; i++) {
      if (this.checkIf(i)) {
        this.curVal.push(i)
      }
    }
    const getNum = genRanNum(3)
    const tmpVal = totalAns[this.curVal[getNum]]
    try {
      document.getElementById('itemIMG').src = tmpVal.img
      document.getElementById('itemIMG').onclick = function () { window.open(tmpVal.pdf, '_self') }
    } catch (err) {
      document.getElementById('itemIMG').src = err
      document.getElementById('itemIMG').onclick = function () { window.open(tmpVal.pdf, '_self') }
    }
  }

  checkIf (val) {
    if (userChoice.length !== totalAns[val].tags.length) { return -1 }
    const tmpChoice = userChoice.concat().sort()
    const tmpAns = totalAns[val].tags.concat().sort()
    for (let i = 0; i < tmpAns.length; i++) {
      if (tmpChoice[i] !== tmpAns[i]) { return 0 }
    }
    return 1
  }

  checkDup (arr, list) {
    for (let i = 0; i < list.length; i++) {
      for (let x = 0; x < list.length; x++) {
        if (i !== x) {
          if (arr[this.curVal[list[i]]].name === arr[this.curVal[list[x]]].name) { return 1 }
        }
      }
    }
    return 0
  }
}

const mainCtl = new AnsParser()
mainCtl.parse()
