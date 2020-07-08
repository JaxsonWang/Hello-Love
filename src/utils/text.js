const phaseWrapList = (str, length) => {
  const phaseList = []
  const strLenth = str.length
  for (let i = 0, j = 0; i < strLenth; i++) {
    if (str[i] === '\n' || str[i] === '\r' || i === strLenth - 1) {
      phaseList.push(str.substr(j, i))
      j = i
    }
  }
  return phaseList
}

const line = (str, lineTextLength = 15) => {
  let newString = ''
  const listLength = Math.ceil(str.length / lineTextLength)
  for (var i = 0; i < listLength; i++) {
    newString += str.substring(i * lineTextLength, (i + 1) * lineTextLength) +
      '||'
  }
  return newString
}

/**
 * 实现文本换行和段落换行，需指定当行文本长度
 * @param {String} str  传入的字符串
 * @param {Number} length 当行文本长度
 * @returns {string[]} 返回替换后的字符串
 */
export default (str, length) => {
  if (!str) {
    return ''
  } else {
    const resultList = []
    const phaseList = phaseWrapList(str)
    phaseList.forEach(item => {
      resultList.push(line(item, length))
    })
    const newArr = resultList.join('').split('||')
    newArr.pop()
    return newArr
  }
}

