import { describe, expect, it } from 'vitest'
import { cloneDeep } from 'lodash'
import { bubbleSort } from '../100_bubbleSort'
import { selectionSort } from '../200_selectionSort'
import { insertionSort } from '../300_insertionSort'
import { shellSort } from '../400_shellSort'
import { mergeSort } from '../500_mergeSort'
import { quickSort1 } from '../600_quickSort'

export const array = [5, 2, 7, 8, 34, 7, 39, 12, 56, 9, 1]

describe('test sort', () => {
  it('bubbleSort', { timeout: 100 }, () => {
    const newArr = cloneDeep(array)
    bubbleSort(newArr)
    expect(newArr).toEqual([1, 2, 5, 7, 7, 8, 9, 12, 34, 39, 56])
  })
  it('selectionSort', { timeout: 100 }, () => {
    const newArr = cloneDeep(array)
    selectionSort(newArr)
    expect(newArr).toEqual([1, 2, 5, 7, 7, 8, 9, 12, 34, 39, 56])
  })
  it('insertionSort', { timeout: 100 }, () => {
    const newArr = cloneDeep(array)
    insertionSort(newArr)
    expect(newArr).toEqual([1, 2, 5, 7, 7, 8, 9, 12, 34, 39, 56])
  })
  it('shellSort', { timeout: 100 }, () => {
    const newArr = cloneDeep(array)
    shellSort(newArr)
    expect(newArr).toEqual([1, 2, 5, 7, 7, 8, 9, 12, 34, 39, 56])
  })
  it('mergeSort', { timeout: 100 }, () => {
    let newArr = cloneDeep(array)
    newArr = mergeSort(newArr)
    expect(newArr).toEqual([1, 2, 5, 7, 7, 8, 9, 12, 34, 39, 56])
  })
  it('quickSort1', { timeout: 100 }, () => {
    let newArr = cloneDeep(array)
    newArr = quickSort1(newArr)
    expect(newArr).toEqual([1, 2, 5, 7, 7, 8, 9, 12, 34, 39, 56])
  })
})
