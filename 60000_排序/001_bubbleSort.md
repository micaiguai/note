# bubbleSort

## 实现
```js
function bubbleSort(nums) {
  for (let i = 0; i < nums.length; i++) {
    // 是否已经排好序
    let flag = true
    for (let j = 0; j < nums.length - 1 - i; j++) {
      if (nums[j] > nums[j + 1]) {
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]
        flag = false
      }
    }
    if (flag) {
      return
    }
  }
}
```