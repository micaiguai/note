# shellSort
参考: https://www.bilibili.com/video/BV1Dv4y147ai
1. 先分组，gap = Math.floor(nums.length / 2)
2. 每个组用插入排序比较，nums[0]和nums[0 + gap]比较，nums[1]和nums[1 + gap]比较...
3. 缩减分组间隔，gap = Math.floor(gap / 2)，直至gap为1

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
