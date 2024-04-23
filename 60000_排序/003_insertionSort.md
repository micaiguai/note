# insertionSort

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
