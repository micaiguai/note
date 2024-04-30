/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  const map = new Map()
  let max = 0
  let left = 0
  let char
  for (let i = 0; i < s.length; i++) {
    char = s[i]
    if (map.has(char)) {
      left = Math.max(left, map.get(char) + 1)
    }
    map.set(char, i)
    max = Math.max(max, i - left + 1)
  }
  return max
}

lengthOfLongestSubstring('abba')