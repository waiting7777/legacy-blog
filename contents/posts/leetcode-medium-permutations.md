---
title: "[LeetCode][Medium] 46. Permutations"

tags: LeetCode, LeetCode-Medium

category: Engineering

excerpt: Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.

date: 2021-04-03

image: ./images/leetcode.jpeg

image_caption: leetcode

author: author1

slug: leetcode-medium-permutations
---

## 題目

Given an array `nums` of distinct integers, return all the possible permutations. You can return the answer in **any order**.

Example 1:

```
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

Example 2:

```
Input: nums = [0,1]
Output: [[0,1],[1,0]]
```

Example 3:

```
Input: nums = [1]
Output: [[1]]
```

## 思路

用 dfs 的方法往下找出所有排列組合。


## Solution
```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    const res = []
    
    dfs(res, [], nums)
    
    return res
};

var dfs = function(res, arr, nums) {
    var len = nums.length
    var temp1 = null
    var temp2 = null
    
    if (!len) return res.push(arr)
    
    for (var i = 0; i < len; i++) {
        temp1 = Array.from(arr)
        temp1.push(nums[i])
        
        temp2 = Array.from(nums)
        temp2.splice(i, 1)
        
        dfs(res, temp1, temp2)
    }
}
```

## Complexity

- Time complexity : O(n!)
- Space complexity :