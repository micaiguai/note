import { expect, it, describe, test } from 'vitest'
import { bubbleSort } from './001_bubbleSort'
import { array } from './share'
import { cloneDeep } from 'lodash'

describe('test sort', () => {
  test('bubble', () => {
    cloneDeep(array)
    bubbleSort(array)
    expect(array).toEqual([1, 2, 5, 7, 7, 8, 9, 12, 34, 39, 56])
  })
  test('bubble', () => {
    cloneDeep(array)
    bubbleSort(array)
    expect(array).toEqual([1, 2, 5, 7, 7, 8, 9, 12, 34, 39, 56])
  })
})
