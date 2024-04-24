export function insertionSort(nums) {
  for (let i = 1; i < nums.length; i++) {
    const cur = nums[i]
    let j = i - 1
    while (j >= 0 && cur < nums[j]) {
      nums[j + 1] = nums[j]
      j--
    }
    nums[j + 1] = cur
  }
}
