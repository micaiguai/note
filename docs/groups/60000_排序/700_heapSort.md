# heapSort
- 构建大顶堆
- 根节点索引为0
- 当前索引的根节点索引为${n - 1} \over {2}$
- 当前节点的左子节点为$2n + 1$，当前节点的右子节点为$2n + 2$
## 实现
```js
let heapSize

function heapSort(nums) {
  heapSize = nums.length
  // 最后一个不用比，比倒数第二个
  while (heapSize > 1) {
    for (let i = heapSize - 2; i >= 0; i--) {
      heapify(nums, i)
    }
    swap(nums, 0, heapSize - 1)
    heapSize--
  }
}

function swap(nums, i, j) {
  [nums[i], nums[j]] = [nums[j], nums[i]]
}

function heapify(nums, i) {
  const left = 2 * i + 1
  const right = 2 * i + 2
  if (left < heapSize && nums[left] > nums[i]) {
    swap(nums, i, left)
    heapify(nums, left)
  }
  if (right < heapSize && nums[right] > nums[i]) {
    swap(nums, i, right)
    heapify(nums, right)
  }
}
```

