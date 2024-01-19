# insertionSort

## 实现
```js
function insertionSort(nums) {
  for (let i = 1; i < nums.length; i++) {
    let j = i - 1
    const cur = nums[i]
    while (j > -1 && cur < nums[j]) {
      j--
      nums[j + 1] = nums[j]
    }
    nums[j] = cur
  }
}
```
