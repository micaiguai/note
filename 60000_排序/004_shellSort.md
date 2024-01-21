# shellSort

## 实现
```js
function shellSort(nums) {
  let gap = Math.floor(nums.length / 2)
  while (gap > 0) {
    for (let i = gap; i < nums.length; i += gap) {
      let j = i - gap
      const cur = nums[i]
      while (j > -1 && cur < nums[j]) {
        nums[j + gap] = nums[j]
        j -= gap
      }
      nums[j + gap] = cur
    }
    gap = Math.floor(gap / 2)
  }
}
```
