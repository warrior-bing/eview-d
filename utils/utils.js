
/**
 * 补零
 * @param num
 * @returns {string}
 */
export function pad(num) {
  return new Array(2 - ('' + num).length + 1).join(0) + num
}
// 金额千位加‘,’
export function cutBit(value) {
  let dstNumber = Number(value)
  if (isNaN(dstNumber) || value === '') {
    return value
  }
  value = ('' + value).replace(/,/g, '')
  let digit = value.indexOf('.') // 取得小数点的位置
  let int = digit > -1 ? value.substr(0, digit) : value
  let mag = []
  let word
  for (let i = int.length; i > 0; i -= 3) {
    word = value.substring(i, i - 3) // 每隔3位截取一组数字
    mag.unshift(word)
  }
  return mag.join(',') + (digit > -1 ? value.substring(digit) : '')
}
// 金额转大写
export function upper(money) {
  if (money === '') { return '' }
  // 汉字的数字
  let cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  // 基本单位
  let cnIntRadice = ['', '拾', '佰', '仟']
  // 对应整数部分扩展单位
  let cnIntUnits = ['', '万', '亿', '兆']
  // 对应小数部分单位
  let cnDecUnits = ['角', '分', '毫', '厘']
  // 整数金额时后面跟的字符
  let cnInteger = '整'
  // 整型完以后的单位
  let cnIntLast = '元'
  // 最大处理的数字
  let maxNum = 999999999999999.9999
  // 金额整数部分
  let integerNum
  // 金额小数部分
  let decimalNum
  // 输出的中文金额字符串
  let chineseStr = ''
  // 分离金额后用的数组，预定义
  let parts
  money = parseFloat(money)
  if (money >= maxNum) {
    // 超出最大处理数字
    return ''
  }
  if (money === 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger
    return chineseStr
  }
  // 转换为字符串
  money = money.toString()
  if (money.indexOf('.') === -1) {
    integerNum = money
    decimalNum = ''
  } else {
    parts = money.split('.')
    integerNum = parts[0]
    decimalNum = parts[1].substr(0, 4)
  }
  // 获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    let zeroCount = 0
    let IntLen = integerNum.length
    for (let i = 0; i < IntLen; i++) {
      let n = integerNum.substr(i, 1)
      let p = IntLen - i - 1
      let q = p / 4
      let m = p % 4
      if (n === '0') {
        zeroCount++
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0]
        }
        // 归零
        zeroCount = 0
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m]
      }
      if (m === 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q]
      }
    }
    chineseStr += cnIntLast
  }
  // 小数部分
  if (decimalNum !== '') {
    let decLen = decimalNum.length
    for (let i = 0; i < decLen; i++) {
      var n = decimalNum.substr(i, 1)
      if (n !== '0') {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i]
      }
    }
  }
  if (chineseStr === '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger
  } else if (decimalNum === '') {
    chineseStr += cnInteger
  }
  return chineseStr
}

/**
 * 获取数量级
 */
// 金额转大写
export function moneyLevel(money) {
  if (money === '') { return '' }
  // 数量级
  let levelArray = ['', '拾', '佰', '仟', '万', '拾万', '佰万', '仟万', '亿', '拾亿', '佰亿', '仟亿', '万亿', '拾万亿', '佰万亿']
  // 最大处理的数字
  let maxNum = 999999999999999.9999
  // 金额整数部分
  let integerNum
  // 输出的中文金额字符串
  let level = ''
  // 分离金额后用的数组，预定义
  let parts
  money = parseFloat(money)
  if (money >= maxNum || money === 0) {
    // 超出最大处理数字
    return ''
  }
  // 转换为字符串
  money = money.toString()
  if (money.indexOf('.') === -1) {
    integerNum = money
  } else {
    parts = money.split('.')
    integerNum = parts[0]
  }

  // 获取整型部分转换
  level = levelArray[integerNum.length > 2 ? integerNum.length - 1 : 0]
  return level
}

/**
 * 保留小数
 * @param {*} srcNumber
 * @param {*} n
 * @param {*} isPad
 */
export function toDecimal(srcNumber, n = 3, isPad = true) {
  let dstNumber = Number(srcNumber)
  if (isNaN(dstNumber) || srcNumber === '') {
    return srcNumber
  }
  if (dstNumber >= 0) {
    dstNumber = parseInt(dstNumber * Math.pow(10, n) + 0.5) / Math.pow(10, n)
  } else {
    let tmpDstNumber = -dstNumber
    dstNumber = parseInt(tmpDstNumber * Math.pow(10, n) + 0.5) / Math.pow(10, n)
  }
  let dstStrNumber = dstNumber.toString()
  let dotIndex = dstStrNumber.indexOf('.')
  // 是否补0
  if (isPad) {
    if (dotIndex < 0) {
      dotIndex = dstStrNumber.length
      dstStrNumber += '.'
    }
    while (dstStrNumber.length <= dotIndex + n) {
      dstStrNumber += '0'
    }
  }
  return dstStrNumber
}

