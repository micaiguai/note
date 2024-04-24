# selectionSort
1. 从数组首位开始遍历，找出最小的元素，并将其和首位交换。这一轮结束后，最小值会被放置在数组首位。
2. 开始新一轮遍历，遍历范围缩减至从上一轮最小值的后置位开始。

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
