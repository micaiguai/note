export function mergeSort(nums) {
  if (nums.length === 1) {
    return nums
  }
  const pivotIndex = Math.floor(nums.length / 2)
  const leftNums = nums.slice(0, pivotIndex)
  const rightNums = nums.slice(pivotIndex, nums.length)
  return merge(mergeSort(leftNums), mergeSort(rightNums))
}

function merge(leftNums, rightNums) {
  const result = []
  let leftIndex = 0
  let rightIndex = 0
  while (leftIndex < leftNums.length && rightIndex < rightNums.length) {
    if (leftNums[leftIndex] < rightNums[rightIndex]) {
      result.push(leftNums[leftIndex])
      leftIndex++
    } else {
      result.push(rightNums[rightIndex])
      rightIndex++
    }
  }
  while (leftIndex < leftNums.length) {
    result.push(leftNums[leftIndex])
    leftIndex++
  }
  while (rightIndex < rightNums.length) {
    result.push(rightNums[rightIndex])
    rightIndex++
  }
  return result
}
