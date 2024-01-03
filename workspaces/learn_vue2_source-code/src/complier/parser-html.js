const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; // abc-aaa
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; // <aaa:asdads>
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 标签开头的正则 捕获的内容是标签名
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配标签结尾的 </div>
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的
const startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >  <div>

export const NODE_TYPE_ENUM = {
  NODE: 1,
  TEXT: 3
}

let root
const stack = []

/**
 * 处理开始标签节点
 * @param {string} tagName 标签名称
 * @param {object[]} attrs 属性信息
 */
function handleStartTag(tagName, attrs) {
  const astItem = {
    attrs,
    tag: tagName,
    type: NODE_TYPE_ENUM.NODE,
    children: [],
    parent: undefined
  }
  // 如果root为空，赋值
  if (!root) {
    root = astItem
  }
  stack.push(astItem)
}
/**
 * 处理开始标签节点
 * @param {string} text 文本信息
 */
function chars(text) {
  text = text.trim()
  if (!text) {
    return
  }
  const lastAstItem = stack[stack.length - 1]
  lastAstItem.children.push({
    text,
    type: NODE_TYPE_ENUM.TEXT,
    parent: lastAstItem
  })
}
/**
 * 处理结束标签节点
 * @param {string} tagName 标签名称
 */
function handleEndTag(tagName) {
  const astItem = stack.pop()
  const lastAstItem = stack[stack.length - 1]
  if (lastAstItem) {
    astItem.parent = lastAstItem
    lastAstItem.children.push(astItem)
  }
}

/**
 * 转换html为ast
 * @param {string} html 模板信息
 * @returns {object} ast信息
 */
export function parseHtml(html) {
  /**
   * 前进步数
   * @param {number} step 步数
   */
  function advance(step) {
    html = html.substring(step)
  }
  /**
   * 转换html为开始标签的ast
   * @param {string} html 模板信息
   * @returns {object} ast信息
   */
  function parseStartTag() {
    const matchInfo = html.match(startTagOpen)
    let startTagCloseMatchInfo
    let attributeMatchInfo
    let astInfo = {
      tagName: '',
      attrs: []
    }
    if (!matchInfo) {
      return
    }
    astInfo.tagName = matchInfo[1]
    advance(matchInfo[0].length)
    // 如果没有匹配到开始标签的结束符 && 能匹配到属性
    while (!(startTagCloseMatchInfo = html.match(startTagClose)) && (attributeMatchInfo = html.match(attribute))) {
      advance(attributeMatchInfo[0].length)
      astInfo.attrs.push({
        name: attributeMatchInfo[1],
        value: attributeMatchInfo[3] ?? attributeMatchInfo[4] ?? attributeMatchInfo[5]
      })
    }
    advance(startTagCloseMatchInfo[0].length)
    return astInfo
  }
  while (html) {
    let astInfo
    const startTagIndex = html.indexOf('<')
    // 1. 匹配到<span
    // 2. 未匹配到<开头
    // 3. 匹配到</span>
    if (startTagIndex === 0) {
      astInfo = parseStartTag()
      if (astInfo) {
        handleStartTag(astInfo.tagName, astInfo.attrs)
        continue
      }
      const endTagMatchInfo = html.match(endTag)
      astInfo = {
        tagName: endTagMatchInfo[1]
      }
      handleEndTag(astInfo.tagName)
      advance(endTagMatchInfo[0].length)
      continue
    }
    const plainText = html.slice(0, startTagIndex)
    chars(plainText)
    advance(plainText.length)
  }
  return root
}
