# insertionSort
1. 从索引1开始，挑出当前索引的值。将其和前置索引的值比较，将较小值放置在前置位置。

## 实现
```js
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let j = i - 1
    const cur = arr[i]
    while (j >= 0 && cur < arr[j]) {
      [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
      j--
    }
  }
}
```
