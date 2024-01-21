# mergeSort

## 实现
```js
function mergeSort(nums) {
  if (nums.length <= 1) {
    return nums
  }
  const pivot = Math.floor(nums.length / 2)
  const left = nums.slice(0, pivot)
  const right = nums.slice(pivot, nums.length)
  return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
  const ret = []
  while (left.length > 0 && right.length > 0) {
    if (left[0] < right[0]) {
      ret.push(left.shift())
    } else {
      ret.push(right.shift())
    }
  }
  while (left.length > 0) {
    ret.push(left.shift())
  }
  while (right.length > 0) {
    ret.push(right.shift())
  }
  return ret
}
```