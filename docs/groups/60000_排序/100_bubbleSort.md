# bubbleSort
1. 从首个元素开始，依次比较相邻的元素。如果前置位大于后置位，交换两者的位置。这一轮结束后，最大值会被置于数组末尾。
2. 缩小下一轮的遍历范围，只需遍历到上一轮最大值的前一个元素。
3. 如果当前遍历没有发生过交换，表示数组是有序的，可以直接结束排序。

## 实现
```js
function bubbleSort(nums) {
  for (let i = 0; i < nums.length; i++) {
    /** 是否已经排好序 */
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