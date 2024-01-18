/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
  let i = nums1.length - 1

  while (i > -1) {
    if (n - 1 < 0 || nums1[m - 1] >= nums2[n - 1]) {
      nums1[i] = nums1[m - 1]
      i--
      m--
    } else {
      nums1[i] = nums2[n - 1]
      i--
      n--
    }
  }
}
