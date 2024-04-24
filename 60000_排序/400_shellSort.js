export function shellSort(nums) {
  let gap = Math.floor(nums.length / 2)
  while (gap >= 1) {
    for (let i = gap; i < nums.length; i++) {
      let j = i - gap
      const cur = nums[i]
      while (j >= 0 && cur < nums[j]) {
        nums[j + gap] = nums[j]
        j -= gap
      }
      nums[j + gap] = cur
    }
    gap = Math.floor(gap / 2)
  }
}
