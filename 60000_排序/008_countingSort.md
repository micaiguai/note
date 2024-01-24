# countingSort

## 实现
```js
function countingSort(nums) {
  const min = Math.min(...nums)
  const max = Math.max(...nums)
  const countArr = new Array(max - min + 1).fill(0)
  const ret = []
  for (let i = 0; i < nums.length; i++) {
    countArr[nums[i] - min]++
  }
  for (let i = 0; i < countArr.length; i++) {
    while (countArr[i] > 0) {
      ret.push(i + min)
      countArr[i]--
    }
  }
  return ret
}
```