---
id: 718
title: Maximum Length of Repeated Subarray
difficulty: medium
tags: Array, Binary Search, Dynamic Programming, Sliding Window, Rolling Hash, Hash Function
similar:
slug: maximum-length-of-repeated-subarray
---

Given two integer arrays `nums1` and `nums2`, return the _maximum length of a subarray that appears in **both** arrays_.

## Example 1:

```
Input: nums1 = [1,2,3,2,1], nums2 = [3,2,1,4,7]
Output: 3
Explanation: The repeated subarray with maximum length is [3,2,1].
```

## Example 2:

```
Input: nums1 = [0,0,0,0,0], nums2 = [0,0,0,0,0]
Output: 5
```

## Constraints:

- `1 <= nums1.length, nums2.length <= 1000`
- `0 <= nums1[i], nums2[i] <= 100`

## Solution:

```
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findLength = function(nums1, nums2) {
  const dp = Array(nums1.length + 1).fill().map(() => Array(nums2.length + 1).fill(0))
  let res = 0

  for(let i = 0; i < nums1.length; i++){
    for(let j = 0; j < nums2.length; j++){
      if(nums1[i] === nums2[j]) {
        dp[i + 1][j + 1] = dp[i][j] + 1
        res = Math.max(res, dp[i + 1][j + 1])
      }
    }
  }

  return res
};
```

## Expalnation:

用 dp 的方法，只要 `nums1[i]` == `nums2[i]` 就讓表中長度加一，最後取出表裡最大的值擊可。
