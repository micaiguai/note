/**
 * 暴力查找
 * 结果：耗时太长
 * https://leetcode.cn/problems/search-a-2d-matrix-ii/description/
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
  for (const arr of matrix) {
    for (const item of arr) {
      if (target === item) {
        return true
      }
    }
  }
  return false
}

/**
 * 二分查找
 * 结果：耗时太长
 * https://leetcode.cn/problems/search-a-2d-matrix-ii/description/
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
  for (const row of matrix) {
    const index = search(row, target)
    if (index > -1) {
      return true
    }
  }
  return false
}

function search(row, target) {
  let l = 0
  let r = row.length - 1
  while (l <= r) {
    const k = Math.floor((l + r) / 2)
    if (row[k] > target) {
      r = k - 1
    }
    if (row[k] === target) {
      return k
    }
    if (row[k] < target) {
      l = k + 1
    }
  }
  return -1
}

/**
 * Z字查找
 * https://leetcode.cn/problems/search-a-2d-matrix-ii/description/
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
  let m = matrix.length - 1
  let n = 0

  let x = 0
  let y = matrix[0].length - 1

  while (x <= m && y >= n) {
    if (target < matrix[x][y]) {
      y--
    }
    if (target === matrix[x][y]) {
      return true
    }
    if (target > matrix[x][y]) {
      x++
    }
  }
  return false
}