import { NODE_TYPE_ENUM, parseHtml } from './parser-html'

const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g

/**
 * 给generate函数生成props对象字符串
 * @param {object[]} attrs 属性信息数组
 * @returns {string} props对象字符串
 */
function genProps(attrs) {
  let propsStr =  ''
  attrs.forEach(attrItem => {
    let value
    if (attrItem.name === 'style') {
      const valueObj = {}
      const styleItems = attrItem.value.split(';')
      styleItems.forEach(styleItem => {
        const [styleItemKey, styleItemValue] = styleItem.split(':')
        valueObj[styleItemKey.trim()] = styleItemValue.trim()
      })
      value = valueObj
    } else {
      value = attrItem.value
    }
    // JSON.stringify可以将对象转成字符串，也可以将 app 转换为 "app"
    propsStr += `${attrItem.name}:${JSON.stringify(value)},`
  })
  return `{${propsStr.slice(0, -1)}}`
}

/**
 * 生成子集
 * @param {object} root 抽象语法树
 * @returns {string} children渲染字符串
 */
function genChildren(root) {
  let childrenRenderStr = ''
  if (!root?.children?.length) {
    return childrenRenderStr
  }
  root.children.forEach(item => {
    if (item.type === NODE_TYPE_ENUM.NODE) {
      childrenRenderStr += `,${generate(item)}`
    }
    if (item.type === NODE_TYPE_ENUM.TEXT) {
      let index = 0
      // 重置lastIndex
      defaultTagRE.lastIndex = 0
      let match
      while (match = defaultTagRE.exec(item.text)) {
        const commonStr = item.text.slice(index, match.index)
        childrenRenderStr += `,_v(${JSON.stringify(commonStr)}`
        childrenRenderStr += ` + _s(${JSON.stringify(match[1])})`
        index = defaultTagRE.lastIndex
      }
      // 如果字符串还有值
      if (index < item.text.length) {
        childrenRenderStr += `,_v(${JSON.stringify(item.text.slice(index))}`
      }
      childrenRenderStr += ')'
    }
  })
  return childrenRenderStr
}

/**
 * 将模板字符串转换为render字符串
 * @param {object} root 抽象语法树
 * @returns {string} render字符串
 */
function generate(root) {
  return `_c(
    "${root.tag}",
    ${
      root.attrs?.length > 0
        ? genProps(root.attrs)
        : 'undefined'
    }
    ${
      genChildren(root)
    }
  )`
}

/**
 * @param {string} template 模板信息
 * @returns {Function} 渲染函数
 */
export function compileToFunction(template) {
  // 1. 转换成抽象语法树
  const root = parseHtml(template)
  console.log('root :', root)
  // 2. 转换成render函数字符串
  const code = generate(root)
  const renderFn = new Function(`
    with (this) {
      ${code}
    }
  `)
  console.log('renderFn :', renderFn)
  return function() {
    
  }
}