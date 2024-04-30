# quickSort

## 方法一：阮氏快排
```js
function quickSort(arr) {
  if (arr.length === 0) {
    return []
  }
  const pivotIndex = Math.floor(arr.length / 2)
  const pivot = arr.splice(pivotIndex, 1)[0]
  const left = []
  const right = []

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] <= pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }

  return [
    ...quickSort(left),
    pivot,
    ...quickSort(right)
  ]
}
```
## 方法二
```js
function partition(arr, l, r) {
  let i = l
  let j = r
  while (i < j) {
    // 先找到小的，确保和l交换的时候，i对应的值小于l
    while (i < j && arr[j] >= arr[l]) {
      j--
    }
    while (i < j && arr[i] <= arr[l]) {
      i++
    }
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  [arr[l], arr[i]] = [arr[i], arr[l]]
  return i
}

function quickSort(arr, l = 0, r) {
  r = r ?? arr.length - 1
  if (l >= r) {
    return
  }
  const i = partition(arr, l, r)
  quickSort(arr, l, i - 1)
  quickSort(arr, i + 1, r)
}
```
