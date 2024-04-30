export function quickSort1(nums) {
  if (nums.length <= 1) {
    return nums
  }
  const pivotIndex = Math.floor(nums.length / 2)
  const leftNums = []
  const rightNums = []
  for (let i = 0; i < nums.length; i++) {
    if (i === pivotIndex) {
      continue
    }
    if (nums[i] < nums[pivotIndex]) {
      leftNums.push(nums[i])
    } else {
      rightNums.push(nums[i])
    }
  }
  return [
    ...quickSort1(leftNums),
    nums[pivotIndex],
    ...quickSort1(rightNums)
  ]
}
