# selectionSort

## 实现
```js
function selectionSort(nums) {
  for (let i = 0; i < nums.length; i++) {
    let minIndex = i
    for (let j = minIndex + 1; j < nums.length; j++) {
      if (nums[j] < nums[minIndex]) {
        minIndex = j
      }
    }
    [nums[i], nums[minIndex]] = [nums[minIndex], nums[i]]
  }
}
```
